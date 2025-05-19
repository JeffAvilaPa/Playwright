import { Page } from '@playwright/test';

export class Helper {
    private page: Page;
    private itemSelector: string;
    private itemPriceSelector: string;

    constructor(page: Page) {
        this.page = page;
        this.itemSelector = '.prdocutname'; // Selector de los nombres de los ítems
        this.itemPriceSelector = '//*[@id="maincontainer"]//div[contains(@class, "pricenew")]';
    }

    async getAllItemNames(): Promise<string[]> {
        const elements = await this.page.locator(this.itemSelector).all(); // Obtener todos los elementos
        const itemNames: string[] = [];

        for (const element of elements) {

            await element.waitFor({ state: 'visible' });
            const text = await element.innerText();
            console.log('Item ----- ', text)
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
        // Obtener los primeros 8 productos visibles
        const elements = await this.page.locator(this.itemSelector).all(); // Obtener todos los elementos
    
        const itemNames: string[] = [];
    
        // Iterar solo sobre los primeros 8 productos visibles
        for (let i = 0; i < Math.min(8, elements.length); i++) {
            const element = elements[i];
    
            // Verificar si el producto está visible
            const isVisible = await element.isVisible(); // Comprobamos si el elemento está visible
    
            if (isVisible) {
                const text = await element.innerText(); // Obtener el nombre del producto
                console.log('Item ----- ', text);
                itemNames.push(text);
            }
        }
    
        // Ordenar los nombres de los productos de Z a A
        const sortedNames = [...itemNames].sort((a, b) => b.localeCompare(a)); // Ordenar de Z a A
    
        // Retornar true si están ordenados correctamente
        return JSON.stringify(itemNames) === JSON.stringify(sortedNames);
    }
    
    
    


    async isSortedByPriceAsc(): Promise<boolean> {
        // Seleccionar directamente los divs con la clase 'pricenew' en el contenedor principal
        const prices = await this.page.locator(this.itemPriceSelector);

        // Obtener todos los elementos visibles (hasta 8 productos)
        const visiblePrices = await prices.all();

        // Filtrar solo los primeros 8 productos visibles
        const visibleItems = [];
        for (let i = 0; i < visiblePrices.length && visibleItems.length < 8; i++) {
            const priceElement = visiblePrices[i];
            const box = await priceElement.boundingBox();
            // Verificamos que el elemento sea visible en la página
            if (box && box.height > 0 && box.width > 0) {
                visibleItems.push(priceElement);
            }
        }

        // Extraer el precio de cada producto visible y convertirlo a número
        const items = await Promise.all(visibleItems.map(async (priceElement) => {
            const priceText = await priceElement.innerText();
            const parsedPrice = parseFloat(priceText.replace(/[^0-9.,-]+/g, "").replace(",", "."));
            console.log('priceText  ', priceText);
            console.log('parsedPrice  ', parsedPrice);
            return parsedPrice;
        }));

        // Verificamos si la lista de precios está ordenada de menor a mayor
        const isOrdered = items.every((price, index) => {
            if (index === 0) return true;
            console.log('tems[index - 1] <= price; ', items[index - 1] <= price)
            return items[index - 1] <= price; // Verificar orden
        });
        console.log('isOrdered ', isOrdered)
        return isOrdered; // Retorna true si está ordenado, false si no
    }

    isSortedByPriceDesc = async () => {
        // Seleccionar directamente los divs con la clase 'pricenew' en el contenedor principal
        const prices = await this.page.locator('//*[@id="maincontainer"]//div[contains(@class, "pricenew")]');

        // Obtener todos los elementos visibles (hasta 8 productos)
        const visiblePrices = await prices.all();

        // Filtrar solo los primeros 8 productos visibles
        const visibleItems = [];
        for (let i = 0; i < visiblePrices.length && visibleItems.length < 8; i++) {
            const priceElement = visiblePrices[i];
            const box = await priceElement.boundingBox();
            // Verificamos que el elemento sea visible en la página
            if (box && box.height > 0 && box.width > 0) {
                visibleItems.push(priceElement);
            }
        }

        // Extraer el precio de cada producto visible y convertirlo a número
        const items = await Promise.all(visibleItems.map(async (priceElement) => {
            const priceText = await priceElement.innerText();
            // Eliminar caracteres no numéricos (excepto números, punto decimal y coma)
            const parsedPrice = parseFloat(priceText.replace(/[^0-9.,-]+/g, "").replace(",", "."));
            console.log(`Precio extraído: ${parsedPrice}`); // Diagnóstico para ver el valor extraído
            return parsedPrice;
        }));

        // Verificamos si la lista de precios está ordenada de mayor a menor
        const isOrderedDesc = items.every((price, index) => {
            if (index === 0) return true; // El primer valor siempre es válido
            console.log(`Comparando: ${items[index - 1]} >= ${price}`); // Diagnóstico para ver la comparación
            return items[index - 1] >= price; // Verificar orden descendente
        });

        return isOrderedDesc; // Retorna true si está ordenado de más caro a más barato, false si no
    };

}
