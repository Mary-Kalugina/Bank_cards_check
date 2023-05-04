const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('Card input form', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: "new"
    });
    page = await browser.newPage();
    await page.goto('http://localhost:8080');
  });

  afterEach(async () => {
    await browser.close();
  });

  it('disables the submit button when the input is empty', async () => {
    const submitButton = await page.$('button');
    const isDisabled = await submitButton.evaluate((button) => button.disabled);

    expect(isDisabled).to.be.true;
  });

  it('enables the submit button when a valid card number is entered', async () => {
    const input = await page.$('input');
    await input.type('4929403575830209');

    const submitButton = await page.$('button');
    const isDisabled = await submitButton.evaluate((button) => button.disabled);

    expect(isDisabled).to.be.false;
  });

  it('displays an error message when an invalid card number is entered', async () => {
    const input = await page.$('input');
    await input.type('12345678');

    const errorMessage = await page.$('.error_text');
    const text = await errorMessage.evaluate((error) => error.textContent);

    expect(text).to.equal('Invalid card number!');
  });

  it('highlights the correct card image when a valid card number is entered', async () => {
    const input = await page.$('input');
    await input.type('4929403575830209');

    const activeCard = await page.$('.active_card');
    const classNames = await activeCard.evaluate((card) => card.className.split(' '));

    expect(classNames.includes('visa')).to.be.true;
    expect(classNames.includes('active_card')).to.be.true;
  });
});
