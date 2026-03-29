# OrgScript Handbuch (Deutsch)

## Einführung
OrgScript ist eine menschenlesbare, KI-freundliche Beschreibungssprache für operative Logik, Prozesse und Regeln. Es ist keine Programmiersprache im klassischen Sinne, sondern eine strukturierte Ebene zwischen natürlicher Sprache und technischer Ausführung.

## Kernkonzepte

### Prozesse (`process`)
Ein Prozess beschreibt den operativen Ablauf einer Aufgabe. Er beginnt oft mit einem Auslöser (`when`) und enthält bedingte Anweisungen (`if`, `then`, `else`).
- **Anweisungen**: `assign` (Zuweisung), `transition` (Zustandswechsel), `notify` (Benachrichtigung).

### Zustandsflüsse (`stateflow`)
Zustandsflüsse definieren den Lebenszyklus eines Objekts (z. B. ein Auftrag oder ein Lead).
- **states**: Die möglichen Zustände.
- **transitions**: Die erlaubten Pfade zwischen den Zuständen.

### Regeln (`rule`)
Regeln definieren dauerhafte Bedingungen oder Validierungen, die für ein Objekt gelten ("Guardrails").

### Rollen (`role`)
Rollen definieren Berechtigungsgrenzen (`can`, `cannot`).

## Nutzung des CLI (Kommandozeile)

OrgScript bietet ein mächtiges CLI-Werkzeug (`orgscript`):

1. **Check**: `orgscript check <datei>` — Validiert Syntax, lintert die Logik und prüft die Formatierung.
2. **Analyse**: `orgscript analyze <datei>` — Liefert strukturelle Metriken und Komplexitätshinweise.
3. **Export**: 
   - `export mermaid`: Generiert Diagramme.
   - `export html`: Erzeugt eine vollwertige Dokumentationsseite.
   - `export context`: Bereitet die Logik für KI-Systeme auf.

## Best Practices
- **Inkrementell arbeiten**: Fange mit einfachen Zuständen an und füge Prozesse hinzu.
- **KI nutzen**: Nutze `export context`, um KI-Agenten zuverlässig über deine internen Abläufe zu informieren.
- **Git verwenden**: Versioniere deine Logik wie Code.

---
*Version 0.9.0-rc1 / OrgScript Release Candidate*
