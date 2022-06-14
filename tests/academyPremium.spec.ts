import { test, expect } from '@playwright/test';
test('Academy Premium Page', async ({ page, context }) => {
  // Go to https://www.mygreatlearning.com/academy/premium
  await page.goto('https://www.mygreatlearning.com/academy/premium');
  expect(page.url()).toContain('academy/premium')

  expect(page.locator(`[alt='Great Learning Logo']`)).toBeVisible();

  expect(page.locator(`.academy-hero-banner-bg`)).toBeVisible();

  expect(page.locator(`h1`)).toHaveText('Premium Courses by Great Learning Academy');

  expect(page.locator('.banner-content')).toBeVisible();

  expect(page.locator('.btn-style')).toBeVisible();

  await page.locator('text=EXPLORE PREMIUM COURSES').click();
  await expect(page).toHaveURL('https://www.mygreatlearning.com/academy/premium#explore_courses');

  expect(page.locator('.academy-course-highlights-section')).toBeVisible();

  expect(page.locator('#partners-wrapper').isVisible()).toBeTruthy();

  expect(page.locator('#explore_courses')).toBeVisible();

  expect(await page.locator('.domain-slider a').count()).toBeGreaterThan(0);

  const [page1] = await Promise.all([
    context.waitForEvent('page'),
    await page.locator('.btn').first().click(),
    await page.locator('.domain-slider a:nth-child(2)').click()
  ]);
  await page1.waitForLoadState();
  const allPages = page1.context().pages();
  await expect(allPages[1]).toHaveURL('https://www.mygreatlearning.com/academy/premium/courses/machine-learning-python');
  await expect(allPages[2]).toHaveURL('https://www.mygreatlearning.com/academy/premium/courses/data-science-python');
  await allPages[1].close();
  await allPages[2].close();

  expect(await page.locator('.grid-container > section:nth-of-type(1)').isVisible()).toBeTruthy();

  expect(page.locator('.pt-3')).toBeVisible();

  expect(page.locator('#faq')).toBeVisible();

  expect(page.locator('.gla-footer')).toBeVisible();

})