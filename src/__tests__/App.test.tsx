/// <reference types="vitest" />
import { render, screen } from '@testing-library/react'
import App from '../App'

vi.mock('@/features/session-notes/hooks/useSessionNotes', () => {
  return {
    useSessionNotes: () => ({
      notes: [
        {
          id: '1',
          created_at: new Date().toISOString(),
          client_name: 'Eve',
          session_date: '2025-01-10',
          notes: 'Follow-up session',
          duration_minutes: 30,
        },
      ],
      loading: false,
      error: null,
      createNote: async () => ({ ok: true as const }),
      deleteNote: async () => ({ ok: true as const }),
      refetch: async () => undefined,
    }),
  }
})

describe('App', () => {
  test('renders note list', () => {
    render(<App />)
    expect(screen.getByText(/follow-up session/i)).toBeInTheDocument()
  })
})


