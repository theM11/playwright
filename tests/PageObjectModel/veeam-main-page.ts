import { Locator, Page } from "playwright";
import { MAIN_PAGE_LINK } from "../../constants/contants";
import { expect } from "@playwright/test";

export class VeeamMainPageObject {

    page: Page
    mainPageLink: Locator

    constructor(page: Page){
        this.page = page
    }

    async goto(){
        await this.page.goto(MAIN_PAGE_LINK)
        expect(await this.page.locator("svg.logo__img")).toBeVisible()
    }

    async topNavigationSupport(){
        expect(await this.page.locator("ul.main-navigation__container")).toBeVisible()
        await this.page.locator("ul.main-navigation__container").getByRole('listitem').filter({hasText: "Support"}).click()
    }



}