import { test, expect,Locator } from '@playwright/test';

test('Verify page Title',async({page})=>{
    await page.goto('https://demowebshop.tricentis.com/')

    await expect(page).toHaveTitle('Demo Web Shop')

    //tag#id
    const searchBox:Locator=page.locator('#small-searchterms')
    await searchBox.fill('Fiction')

    //tag.classname
    await page.locator('input.button-1.search-box-button').click()
})
