import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
require('dotenv').config();

// exports.Assertions =
class Assertions {
  async assertElementText(element, expectedText, description) {
    await allure.step(description, async () => {
      await expect(element).toHaveText(expectedText, {
        timeout: parseInt(process.env.EXTRALARGEWAIT),
      });
    });
  }
  async assertElementContainText(element, expectedText, description) {
    await allure.step(description, async () => {
      await expect(element).toContainText(expectedText, {
        timeout: parseInt(process.env.EXTRALARGEWAIT),
      });
    });
  }
  async assertElementVisible(element, description) {
    await allure.step(description, async () => {
      await expect(element).toBeVisible({
        timeout: parseInt(process.env.EXTRALARGEWAIT),
      });
    });
  }
  async assertElementVisibleWithExtraWait(element, description) {
    await allure.step(description, async () => {
      await expect(element).toBeVisible({
        timeout: parseInt(process.env.EXTRAWAIT),
      });
    });
  }
  async assertElementIsEnabled(element, description) {
    await allure.step(description, async () => {
      await expect(element).toBeEnabled({
        timeout: parseInt(process.env.EXTRALARGEWAIT),
      });
    });
  }
  async assertElementToHaveText(element, expectedText, description) {
    await allure.step(description, async () => {
      const elementText = await element.innerText();
      expect(elementText).toBe(expectedText, {
        timeout: parseInt(process.env.EXTRALARGEWAIT),
      });
    });
  }
  async assertElementToBeEqual(elementText, expectedText, description) {
    await allure.step(description, async () => {
      expect(elementText).toBe(expectedText, {
        timeout: parseInt(process.env.EXTRALARGEWAIT),
      });
    });
  }
  async assertElementToContainText(element, expectedText, description) {
    const elementText = await element.innerText({
      timeout: parseInt(process.env.EXTRALARGEWAIT),
    });
    await allure.step(description, async () => {
      expect(elementText).toContain(expectedText, {
        timeout: parseInt(process.env.EXTRALARGEWAIT),
      });
    });
  }
  async assertTextToContainElementText(text, elementText, description) {
    await allure.step(description, async () => {
      expect(text).toContain(elementText, {
        timeout: parseInt(process.env.EXTRALARGEWAIT),
      });
    });
  }
  async assertElementIsDisabled(element, description) {
    await allure.step(description, async () => {
      await expect(element).toBeDisabled();
    });
  }
  async assertElementNotVisible(element, description) {
    await allure.step(description, async () => {
      await expect(element).toBeHidden({
        timeout: parseInt(process.env.EXTRALARGEWAIT),
      });
    });
  }
  async assertElementCount(element, expectedCount, description) {
    await allure.step(description, async () => {
      await expect(element).toHaveCount(expectedCount);
    });
  }
  async assertElementAttribute(element, attribute, expectedValue, description) {
    await allure.step(description, async () => {
      await expect(element).toHaveAttribute(attribute, expectedValue);
    });
  }
  async assertElementToHaveCSS(element, cssProperty, cssValue, description) {
    await allure.step(description, async () => {
      await expect(element).toHaveCSS(cssProperty, cssValue);
    });
  }
  async assertElementToHaveURL(page, expectedURL, description) {
    await allure.step(description, async () => {
      await expect(page).toHaveURL(expectedURL);
    });
  }
  async assertElementToEqual(text, expectedText, description) {
    await allure.step(description, async () => {
      expect(text).toEqual(expectedText);
    });
  }
  async assertValueToBeGreaterThanOrEqual(number1, number2) {
    await allure.step(description, async () => {
      expect(number1).toBeGreaterThanOrEqual(number2);
    });
  }
  async assertValueToBeLessThanOrEqual(number1, number2) {
    await allure.step(description, async () => {
      expect(number1).toBeLessThanOrEqual(number2);
    });
  }
  async assertValueToBeGreaterThan(number1, number2) {
    await allure.step(description, async () => {
      expect(number1).toBeGreaterThan(number2);
    });
  }
  async assertValueToBeLessThan(number1, number2) {
    await allure.step(description, async () => {
      expect(number1).toBeLessThan(number2);
    });
  }
}

module.exports = Assertions;
