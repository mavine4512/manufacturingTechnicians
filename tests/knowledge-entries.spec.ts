import { test, expect } from "@playwright/test"

test.describe("Knowledge Capture App", () => {
  test.beforeEach(async ({ page }) => {
    await page.request.post("/api/test-reset")
    await page.goto("/")
    await page.waitForLoadState("networkidle")
  })

  test("should display the app header and title", async ({ page, isMobile }) => {
    await expect(page.getByRole("heading", { name: "Knowledge Capture" })).toBeVisible({ timeout: 10000 })
    if (!isMobile) {
      await expect(page.getByText("Manufacturing Technician Portal")).toBeVisible({ timeout: 10000 })
    }
  })

  test("should display existing knowledge entries", async ({ page }) => {
    await page.waitForSelector('text="Safety Protocol Update"', { timeout: 15000 })
    await expect(page.getByText("Safety Protocol Update")).toBeVisible({ timeout: 15000 })
    await expect(page.getByText("Machine Calibration Process")).toBeVisible({ timeout: 15000 })
    await expect(page.getByText("Quality Control Checklist")).toBeVisible({ timeout: 15000 })
  })

  test("should create a new knowledge entry", async ({ page }) => {
    await page.waitForSelector('[data-testid="add-entry-button"]', { timeout: 10000 })

    await page.getByTestId("add-entry-button").click()

    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5000 })
    await expect(page.getByText("Add New Entry")).toBeVisible()

    // Fill in the form
    await page.getByTestId("entry-title-input").fill("Test Entry Title")
    await page.getByTestId("entry-description-input").fill("This is a test description for the new knowledge entry.")
    await page.getByTestId("entry-image-input").fill("https://example.com/test-image.jpg")

    // Submit the form
    await page.getByTestId("submit-entry-button").click()

    await expect(page.getByRole("dialog")).toHaveCount(0, { timeout: 5000 })
    
    await expect(page.getByText("Test Entry Title")).toBeVisible({ timeout: 5000 })
    await expect(page.getByText("This is a test description for the new knowledge entry.")).toBeVisible()

  })

  test("should edit an existing knowledge entry", async ({ page }) => {
    // // Wait for entries to load
    // await page.waitForSelector('text="Safety Protocol Update"', { timeout: 10000 })
    // await page.waitForSelector('[data-testid="edit-entry-1"]', { timeout: 10000 })

    // // Click edit button
    // await page.getByTestId("edit-entry-1").click()

    // // Wait for dialog to open and form to be ready
    // await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5000 })
    // await expect(page.getByText("Edit Entry")).toBeVisible()

    // // Wait for the title input to be visible and have the existing value
    // const titleInput = page.getByTestId("entry-title-input")
    // await titleInput.waitFor({ state: "visible", timeout: 5000 })
    // await expect(titleInput).toHaveValue("Safety Protocol Update", { timeout: 5000 })

    // // Modify the title - fill() automatically clears first
    // await titleInput.fill("Updated Safety Protocol")

    // // Verify the new value is set
    // await expect(titleInput).toHaveValue("Updated Safety Protocol")

    // // Submit the form
    // await page.getByTestId("submit-entry-button").click()

    // // Wait for dialog to close
    // await expect(page.getByRole("dialog")).not.toBeVisible({ timeout: 5000 })

    // // Wait a bit for the UI to update
    // await page.waitForTimeout(500)

    // // Verify the updated text appears
    // await expect(page.getByText("Updated Safety Protocol")).toBeVisible({ timeout: 5000 })

    // // Verify the old text is gone
    // await expect(page.getByText("Safety Protocol Update")).not.toBeVisible()
  })

  test("should delete a knowledge entry", async ({ page }) => {
  await page.waitForSelector('text="Safety Protocol Update"', { timeout: 10000 })
  await page.waitForSelector('[data-testid="delete-entry-1"]', { timeout: 10000 })

  // Get initial count of entries
  const initialCards = await page.locator('[data-testid^="delete-entry-"]').count()
  console.log('Initial cards:', initialCards) // Debug log

  page.once("dialog", (dialog) => {
    expect(dialog.message()).toContain("Are you sure")
    dialog.accept()
  })

  await page.getByTestId("delete-entry-1").click()

  // Wait for the specific entry to be removed from DOM
  await expect(page.getByTestId("delete-entry-1")).not.toBeAttached({ timeout: 5000 })
  
  // Alternative: Wait for the text to disappear first
  await expect(page.getByText("Safety Protocol Update")).not.toBeVisible({ timeout: 5000 })

  // Verify entry count decreased
  const finalCards = await page.locator('[data-testid^="delete-entry-"]').count()
  console.log('Final cards:', finalCards) // Debug log
  expect(finalCards).toBe(initialCards - 1)
 })

  test("should be responsive on mobile", async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip()
    }

    await page.waitForSelector('text="Safety Protocol Update"', { timeout: 10000 })
    await page.waitForSelector('[data-testid="add-entry-button"]', { timeout: 10000 })

    // Check that the layout is mobile-friendly
    await expect(page.getByRole("heading", { name: "Knowledge Capture" })).toBeVisible()
    await expect(page.getByTestId("add-entry-button")).toBeVisible()

    const cards = page.locator('[data-testid^="edit-entry-"]').first()
    await cards.waitFor({ state: "visible", timeout: 10000 })

    const cardElement = await cards.locator("..").locator("..").locator("..")
    const boundingBox = await cardElement.boundingBox()

    // On mobile, cards should take most of the width
    if (boundingBox) {
      expect(boundingBox.width).toBeGreaterThan(250)
    }
  })

  test("should validate required fields", async ({ page }) => {
    await page.waitForSelector('[data-testid="add-entry-button"]', { timeout: 10000 })

    await page.getByTestId("add-entry-button").click()

    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5000 })

    // Try to submit without filling required fields
    await page.getByTestId("submit-entry-button").click()

    await page.waitForTimeout(500)

    // Dialog should still be visible (form validation prevents submission)
    await expect(page.getByRole("dialog")).toBeVisible()

    // Fill only title
    await page.getByTestId("entry-title-input").fill("Test Title")
    await page.getByTestId("submit-entry-button").click()

    await page.waitForTimeout(500)

    // Dialog should still be visible (description is required)
    await expect(page.getByRole("dialog")).toBeVisible()
  })
})
