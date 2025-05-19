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
        this.usernameInput = '#user-name'; // Selector del campo de usuario
        this.passwordInput = '#password'; // Selector del campo de contraseña
        this.loginButton = '#login-button'; // Selector del botón de inicio de sesión
        this.currentSite = currentSite;  // ⬅ Se almacena la configuración del sitio
    }

    // Método para realizar el inicio de sesión
    async loginSuccessfully(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);  // Escribe el nombre de usuario
        await this.page.fill(this.passwordInput, password);  // Escribe la contraseña
        await this.page.click(this.loginButton);  // Hace clic en el botón de inicio de sesión
        const bodyMessage = await this.page.locator('body').innerText();
        expect(bodyMessage).toMatch(this.currentSite.loginSuccessMessage);
    }

    async loginLockedUser(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);  // Escribe el nombre de usuario
        await this.page.fill(this.passwordInput, password);  // Escribe la contraseña
        await this.page.click(this.loginButton);  // Hace clic en el botón de inicio de sesión
        const bodyMessage = await this.page.locator('body').innerText();
        expect(bodyMessage).toMatch(this.currentSite.lockOutUserMessage);
    }


    // Método para obtener un mensaje de error (si existe)
    async getErrorMessage() {
        return await this.page.innerText('.error-message'); // Asumiendo que el mensaje de error tiene esta clase
    }
}
