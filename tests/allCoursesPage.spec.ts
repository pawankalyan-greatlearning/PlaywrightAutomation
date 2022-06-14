

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

    test.only('checking each domain has relevant courses', async ({page})=>{
        const domainCount = await page.locator('.grid-container section[id]').count()
        for(let i=0; i<=domainCount-1; i++){

            expect(await page.locator(`.grid-container section[id]:nth-child(${i+2}) .tns-carousel div`).count()).toBeGreaterThan(2)
            expect(await page.locator(``))
            
        }
    })
})

