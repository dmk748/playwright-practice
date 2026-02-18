import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.cricbuzz.com/');
  await page.getByRole('link', { name: 'Live Scores' }).click();
  await page.getByRole('link', { name: 'Schedule', exact: true }).click();
  await page.getByRole('link', { name: 'The Ashes, 2025-' }).first().click();
  await expect(page.getByRole('link', { name: 'mcg-pitch-for-fourth-ashes-' })).toBeVisible();
  await expect(page.getByRole('main')).toContainText('The Ashes, 2025-26');
  await page.getByRole('link', { name: 'Venues' }).click();
  await page.getByRole('link', { name: 'Matches', exact: true }).click();
  await page.getByRole('link', { name: '4th Test • Melbourne,' }).click();
  await page.getByRole('link', { name: 'josh-tongue Josh Tongue' }).click();
  await page.getByRole('link', { name: 'View all Matches' }).first().click();
  await page.getByRole('link', { name: 'Bowling' }).click();
  await page.getByRole('link', { name: '3-57 & 5-125 IND Test London' }).click();
});