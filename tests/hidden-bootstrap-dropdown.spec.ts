import {test,expect,Locator} from '@playwright/test'

test('Validating hiden dropdown',async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.locator('input[name="username"]').fill('Admin')
    await page.locator('input[name="password"]').fill('admin123')
    await page.locator('button[type="submit"]').click()

    await page.getByText('PIM', { exact: true }).click()
    await page.locator('form i').nth(2).click()

    const pageDOM:Locator=page.locator('div[role="listbox"]') 
    await pageDOM.first().waitFor({state:'visible'})

    const options:Locator= page.locator('div[role="listbox"] span') 
    const cnt:number=await options.count()
    console.log("no of options: ",cnt)
    for(let i=0;i<cnt;i++){
        const text = (await options.nth(i).textContent())?.trim();
        console.log(text)   
        if(text=='Freelance'){
            await options.nth(i).click()
            break;
        }
    }   
    await page.waitForTimeout(3000)
})