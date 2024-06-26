const { test } = require('@playwright/test');
const { EConstructionPage } = require('./page-objects/eConstructionPage');
const { searchNumbers } = require('./page-objects/testData');

test.describe('E-Construction Search Test', () => {
  let eConstructionPage;

  test.beforeAll(async () => {
    eConstructionPage = await EConstructionPage.init();
  });

  for (const number of searchNumbers) {
    test(`should find document with number ${number} and check for "Земельні ділянки" block`, async () => {
      // 1. Зайти на сайт
      await eConstructionPage.goto();

      // 2. На головній сторінці в пошук ввести НОМЕР
      await eConstructionPage.searchNumber(number);

      // 3. Перейти на результат пошуку
      const resultFound = await eConstructionPage.clickSearchResult(number);
      if (!resultFound) {
        console.log(`Документ з номером ${number} не знайдено`);
        return;
      }

      // 4. На картці документу перевірити наявність блоку "Земельні ділянки"
      const landBlockExists = await eConstructionPage.checkLandBlock();
      if (!landBlockExists) {
        console.log(`Блок "Земельні ділянки" ВІДСУТНІЙ для документу з номером ${number}`);
      } else {
        console.log(`Блок "Земельні ділянки" ПРИСУТНІЙ для документу з номером ${number}`);
      }
    });
  }

  test.afterAll(async () => {
    await eConstructionPage.close();
  });
});
