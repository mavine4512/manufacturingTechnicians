"use client"

import { useState, useEffect } from "react"
import type { KnowledgeEntry, CreateKnowledgeEntryInput } from "@/lib/types"
import { KnowledgeEntryCard } from "@/components/knowledge-entry-card"
import { EntryFormDialog } from "@/components/entry-form-dialog"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Loader2, BookOpen, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"


export default function HomePage() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<KnowledgeEntry | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Fetch entries on mount
  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/entries")
      if (!response.ok) throw new Error("Failed to fetch entries")
      const data = await response.json()
      setEntries(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load knowledge entries",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  //Crud logc
  const handleCreate = async (data: CreateKnowledgeEntryInput) => {
    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to create entry")

      const newEntry = await response.json()
      setEntries([newEntry, ...entries])

      toast({
        title: "Success",
        description: "Knowledge entry created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create entry",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleUpdate = async (data: CreateKnowledgeEntryInput) => {
    if (!editingEntry) return

    try {
      const response = await fetch(`/api/entries/${editingEntry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to update entry")

      const updatedEntry = await response.json()
      setEntries(entries.map((e) => (e.id === updatedEntry.id ? updatedEntry : e)))

      toast({
        title: "Success",
        description: "Knowledge entry updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update entry",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return

    try {
      const response = await fetch(`/api/entries/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete entry")

      setEntries(entries.filter((e) => e.id !== id))

      toast({
        title: "Success",
        description: "Knowledge entry deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete entry",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (entry: KnowledgeEntry) => {
    setEditingEntry(entry)
    setDialogOpen(true)
  }

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      setEditingEntry(null)
    }
  }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-background">
          <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <SidebarTrigger className="lg:hidden" />
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
                      <BookOpen className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-foreground">Knowledge Capture</h1>
                      <p className="text-sm text-muted-foreground hidden sm:block">Manufacturing Technician Portal</p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setEditingEntry(null)
                    setDialogOpen(true)
                  }}
                  size="default"
                  className="shadow-md"
                  data-testid="add-entry-button"
                >
                  <Plus className="h-5 w-5 sm:mr-2" />
                  <span className="hidden sm:inline">Add Entry</span>
                </Button>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : entries.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">No entries yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
                  Start capturing knowledge by creating your first entry
                </p>
                <Button
                  onClick={() => {
                    setEditingEntry(null)
                    setDialogOpen(true)
                  }}
                  size="lg"
                  className="shadow-md"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create First Entry
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-foreground mb-2 text-balance">Knowledge Entries</h2>
                      <p className="text-muted-foreground">
                        {filteredEntries.length} {filteredEntries.length === 1 ? "entry" : "entries"} available
                      </p>
                    </div>
                    <div className="relative w-full sm:w-80">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search entries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                {filteredEntries.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
                    <p className="text-muted-foreground">Try adjusting your search query</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEntries.map((entry) => (
                      <KnowledgeEntryCard key={entry.id} entry={entry} onEdit={handleEdit} onDelete={handleDelete} />
                    ))}
                  </div>
                )}
              </>
            )}
          </main>

          {/* Form Dialog */}
          <EntryFormDialog
            open={dialogOpen}
            onOpenChange={handleDialogClose}
            entry={editingEntry}
            onSubmit={editingEntry ? handleUpdate : handleCreate}
          />
        </div>
      </SidebarInset>
    </>
  )
}
