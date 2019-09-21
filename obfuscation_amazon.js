const puppeteer = require('puppeteer');
var i;

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://randomwordgenerator.com/noun.php');
    await page.setViewport({ width: 1440, height: 789 });
    //this is where the 'generate' button selector goes v
    await page.waitFor('#options > table > tbody > tr:nth-child(6) > td > input.btn.btn-primary');
    //now we're gonna click it
    await page.click('#options > table > tbody > tr:nth-child(6) > td > input.btn.btn-primary');
    //navigate to the newly generated word and get the innerHTML
    const randomnoun = await page.$eval('#result', e => e.innerText);
    console.log(randomnoun);


    //--------GO TO AMAZON---------->
    //open a new tab
    const page2 = await browser.newPage();
    //go to amazon.com
    await page2.goto('https://www.amazon.com/');
    await page2.setViewport({ width: 1440, height: 789 });

    //make an array of my opened tabs so I can go back to the first page
    //let pages = await browser.pages();

    //LOGGING INTO AMAZON---------------->
    //Enter your email and password as a string:
    // const email = 'MYEMAIL';
    // const pass = 'MYPASS!';
    // //navigate to the login screen and enter your credentials
    // await page2.waitFor('#nav-signin-tooltip > a > span');
    // await page2.click('#nav-signin-tooltip > a > span');
    // //wait for email input field to load
    // await page2.waitFor('#ap_email');
    // //enter email
    // await page2.type('#ap_email', email);
    // //click continue
    // await page2.click('#continue');
    // //wait for password field to load
    // await page2.waitFor('#ap_password');
    // await page2.type('#ap_password', pass);
    // await page2.click('#signInSubmit');
    //--------------WE HAVE LOGGED IN------------>

    //SEARCH FOR THE RANDOM ITEM ON AMAZON----------->
    //enter
    //navigate to the search bar and click into it
    //the id of the search bar is "#twotabsearchtextbox"
    await page2.waitFor('#twotabsearchtextbox');
    await page2.click('#twotabsearchtextbox');
    //paste the copied word
    await page2.type('#twotabsearchtextbox', randomnoun);
    //search for the thing
    await page2.keyboard.press("Enter");
    //click on a search result once it's loaded:
    await page2.waitFor('#search > div.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-result-list.s-search-results.sg-row > div:nth-child(4) > div > span > div > div > div:nth-child(2) > div:nth-child(3) > div > div > h2 > a')
    await page2.click('#search > div.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-result-list.s-search-results.sg-row > div:nth-child(4) > div > span > div > div > div:nth-child(2) > div:nth-child(3) > div > div > h2 > a');
    //-----------WE HAVE SEARCHED FOR OUR FIRST ITEM---->

    //-----------SEARCHING LOOP STARTS HERE ------------->
    //couldn't figure out how to switch between opened tabs so we're gonna keep making new tabs until we crash
    for (i = 0; i<100; i++){
      //generate new word
      const mypage = await browser.newPage();
      await mypage.goto('https://randomwordgenerator.com/noun.php');
      await mypage.setViewport({ width: 1440, height: 789 });
      await mypage.waitFor('#options > table > tbody > tr:nth-child(6) > td > input.btn.btn-primary');
      await mypage.click('#options > table > tbody > tr:nth-child(6) > td > input.btn.btn-primary');
      const myrandomnoun = await mypage.$eval('#result', e => e.innerText);
      console.log(myrandomnoun);
      //search on Amazon
      const mypage2 = await browser.newPage();
      await mypage2.goto('https://www.amazon.com/');
      await mypage2.setViewport({ width: 1440, height: 789 });
      await mypage2.waitFor('#twotabsearchtextbox');
      await mypage2.click('#twotabsearchtextbox');
      await mypage2.type('#twotabsearchtextbox', myrandomnoun);
      await mypage2.keyboard.press("Enter");
      await mypage2.waitFor('#search > div.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-result-list.s-search-results.sg-row > div:nth-child(4) > div > span > div > div > div:nth-child(2) > div:nth-child(3) > div > div > h2 > a')
      await mypage2.click('#search > div.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-result-list.s-search-results.sg-row > div:nth-child(4) > div > span > div > div > div:nth-child(2) > div:nth-child(3) > div > div > h2 > a');
    }




    //await browser.close();
})();
