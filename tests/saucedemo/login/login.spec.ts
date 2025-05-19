import { LoginPage } from '../../../pages/saucedemo/LoginPage';
import { test } from '../../fixtures';

test('Session: success', async ({ page, currentSite }) => {
const loginPage = new LoginPage(page, currentSite);
// Navegar a la página de inicio de sesión
    await page.goto(currentSite.baseUrl);
// Realizar el login con credenciales válidas
    await loginPage.loginSuccessfully(currentSite.validUsername, currentSite.password);
});

test('Session: locked out user', async ({ page, currentSite }) => {
    const loginPage = new LoginPage(page, currentSite);
    // Navegar a la página de inicio de sesión
        await page.goto(currentSite.baseUrl);
    // Realizar el login con credenciales válidas
        await loginPage.loginLockedUser(currentSite.lockedUsername, currentSite.password);
});
