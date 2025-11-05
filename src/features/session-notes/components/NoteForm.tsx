import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import "./session-notes.css";
import type { NewSessionNote } from "../types";

type Props = {
  onSubmit: (data: NewSessionNote) => Promise<void>;
  submitting?: boolean;
};

export default function NoteForm({ onSubmit, submitting }: Props) {
  const [clientName, setClientName] = useState("");
  const [sessionDate, setSessionDate] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [duration, setDuration] = useState<number>(60);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      client_name: clientName.trim(),
      session_date: sessionDate, // "YYYY-MM-DD"
      notes,
      duration_minutes: Number(duration),
    });
    setClientName("");
    setSessionDate("");
    setNotes("");
    setDuration(60);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="sn-form">
      <Typography variant="h6">New Session Note</Typography>
      <TextField
        label="Client name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        required
      />
      <TextField
        label="Session date"
        type="date"
        slotProps={{ inputLabel: { shrink: true } }}
        value={sessionDate}
        onChange={(e) => setSessionDate(e.target.value)}
        required
      />
      <TextField
        label="Quick notes (max 500)"
        value={notes}
        onChange={(e) => setNotes(e.target.value.slice(0, 500))}
        multiline
        minRows={3}
        helperText={`${notes.length}/500`}
      />
      <TextField
        label="Duration (minutes)"
        type="number"
        slotProps={{ input: { inputProps: { min: 15, max: 120, step: 5 } } }}
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        required
      />
      <Button variant="contained" type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Save Note"}
      </Button>
    </Box>
  );
}
