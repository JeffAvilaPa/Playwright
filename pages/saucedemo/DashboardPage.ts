import { Page } from '@playwright/test';
import { InventoryHelper } from '../../tests/saucedemo/utils/helpers';
import { expect } from '@playwright/test';

export class DashboardPage {
    private page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    // Método para realizar el inicio de sesión
    async getAllOffersItems() {
        const inventoryHelper = new InventoryHelper(this.page);
        const itemNames = await inventoryHelper.getAllItemNames();
        console.log('Lista de productos:', itemNames);  // 🔹 Ver los elementos en la consola
        expect(itemNames.length).toBeGreaterThan(0);  // Validar que hay al menos un elemento

    }

    async ItemListSortedAZ() {
        const inventoryHelper = new InventoryHelper(this.page);
        const itemNames = await inventoryHelper.getAllItemNames();
        const sortedNames = [...itemNames].sort((a, b) => a.localeCompare(b)); // 🔹 Ordenar A-Z
        return JSON.stringify(itemNames) === JSON.stringify(sortedNames); // 🔹 Comparar con la original
    }

    async ItemListSortedZA() {
        const inventoryHelper = new InventoryHelper(this.page);
        const itemNames = await inventoryHelper.getAllItemNames();
        const sortedNames = [...itemNames].sort((a, b) => b.localeCompare(a)); // 🔹 Ordenar Z-A
        return JSON.stringify(itemNames) === JSON.stringify(sortedNames); // 🔹 Comparar con la original
    }

    async ItemListLowToHigh() {
        const inventoryHelper = new InventoryHelper(this.page);
        const prices = await this.page.locator('.item-price').allTextContents(); // Obtener todos los precios de los productos visibles en la página
        const numericPrices = prices.map(price => parseFloat(price.replace(/[^0-9.-]+/g, "")));// Convertir los precios a números
        const sortedPrices = [...numericPrices].sort((a, b) => a - b);// Crear una copia de los precios y ordenarlos de menor a mayor
        console.log("result => " + JSON.stringify(numericPrices) === JSON.stringify(sortedPrices)); // Comparar la lista original con la lista ordenada
        expect(numericPrices).toEqual(sortedPrices); // Validación explícita
        return JSON.stringify(numericPrices) === JSON.stringify(sortedPrices); // También puedes devolver el resultado si es necesario
    }
}
