import type { KnowledgeEntry } from "./types"

// In-memory storage for mock API
const mockEntries: KnowledgeEntry[] = [
  {
    id: "1",
    title: "Safety Protocol Update",
    description:
      "New safety procedures for handling hydraulic equipment. Always wear protective gear and follow lockout/tagout procedures.",
    imageUrl: "/assets/safetyGear.png",
    createdAt: new Date("2025-03-01").toISOString(),
    updatedAt: new Date("2025-03-01").toISOString(),
  },
  {
    id: "2",
    title: "Machine Calibration Process",
    description: "Step-by-step guide for calibrating CNC machines. Check alignment every 100 hours of operation.",
    imageUrl: "/assets/cnc-machine.png",
    createdAt: new Date("2025-03-02").toISOString(),
    updatedAt: new Date("2025-03-02").toISOString(),
  },
  {
    id: "3",
    title: "Quality Control Checklist",
    description:
      "Daily quality control procedures for production line. Inspect dimensions, surface finish, and material integrity.",
    createdAt: new Date("2025-03-03").toISOString(),
    updatedAt: new Date("2025-03-03").toISOString(),
  },
]

export function getMockEntries(): KnowledgeEntry[] {
  return [...mockEntries]
}

export function getMockEntry(id: string): KnowledgeEntry | undefined {
  return mockEntries.find((entry) => entry.id === id)
}

export function createMockEntry(entry: Omit<KnowledgeEntry, "id" | "createdAt" | "updatedAt">): KnowledgeEntry {
  const newEntry: KnowledgeEntry = {
    ...entry,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockEntries.push(newEntry)
  return newEntry
}

export function updateMockEntry(id: string, updates: Partial<KnowledgeEntry>): KnowledgeEntry | undefined {
  const index = mockEntries.findIndex((entry) => entry.id === id)
  if (index === -1) return undefined

  mockEntries[index] = {
    ...mockEntries[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  return mockEntries[index]
}

export function deleteMockEntry(id: string): boolean {
  const index = mockEntries.findIndex((entry) => entry.id === id)
  if (index === -1) return false

  mockEntries.splice(index, 1)
  return true
}
