declare const Deno: {
  serve: (handler: (req: Request) => Response | Promise<Response>) => void
};
type SessionNoteInput = {
  client_name: string;
  session_date: string;
  notes: string;
  duration_minutes: number;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // ou use o domínio exato: "http://localhost:5173"
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  // 💡 Responde o preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const note = (await req.json()) as SessionNoteInput;

    if (
      typeof note.duration_minutes !== "number" ||
      note.duration_minutes < 15 ||
      note.duration_minutes > 120
    ) {
      return new Response(
        JSON.stringify({ valid: false, error: "Duration must be 15–120 minutes." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ valid: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
    
  } catch (error) {
    const message =
      error instanceof Error ? error.message : typeof error === "string" ? error : "Invalid payload";
    return new Response(
      JSON.stringify({ valid: false, error: message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  }
});
