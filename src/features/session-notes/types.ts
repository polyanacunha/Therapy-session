export type SessionNote = {
  id: string;
  created_at: string;
  client_name: string;
  session_date: string; // YYYY-MM-DD
  notes: string;
  duration_minutes: number;
};

export type NewSessionNote = Omit<SessionNote, "id" | "created_at">;
