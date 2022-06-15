
import { test, expect } from '@playwright/test';


enum RedirectingURLS {
    AllCareerPage = 'https://www.mygreatlearning.com/academy/career-paths'
}
const visitingPage: string = RedirectingURLS.AllCareerPage

test.describe('it is AllCareer page spec', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(visitingPage)
    })

    test('check url matches AllCareer URL', async ({ page }) => {

        const pageURL: string = page.url()
        expect(pageURL).toEqual(visitingPage)

    })

    test('checking each domain is visible and has relevant courses', async ({page, context})=>{

        const domainsContent = page.locator(`.path-content`)

        const domainCount = await domainsContent.count()

        for(let i=0; i<domainCount; i++){

            await expect(page.locator(`div:nth-of-type(${i+1}).path-content`)).toBeVisible()
            await expect(page.locator(`#career-path-card-container h3:nth-of-type(${i+1})`)).toBeVisible();
            expect(await page.locator(`div:nth-of-type(${i+1}).path-content .path-card-body`).count()).toBeGreaterThanOrEqual(2);
        }

        const card1 = `#career_path_popular_careers .data-science .path-card-body`
        const cardContent = `${card1} .path-card-content`
        const cardRedirection = `#career_path_popular_careers .data-science a`
        const link = await page.locator(`${cardRedirection}`).getAttribute('href')

        await expect(page.locator(`${cardContent}`)).toBeVisible()
        const [pageRedirect] = await Promise.all([
            page.waitForNavigation(),
            await page.locator(`${card1}`).click()
        ])
        expect(pageRedirect.url()).toContain(`${link}`)
        await page.goto(visitingPage)

        const card2 = `#business-administration_slider > div:nth-of-type(1)`
        const card2Content = `${card2} .path-card-content`
        const card2Redirection = `${card2} .business-administration > a`
        const link2 = await page.locator(`${card2Redirection}`).getAttribute('href')

        await expect(page.locator(`${card2Content}`)).toBeVisible()
        const [page2Redirect] = await Promise.all([
            page.waitForNavigation(),
            await page.locator(`${card2}`).click()
        ])
        expect(page2Redirect.url()).toContain(`${link2}`)
        await page.goto(visitingPage)

    })

})