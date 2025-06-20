import { NextRequest } from "next/server";

export async function GET(reqest:NextRequest) {
  const url = new URL(reqest.url)
  const searchParams = new URLSearchParams(url.search)
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${searchParams.get('audio')}`)
}