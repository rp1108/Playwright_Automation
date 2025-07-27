import { test, expect } from "@playwright/test";
test('inputbox', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    //Input box 

    await expect(await page.locator('#name')).toBeVisible();
    await expect(await page.locator('#name')).toBeEmpty(); // check its empty brfore entering the text
    await expect(await page.locator('#name')).toBeEditable();
    await expect(await page.locator('#name')).toBeEnabled(); //Used with expect(locator)
    await page.locator('#name').fill("QA TESTING")
    //await page.fill ("#name",'testing') // another appproach to fill the input box using locator
    await expect(await page.locator('#name')).toHaveValue('QA TESTING') // check the value if not matchec it will throw error of expect and received

    await expect(await page.locator('#email')).toBeVisible();
    await expect(await page.locator('#email')).toBeEditable();
    await page.locator('#email').fill("test@gmail.com")
    await page.waitForTimeout(1000);

    const inputb = await page.locator('#name').inputValue(); //  inputValue() fetches the current value of the input element.
    console.log("Text inside input box is: ", inputb);
    console.log("Number of characters in input box is: ", inputb.length); // String.length: number Returns the length of a String object.

    console.log("------------------------------------------------------")

    const inputb2 = await page.locator('#email').inputValue(); //  inputValue() fetches the current value of the input element.
    console.log("Email inside input box is: ", inputb2);
    console.log("Number of email characters in input box is: ", inputb2.length);

    await page.locator('#phone').fill("1234567890");
    const inputVal = await page.locator('#phone').inputValue() //  inputValue() fetches the current value of the input element. should be user aftr the locsator used
    expect(inputVal).toBe("1234567890");  // to check actual and expected value 
    console.log("Mobile number is : ", inputVal)

    // Check if the input is disabled and log it
    const isDisabled = await page.locator('#phone').isDisabled();
    console.log("Is input disabled after entering 10 digits?:", isDisabled);


    //const CharacterCount = inputb.length;  
    //console.log(CharacterCount)



});
