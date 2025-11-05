# Contributing

Thanks for taking the time to contribute! This guide explains how to set up the project, run checks locally, and write good commit messages.

## Prerequisites
- Node.js 20.x and npm 10+
- Supabase project (URL and anon key)

## Setup
1. Install dependencies:
   ```bash
   npm i
   ```
2. Create a `.env` (or `.env.local`) with:
   ```bash
   VITE_SUPABASE_URL=<your-url>
   VITE_SUPABASE_ANON_KEY=<your-anon-key>
   ```
3. (Optional) Deploy the edge function:
   ```bash
   supabase functions deploy validate-session-notes
   ```

## Scripts
- Dev server:
  ```bash
  npm run dev
  ```
- Lint:
  ```bash
  npm run lint
  ```
- Typecheck + build:
  ```bash
  npm run build
  ```
- Tests (Vitest):
  ```bash
  npm run test
  ```
  You can also run coverage directly:
  ```bash
  npx vitest run --coverage
  ```

## Project conventions
- Path aliases: `@` → `src/`, `@features` → `src/features/`, `@shared` → `src/shared/`.
- Styling: use CSS files colocated with components (no inline `sx`).
- Types: keep `strict` TypeScript, avoid `any`, prefer explicit types in public APIs.
- Components: feature-first structure under `src/features/<feature>` with `components/`, `hooks/`, `types.ts`.

## Testing guidelines
- Use React Testing Library; test behavior, not implementation details.
- Prefer user events over firing DOM events directly.
- Use the global test setup in `src/test/setup.ts` for jest-dom matchers.
- Keep tests colocated under `__tests__` next to the code or under `src/__tests__` for app-level tests.

## Commit messages (Conventional Commits)
Format: `<type>(optional-scope): short summary`

Common types:
- `feat`: a new feature
- `fix`: a bug fix
- `docs`: documentation only changes
- `refactor`: code change that neither fixes a bug nor adds a feature
- `test`: adding or updating tests only
- `chore`: tooling, build, CI, or housekeeping

Examples:
- `feat(session-notes): add delete confirmation dialog`
- `fix(supabase): correct edge function name`
- `docs: clarify environment setup in README`

Tips:
- Keep subject ≤ 72 chars when possible.
- Use imperative mood: “add”, “fix”, “refactor”.

## Branches & PRs
- Branch naming: `feat/<short-name>`, `fix/<short-name>`, `chore/<short-name>`.
- Before opening a PR:
  - [ ] `npm run lint` passes
  - [ ] `npm run build` succeeds
  - [ ] `npm run test` passes locally
  - [ ] Relevant docs updated (e.g., README)
- CI will verify lint, build, and tests for pushes/PRs to `main`.

## Supabase notes
- Edge function: `validate-session-notes` validates input before insert.
- CORS is handled in the function for both success and error responses.

## Questions
Open an issue or start a draft PR if you want early feedback. Thanks!


