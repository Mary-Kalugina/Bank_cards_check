import puppeteer from 'puppeteer';
import {fork} from 'child_process';

jest.setTimeout(30000); 

describe('Card input form', () => {
  let browser;
  let page;
  let server = null;
  const baseUrl = 'http://localhost:9001'

    beforeAll(async () => {
      server = fork(`${__dirname}/e2e.server.js`);
      await new Promise((resolve, reject) => {
        server.on('error', reject);
        server.on('message', (message) => {
          if (message === 'ok') {
            resolve();
          }
        });
      });

      browser = await puppeteer.launch({
        headless: false,
        slowMo: 500,
        devtools: true,
      });
      page = await browser.newPage();
      await page.goto(baseUrl);
      });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('disables the submit button when the input is empty', async () => {
    const submitButton = await page.$('button');
    const isDisabled = await submitButton.evaluate((button) => button.disabled);

    expect(isDisabled).toBe(true);
  });

  test('valid card number is entered: enables the submit button, card is active', async () => {
    const input = await page.$('input');
    await input.type('4929403575830209');

    const submitButton = await page.$('button');
    const isDisabled = await submitButton.evaluate((button) => button.disabled);

    const activeCard = await page.$('.active_card');
    const classNames = await activeCard.evaluate((card) => card.className.split(' '));

    expect(classNames.includes('visa')).toBe(true);
    expect(classNames.includes('active_card')).toBe(true);
    expect(isDisabled).toBe(false);
  });

  test('displays an error message when an invalid card number is entered', async () => {
    const input = await page.$('input');
    await input.type('12345678');

    const errorMessage = await page.$('.error_text');
    const text = await errorMessage.evaluate((error) => error.textContent);
    expect(text).toMatch('Invalid card number!');
  });
});
