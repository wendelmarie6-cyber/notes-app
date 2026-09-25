# Notes-App: Ablauf und Prompts

Ordner: `~/Desktop/notes-app` · Repo: `notes-app` · Stretch-Feature: Suche

---

## Phase 0: Setup (einmalig, vor dem ersten Prompt)

**1. Ordner anlegen und CLAUDE.md hineinlegen**
```bash
mkdir ~/Desktop/notes-app
cd ~/Desktop/notes-app
```
Die `CLAUDE.md` in diesen Ordner kopieren.

**2. .gitignore**
Den Ordner in VS Code öffnen, dann `Cmd+Shift+P` → „Add gitignore“ → **Node** wählen.

**3. Git und Baseline-Commit**
```bash
git init
git add .
git commit -m "Add CLAUDE.md and .gitignore as project baseline"
git branch -M main
```

**4. GitHub-Repo**
Auf github.com ein neues Repo `notes-app` anlegen: public, **ohne** README und ohne .gitignore. Danach:
```bash
git remote add origin https://github.com/wendelmarie6-cyber/notes-app.git
git push -u origin main
```
Falls Login-Daten verlangt werden: diese nur im Terminal oder Browser eingeben, niemals in einen Chat.

---

## Phase 1: Kern-App

In `~/Desktop/notes-app` den Befehl `claude` starten.

### Prompt 1: Kernfunktionen bauen

```
Baue die Notizen-App aus CLAUDE.md in index.html, style.css und app.js.

Was es tun soll:
Ich kann kurze Notizen mit Titel und Text schreiben, später wieder öffnen, ändern und löschen.

Was ich sehen/tun kann:
1. Oben ein Knopf "Neue Notiz". Er legt eine leere Notiz an und öffnet sie direkt zum Schreiben.
2. Eine Liste aller Notizen mit Titel und Datum der letzten Änderung. Die neueste steht oben.
3. Ein Klick auf eine Notiz öffnet sie rechts daneben. Titel und Text lassen sich dort bearbeiten.
4. Pro Notiz ein Löschen-Knopf.

Wie es sich verhalten soll:
- Änderungen sind gespeichert, ohne dass ich einen Knopf drücke. Nach dem Neuladen ist alles noch da.
- Enter im Titelfeld springt ins Textfeld.
- Eine Notiz ohne Titel und ohne Text bleibt nicht in der Liste, sobald ich sie verlasse.
- Notizen ohne Titel erscheinen in der Liste als "Ohne Titel".
- Gibt es keine Notizen, steht dort: "Noch keine Notizen. Leg oben deine erste an."
- Bei 375 px Breite steht die Liste über der Notiz. Nichts läuft über den Rand.
- Buttons sehen aus wie Buttons, Eingabefelder wie Eingabefelder. Die Schrift ist gut lesbar.
- Sind die gespeicherten Daten kaputt, startet die App leer, statt abzustürzen.

Vorgehen:
1. Lies CLAUDE.md.
2. Beschreib mir in drei Sätzen, wie du eine Notiz als Daten aufbaust und wann gespeichert wird, bevor du Code schreibst.
3. Warte auf mein OK und setz es dann um.

Fertig ist es, wenn ich eine Notiz anlegen, bearbeiten und löschen kann und nach dem Neuladen alles so ist, wie ich es verlassen habe.

Zusätzlich nicht tun:
- Nicht sofort beim ersten Klick löschen. Stattdessen einmal nachfragen: "Notiz wirklich löschen?"
- Keine Suche und keinen Dark Mode einbauen. Das kommt später als eigenes Feature.
```

### Selbst im Browser prüfen
`index.html` öffnen und durchklicken:
- [ ] Neue Notiz anlegen, Titel und Text eintippen, neu laden: ist sie noch da?
- [ ] Notiz bearbeiten, neu laden: ist die Änderung noch da?
- [ ] Leere Notiz anlegen und wegklicken: ist sie verschwunden?
- [ ] Löschen: kommt die Rückfrage? Bleibt sie nach dem Neuladen gelöscht?
- [ ] Alle löschen: erscheint der Leer-Text?
- [ ] Enter im Titel springt ins Textfeld
- [ ] Schmales Fenster (Inspect → Handy-Symbol → 375 px): läuft nichts über?

**Wichtig für die Checkliste:** Mindestens zwei UI/UX-Punkte notieren, die **dir** auffallen, nicht dem Agenten.

### Prompt 2: Gebündelte Nachbesserung
```
Korrigiere folgende Punkte aus meinem Browser-Test:

1. <was du gesehen hast> → <wie es sein soll>
2. <was du gesehen hast> → <wie es sein soll>
3. <...>

Ändere nichts anderes.
Fertig ist es, wenn alle Punkte behoben sind und der Rest wie vorher funktioniert.
```
Visuelle Feinheiten (z. B. „kleiner“, „runder“) einzeln schicken.

