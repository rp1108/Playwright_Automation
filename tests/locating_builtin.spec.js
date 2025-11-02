const { test, expect } = require('@playwright/test')

test('Built-inLocators', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // to check logo is presnet or not , get the alt attribute text of the logo

    const logo = page.getByAltText('company-branding')  // logo return the element and made variable as const  
    await expect(logo).toBeVisible();                   // here checked element visbible or not here calling the function

    // get by placeholder
    await page.getByPlaceholder('Username').fill("Admin")
    await page.waitForTimeout(3000)
    await page.getByPlaceholder('Password').fill("admin123")
    await page.waitForTimeout(3000)

    // to click on the submit button (by clicking on button is role & passeed the type attribute is submit)
    await page.getByRole('button', { type: 'submit' }).click()

    await page.locator('//p[@class="oxd-userdropdown-name"]').click() // xpath locator
    const name = await page.locator('//p[@class="oxd-userdropdown-name"]').textContent()// to get the text of the element
    await expect(page.getByText(name)).toBeVisible() //  to check the text (name) is present or not as well to locate the inner text
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    console.log("Extracted name is:", name);

     
    const title = await page.title();
    console.log("Page title is: ", title);
    await expect(page).toHaveTitle("OrangeHRM");

})

// logo return the element and made variable as const locater is css selector
// here checked element visbible or not here calling the function