// LoginPage.ts
import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private usernameInput: string;
    private passwordInput: string;
    private loginButton: string;
    private currentSite: any;

    constructor(page: Page, currentSite: any) {
        this.page = page;
        this.usernameInput = '#username'; // Selector del campo de usuario
        this.passwordInput = '#password'; // Selector del campo de contraseña
        this.loginButton = '#submit'; // Selector del botón de inicio de sesión
        this.currentSite = currentSite;  // ⬅ Se almacena la configuración del sitio

    }

    // Método para realizar el inicio de sesión
    async loginSuccesfully(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);  // Escribe el nombre de usuario
        await this.page.fill(this.passwordInput, password);  // Escribe la contraseña
        await this.page.click(this.loginButton);  // Hace clic en el botón de inicio de sesión
        // Afirmar que la URL es la esperada
        expect(this.page.url()).toContain(this.currentSite.loginSuccessUrl);
        // Verificar que la página contiene el texto esperado
        const successMessage = await this.page.locator('body').innerText();
        expect(successMessage).toMatch(this.currentSite.loginSuccessMessage);
        // Verificar que el botón "Log out" está visible
        const logoutButton = this.page.locator(this.currentSite.logoutCTA);
        await expect(logoutButton).toBeVisible();
    }

    async loginInvalidUserName(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);  // Escribe el nombre de usuario
        await this.page.fill(this.passwordInput, password);  // Escribe la contraseña
        await this.page.click(this.loginButton);  // Hace clic en el botón de inicio de sesión
        // Verificar que la página contiene el texto esperado
        const successMessage = await this.page.locator('body').innerText();
        expect(successMessage).toMatch(this.currentSite.invalidUsernameMessage);
    }

    async loginInvalidPassword(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);  // Escribe el nombre de usuario
        await this.page.fill(this.passwordInput, password);  // Escribe la contraseña
        await this.page.click(this.loginButton);  // Hace clic en el botón de inicio de sesión
        // Verificar que la página contiene el texto esperado
        const successMessage = await this.page.locator('body').innerText();
        expect(successMessage).toMatch(this.currentSite.invalidPasswordMessage);
    }

    // Método para obtener un mensaje de error (si existe)
    async getErrorMessage() {
        return await this.page.innerText('.error-message'); // Asumiendo que el mensaje de error tiene esta clase
    }
}
