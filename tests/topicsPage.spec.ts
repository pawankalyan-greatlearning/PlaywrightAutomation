import { test, expect } from '@playwright/test';
// import { devices } from '@playwright/test'

// console.log(devices)
test('topicsPage', async ({ page }) => {
    await page.goto('https://www.mygreatlearning.com/academy');

  // Click a:nth-child(2) > .subject-page-card-wrapper
  await page.locator('a:nth-child(2) > .subject-page-card-wrapper').click()
  await page.waitForNavigation({ url: 'https://www.mygreatlearning.com/aws/free-courses' }),

  //<----header and description check----->
  
  await expect(page.locator('h1')).toHaveText('Free AWS Courses');

  await expect(page.locator('.description')).toBeVisible();

  //<-----filter visibility check----->
  await expect(page.locator('.course-filter-sec > #course-filter')).toBeVisible();

  //<-----for 1-filter check----->
  await page.locator('#subject-courses-section #course-filter >> text=Beginner >> input[type="checkbox"]').check();
  await expect(page).toHaveURL('https://www.mygreatlearning.com/aws/free-courses?p=1&level=Beginner');

  const Beginner = page.locator('#subject-course-cards .course-info div:nth-child(2)')
  const BeginnerCount = await Beginner.count()
  for(let i= 1; i<BeginnerCount; i++){
      expect(await page.locator(`#subject-course-cards a:nth-child(${i}) .course-info div:nth-child(2)`).innerText()).toEqual(' Beginner')
  }

  //<-----for 2-filters check----->
  await page.locator('#subject-courses-section >> text=Intermediate >> input[type="checkbox"]').check();
  await expect(page).toHaveURL('https://www.mygreatlearning.com/aws/free-courses?p=1&level=Beginner%2CIntermediate');

  await page.locator('#subject-courses-section >> text=30 mins - 1 hour >> input[type="checkbox"]').check();
  await expect(page).toHaveURL('https://www.mygreatlearning.com/aws/free-courses?p=1&level=Beginner%2CIntermediate&duration=extraShort');

  for(let i=1; i<BeginnerCount; i++){
      
    const data = await page.locator(`#subject-course-cards a:nth-child(${i}) .course-info div:nth-child(2)`).innerText()
    const expectedValue1 = await page.locator(`.course-filter-sec .level li:nth-of-type(1) > .checkbox-container`).innerText()
    const expectedValue2 = await page.locator(`.course-filter-sec .level li:nth-of-type(2) > .checkbox-container`).innerText()
    
    if(data === ' Beginner'){
        expect(data).toEqual(`${expectedValue1}`);
    }else{

        expect(data).toEqual(`${expectedValue2}`);
    }
    expect(await page.locator(`#subject-course-cards a:nth-child(${i}) .course-info div:nth-child(1)`).innerText()).toEqual('1 hrs');
  }
  

  //<-----for 3-filters check----->
  await page.locator('#subject-courses-section >> text=AWS Domains Cloud Computing Courses in Hindi >> div').nth(2).click();

  await page.locator('#subject-courses-section >> text=Cloud Computing >> input[type="checkbox"]').check();
  await expect(page).toHaveURL('https://www.mygreatlearning.com/aws/free-courses?p=1&domain=Cloud+Computing&level=Beginner%2CIntermediate&duration=extraShort');

//   for(let i=0; i<BeginnerCount; i++){
//     expect(await page.locator(`#subject-course-cards a:nth-child(${i}) .course-info div:nth-child(2)`).innerText()).toEqual(' Beginner')
//   }

  await page.locator('#subject-courses-section >> text=30 mins - 1 hour >> input[type="checkbox"]').uncheck();
  await page.locator('#subject-courses-section #course-filter >> text=Beginner >> input[type="checkbox"]').uncheck();
  await page.locator('#subject-courses-section #course-filter >> text=Cloud Computing >> input[type="checkbox"]').uncheck();

  //<-----Courses Section----->
  
  await expect(page.locator('#subject-course-cards')).toBeVisible();
  expect(page.locator('#subject-course-cards a')).toHaveCount(10);

  const count = await page.locator('#course-count').innerText();

  if(Number(count) > 10){
    expect(await page.locator('#next-nav').isVisible()).toBeTruthy();
    // Click #next-nav img
    await page.locator('#next-nav img').click();
    await expect(page).toHaveURL('https://www.mygreatlearning.com/aws/free-courses?p=2#subject-courses-section');

    expect(await page.locator('#prev-nav').isVisible()).toBeTruthy();
    // Click #prev-nav img
    await page.locator('#prev-nav img').click();
    await expect(page).toHaveURL('https://www.mygreatlearning.com/aws/free-courses?p=1#subject-courses-section');
  }

  //<-----pg-course-section----->

  expect(page.locator('.subject-pgp-section')).toBeVisible();

  expect(await page.locator('#subject-pgp-cards > div:nth-of-type(n)').count()).toBeGreaterThan(0);

  await page.locator('text=PGP in Data Science and Business Analytics 11 months Online >> div').nth(1).click();
  await expect(page).toHaveURL('https://www.mygreatlearning.com/pg-program-data-science-and-business-analytics-course?utm_source=gla&utm_medium=gla_domestic_freepreview&utm_campaign=SubjectPage');

  await page.goto('https://www.mygreatlearning.com/aws/free-courses?p=1#subject-courses-section');

  //<-----similar-subject-section----->

  expect(await page.locator('.similar-subject-section').isVisible()).toBeTruthy;
  await expect(page.locator('#similar-subject-cards div a')).toHaveCount(4);

  //<-----seo section check----->

  expect(await page.locator('.seo-content-sec').isVisible()).toBeTruthy;

  //<-----career path check----->

  expect(page.locator('.subject-career-path-section')).toBeVisible;

  expect(await page.locator('#subject-career-path-cards > div:nth-of-type(n)').count()).toEqual(4);

  //<-----testimonial check----->

  expect(page.locator('.subject-testimonial-section')).toBeVisible();

  //<-----faq check----->

  expect(page.locator('#faq')).toBeVisible();

  //<-----footer check----->

  expect(page.locator('.footer-with-seo-section')).toBeVisible();

  expect(page.locator('.programs-container > div:nth-of-type(n)')).toHaveCount(15);

  expect(page.locator('.copyright')).toBeVisible();

  expect(page.locator('.programs-container > div:nth-of-type(2)')).toBeVisible();

  });
