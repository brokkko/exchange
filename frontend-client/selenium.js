import {Builder, Browser, By, Key, until} from 'selenium-webdriver';

(async function example() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        // Загрузка страницы.
        driver.get('http://localhost:5174/exchange');
        // Запуск торгов
        driver.findElement(By.className('input-form-field')).sendKeys(100);
        const button = driver.findElement(By.className('trading-button'));
        button.click();
        // Проверка продажи
        await driver.get('http://localhost:5173/login');
        await driver.findElement(By.id('input-0')).sendKeys('Наташа');
        await driver.findElement(By.className('v-btn')).click();
        await driver.wait(until.elementLocated(By.id('date')))
        await driver.wait(until.elementTextIs(driver.findElement(By.id('date')),"11/12/22"), 10000);
        await driver.findElement(By.xpath("//*[text()='AMD']")).click()
        await driver.wait(until.elementLocated(By.xpath("//*[text()='Buy']")),2000)
        await driver.findElement(By.xpath("//*[text()='Buy']")).click()
        await driver.wait(until.elementTextIs(driver.findElement(By.id('funds')),' 195,38 $'),2000)
        await driver.wait(until.elementTextIs(driver.findElement(By.id('date')),"15/12/22"), 40000);
        await driver.findElement(By.xpath("//*[text()='Sell']")).click();
        await driver.findElement(By.tagName('body')).sendKeys(Key.ESCAPE);
        await driver.wait(until.elementTextIs(driver.findElement(By.id('funds')),' 343,38 $'),2000);

    } finally {
        await driver.quit();
    }
})();