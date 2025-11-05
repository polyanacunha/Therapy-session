import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/shared/lib/supabase/client";
import type { SessionNote, NewSessionNote } from "../types";

export function useSessionNotes() {
  const [notes, setNotes] = useState<SessionNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("session_notes")
      .select("*")
      .order("session_date", { ascending: false });

    if (error) setError(error.message);
    else setNotes((data ?? []) as SessionNote[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const createNote = useCallback(async (note: NewSessionNote) => {
    setError(null);

    // Chama a edge function antes de salvar
    const { data: validation, error: fnError } = await supabase.functions.invoke(
      "validate-session-notes",
      { body: note }
    );

    if (fnError) {
      setError(fnError.message);
      return { ok: false, error: fnError.message };
    }
    if (!validation?.valid) {
      const msg = validation?.error ?? "Invalid note";
      setError(msg);
      return { ok: false, error: msg };
    }

    const { error: insertError } = await supabase
      .from("session_notes")
      .insert(note);

    if (insertError) {
      setError(insertError.message);
      return { ok: false, error: insertError.message };
    }

    await fetchNotes();
    return { ok: true };
  }, [fetchNotes]);

  const deleteNote = useCallback(async (id: string) => {
    setError(null);
    const { error } = await supabase.from("session_notes").delete().eq("id", id);
    if (error) {
      setError(error.message);
      return { ok: false, error: error.message };
    }
    setNotes((prev) => prev.filter((n) => n.id !== id));
    return { ok: true };
  }, []);

  return { notes, loading, error, createNote, deleteNote, refetch: fetchNotes };
}
