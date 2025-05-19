import { test as base } from '@playwright/test';
import { websites } from './config';

export const test = base.extend<{ currentSite: any }>({
    currentSite: [async ({}: any, use: (arg0: any) => any) => {
        const siteName = process.env.SITE || 'automationteststore';

        if (!(siteName in websites)) {
            throw new Error(`Configuración no encontrada para ${siteName}`);
        }

        const siteConfig = websites[siteName];

        console.log(`🔵 Ejecutando pruebas en: ${siteConfig.name}`);

        await use(siteConfig);
    }, { auto: true }]
});
