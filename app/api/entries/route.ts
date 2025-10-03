import { type NextRequest, NextResponse } from "next/server"
import { getMockEntries, createMockEntry } from "@/lib/mock-data"
import type { CreateKnowledgeEntryInput } from "@/lib/types"

// GET /api/entries - Get all entries
export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const entries = getMockEntries()
  return NextResponse.json(entries)
}

// POST /api/entries - Create new entry
export async function POST(request: NextRequest) {
  try {
    const body: CreateKnowledgeEntryInput = await request.json()

    // Validate input
    if (!body.title || !body.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newEntry = createMockEntry(body)
    return NextResponse.json(newEntry, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
