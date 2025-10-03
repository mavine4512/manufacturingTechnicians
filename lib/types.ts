export interface KnowledgeEntry {
  id: string
  title: string
  description: string
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

export interface CreateKnowledgeEntryInput {
  title: string
  description: string
  imageUrl?: string
}

export interface UpdateKnowledgeEntryInput {
  title?: string
  description?: string
  imageUrl?: string
}
