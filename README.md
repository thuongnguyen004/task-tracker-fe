# Task Tracker FE

Frontend application for the Task Tracker project.

## Local Dev Setup

### Requirements

- Node.js `^22.18.0 || >=24.12.0`
- npm

### Install Dependencies

```powershell
npm install
```

### Run Locally

```powershell
npm run dev
```

Vite serves the app at:

```text
http://localhost:5173
```

### Build And Preview

```powershell
npm run build
npm run preview
```

### Format Code

```powershell
npm run format
```

## Branching & Commit Message Conventions

### Branch Naming

Use lowercase words separated by hyphens:

```text
<type>/<short-description>
```

Examples:

```text
feature/ticket-status-update
fix/login-form-validation
chore/update-dependencies
docs/readme-setup
```

Allowed branch types:

- `feature`
- `fix`
- `chore`
- `docs`
- `refactor`
- `test`

### Commit Message Format

Use Conventional Commit style:

```text
<type>(<scope>): <short summary>
```

Examples:

```text
feat(ticket): add sprint board filters
fix(auth): preserve login redirect
docs(readme): add frontend setup
refactor(ui): reuse base input component
```

Common commit types:

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation only
- `refactor`: code change without behavior change
- `test`: add or update tests
- `chore`: maintenance work
- `build`: build or dependency changes

Keep commits focused and write summaries in the imperative mood.

## Tech Stack & Versions

| Tool / Library | Version |
| --- | --- |
| Node.js | `^22.18.0 || >=24.12.0` |
| Vue | `^3.5.40` |
| Vite | `^8.1.5` |
