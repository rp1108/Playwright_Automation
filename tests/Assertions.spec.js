
import { test, expect } from '@playwright/test';
test('assertiontest', async ({page})=> {      // written the test using anonimus functon

await page.goto ('https://demo.nopcommerce.com/register?returnUrl=%2F')

//1) expect(page).toHaveURL()  = Page has URL

const pageUrl = page.url()
console.log('The page url is:', pageUrl)
await expect(page).toHaveURL('https://demo.nopcommerce.com/register?returnUrl=%2F')

// 2) expect(page).toHaveTitle()   Page has title

const ptitle = await page.title()   
console.log('page title is : ', ptitle)
await expect(page).toHaveTitle('nopCommerce demo store. Register')

//3) expect(locator).toBeVisible()  Element is visible - here we are checking the logo is presnt or not

const LogoElement = await page.locator('.header-logo') // logoelement will return the element and made variable as const (locater is css selector)
await expect (LogoElement).toBeVisible ()              // here checked element visbible or not here calling the function


//4) expect(locator).toBeEnabled()  Control is enabled and disbaled

const seaarchbox = await page.getByPlaceholder('Search store')
await expect(seaarchbox).toBeEnabled();

// 5) expect(locator).toBeChecked()  Radio/Checkbox is checked

 const radiomale =  await page.locator('#gender-male')    // its css selector
 await radiomale.click();  // select the radio button (it is not clicked)
 await expect(radiomale).toBeChecked();

 // check box is check

 const checkbox = await page.locator('#Newsletter')  
 //await expect(checkbox).toBeChecked();  // already checked the check box skipping the step to click 

 //6) expect(locator).toHaveAttribute() Element has attribute (means particular attribute present or not)

const registerbutton= await page.locator('#register-button')
await expect(registerbutton).toHaveAttribute('type','submit') // for the captured element type attribute submot or not

//7) expect(locator).toHaveText()  Element matches text - exact match the text value is equal or not

await expect (await page.locator('.page-title h1')).toHaveText('Register') // full text 


//8) expect(locator).toContainText()  Element contains text - partial match

await expect (await page.locator('.page-title h1')).toContainText('Regi') //partial text


// 9) expect(locator).toHaveValue(value) Input has a value

const emailinput = await page.locator('#Email')
await emailinput.fill('test@demo.com');
await expect(emailinput).toHaveValue('test@demo.com')

// 10) expect(locator).toHaveCount()  List of elements has given length (eg like list of dropdown in the list)

//await page.locator("//ul[@class='top-menu notmobile']//a[normalize-space()='Books']").click();

//const options = page.locator("select[name='products-orderby'] option");

// waits automatically until dropdown is attached and has correct number of options
//await expect(options).toHaveCount(6);

await page.close();
})

//await expect(locator).toHaveText()	
//await expect(response).toBeOK()	