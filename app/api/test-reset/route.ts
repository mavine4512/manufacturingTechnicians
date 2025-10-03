import { NextResponse } from "next/server"
import { resetMockData } from "@/lib/mock-data"

// POST /api/test-reset - Reset mock data (for testing only)
export async function POST() {
  resetMockData()
  return NextResponse.json({ success: true })
}
