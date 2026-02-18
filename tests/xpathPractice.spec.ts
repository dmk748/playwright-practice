import {test,expect,Locator} from '@playwright/test'

test.skip('Xpath demo',async({page})=>{
    await page.goto('https://demo.nopcommerce.com/')
    const prodLinks=page.locator("//a[contains(@href,'apple')]")

    //1.counting num of links 
    const cnt=await prodLinks.count()
    console.log(cnt);

    //2.print title of available products
    for(let i=0; i<cnt; i++){
        console.log(await prodLinks.nth(i).innerText())
    }
})
test.skip('Validating input Actions',async({page})=>{
   await page.goto('https://testautomationpractice.blogspot.com/')
   const inputBox:Locator=page.locator('#name')
   await expect(inputBox).toBeVisible()
   await inputBox.fill('Mukkavar')

   const maleRadio:Locator= page.locator('#male')
   await expect(maleRadio).toBeVisible();
   await expect(maleRadio).toBeEnabled();
   expect(await maleRadio.isChecked()).toBe(false)
   await maleRadio.check()
})

test('Validating checkbox actions',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    const checkSunday=page.getByLabel('Sunday')
    await checkSunday.check()
    await expect(checkSunday).toBeChecked()
})