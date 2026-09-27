const STORAGE_KEY = "notes-app.notes";

const newNoteButton = document.getElementById("new-note");
const noteList = document.getElementById("note-list");
const emptyMessage = document.getElementById("empty-message");
const searchInput = document.getElementById("search");
const noResults = document.getElementById("no-results");
const editorHint = document.getElementById("editor-hint");
const editorForm = document.getElementById("editor-form");
const titleInput = document.getElementById("note-title");
const bodyInput = document.getElementById("note-body");

let notes = loadNotes();
let activeId = null;

// Suche wird nicht gespeichert; manche Browser stellen Feldinhalte beim Neuladen wieder her
searchInput.value = "";

// Leere Notizen vom letzten Besuch entfernen
removeEmptyNotes();
saveNotes();
render();

// ---------- Daten ----------

function isValidNote(note) {
  return (
    note !== null &&
    typeof note === "object" &&
    typeof note.id === "string" &&
    typeof note.title === "string" &&
    typeof note.body === "string" &&
    typeof note.updatedAt === "number"
  );
}

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(isValidNote);
  } catch (error) {
    // Kaputte Daten: leer starten statt abstürzen
    return [];
  }
}

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Notizen konnten nicht gespeichert werden:", error);
  }
}

function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function isEmpty(note) {
  return note.title.trim() === "" && note.body.trim() === "";
}

function findNote(id) {
  return notes.find((note) => note.id === id) || null;
}

// Entfernt alle leeren Notizen außer der mit keepId
function removeEmptyNotes(keepId = null) {
  notes = notes.filter((note) => note.id === keepId || !isEmpty(note));
  if (activeId !== null && !findNote(activeId)) {
    activeId = null;
  }
}

// ---------- Aktionen ----------

function createNote() {
  removeEmptyNotes();
  const note = { id: createId(), title: "", body: "", updatedAt: Date.now() };
  notes.push(note);
  activeId = note.id;
  saveNotes();
  render();
  titleInput.focus();
}

function openNote(id) {
  if (id === activeId) return;
  removeEmptyNotes(id);
  activeId = id;
  saveNotes();
  render();
}

function deleteNote(id) {
  if (!confirm("Notiz wirklich löschen?")) return;
  notes = notes.filter((note) => note.id !== id);
  if (activeId === id) activeId = null;
  saveNotes();
  render();
}

function updateActiveNote(field, value) {
  const note = findNote(activeId);
  if (!note) return;
  note[field] = value;
  note.updatedAt = Date.now();
  saveNotes();
  renderList();
}

// ---------- Anzeige ----------

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// Die geöffnete Notiz bleibt immer sichtbar, damit sie beim Anlegen
// oder Bearbeiten während einer Suche nicht aus der Liste verschwindet
function matchesSearch(note, query) {
  if (query === "" || note.id === activeId) return true;
  return (
    note.title.toLowerCase().includes(query) ||
    note.body.toLowerCase().includes(query)
  );
}

function renderList() {
  noteList.textContent = "";
  emptyMessage.hidden = notes.length > 0;

  const rawQuery = searchInput.value.trim();
  const query = rawQuery.toLowerCase();
  const visible = [...notes]
    .filter((note) => matchesSearch(note, query))
    .sort((a, b) => b.updatedAt - a.updatedAt);

  noResults.hidden = notes.length === 0 || visible.length > 0;
  noResults.textContent = `Keine Treffer für „${rawQuery}“.`;

  for (const note of visible) {
    const item = document.createElement("li");
    item.className = "note-item";
    if (note.id === activeId) item.classList.add("active");

    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "note-open";
    openButton.addEventListener("click", () => openNote(note.id));

    const title = document.createElement("span");
    title.className = "note-title";
    if (note.title.trim() === "") {
      title.textContent = "Ohne Titel";
      title.classList.add("untitled");
    } else {
      title.textContent = note.title;
    }

    const date = document.createElement("span");
    date.className = "note-date";
    date.textContent = formatDate(note.updatedAt);

    openButton.append(title, date);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "Löschen";
    deleteButton.addEventListener("click", () => deleteNote(note.id));

    item.append(openButton, deleteButton);
    noteList.append(item);
  }
}

function renderEditor() {
  const note = findNote(activeId);
  editorForm.hidden = !note;
  editorHint.hidden = Boolean(note);
  titleInput.value = note ? note.title : "";
  bodyInput.value = note ? note.body : "";
}

function render() {
  renderList();
  renderEditor();
}

// ---------- Ereignisse ----------

newNoteButton.addEventListener("click", createNote);

searchInput.addEventListener("input", renderList);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    searchInput.value = "";
    renderList();
  }
});

titleInput.addEventListener("input", () => updateActiveNote("title", titleInput.value));
bodyInput.addEventListener("input", () => updateActiveNote("body", bodyInput.value));

titleInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    bodyInput.focus();
  }
});
