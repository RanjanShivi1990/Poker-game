import { test , expect } from '@playwright/test';
import { PokerGamePage } from '../pages/pokerGamePage.js';
import testData from '../testData/testData.json';
const Assertions = require('../utils/assertions');

let pokerGamePage , assertions;
test.beforeEach(async ({ page }) => {
    pokerGamePage = new PokerGamePage(page);
    assertions = new Assertions();
    await pokerGamePage.goto();
  });
test('test_01, Main Bet Options: Validate bet placement on PlayerA and locking Player B main market ', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player A'
      );
    const isLocked = await pokerGamePage.isPlayerBLockedToClick();
    console.log('Is the Player B Market locked to click?', isLocked);
    expect(isLocked).toBe(true);
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.PlayerA
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player A'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'A',
      'High card'
    );
  });

test('test_02, Main Bet Options: Validate bet placement on PlayerB and locking Player A main market', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player B'
      );
    const isLocked = await pokerGamePage.isPlayerALockedToClick();
    console.log('Is the Player A Market locked to click?', isLocked);
    expect(isLocked).toBe(true);
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.PlayerB
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player B'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'B',
      'High card'
    );
  }); 

test('test_03 32, Side bet options: Side Bet for player A (One Pair) and Invalid Bet on Completed Round', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    await pokerGamePage.clickOnSpecificMarket(
      'Player A'
   );
    await pokerGamePage.validatePleaseWaitForNextRoundMessage();
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player A One Pair'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.OnePairA
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player A One Pair'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'A',
      'Pair'
    );
  }); 

test('test_04, Side bet options: Side Bet for player B (One Pair)', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player B One Pair'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.OnePairB
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player B One Pair'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'Player B',
      'Pair'
    );
  }); 
test('test_05, Side bet options: Side Bet for player A (Two Pair)', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player A Two Pair'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.TwoPairA
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player A Two Pair'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'A',
      'Two Pair'
    );
  });

test('test_06, Side bet options: Side Bet for player B (Two Pair)', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player B Two Pair'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.TwoPairB
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player B Two Pair'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'B',
      'Two Pair'
    );
  });

test('test_07, Side bet options: Side Bet for player A (Trio)', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player A Three Of A Kind'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.ThreeOfAKindForA
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player A Three Of A Kind'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'A',
      'Three of a Kind'
    );
  });

test('test_08, Side bet options: Side Bet for player B (Trio)', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player B Three Of A Kind'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.ThreeOfAKindForB
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player B Three Of A Kind'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'B',
      'Three of a Kind'
    );
  });

test('test_09, Side bet options: Side Bet for player A (Straight)', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player A Straight'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.StraightA
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player A Straight'
    );
    /*await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'Player B',
      'Three of a Kind'
    );*/
  });

test('test_10, Side bet options: Side Bet for player B (Straight)', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player B Straight'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.StraightB
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player B Straight'
    );
    /*await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'Player B',
      'Three of a Kind'
    );*/
  });

test('test_11, Side bet options: Side Bet for player A (Flush)', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player A Flush'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.FlushA
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player A Flush'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'A',
      'Flush'
    );
  });

test('test_12, Side bet options: Side Bet for player B (Flush)', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player B Flush'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.FlushB
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player B Flush'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'B',
      'Flush'
    );
  });

  
test('test_13, Side bet options: Side Bet for player A (Full House)', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player A Full House'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.FullHouseA
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player A Full House'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'A',
      'Full House'
    );
  });

test('test_14, Side bet options: Side Bet for player B (Full House)', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player B Full House'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.FullHouseB
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player B Full House'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'B',
      'Full House'
    );
  });

test('test_15, Side bet options: Side Bet for player A(Four of a Kind)', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player A Four Of A Kind'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.FourOfAKindForA
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player A Four Of A Kind'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'A',
      'Four of a Kind'
    );
  });

  test('test_16, Side bet options: Side Bet for player B(Four of a Kind)', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player B Four Of A Kind'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.FourOfAKindForB
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player B Four Of A Kind'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'B',
      'Four of a Kind'
    );
  });

test('test_17, Side bet options: Side Bet for player A(Straight Flush)', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
      'Player A Straight Flush'
    );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.StraightFlushA
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player A Straight FLush'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'A',
      'Straight Flush'
    );
  });

test('test_18 23, Side bet options: Side Bet for player B(Straight Flush) and Placing bet functionality', async ({
    page,
    context,
  }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player B Straight FLush'
      );
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.StraightFlushB
    );
    await pokerGamePage.validatingCongratulationsMessage(pokerGamePage);
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(
      pokerGamePage,
      '100',
      'Player B Straight FLush'
    );
    await pokerGamePage.validatePlayerAndWinningPattern(
      dealerDevPage,
      'Player B',
      'Straight Flush'
    );
  });

test('test_22, Validate Select the Chip functionality', async ({ page , context, }) => {
    pokerGamePage = new PokerGamePage(page);
    await cardCasinoPage.clickNumber(100);
    await cardCasinoPage.clickBetAmount(100);
    await cardCasinoPage.expectTextInBody('100');
    await expect(await cardCasinoPage.chip100).toBeVisible();
    await cardCasinoPage.clickOnSpecificMarket(
      'Player A'
      );
    });

