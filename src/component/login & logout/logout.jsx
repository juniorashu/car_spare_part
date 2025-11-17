import { supabase } from "../lib/supabaseClient";
import React from "react";

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = "/login";
}
