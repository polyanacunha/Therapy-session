# Therapy Session Quick Notes

## Tech stack
- React 19 + TypeScript
- Vite 7
- MUI 7
- Supabase (Database + Edge Functions)

## Project structure
```
src/
  features/
    session-notes/
      components/        # UI components for this feature
      hooks/             # Feature hooks
      types.ts           # Feature types
  shared/
    lib/
      supabase/          # Shared clients (e.g., Supabase)
  App.tsx
```

Path aliases are configured:
- `@/*` → `src/*`
- `@features/*` → `src/features/*`
- `@shared/*` → `src/shared/*`

## Styling guidelines
- Co-locate CSS next to components within the feature folder
- No inline `sx` styles; use class names and `.css` files instead
- Use small, semantic class names (e.g., `sn-form`, `sn-date`)

## Setup
1. `npm i`
2. Create `.env` (or `.env.local`) with:
   ```
   VITE_SUPABASE_URL=<your-url>
   VITE_SUPABASE_ANON_KEY=<your-anon-key>
   ```
3. Create the `session_notes` table in Supabase (see Database section)
4. Deploy the Edge Function (optional but recommended):
   ```
   supabase functions deploy validate-session-notes
   ```
5. `npm run dev`

## Scripts
- `npm run dev` – start dev server
- `npm run build` – typecheck and build
- `npm run preview` – preview build
- `npm run lint` – lint TS/TSX

## Testing
- Run tests once:
  ```bash
  npm run test
  ```
- Watch mode (no script):
  ```bash
  npx vitest
  ```
- Coverage (no script):
  ```bash
  npx vitest run --coverage
  ```

## Database
`session_notes` table:
```sql
create table if not exists session_notes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  client_name text not null,
  session_date date not null,
  notes text,
  duration_minutes int not null
);
```

## Edge Function
`validate-session-notes` validates the input before insert. The app calls it via Supabase Functions API.

## Assumptions
- No auth (demo)
- RLS disabled for demo
- Date input uses `<input type="date">`
