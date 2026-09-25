# CLAUDE.md

Eine schlichte Notizen-App im Browser: Notizen mit Titel und Text anlegen, bearbeiten, löschen, durchsuchen. Für eine einzelne Person in einem Browser.

## Stack
Reines HTML, CSS und JavaScript. Daten liegen in localStorage. Hosting über GitHub Pages.

## Starten
`index.html` im Browser öffnen. Kein Server, kein Build.

## Konventionen
- Genau drei Dateien für die App: `index.html`, `style.css`, `app.js`.
- Alle Pfade relativ (`style.css`, nicht `/style.css`), damit es auf GitHub Pages läuft.
- Dateinamen komplett kleingeschrieben.
- Oberfläche auf Deutsch.

## Nicht tun — und was stattdessen
- Keine Frameworks, Bibliotheken oder CDN-Skripte — alles selbst in den drei Dateien schreiben.
- Keinen Build-Schritt und kein Backend — alles läuft direkt im Browser.
- Keine neuen Dateien anlegen — frag mich zuerst, wenn du glaubst, eine zu brauchen.
- Keine sensiblen Daten in localStorage (Passwörter, Tokens, Keys) — nur die Notizen selbst.

## Arbeitsweise
- Erst kurz den Plan beschreiben, dann umsetzen.
- Keine ungefragten Änderungen außerhalb der Aufgabe.
- Bei Unklarheit fragen statt annehmen.
