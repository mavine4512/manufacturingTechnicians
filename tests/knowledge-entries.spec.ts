import { test, expect } from "@playwright/test"

test.describe("Knowledge Capture App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("should display the app header and title", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Knowledge Capture" })).toBeVisible()
    await expect(page.getByText("Manufacturing Technician Portal")).toBeVisible()
  })

  test("should display existing knowledge entries", async ({ page }) => {
    // Wait for entries to load
    await page.waitForLoadState("networkidle")

    // Check that entries are displayed
    await expect(page.getByText("Safety Protocol Update")).toBeVisible()
    await expect(page.getByText("Machine Calibration Process")).toBeVisible()
    await expect(page.getByText("Quality Control Checklist")).toBeVisible()
  })

  test("should create a new knowledge entry", async ({ page }) => {
    // Click the "Add Entry" button
    await page.getByTestId("add-entry-button").click()

    // Wait for dialog to open
    await expect(page.getByRole("dialog")).toBeVisible()
    await expect(page.getByText("Add New Entry")).toBeVisible()

    // Fill in the form
    await page.getByTestId("entry-title-input").fill("Test Entry Title")
    await page.getByTestId("entry-description-input").fill("This is a test description for the new knowledge entry.")
    await page.getByTestId("entry-image-input").fill("https://example.com/test-image.jpg")

    // Submit the form
    await page.getByTestId("submit-entry-button").click()

    // Wait for dialog to close and entry to appear
    await expect(page.getByRole("dialog")).not.toBeVisible()
    await expect(page.getByText("Test Entry Title")).toBeVisible()
    await expect(page.getByText("This is a test description for the new knowledge entry.")).toBeVisible()
  })

  test("should edit an existing knowledge entry", async ({ page }) => {
    // Wait for entries to load
    await page.waitForLoadState("networkidle")

    // Click edit button on the first entry
    await page.getByTestId("edit-entry-1").click()

    // Wait for dialog to open
    await expect(page.getByRole("dialog")).toBeVisible()
    await expect(page.getByText("Edit Entry")).toBeVisible()

    // Modify the title
    const titleInput = page.getByTestId("entry-title-input")
    await titleInput.clear()
    await titleInput.fill("Updated Safety Protocol")

    // Submit the form
    await page.getByTestId("submit-entry-button").click()

    // Wait for dialog to close and verify update
    await expect(page.getByRole("dialog")).not.toBeVisible()
    await expect(page.getByText("Updated Safety Protocol")).toBeVisible()
  })

  test("should delete a knowledge entry", async ({ page }) => {
    // Wait for entries to load
    await page.waitForLoadState("networkidle")

    // Get initial count of entries
    const initialCards = await page.locator('[data-testid^="delete-entry-"]').count()

    // Set up dialog handler for confirmation
    page.on("dialog", (dialog) => dialog.accept())

    // Click delete button on the first entry
    await page.getByTestId("delete-entry-1").click()

    // Wait a moment for the deletion to process
    await page.waitForTimeout(500)

    // Verify entry count decreased
    const finalCards = await page.locator('[data-testid^="delete-entry-"]').count()
    expect(finalCards).toBe(initialCards - 1)
  })

  test("should be responsive on mobile", async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip()
    }

    // Check that the layout is mobile-friendly
    await expect(page.getByRole("heading", { name: "Knowledge Capture" })).toBeVisible()
    await expect(page.getByTestId("add-entry-button")).toBeVisible()

    // Verify cards stack vertically on mobile
    const cards = page.locator(".grid > div")
    const firstCard = cards.first()
    const boundingBox = await firstCard.boundingBox()

    // On mobile, cards should take most of the width
    expect(boundingBox?.width).toBeGreaterThan(300)
  })

  test("should validate required fields", async ({ page }) => {
    // Click the "Add Entry" button
    await page.getByTestId("add-entry-button").click()

    // Try to submit without filling required fields
    await page.getByTestId("submit-entry-button").click()

    // Dialog should still be visible (form validation prevents submission)
    await expect(page.getByRole("dialog")).toBeVisible()

    // Fill only title
    await page.getByTestId("entry-title-input").fill("Test Title")
    await page.getByTestId("submit-entry-button").click()

    // Dialog should still be visible (description is required)
    await expect(page.getByRole("dialog")).toBeVisible()
  })
})
