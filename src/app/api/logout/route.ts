// app/api/logout/route.ts
import { logoutUser } from "@/utils/loginUser";
import { NextResponse } from "next/server";

export async function POST() {
  const result = await logoutUser(); // this clears the session cookie
  return NextResponse.json(result);  // returns { message: "Logout Success" }
}