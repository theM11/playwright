import test, { expect } from "playwright/test"
import { VeeamMainPageObject } from "./PageObjectModel/veeam-main-page"


test.describe('veeam test', ()=>{
    test("login to veeam R&D forum", async ({page})=>{
        const veeamHomePage = new VeeamMainPageObject(page)
        await veeamHomePage.goto()
        await veeamHomePage.topNavigationSupport()
        await page.locator("div.list-of-links").getByRole('listitem').getByRole('link', {"name" : "R&D Forums"}).click()
        await page.locator("div.inner").getByRole('menuitem', {"name": "Register"}).click()
        await page.waitForLoadState('domcontentloaded')
        await expect(async () => {
            await page.locator("#agreed").click()
            await expect(page.locator("#username")).toBeVisible({
                timeout: 250,
            })
        }).toPass()

        await page.locator("#username").fill("InterviewUser")
        await page.locator("#new_password").fill("InreviewUser")
        await page.locator("#password_confirm").fill("InreviewUser")
        await page.locator("#email").fill("inreviewuser@gmail.com")
        await page.locator("#timezone").selectOption("Europe/Prague")
        await page.waitForLoadState("load")
        await page.locator("#submit").click()
        await page.waitForLoadState("domcontentloaded")
        await expect(page.locator(".error")).toContainText("Public email are not allowed. Please, be aware that your domain or email address was banned. To find out the reason please contact support ")
        await page.screenshot({path: "/screenshots/testScreenShot.png", fullPage: true})
    })
})