test('test_24, Verify Ability to Place Multiple Bets', async ({
      page,
      context,
    }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(3000);
    await pokerGamePage.clickOnSpecificMarket(
        'Player A'
      );
    await pokerGamePage.clickOnSpecificMarket(
        'Player A One Pair'
      );
    let totalBetAmount = await pokerGamePage.readingBetAmount();
      console.log(totalBetAmount, 'Total Bet Amount');
    await pokerGamePage.waitForTimeout(
        dealerDevPage,
        parseInt(process.env.BET_TIMEOUT),
        'waiting for bet time to complete'
      );
      await pokerGamePage.selectingCardsInLoop(
        dealerDevPage,
        testData.poker2020.marketOptions.OnePairA
      );
    await pokerGamePage.validatingCongratulationsMessage();
    await pokerGamePage.validateTotalBetAmountForMultipleMarkets(
      pokerGamePage,
      '100',
      ['Market For Player A', 'One Pair For Player A']
    );
    });
  
test('test_19 20 21 Verify double Reapt & undo button functionality for bets', async ({
      page,
      context,
    }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(3000);
    await pokerGamePage.clickOnSpecificMarket(
      'Player A'
    );
    await pokerGamePage.waitForTimeout(
      dealerDevPage,
      parseInt(process.env.BET_TIMEOUT),
      'waiting for bet time to complete'
    );
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.PlayerA
    );
    await pokerGamePage.clickNewGame(dealerDevPage);
    await pokerGamePage.clickOnRepeat();
    await pokerGamePage.validateBetAmount(pokerGamePage, '100');
    await expect(await pokerGamePage.playerAMarketChipContainer('100')).toBeVisible();
    await pokerGamePage.clickingOnDoubleButtonInLoop(2);
    await expect(await pokerGamePage.playerAMarketChipContainer('100')).not.toBeVisible();
    await expect(await pokerGamePage.playerAMarketChipContainer('400')).toBeVisible();
    await pokerGamePage.clickOnUndo();
  await expect(await pokerGamePage.playerAMarketChipContainer('400')).not.toBeVisible();
  await expect(await pokerGamePage.playerAMarketChipContainer('200')).toBeVisible();
    }); 
  
test('test_28, Validate total balance : before betting after betting and after winning', async ({
      page,
      context,
      }) => {
    pokerGamePage = new PokerGamePage(page);
    let balanceAmount = await pokerGamePage.readingBalanceAmount();
    console.log(balanceAmount, 'balanceAmountbeforeBet');
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await pokerGamePage.clickOnSpecificMarket(
        'Player A'
      );
    await pokerGamePage.waitForTimeout(
        dealerDevPage,
        parseInt(process.env.BET_TIMEOUT),
        'waiting for bet time to complete'
      );
    let balanceAmountAfterBetting = await pokerGamePage.readingBalanceAmount();
    console.log(balanceAmountAfterBetting, 'balanceAmountAfterBetting');
    await expect(balanceAmount - 100).toBe(parseFloat(balanceAmountAfterBetting));
    await pokerGamePage.selectingCardsInLoop(
      dealerDevPage,
      testData.poker2020.marketOptions.PlayerA
      );
    await pokerGamePage.validatingCongratulationsMessage({ timeout: 10000 });
    await pokerGamePage.validateBetAmountForOneBetMarketAtOnce(pokerGamePage,'100','Player A');
    let winningAmount = 100 * 1.98;
  //TODO: In UI balance value is not correctly updating(https://diamondexch1.atlassian.net/browse/AA-29?atlOrigin=eyJpIjoiY2QwMmNhMDVjYjg4NDhjMmJkODM3OTdjY2U5YzI1NDYiLCJwIjoiaiJ9)
    await page.waitForTimeout(9000);
    let balanceAmountAfterWinning = await pokerGamePage.readingBalanceAmount();
    console.log(balanceAmountAfterWinning, 'balanceAmountAfterWinning');
    console.log(
      parseFloat(balanceAmountAfterBetting) + parseFloat(winningAmount)
      );
    await expect(parseFloat(balanceAmountAfterWinning)).toBe(
      parseFloat(balanceAmountAfterBetting) + parseFloat(winningAmount)
      );
    });

test('test_26, Maximum Bet Limit Exceeded', async ({
    page,
    context,
    }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await pokerGamePage.validateMaximumAllowedBet();
  });

test('test_26, Auto functionality: Validate Number of Rounds field with valid inputs and autoBet functionality', async ({
    page,
    context,
    }) => {
    pokerGamePage = new PokerGamePage(page);
    const dealerDevPagePromise = await context.newPage();
    const dealerDevPage = await dealerDevPagePromise;
    await pokerGamePage.navigateToDelearDevAndLogin(dealerDevPage);
    await pokerGamePage.clickOnDealerPoker2020Game(dealerDevPage);
    await dealerDevPage.reload();
    await pokerGamePage.clickNewGame(dealerDevPage);
    await page.waitForTimeout(5000);
    await pokerGamePage.clickOnSpecificMarket(
      'Player A'
    );
    await pokerGamePage.clickOnAutoBetIcon();
    await pokerGamePage.clickOnNumberOfRounds(5);
    await pokerGamePage.validateAutoBetFunctionality();
    await pokerGamePage.validateAutoPlacingBet(dealerDevPage);
    
    });
