import { NextResponse } from "next/server";

import { createClient } from "@/shared/utils/supabase/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!sessionError) {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Check if user exists in the users table
        const { data: existingUser } = await supabase
          .from("users")
          .select("id, profession, current_tools")
          .eq("email", user.email)
          .single();
        
        if (!existingUser) {
          // New user - create entry in users table
          await supabase
            .from("users")
            .insert({ email: user.email });
          
          // Redirect to onboarding
          return NextResponse.redirect(`${origin}/onboarding`);
        } else if (!existingUser.profession || !existingUser.current_tools) {
          // Existing user but incomplete profile - redirect to onboarding
          return NextResponse.redirect(`${origin}/onboarding`);
        }
        
        // Existing user with complete profile - redirect to home
        return NextResponse.redirect(`${origin}/`);
      }
    }
  }

  // Default redirect to home if something goes wrong
  return NextResponse.redirect(`${origin}/`);
}
