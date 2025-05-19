// Importa las dependencias de Playwright
import { Page } from 'playwright';

export class SelectHelper {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Función para seleccionar una opción de un <select> por su índice
  async selectOptionByIndex(selectLocator: string, index: number) {
    const selectElement = this.page.locator(selectLocator);
    
    // Verifica que el select está visible antes de interactuar
    await selectElement.waitFor({ state: 'visible' });

    // Selecciona la opción por el índice
    await selectElement.selectOption({ index });
  }
}
