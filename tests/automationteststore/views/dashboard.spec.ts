import { expect } from '@playwright/test';
import { test } from '../../fixtures';

import { websites } from '../../config';  // Import the selectors from config file

test('Bar menu CTA visibility', async ({ page, currentSite  }) => {
    await page.goto(currentSite.baseUrl);
    const automationStore = websites.automationteststore;
if (automationStore.dashboardCtas) {
    for (const [ctaName, ctaSelector] of Object.entries(automationStore.dashboardCtas)) {
      const selector: any = ctaSelector;
      console.log(`Checking visibility for CTA: ${ctaName} with selector: ${selector}`);
      const locator = page.locator(selector);  // Locate the CTA element using XPath selector
      const isVisible = await locator.isVisible();  // Check if the CTA is visible
      console.log(`${ctaName} is visible: ${isVisible}`);
      expect(isVisible).toBe(true);  // You can modify this if you expect it to be hidden sometimes
    }
  } else {
    console.log('No CTA selectors found in config for automationteststore');
  }
  });
