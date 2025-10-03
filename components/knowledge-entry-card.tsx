"use client"

import type { KnowledgeEntry } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Pencil, Trash2, Calendar } from "lucide-react"
import Image from "next/image"

interface KnowledgeEntryCardProps {
  entry: KnowledgeEntry
  onEdit: (entry: KnowledgeEntry) => void
  onDelete: (id: string) => void
}

export function KnowledgeEntryCard({ entry, onEdit, onDelete }: KnowledgeEntryCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
      {entry.imageUrl && (
        <div className="relative h-48 w-full bg-gradient-to-br from-muted to-muted/50">
          <Image
            src={entry.imageUrl || "/placeholder.svg"}
            alt={entry.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="shadow-md backdrop-blur-sm bg-background/80">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(entry.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Badge>
          </div>
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="text-balance leading-tight">{entry.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          {new Date(entry.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-foreground/90 line-clamp-3">{entry.description}</p>
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(entry)}
            className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors"
            data-testid={`edit-entry-${entry.id}`}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(entry.id)}
            className="flex-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
            data-testid={`delete-entry-${entry.id}`}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
