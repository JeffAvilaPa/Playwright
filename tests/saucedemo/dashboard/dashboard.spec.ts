import { LoginPage } from '../../../pages/saucedemo/LoginPage';
import { test } from '../../fixtures';
import { DashboardPage } from '../../../pages/saucedemo/DashboardPage';
import { ClickHelper } from '../utils/clickHelpers';


test('Get all Items listed', async ({ page, currentSite }) => {
    const loginPage = new LoginPage(page, currentSite);
    const dashboardPage = new DashboardPage(page);
    // Navegar a la página de inicio de sesión
    await page.goto(currentSite.baseUrl);
    // Realizar el login con credenciales válidas
    await loginPage.loginSuccessfully(currentSite.validUsername, currentSite.password);
    dashboardPage.getAllOffersItems();

});

test('Items sorted AZ', async ({ page, currentSite }) => {
    const loginPage = new LoginPage(page, currentSite);
    const dashboardPage = new DashboardPage(page);
    // Navegar a la página de inicio de sesión
    await page.goto(currentSite.baseUrl);
    // Realizar el login con credenciales válidas
    await loginPage.loginSuccessfully(currentSite.validUsername, currentSite.password);
    dashboardPage.ItemListSortedAZ();
});

test('Items sorted ZA', async ({ page, currentSite }) => {
    const loginPage = new LoginPage(page, currentSite);
    const dashboardPage = new DashboardPage(page);
    const clickHelper = new ClickHelper(page);
    // Navegar a la página de inicio de sesión
    await page.goto(currentSite.baseUrl);
    // Realizar el login con credenciales válidas
    await loginPage.loginSuccessfully(currentSite.validUsername, currentSite.password);
    await clickHelper.clickElement("//*[@id=\"header_container\"]/div[2]/div/span/select")
    await page.waitForTimeout(15000); // Espera de medio segundo para asegurar que el select se ha abierto
    await page.locator('option[value="za"]').click();
    await page.waitForTimeout(60000);
});

test('Items sorted price low to high', async ({ page, currentSite }) => {
    const loginPage = new LoginPage(page, currentSite);
    const dashboardPage = new DashboardPage(page);
    const clickHelper = new ClickHelper(page);
    // Navegar a la página de inicio de sesión
    await page.goto(currentSite.baseUrl);
    // Realizar el login con credenciales válidas
    await loginPage.loginSuccessfully(currentSite.validUsername, currentSite.password);
    clickHelper.clickElement("//*[@id=\"header_container\"]/div[2]/div/span/span")
    //clickHelper.clickElement("//*[@id=\"header_container\"]/div[2]/div/span/select/option[2]")
    dashboardPage.ItemListLowToHigh();
});


