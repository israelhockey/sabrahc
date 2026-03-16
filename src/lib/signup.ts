import { supabase } from "@/integrations/supabase/client";

type SignupSource = "founders" | "fans" | "newsletter";

export async function submitSignup({
  name,
  email,
  source,
}: {
  name?: string;
  email: string;
  source: SignupSource;
}) {
  const { error } = await supabase.from("signups").insert({
    name: name || null,
    email: email.trim().toLowerCase(),
    source,
  });

  if (error) {
    // Unique constraint = already signed up
    if (error.code === "23505") return { success: true, duplicate: true };
    throw error;
  }

  return { success: true, duplicate: false };
}
