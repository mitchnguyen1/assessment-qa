const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:3000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });

  test("clicking on Draw button will display div with id of choices", async ()=>{
    //connect to app
    await driver.get("http://localhost:3000");
    //click on draw button
    await driver.findElement(By.id('draw')).click()
    //wait until the div appears
    //will timeout if not found
    const drawDiv = await driver.wait(until.elementLocated(By.id('choices')),2000)
    //check if drawDiv is not null which means it is found
    //test will fail by timing out due to unable to find element
    expect(drawDiv).not.toBe(null)
  })

  test("Check that clicking an “Add to Duo” button displays the div with id = “player-duo”", async() => {
      //connect to app
      await driver.get("http://localhost:3000");
      //click on draw button
      await driver.findElement(By.id('draw')).click()
      //click on add to duo button
      await driver.findElement(By.className('bot-btn')).click()
      //search for a div with the id of player-duo
      const playerDuo = await driver.wait(until.elementLocated(By.id('player-duo')),2000)
      //compare to see if playerDuo element is found
      //test will fail from timing out due to unable to find element
  
      expect(playerDuo).not.toBe(null)

  })

  test("Check that when a bot is “Removed from Duo”, that it goes back to “choices”", async() => {
    //connect to app
    await driver.get("http://localhost:3000");
    //click on draw button
    await driver.findElement(By.id('draw')).click()

    //find the amount of robots to pick
    //find the choices div
    const list = await driver.findElement(By.id('choices'))
    // Find the number of bot-card divs inside choices
    const robotCount = await list.findElements(By.className('bot-card'))
    //define count as the amount of robots
    let count = robotCount.length;

    //click on add to duo button
    await driver.findElement(By.className('bot-btn')).click()
    //find the robot that's been added to the duo and remove him
    //accessing the children of player duo div
    await driver.findElement(By.css('div#player-duo > div.bot-card > button.bot-btn')).click()

    //find the new amount of robots to pick 
    //find the choices div
    const newList = await driver.findElement(By.id('choices'))
    // Find the number of bot-card divs inside choices
    const newRobotCount = await newList.findElements(By.className('bot-card'))
    //define count as the amount of robots
    let newCount = newRobotCount.length;

    //if the original amount matches to the new amount once we added and click on remove from duo 
    expect(count).toBe(newCount)
})

});
