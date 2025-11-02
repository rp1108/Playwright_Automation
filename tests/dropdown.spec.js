import { test, expect } from '@playwright/test';

test('dropdown', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.locator("//select[@id='country']").selectOption({ label: "India" });  // lable /visible text 
    const selectedValue = await page.locator("//select[@id='country']").inputValue();
    expect(selectedValue).toBe("india");   //  match the actual value not the lable <option value="india">India</option>
    console.log("Selected dropdown value is:", selectedValue);

    // await page.locator("//select[@id='country']").selectOption('India'); //visible text 
    //await page.locator("#country").selectOption({value:'uk'});  // by using value attribute
    //await page.locator("#country").selectOption({index:1});  // index is a number cant be put into the string
    //await page.selectOption('#country', 'India') // by text using the locator and lable (by text)
    await page.waitForTimeout(5000);

    // Assertions 
    // 1 - check totoal numer of dropdowns presnt - Approch 1 
    const opt = await page.locator('#country option')
    await expect(opt).toHaveCount(10)

    // 2 - check totoal numer of dropdowns presnt - Approch 2
    const options = await page.$$('#country option')  // $ is used to get the array of elements 
    console.log("Total Number of options : ", options.length) // length is a property of array 
    //  captured all option in the form of array and using length cptured total no og option an then total no of option is equal to 10
    await expect(options.length).toBe(10)

    // Presence of option - Approch 3
    

})
