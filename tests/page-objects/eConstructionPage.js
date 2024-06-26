const { expect, chromium } = require('@playwright/test');

class EConstructionPage {
  constructor(page, browser, context) {
    this.page = page;
    this.browser = browser;
    this.context = context;
    this.searchInput = 'input.search__input';
    this.searchResultLink = (number) => `//a[contains(text(), "${number}")]`;
    this.landBlock = 'text="Земельні ділянки"';
    this.noResultsText = '//div[@class="card-header"]/small[contains(text(), "По вашому запиту нічого не знайдено")]';
  }

  static async init() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    return new EConstructionPage(page, browser, context);
  }

  async goto() {
    await this.page.goto('https://e-construction.gov.ua/');
  }

  async searchNumber(number) {
    await this.page.fill(this.searchInput, number);
    await this.page.press(this.searchInput, 'Enter');
  }

  async clickSearchResult(number) {
    console.log(`Пошук документа з номером: ${number}`);
    // Додаємо тайм-аут перед перевіркою наявності результатів пошуку
    await this.page.waitForTimeout(2000);
    
    // Перевіряємо наявність результатів пошуку
    const resultExists = await this.page.locator(this.searchResultLink(number)).isVisible().catch(() => false);

    if (resultExists) {
      await this.page.click(this.searchResultLink(number));
      return true;
    } else {
      // Якщо результатів немає, перевіряємо наявність повідомлення "По вашому запиту нічого не знайдено"
      const noResultsVisible = await this.page.locator(this.noResultsText).isVisible().catch(() => false);
      if (noResultsVisible) {
        console.log('По вашому запиту нічого не знайдено');
        return false;
      }
      // Якщо ні результати, ні повідомлення не з'являються, повертаємо false
      return false;
    }
  }

  async checkLandBlock() {
    // Очікуємо на завантаження блоку "Земельні ділянки"
    const landBlock = await this.page.waitForSelector(this.landBlock, { timeout: 5000 }).catch(() => null);
    const isVisible = landBlock !== null;
    console.log(`Наявність блоку "Земельні ділянки": ${isVisible}`);
    return isVisible;
  }

  async close() {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
  }
}

module.exports = { EConstructionPage };
