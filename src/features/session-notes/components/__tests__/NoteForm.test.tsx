/// <reference types="vitest" />
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from '../NoteForm'

describe('NoteForm', () => {
  test('submits entered values and clears fields', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn().mockResolvedValue(undefined)

    render(<NoteForm onSubmit={onSubmit} submitting={false} />)

    await user.type(screen.getByLabelText(/client name/i), 'Alice')
    await user.type(screen.getByLabelText(/session date/i), '2025-01-01')
    await user.type(screen.getByLabelText(/quick notes/i), 'First visit')
    const duration = screen.getByLabelText(/duration/i)
    await user.clear(duration)
    await user.type(duration, '45')

    await user.click(screen.getByRole('button', { name: /save note/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      client_name: 'Alice',
      session_date: '2025-01-01',
      notes: 'First visit',
      duration_minutes: 45,
    })
  })
})


