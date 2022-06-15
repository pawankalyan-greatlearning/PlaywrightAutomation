

import { test, expect } from '@playwright/test';


enum RedirectingURLS {
    AllCoursesPage = 'https://www.mygreatlearning.com/academy/learn-for-free/courses'
}
const visitingPage: string = RedirectingURLS.AllCoursesPage

test.describe('it is AllCourses page spec', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(visitingPage)
    })

    test('check url matches AllCourses URL', async ({ page }) => {

        const pageURL: string = page.url()
        expect(pageURL).toEqual(visitingPage)

    })

    test('checking each domain is visible and has relevant courses', async ({page, context})=>{

        const domains = page.locator('.grid-container section[id]')

        const domainCount = await domains.count()

        for(let i=0; i<=domainCount-1; i++){

            expect(page.locator(`.grid-container section[id]:nth-child(${i+2})`)).toBeVisible();

            expect(await page.locator(`.grid-container section[id]:nth-child(${i+2}) .tns-carousel div`).count()).toBeGreaterThan(2);
           
        }

        const card1 = `#popularcourses> div:nth-of-type(1) > .card > a`

        const cardContent = `${card1} .course-list-content`
        // console.log(cardContent)

        expect(page.locator(`${cardContent}`).isVisible()).toBeTruthy()

        const link = await page.locator(`${card1}`).getAttribute('href')
        console.log(link)
        const [pageRedirect] = await Promise.all([
            page.waitForNavigation(),
            await page.locator(`${card1}`).click()
        ])
        expect(pageRedirect.url()).toEqual(`${link}`)
        await page.goto(visitingPage)

        const card2 = `#data-science > div:nth-of-type(1) > .card > a`

        const card2Content = `${card2} .course-list-content`

        expect(page.locator(`${card2Content}`)).toBeVisible()

        const link2 = await page.locator(`${card2}`).getAttribute('href')
        const [page2Redirect] = await Promise.all([
            page.waitForNavigation(),
            await page.locator(`${card2}`).click()
        ])
        expect(page2Redirect.url()).toEqual(`${link2}`)
        await page.goto(visitingPage)

    })
})