### Commit und Push
```bash
git add .
git commit -m "Add notes app with create, edit, delete and localStorage persistence"
git push
```
In Claude Code dann `/clear` ausführen.

---

## Phase 2: Stretch-Feature Suche (eigener Branch und PR)

```bash
git checkout -b add-search
```

### Prompt 3: Suche einbauen
```
Füge eine Suche zur Notizen-App hinzu.

Was es tun soll:
Ich finde eine Notiz schnell, indem ich ein Stichwort tippe.

Was ich sehen/tun kann:
1. Über der Liste ein Suchfeld mit dem Platzhalter "Notizen durchsuchen…".
2. Während ich tippe, zeigt die Liste nur noch Notizen, deren Titel oder Text das Wort enthält.
3. Ist das Feld leer, sehe ich wieder alle Notizen.

Wie es sich verhalten soll:
- Groß- und Kleinschreibung spielen keine Rolle.
- Findet die Suche nichts, steht dort: "Keine Treffer für „<Suchwort>“."
- Escape im Suchfeld leert die Suche.
- Die Suche selbst wird nicht gespeichert. Nach dem Neuladen ist das Feld leer.

Vorgehen:
1. Lies app.js und index.html.
2. Beschreib mir in zwei Sätzen, wie die Liste aktuell gezeichnet wird, bevor du etwas änderst.
3. Setz es um.

Fertig ist es, wenn Tippen die Liste sofort filtert und Anlegen, Bearbeiten und Löschen weiter funktionieren, auch während eine Suche aktiv ist.

Zusätzlich nicht tun:
- Gespeicherte Notizen nicht verändern. Die Suche blendet nur aus.
- Keinen Such-Knopf einbauen. Stattdessen sofort beim Tippen filtern.
```

Im Browser prüfen, dann:
```bash
git add .
git commit -m "Add live search filtering notes by title and body"
git push -u origin add-search
```
Auf GitHub den Pull Request `add-search → main` öffnen.

### Prompt 4: Review in frischer Session
Claude Code beenden, neu starten (oder `/clear`), dann:
```
Agiere als kritischer Reviewer, der dieses Projekt zum ersten Mal sieht.
Lies CLAUDE.md. Prüf dann den Diff mit `git diff main...add-search`.
Markiere alles, was außerhalb der Aufgabe "Suche hinzufügen" liegt oder gegen CLAUDE.md verstößt.
Ändere nichts, liste nur auf.
```
**Einen Red Flag notieren** und entscheiden, ob du etwas änderst. Dann auf GitHub mergen und lokal nachziehen:
```bash
git checkout main
git pull
```

---

## Phase 3: Deploy

### Prompt 5: Secret-Check vor dem Push
```
Prüf alle Dateien im Repo auf etwas, das wie ein API-Key, Passwort oder Token aussieht. Nur berichten, nichts ändern.
```

### GitHub Pages
Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main`, Ordner `/ (root)` → Save.
Nach 1–3 Minuten erscheint die URL, voraussichtlich `https://wendelmarie6-cyber.github.io/notes-app/`.

### Live prüfen (im Inkognito-Fenster)
- [ ] Die Seite lädt und das Styling ist da
- [ ] Anlegen, Bearbeiten, Löschen, Suche funktionieren
- [ ] Neu laden: die Daten sind noch da
- [ ] Handy-Breite ist okay

### Prompt 6: Live-Fehler fixen (bei Bedarf)
```
Auf der Live-Seite <URL> passiert Folgendes: <was du siehst>.
Lokal funktioniert es.
Untersuche Dateipfade, Groß-/Kleinschreibung der Dateinamen und ob alle Dateien committet sind.
Beschreib mir die Ursache, bevor du etwas änderst.
```
Wenn alles auf Anhieb läuft: auf dem Handy testen. Dort fällt oft noch etwas auf.

---

## Abschluss-Checkliste
- [ ] Kein Framework, kein Build, kein Backend
- [ ] Alle Kernfunktionen laufen auf der Live-URL
- [ ] Die Daten bleiben erhalten (frische Inkognito-Session)
- [ ] Die Suche funktioniert
- [ ] CLAUDE.md passt zu dem, was der Agent tatsächlich befolgen sollte
- [ ] Die Commit-Messages sind konkret (`git log --oneline`)
- [ ] Ein PR geöffnet, in frischer Session reviewt und gemergt
- [ ] .gitignore deckt `.env` und OS/Editor-Kram ab
- [ ] Zwei selbst gefundene UI/UX-Fixes und ein Live-Fix erledigt
