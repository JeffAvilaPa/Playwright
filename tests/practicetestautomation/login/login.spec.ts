import { LoginPage } from '../../../pages/practicetestautomation/LoginPage';
import { test } from '../../fixtures';

test('debe iniciar sesión correctamente con credenciales válidas', async ({ page, currentSite }) => {
    const loginPage = new LoginPage(page, currentSite);
    // Navegar a la página de inicio de sesión
    await page.goto(currentSite.loginUrl);
    // Realizar el login con credenciales válidas
    await loginPage.loginSuccesfully(currentSite.validUsername, currentSite.validPassword);

});

test('Session: Username is invalid', async ({ page, currentSite }) => {
    const loginPage = new LoginPage(page, currentSite);
    // Navegar a la página de inicio de sesión
    await page.goto(currentSite.loginUrl);
    // Realizar el login con credenciales válidas
    await loginPage.loginInvalidUserName(currentSite.invalidUsername, currentSite.validPassword);
});

test('Session: Password is invalid', async ({ page, currentSite }) => {
    const loginPage = new LoginPage(page, currentSite);
    // Navegar a la página de inicio de sesión
    await page.goto(currentSite.loginUrl);
    // Realizar el login con credenciales válidas
    await loginPage.loginInvalidPassword(currentSite.validUsername, currentSite.invalidPassword);
});