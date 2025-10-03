"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { KnowledgeEntry, CreateKnowledgeEntryInput } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Loader2 } from "lucide-react"

interface EntryFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  entry?: KnowledgeEntry | null
  onSubmit: (data: CreateKnowledgeEntryInput) => Promise<void>
}

export function EntryFormDialog({ open, onOpenChange, entry, onSubmit }: EntryFormDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (entry) {
      setTitle(entry.title)
      setDescription(entry.description)
      setImageUrl(entry.imageUrl || "")
    } else {
      setTitle("")
      setDescription("")
      setImageUrl("")
    }
  }, [entry, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit({
        title,
        description,
        imageUrl: imageUrl || undefined,
      })
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to submit:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{entry ? "Edit Entry" : "Add New Entry"}</DialogTitle>
          <DialogDescription>
            {entry ? "Update the knowledge entry details below." : "Create a new knowledge entry for your team."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter entry title"
                required
                data-testid="entry-title-input"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter detailed description"
                required
                rows={4}
                data-testid="entry-description-input"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL (optional)</Label>
              <Input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                data-testid="entry-image-input"
              />
              <p className="text-xs text-muted-foreground">Provide a URL to an image or leave blank</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} data-testid="submit-entry-button">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {entry ? "Update" : "Create"} Entry
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
