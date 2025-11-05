import { useState } from "react";
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
// Replaced MUI Grid with CSS grid for simpler typing and styling
import "./session-notes.css";
import type { SessionNote } from "../types";
import ConfirmDialog from "./ConfirmDialog";

type Props = {
  notes: SessionNote[];
  onDelete: (id: string) => Promise<void>;
};

export default function NoteList({ notes, onDelete }: Props) {
  const [targetId, setTargetId] = useState<string | null>(null);

  return (
    <>
      <div className="sn-grid">
        {notes.map((n) => (
          <div className="sn-grid-item" key={n.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{n.client_name}</Typography>
                <Typography variant="body2" className="sn-date">
                  {new Date(n.session_date).toLocaleDateString()}
                </Typography>
                <Typography className="sn-notes">
                  {n.notes?.slice(0, 100) ?? ""}{n.notes && n.notes.length > 100 ? "…" : ""}
                </Typography>
                <Typography className="sn-duration">
                  Duration: {n.duration_minutes} min
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="error" onClick={() => setTargetId(n.id)}>Delete</Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={!!targetId}
        title="Delete note?"
        message="This action cannot be undone."
        onCancel={() => setTargetId(null)}
        onConfirm={async () => {
          if (targetId) await onDelete(targetId);
          setTargetId(null);
        }}
      />
    </>
  );
}
