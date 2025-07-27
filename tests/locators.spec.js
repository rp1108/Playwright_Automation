//const{test,expect} =require=('@playwright/test')
import { test, expect } from '@playwright/test'

//before starting the ananimious function we have to write async keyword

test('locators', async ({ page }) => {

    //before calling method/function from the page we have to specify await keyword // make sure to wait to make the promise conplete
    await page.goto("https://www.demoblaze.com/index.html")

    // click on login button - propert as a locator 
    //await page.locator('id=login2').click()
    await page.click('id=login2')

    //provide username - css locatpr used here
    
    //await page.locator('#loginusername').fill("testrushi")
    await page.fill('#loginusername', 'pavanol')
    //await page.type ('#loginusername', 'testrushi')

    // provide the password css locator used here

    await page.fill('#loginpassword', 'test@123')

    // CLICK ON LOGIN BUTTON -  Xpath

    await page.click("//button[normalize-space()='Log in']")
    //await page.click('text=Log in')
    //await page.click('button:has-text("Log in")')

   
    const logoutlink = await page.locator("//a[normalize-space()='Log out']")  // verify logut link presence Xpath (created the varibale logout link and stoed the log out inside the variable)

    
    await expect(logoutlink).toBeVisible()  // to check the visiblity 

    await page.close()
})