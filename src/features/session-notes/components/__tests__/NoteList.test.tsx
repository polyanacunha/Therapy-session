/// <reference types="vitest" />
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteList from '../NoteList'
import type { SessionNote } from '../../types'

function makeNote(partial?: Partial<SessionNote>): SessionNote {
  return {
    id: 'n1',
    created_at: new Date().toISOString(),
    client_name: 'Bob',
    session_date: '2025-02-02',
    notes: 'Some notes',
    duration_minutes: 60,
    ...partial,
  }
}

describe('NoteList', () => {
  test('confirms deletion and calls onDelete', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn().mockResolvedValue(undefined)
    const notes = [makeNote()]

    render(<NoteList notes={notes} onDelete={onDelete} />)

    await user.click(screen.getByRole('button', { name: /delete/i }))
    // dialog should be visible
    expect(await screen.findByText(/delete note\?/i)).toBeInTheDocument()

    // confirm
    const confirmBtn = screen.getAllByRole('button', { name: /delete/i }).at(-1)!
    await user.click(confirmBtn)

    expect(onDelete).toHaveBeenCalledWith('n1')
  })
})


