import { Container, Alert, CircularProgress, Box, Divider } from "@mui/material";
import "./App.css";
import NoteForm from "@/features/session-notes/components/NoteForm";
import NoteList from "@/features/session-notes/components/NoteList";
import { useSessionNotes } from "@/features/session-notes/hooks/useSessionNotes";
import type { NewSessionNote } from "@/features/session-notes/types";
import { useState } from "react";

function App() {
  const { notes, loading, error, createNote, deleteNote } = useSessionNotes();
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (data: NewSessionNote) => {
    setSubmitting(true);
    await createNote(data);
    setSubmitting(false);
  };

  return (
    <Container className="app-container">
      {error && <Alert severity="error" className="error-alert">{error}</Alert>}
      <NoteForm onSubmit={handleCreate} submitting={submitting} />
      <Divider className="section-divider" />
      {loading ? (
        <Box className="content-loader">
          <CircularProgress />
        </Box>
      ) : (
        <NoteList
          notes={notes}
          onDelete={async (id: string) => {
            await deleteNote(id);
          }}
        />
      )}
    </Container>
  );
}

export default App;
