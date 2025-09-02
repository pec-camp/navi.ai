import { NextResponse } from "next/server";

import { saveOnboarding } from "@/features/onboarding/api/createUser";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, tools } = body ?? {};
    const result = await saveOnboarding({
      role: role ?? null,
      tools: Array.isArray(tools) ? tools : [],
    });
    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { ok: false, message: errorMessage },
      { status: 500 },
    );
  }
}
