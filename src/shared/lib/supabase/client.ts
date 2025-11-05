import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

type ViteEnv = { MODE?: string; VITEST?: boolean };
const viteEnv = ((import.meta as unknown as { env?: ViteEnv }).env) ?? {};
const isTestEnv = Boolean(viteEnv.MODE === "test" || viteEnv.VITEST);

if ((!supabaseUrl || !supabaseAnonKey) && !isTestEnv) {
  throw new Error(
    "Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in a .env file at the project root."
  );
}

export const supabase = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string
);
