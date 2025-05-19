import { Page } from '@playwright/test';

export class InventoryHelper {
    private page: Page;
    private itemSelector: string;

    constructor(page: Page) {
        this.page = page;
        this.itemSelector = '.inventory_item_name'; // Selector de los nombres de los ítems
    }

    async getAllItemNames(): Promise<string[]> {
        const elements = await this.page.locator(this.itemSelector).all(); // Obtener todos los elementos
        const itemNames: string[] = [];

        for (const element of elements) {
            await element.waitFor({ state: 'visible' });
            const text = await element.innerText();
            itemNames.push(text);
        }

        return itemNames;
    }

    async isSortedAZ(): Promise<boolean> {
        const itemNames = await this.getAllItemNames();
        const sortedNames = [...itemNames].sort((a, b) => a.localeCompare(b)); // 🔹 Ordenar A-Z
        return JSON.stringify(itemNames) === JSON.stringify(sortedNames); // 🔹 Comparar con la original
    }

    async isSortedZA(): Promise<boolean> {
        const itemNames = await this.getAllItemNames();
        const sortedNames = [...itemNames].sort((a, b) => b.localeCompare(a)); // 🔹 Ordenar Z-A
        return JSON.stringify(itemNames) === JSON.stringify(sortedNames); // 🔹 Comparar con la original
    }
}
