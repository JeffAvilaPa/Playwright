import { Page } from '@playwright/test';

export class ClickHelper {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickElement(selector: string, options?: { force?: boolean, timeout?: number }) {
        const locator = selector.startsWith('//') || selector.startsWith('(')  
            ? this.page.locator(`xpath=${selector}`) // 🔹 Si empieza con "//" o "(", es XPath
            : this.page.locator(selector); // 🔹 Si no, se asume que es un selector CSS

            await locator.click({ force: true });

    }

    async clickByText(text: string) {
        await this.page.locator(`text=${text}`).click();
    }

    async clickByTestId(testId: string) {
        await this.page.locator(`[data-test="${testId}"]`).click();
    }
}
