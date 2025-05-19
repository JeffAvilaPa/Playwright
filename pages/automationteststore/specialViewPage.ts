import { Page } from '@playwright/test';
import { Helper } from '../../tests/automationteststore/utils/helpers';
import { expect } from '@playwright/test';

export class SpecialPage {
    private page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    // Método para realizar el inicio de sesión
    async getAllItems() {
        const inventoryHelper = new Helper(this.page);
        const itemNames = await inventoryHelper.getAllItemNames();
        console.log('Lista de productos:', itemNames);  // 🔹 Ver los elementos en la consola
        expect(itemNames.length).toBeGreaterThan(0);  // Validar que hay al menos un elemento

    }

    async ItemListSortedAZ() {
        const inventoryHelper = new Helper(this.page);
        const itemNames = await inventoryHelper.getAllItemNames();
        const sortedNames = [...itemNames].sort((a, b) => a.localeCompare(b)); // 🔹 Ordenar A-Z
        console.log("-> " + sortedNames)
        return JSON.stringify(itemNames) === JSON.stringify(sortedNames); // 🔹 Comparar con la original
    }

    async ItemListSortedZA() {
        const inventoryHelper = new Helper(this.page);
        const itemNames = await inventoryHelper.getAllItemNames();
        const sortedNames = [...itemNames].sort((a, b) => b.localeCompare(a)); // 🔹 Ordenar Z-A
        return JSON.stringify(itemNames) === JSON.stringify(sortedNames); // 🔹 Comparar con la original
    }

    async ItemListLowToHigh() {
        const inventoryHelper = new Helper(this.page);
        const itemNames = await inventoryHelper.isSortedByPriceAsc();

    }
    async ItemListHighToLow() {
        const inventoryHelper = new Helper(this.page);
        const itemNames = await inventoryHelper.isSortedByPriceDesc();

    }
}
