import { expect } from '@playwright/test';
import { test } from '../../fixtures';
import { SelectHelper } from '../utils/selectHelper';
import { SpecialPage } from '../../../pages/automationteststore/specialViewPage'

test('Test Case 010: Sort products (Z-A)', async ({ page, currentSite }) => {
  const selectHelper = new SelectHelper(page);
  const selectLocator = currentSite.specialViewCtas.SpecialSortSelect;
  const specialPage = new SpecialPage(page);

  await page.goto(currentSite.baseUrl);
  await page.locator(currentSite.dashboardCtas.SpecialsCTA).click();        // Verificar que la página contiene el texto esperado
  const successMessage = await page.locator('body').innerText();
  expect(successMessage).toMatch(currentSite.MsgValidation.SpecialScreenMsg);

  await selectHelper.selectOptionByIndex(selectLocator, 2);
  await specialPage.ItemListSortedZA();
});

test('Test Case 011: Sort products Price Asc', async ({ page, currentSite }) => {
  const selectHelper = new SelectHelper(page);
  const selectLocator = currentSite.specialViewCtas.SpecialSortSelect;
  const specialPage = new SpecialPage(page);

  await page.goto(currentSite.baseUrl);
  await page.locator(currentSite.dashboardCtas.SpecialsCTA).click();        // Verificar que la página contiene el texto esperado
  const successMessage = await page.locator('body').innerText();
  expect(successMessage).toMatch(currentSite.MsgValidation.SpecialScreenMsg);

  await selectHelper.selectOptionByIndex(selectLocator, 3);
  await specialPage.ItemListLowToHigh();
});

test('Test Case 012: Sort products Price Desc', async ({ page, currentSite }) => {
  const selectHelper = new SelectHelper(page);
  const selectLocator = currentSite.specialViewCtas.SpecialSortSelect;
  const specialPage = new SpecialPage(page);

  await page.goto(currentSite.baseUrl);
  await page.locator(currentSite.dashboardCtas.SpecialsCTA).click();        // Verificar que la página contiene el texto esperado
  const successMessage = await page.locator('body').innerText();
  expect(successMessage).toMatch(currentSite.MsgValidation.SpecialScreenMsg);

  await selectHelper.selectOptionByIndex(selectLocator, 4);
  await specialPage.ItemListHighToLow();
});