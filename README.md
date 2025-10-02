# Knowledge Capture Interface

A mobile-first knowledge capture interface built for manufacturing technicians. This application enables technicians to create, read, update, and delete knowledge entries with ease, featuring a clean and intuitive design optimized for both mobile and desktop use.

## Features

- **Mobile-First Design**: Optimized for use on mobile devices in manufacturing environments
- **CRUD Operations**: Full create, read, update, and delete functionality for knowledge entries
- **Image Support**: Optional image attachments for visual documentation
- **Responsive Layout**: Seamless experience across all device sizes
- **Mock API**: Built-in mock API for development and testing
- **Automated Testing**: Comprehensive end-to-end tests using Playwright
- **Modern UI**: Clean, professional interface using shadcn/ui components

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Testing**: Playwright
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd knowledge-capture-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Adding a Knowledge Entry

1. Click the "Add Entry" button in the header
2. Fill in the required fields:
   - **Title**: Brief title for the knowledge entry
   - **Description**: Detailed description of the procedure or information
   - **Image URL** (optional): Link to a relevant image
3. Click "Create Entry" to save

### Editing an Entry

1. Click the "Edit" button on any knowledge entry card
2. Modify the fields as needed
3. Click "Update Entry" to save changes

### Deleting an Entry

1. Click the "Delete" button on any knowledge entry card
2. Confirm the deletion in the dialog prompt

## Running Tests

### End-to-End Tests

Run Playwright tests:

\`\`\`bash
# Run all tests
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui
\`\`\`

### Test Coverage

The test suite includes:
- Display and navigation tests
- Create entry functionality
- Edit entry functionality
- Delete entry functionality
- Mobile responsiveness tests
- Form validation tests

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   └── entries/          # Mock API routes
│   │       ├── route.ts      # GET all, POST new entry
│   │       └── [id]/
│   │           └── route.ts  # GET, PATCH, DELETE single entry
│   ├── globals.css           # Global styles and theme
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main dashboard page
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── entry-form-dialog.tsx # Form dialog for create/edit
│   └── knowledge-entry-card.tsx # Entry display card
├── lib/
│   ├── types.ts              # TypeScript type definitions
│   ├── mock-data.ts          # Mock data store
│   └── utils.ts              # Utility functions
├── tests/
│   └── knowledge-entries.spec.ts # Playwright E2E tests
├── playwright.config.ts      # Playwright configuration
└── README.md
\`\`\`

## API Endpoints

### GET /api/entries
Retrieves all knowledge entries.

**Response**: Array of KnowledgeEntry objects

### POST /api/entries
Creates a new knowledge entry.

**Body**:
\`\`\`json
{
  "title": "string",
  "description": "string",
  "imageUrl": "string (optional)"
}
\`\`\`

### GET /api/entries/[id]
Retrieves a single knowledge entry by ID.

### PATCH /api/entries/[id]
Updates an existing knowledge entry.

**Body**: Partial KnowledgeEntry object

### DELETE /api/entries/[id]
Deletes a knowledge entry by ID.

## Design Decisions

### Mobile-First Approach
The interface prioritizes mobile usability with:
- Large touch targets (minimum 44x44px)
- Clear visual hierarchy
- Simplified navigation
- Responsive grid layout

### Mock API Implementation
Instead of using external services like JSONPlaceholder, the app includes a built-in mock API using Next.js API routes. This provides:
- Realistic async behavior with simulated network delays
- Full control over data structure
- No external dependencies
- Easy testing and development

### UI/UX Enhancements
- **Sticky Header**: Quick access to "Add Entry" button while scrolling
- **Confirmation Dialogs**: Prevents accidental deletions
- **Toast Notifications**: Clear feedback for all actions
- **Loading States**: Visual indicators during async operations
- **Empty State**: Helpful guidance when no entries exist
- **Image Previews**: Visual context for entries with images

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast color scheme
- Focus indicators

## Future Enhancements

Potential improvements for production use:
- Real database integration (PostgreSQL, MongoDB)
- User authentication and authorization
- File upload for images (instead of URLs)
- Search and filter functionality
- Categories and tags
- Export functionality (PDF, CSV)
- Offline support with service workers
- Real-time collaboration features

## Development Notes

### Mock Data Persistence
The mock API stores data in memory, so entries will reset when the server restarts. For production, integrate with a real database.

### Image Handling
Currently uses image URLs. For production, implement proper file upload with storage solutions like Vercel Blob or AWS S3.

### Testing Strategy
- E2E tests cover critical user flows
- Tests run on both desktop and mobile viewports
- Includes validation and error handling scenarios

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
\`\`\`

This README provides comprehensive documentation for setup, usage, testing, and understanding the project architecture.
