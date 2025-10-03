import { type NextRequest, NextResponse } from "next/server"
import { getMockEntry, updateMockEntry, deleteMockEntry } from "@/lib/mock-data"
import type { UpdateKnowledgeEntryInput } from "@/lib/types"

// GET /api/entries/[id] - Get single entry
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const entry = getMockEntry(id)

  if (!entry) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 })
  }

  return NextResponse.json(entry)
}

// PATCH /api/entries/[id] - Update entry
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const body: UpdateKnowledgeEntryInput = await request.json()

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const updatedEntry = updateMockEntry(id, body)

    if (!updatedEntry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 })
    }

    return NextResponse.json(updatedEntry)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

// DELETE /api/entries/[id] - Delete entry
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const success = deleteMockEntry(id)

  if (!success) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
