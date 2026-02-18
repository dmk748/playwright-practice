import {test,expect,Locator} from '@playwright/test'

test('Validating dynamic table data',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')

    const table:Locator=page.locator('#taskTable tbody')
    await expect(table).toBeVisible()

    //number of rows
    const rows:Locator[]=await table.locator('tr').all()
    console.log('Number of rows in the table:',rows.length)
    

    let cpuUsage:string=''
    for(const row of rows){
        const taskName:string=await row.locator('td').nth(0).innerText()
        if(taskName==='Chrome'){
             cpuUsage=await row.locator('td',{hasText:'%'}).innerText()
             console.log(`CPU Usage of Chrome is: ${cpuUsage}`)
             break;
        }
    }

    const expectedCpuUsage:string= await page.locator('.chrome-cpu').innerText()
    expect(cpuUsage).toBe(expectedCpuUsage)

})