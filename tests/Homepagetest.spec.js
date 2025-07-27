import { test, expect } from '@playwright/test';

test('Home page', async ({ page }) => {                      // before writting anonymus fuction we use async 
   await page.goto('https://www.demoblaze.com/index.html'); // before accessing all the methods from the page we have to use await

   
    const pagetitle =await  page.title(); 
    console.log('page title is : ', pagetitle)
    await expect(page).toHaveTitle('STORE');              // before accessing all the methods from the page we have to use await

    
    const pageURL = page.url();
    console.log('page url: ', pageURL)
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html'); // before accessing all the methods from the page we have to use await


    await page.close(); // to close the page
})



