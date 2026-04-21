let UPDATE_PRODUCT_INTERVAL, SCORE = 10, DURATION, HEIGHT = window.innerHeight, WIDTH = window.innerWidth, PAIR_COUNTER = 0, LAST_CLICKED_CARD_ID = null, PAIR_COUNT = 0, MAX_PAIR_COUNT = 0, CLICKABLE = true, CLICKABLE_DURATION = 1000, PAIRS = [], AUDIO, TIME_INTERVAL, EMAIL='', REPORT='';

let MAIN_COMPONENT = document.createElement("DIV");

// Page nums
let screens = {
    form: 1,
    rules: 2,
    game: 3,
    finish: 4
};

let activePageData = {
    mailSubsScreen: false,
    rulesScreen: false,
};

/**
 * Defaults 
 * */
let generalData = {
    id: 'rmc-find-to-win',
    bgColor: '',
    bgImg: 'https://picsum.photos/seed/picsum/400/800',
    fontColor: '',
    fontName: 'Helvetica',
    fontFiles: [],
    closeButtonId: 'rmc-close-button',
    closeButton: 'true',
    closeButtonColor: 'black',
    borderRadius: '10px',
    scoreBoardRadius: '5px',
    sound: 'https://bariisarslans.github.io/giftcatchgame/sound.mp3'
};

/**
 * Components defaults
 */
let componentsData = {
    mailSubsScreen: {
        id: "rmc-mail-subs-screen",
        title: { // OPTIONAL
            use: true,
            text: '',
            textColor: '',
            fontSize: ''
        },
        message: { // OPTIONAL
            use: true,
            text: '',
            textColor: '',
            fontSize: ''
        },
        emailPermission: { // OPTIONAL
            use: true,
            id: 'rmc-email-permission-checkbox',
            text: '',
            fontSize: '',
            url: '',
        },
        secondPermission: { // OPTIONAL
            use: true,
            id: 'rmc-second-permission-checkbox',
            text: '',
            fontSize: '',
            url: '',
        },
        button: { // REQUIRED
            use: true,
            id: 'rmc-mail-subs-button',
            text: '',
            textColor: '',
            buttonColor: '',
            fontSize: '',
            goScreen: screens.rules,
        },
        emailInput: {
            id: 'rmc-email-input',
            placeHolder: 'Email',
            value: '',
        },
        alerts: {
            invalid_email_message: '',
            check_consent_message: ''
        }
    },
    rulesScreen: {
        bgImage: '',
        id: 'rmc-rules-screen',
        title: { // OPTIONAL
            use: true,
            text: '',
            textColor: '',
            fontSize: ''
        },
        message: { // OPTIONAL
            use: true,
            text: '',
            textColor: '',
            fontSize: ''
        },
        button: { // REQUIRED
            use: true,
            id: 'rmc-rules-button',
            text: '',
            textColor: 'white',
            buttonColor: '',
            fontSize: '28',
            goScreen: screens.game,
        },
    },
    gameScreen: {
        id: "rmc-game-screen",
        gameArea: "rmc-game-screen-game-area",
        cards: [],
        scoreboard: {
            id: 'rmc-scoreboard',
            fontSize: '20px',
            background: '',
            fontColor: 'white',
            type: 'round', // square | circle | round
            position: 'topLeft', // topLeft | topRight | bottomLeft | bottomRight
            countDown: {
                id: 'rmc-count-down',
            },
            score: {
                id: 'rmc-score'
            }
        }
    },
    finishScreen: {
        id: 'rmc-finish-screen',
        title: { // OPTIONAL
            use: true,
            text: '',
            loseText: '',
            textColor: '',
            fontSize: ''
        },
        message: { // OPTIONAL
            use: true,
            text: '',
            loseText: '',
            textColor: '',
            fontSize: ''
        },
        score: { // OPTIONAL
            use: true,
            id: 'rmc-finish-score',
            text: '',
        },
        lose: {
            id: 'rmc-finish-lose-img',
            src: '',
            buttonLabel: '',
            loseAndroidLink: '',
            loseIOSLink: '',
            loseButtonColor: '#383636',
            loseButtonTextSize: '',
            loseButtonTextColor: ''
        },
        couponCode: { // OPTIONAL
            use: true,
            id: 'rmc-coupon-code',
            fontSize: '',
        },
        button: { // REQUIRED
            use: true,
            id: 'rmc-finish-button',
            text: '',
            textColor: 'white',
            buttonColor: '',
            fontSize: '',
            androidLink: '',
            iOSLink: ''
        }
    }
};

/**
 * Card settings
 */
let cardSettings = {
    cardWidth: 100,
    cardHeight: 100,
    cardMargin: 10,
    cardIdPrefix: 'item',
    duration: 300,
    backfaceImg: 'https://picsum.photos/id/29/300/600',
    backfaceColor: 'green',
    emptyBackfaceImg: '',
    emptyBackfaceColor: 'gray',
    emptyFrontImg: '',
    emptyFrontColor: 'gray',
}

/**
 * Game page settins
*/
let gameSettings = {
    duration: 6,
    gameAreaHeight: window.innerWidth <= 600 ? HEIGHT*.5 : HEIGHT * 0.7,
    gameAreaWidth: window.innerWidth <= 600 ? WIDTH*.9 :  WIDTH * 0.5,
    matchedIconEnable: false,
    gameScreenSecondScoreEnable: false
}

/**
 * Coupons
*/
let couponCodes = {
};

let pair = [];

/**
 * Init
 */
function initFindToWinGame(responseConfig) {
    console.log("INIT ANDROID GAME");
    androidConfigRegulator(responseConfig);
    // iOSConfigRegulator(responseConfig)
    config();
}

function initFindToWinGameIOS(responseConfig) {
    console.log("INIT IOS GAME");
    iOSConfigRegulator(responseConfig)
    config();
    test();
}

test = () => {
    EMAIL = "example@example.com"
    document.querySelector("#" + componentsData.mailSubsScreen.emailInput.id).setAttribute("value", "example@example.com")
    document.querySelector("#" + componentsData.mailSubsScreen.emailPermission.id).setAttribute("checked", "true")
    document.querySelector("#" + componentsData.mailSubsScreen.secondPermission.id).setAttribute("checked", "true")
    // activePageData = {
    //     mailSubsScreen: false,
    //     rulesScreen: false,
    // };
}

function androidConfigRegulator(responseConfig) {
    responseConfig = JSON.parse(responseConfig)
    responseConfig.actiondata.ExtendedProps = JSON.parse(unescape(responseConfig.actiondata.ExtendedProps))

    const res = responseConfig.actiondata;
    const ext = res.ExtendedProps;

    const row = res.game_elements.playground_rowcount;
    const col = res.game_elements.playground_columncount;

    const blankCard = ext.game_elements.blankcard_image ? ext.game_elements.blankcard_image : false
    maxPairCalculator(row, col);
    cardSlotAdjuster(row, col, res.game_elements.card_images, blankCard);
    promoCodeCalculator(res.promo_codes);


    // General data
    gameSettings.duration = res.game_elements.duration_of_game;
    generalData.sound = res.game_elements.sound_url;
    generalData.bgColor = ARGBtoRGBA(ext.background_color);
    generalData.bgImg = ext.background_image;
    generalData.closeButtonColor = ARGBtoRGBA(ext.close_button_color);
    generalData.fontName = ext.font_family;
    cardSettings.backfaceImg = ext.game_elements.backofcards_image;
    cardSettings.backfaceColor = ext.game_elements.backofcards_color;
    cardSettings.emptyBackfaceImg = ext.game_elements.blankcard_image;
    cardSettings.emptyFrontImg = ext.game_elements.blankcard_image;

    utils.loadSound();

    if (ext.font_family == 'custom' && utils.getMobileOperatingSystem() == 'Android') {
        generalData.fontName = ext.custom_font_family_android;
        generalData.fontFiles = responseConfig.fontFiles;
        console.log('font files ', generalData.fontFiles);
        addFonts();
    }

    // Mail Form Optionals
    if (res.mail_subscription) {
        activePageData.mailSubsScreen = true;

        if (res.mail_subscription_form.title) {
            componentsData.mailSubsScreen.title.use = true;
            componentsData.mailSubsScreen.title.text = slashController(res.mail_subscription_form.title);
            componentsData.mailSubsScreen.title.textColor = ARGBtoRGBA(ext.mail_subscription_form.title_text_color);
            componentsData.mailSubsScreen.title.fontSize = fontSizeCalculator(ext.mail_subscription_form.title_text_size) + 'px';
        }

        if (res.mail_subscription_form.message) {
            componentsData.mailSubsScreen.message.use = true;
            componentsData.mailSubsScreen.message.text = slashController(res.mail_subscription_form.message);
            componentsData.mailSubsScreen.message.textColor = ARGBtoRGBA(ext.mail_subscription_form.text_color);
            componentsData.mailSubsScreen.message.fontSize = fontSizeCalculator(ext.mail_subscription_form.text_size) + 'px';
        }

        if (res.mail_subscription_form.emailpermit_text) {
            componentsData.mailSubsScreen.emailPermission.use = true;
            componentsData.mailSubsScreen.emailPermission.text = slashController(res.mail_subscription_form.emailpermit_text);
            componentsData.mailSubsScreen.emailPermission.fontSize = fontSizeCalculator(ext.mail_subscription_form.emailpermit_text_size) + 'px';
            componentsData.mailSubsScreen.emailPermission.url = ext.mail_subscription_form.emailpermit_text_url;
        }

        if (res.mail_subscription_form.consent_text) {
            componentsData.mailSubsScreen.secondPermission.use = true;
            componentsData.mailSubsScreen.secondPermission.text = slashController(res.mail_subscription_form.consent_text);
            componentsData.mailSubsScreen.secondPermission.fontSize = fontSizeCalculator(ext.mail_subscription_form.consent_text_size) + 'px';
            componentsData.mailSubsScreen.secondPermission.url = ext.mail_subscription_form.consent_text_url;
        }
        // Mail Form Required
        componentsData.mailSubsScreen.button.text = slashController(res.mail_subscription_form.button_label);
        componentsData.mailSubsScreen.button.textColor = ARGBtoRGBA(ext.mail_subscription_form.button_text_color);
        componentsData.mailSubsScreen.button.buttonColor = ARGBtoRGBA(ext.mail_subscription_form.button_color);
        componentsData.mailSubsScreen.button.fontSize = fontSizeCalculator(ext.mail_subscription_form.button_text_size) + 'px';
        componentsData.mailSubsScreen.emailInput.placeHolder = res.mail_subscription_form.placeholder;
        componentsData.mailSubsScreen.alerts.check_consent_message = slashController(res.mail_subscription_form.check_consent_message);
        componentsData.mailSubsScreen.alerts.invalid_email_message = slashController(res.mail_subscription_form.invalid_email_message);
    }

    // Rules Screen Optionals
    if (res.gamification_rules && Object.keys(res.gamification_rules).length > 0) {
        activePageData.rulesScreen = true;

        componentsData.rulesScreen.bgImage = res.gamification_rules.background_image
        componentsData.rulesScreen.button.text = slashController(res.gamification_rules.button_label)
        componentsData.rulesScreen.button.textColor = ARGBtoRGBA(ext.gamification_rules.button_text_color);
        componentsData.rulesScreen.button.buttonColor = ARGBtoRGBA(ext.gamification_rules.button_color);
        componentsData.rulesScreen.button.fontSize = fontSizeCalculator(ext.gamification_rules.button_text_size) + 'px';
    }


    // Game Screen
    componentsData.gameScreen.scoreboard.background = ARGBtoRGBA(ext.game_elements.scoreboard_background_color);
    componentsData.gameScreen.scoreboard.type = ext.game_elements.scoreboard_shape;
    componentsData.gameScreen.scoreboard.position = ext.game_elements.scoreboard_pageposition;
    if (componentsData.gameScreen.scoreboard.type == "") componentsData.gameScreen.scoreboard.type = "roundedcorners"


    // Finish Screen
    if (res.game_result_elements.title) {
        componentsData.finishScreen.title.use = true
        componentsData.finishScreen.title.text = slashController(res.game_result_elements.title)
        componentsData.finishScreen.title.fontSize = fontSizeCalculator(ext.game_result_elements.title_text_size) + 'px'
        componentsData.finishScreen.title.textColor = ARGBtoRGBA(ext.game_result_elements.title_text_color)

    }
    if (res.game_result_elements.message) {
        componentsData.finishScreen.message.use = true
        componentsData.finishScreen.message.text = slashController(res.game_result_elements.message)
        componentsData.finishScreen.message.fontSize = fontSizeCalculator(ext.game_result_elements.text_size) + 'px'
        componentsData.finishScreen.message.textColor = ARGBtoRGBA(ext.game_result_elements.text_color)
    }

    componentsData.finishScreen.button.text = slashController(res.copybutton_label);
    componentsData.finishScreen.button.textColor = ARGBtoRGBA(ext.copybutton_text_color);
    componentsData.finishScreen.button.fontSize = fontSizeCalculator(ext.copybutton_text_size) + 'px';
    componentsData.finishScreen.button.buttonColor = ARGBtoRGBA(ext.copybutton_color);
    componentsData.finishScreen.button.androidLink = res.android_lnk;

    componentsData.finishScreen.lose.buttonLabel = slashController(res.game_result_elements.lose_button_label);
    componentsData.finishScreen.lose.loseAndroidLink = res.game_result_elements.lose_android_lnk;
    componentsData.finishScreen.lose.src = res.game_result_elements.lose_image;
    componentsData.finishScreen.lose.loseButtonTextColor = ARGBtoRGBA(ext.game_result_elements.losebutton_text_color);
    componentsData.finishScreen.lose.loseButtonColor = ARGBtoRGBA(ext.game_result_elements.losebutton_color);
    componentsData.finishScreen.lose.loseButtonTextSize = fontSizeCalculator(ext.game_result_elements.losebutton_text_size) + 'px';



    componentsData.finishScreen.couponCode.background = ARGBtoRGBA(ext.promocode_background_color);
    componentsData.finishScreen.couponCode.textColor = ARGBtoRGBA(ext.promocode_text_color);
    componentsData.finishScreen.couponCode.fontSize = fontSizeCalculator(ext.game_result_elements.text_size) + 'px';


    try { REPORT = res.report.click; } 
    catch (error) { console.log("ERROR",res.report); }
}

function iOSConfigRegulator(responseConfig) {
    console.log(responseConfig);

    const res = responseConfig;

    const row = res.gameElements.playgroundRowcount;
    const col = res.gameElements.playgroundColumncount;

    const blankCard = res.gameElementsExtended.blankcardImage ? res.gameElementsExtended.blankcardImage : false
    maxPairCalculator(row, col);
    cardSlotAdjuster(row, col, res.gameElements.cardImages, blankCard);
    promoCodeCalculator(res.promoCodes);

    // General data
    gameSettings.duration = res.gameElements.durationOfGame;
    generalData.sound = res.gameElements.soundUrl;
    generalData.bgColor = ARGBtoRGBA(res.background_color);
    generalData.bgImg = res.backgroundImage;
    generalData.closeButtonColor = ARGBtoRGBA(res.close_button_color);
    generalData.fontName = res.font_family;
    cardSettings.backfaceImg = res.gameElementsExtended.backofcardsImage;
    cardSettings.backfaceColor = res.gameElementsExtended.backofcardsColor;
    cardSettings.emptyBackfaceImg = res.gameElementsExtended.blankcardImage;
    cardSettings.emptyFrontImg = res.gameElementsExtended.blankcardImage;
    utils.loadSound();

    if (res.font_family == 'custom' && utils.getMobileOperatingSystem() == 'iOS') {
        generalData.fontName = res.custom_font_family_ios;
        generalData.fontFiles = responseConfig.fontFiles;
        console.log('font files ', generalData.fontFiles);
        addFonts();
    }

    // // Mail Form Optionals
    if (res.mailSubscription) {
        activePageData.mailSubsScreen = true;

        if (res.mailSubscriptionForm.title) {
            componentsData.mailSubsScreen.title.use = true;
            componentsData.mailSubsScreen.title.text = slashController(res.mailSubscriptionForm.title);
            componentsData.mailSubsScreen.title.textColor = ARGBtoRGBA(res.mailExtendedProps.titleTextColor);
            componentsData.mailSubsScreen.title.fontSize = fontSizeCalculator(res.mailExtendedProps.titleTextSize) + 'px';
        }

        if (res.mailSubscriptionForm.message) {
            componentsData.mailSubsScreen.message.use = true;
            componentsData.mailSubsScreen.message.text = slashController(res.mailSubscriptionForm.message);
            componentsData.mailSubsScreen.message.textColor = ARGBtoRGBA(res.mailExtendedProps.textColor);
            componentsData.mailSubsScreen.message.fontSize = fontSizeCalculator(res.mailExtendedProps.textSize) + 'px';
        }

        if (res.mailSubscriptionForm.emailPermitText) {
            componentsData.mailSubsScreen.emailPermission.use = true;
            componentsData.mailSubsScreen.emailPermission.text = slashController(res.mailSubscriptionForm.emailPermitText);
            componentsData.mailSubsScreen.emailPermission.fontSize = fontSizeCalculator(res.mailExtendedProps.emailPermitTextSize) + 'px';
            componentsData.mailSubsScreen.emailPermission.url = res.mailExtendedProps.emailPermitTextUrl;
        }

        if (res.mailSubscriptionForm.consentText) {
            componentsData.mailSubsScreen.secondPermission.use = true;
            componentsData.mailSubsScreen.secondPermission.text = slashController(res.mailSubscriptionForm.consentText);
            componentsData.mailSubsScreen.secondPermission.fontSize = fontSizeCalculator(res.mailExtendedProps.consentTextSize) + 'px';
            componentsData.mailSubsScreen.secondPermission.url = res.mailExtendedProps.consentTextUrl;
        }

        // // Mail Form Required
        componentsData.mailSubsScreen.button.text = slashController(res.mailSubscriptionForm.buttonTitle);
        componentsData.mailSubsScreen.button.textColor = ARGBtoRGBA(res.mailExtendedProps.buttonTextColor);
        componentsData.mailSubsScreen.button.buttonColor = ARGBtoRGBA(res.mailExtendedProps.buttonColor);
        componentsData.mailSubsScreen.button.fontSize = fontSizeCalculator(res.mailExtendedProps.buttonTextSize) + 'px';
        componentsData.mailSubsScreen.emailInput.placeHolder = res.mailSubscriptionForm.placeholder;
        componentsData.mailSubsScreen.alerts.check_consent_message = slashController(res.mailSubscriptionForm.checkConsentMessage);
        componentsData.mailSubsScreen.alerts.invalid_email_message = slashController(res.mailSubscriptionForm.invalidEmailMessage);
    }

    // // Rules Screen Optionals
    if (res.gamificationRules && Object.keys(res.gamificationRules).length > 0 && res.gamificationRules.buttonLabel) {
        activePageData.rulesScreen = true;

        componentsData.rulesScreen.bgImage = res.gamificationRules.backgroundImage
        componentsData.rulesScreen.button.text = slashController(res.gamificationRules.buttonLabel)
        componentsData.rulesScreen.button.textColor = ARGBtoRGBA(res.gamificationRulesExtended.buttonTextColor);
        componentsData.rulesScreen.button.buttonColor = ARGBtoRGBA(res.gamificationRulesExtended.buttonColor);
        componentsData.rulesScreen.button.fontSize = fontSizeCalculator(res.gamificationRulesExtended.buttonTextSize) + 'px';
    }

    // Game Screen
    componentsData.gameScreen.scoreboard.background = ARGBtoRGBA(res.gameElementsExtended.scoreboardBackgroundColor);
    componentsData.gameScreen.scoreboard.type = res.gameElementsExtended.scoreboardShape;
    componentsData.gameScreen.scoreboard.position = res.gameElementsExtended.scoreboardPageposition;
    if (componentsData.gameScreen.scoreboard.type == "") componentsData.gameScreen.scoreboard.type = "roundedcorners"

    // Finish Screen
    if (res.gameResultElements.title) {
        componentsData.finishScreen.title.use = true
        componentsData.finishScreen.title.text = slashController(res.gameResultElements.title)
        componentsData.finishScreen.title.fontSize = fontSizeCalculator(res.gameResultElementsExtended.titleTextSize) + 'px'
        componentsData.finishScreen.title.textColor = ARGBtoRGBA(res.gameResultElementsExtended.titleTextColor)
    }
    if (res.gameResultElements.message) {
        componentsData.finishScreen.message.use = true
        componentsData.finishScreen.message.text = slashController(res.gameResultElements.message)
        componentsData.finishScreen.message.fontSize = fontSizeCalculator(res.gameResultElementsExtended.textSize) + 'px'
        componentsData.finishScreen.message.textColor = ARGBtoRGBA(res.gameResultElementsExtended.textColor)
    }

    componentsData.finishScreen.button.text = slashController(res.copybutton_label);
    componentsData.finishScreen.button.textColor = ARGBtoRGBA(res.copybutton_text_color);
    componentsData.finishScreen.button.fontSize = fontSizeCalculator(res.copybutton_text_size) + 'px';
    componentsData.finishScreen.button.buttonColor = ARGBtoRGBA(res.copybutton_color);
    componentsData.finishScreen.button.iOSLink = res.ios_lnk;

    componentsData.finishScreen.lose.buttonLabel = slashController(res.gameResultElements.loseButtonLabel);
    componentsData.finishScreen.lose.loseIOSLink = res.gameResultElements.loseIosLnk;
    componentsData.finishScreen.lose.src = res.gameResultElements.loseImage;
    componentsData.finishScreen.lose.loseButtonTextColor = ARGBtoRGBA(res.gameResultElementsExtended.losebuttonTextColor);
    componentsData.finishScreen.lose.loseButtonColor = ARGBtoRGBA(res.gameResultElementsExtended.losebuttonColor);
    componentsData.finishScreen.lose.loseButtonTextSize = fontSizeCalculator(res.gameResultElementsExtended.losebuttonTextSize) + 'px';

    componentsData.finishScreen.couponCode.background = ARGBtoRGBA(res.promocode_background_color);
    componentsData.finishScreen.couponCode.textColor = ARGBtoRGBA(res.promocode_text_color);
    componentsData.finishScreen.couponCode.fontSize = fontSizeCalculator(res.gameResultElementsExtended.textSize) + 'px';

    try { REPORT = res.report.click; } 
    catch (error) { console.log("ERROR",res.report); }
}

/**
 * Start page check
 */
function pageChecker() {
    createMainComponents();
    if (activePageData.mailSubsScreen) {
        createMailSubsScreen()
    }
    else if (!activePageData.mailSubsScreen && activePageData.rulesScreen) {
        createRulesScreen()
    }
    else {
        createGameScreen()
    }
}

/*
 * Main(container) component
 */
function createMainComponents() {
    MAIN_COMPONENT.id = generalData.id;
    MAIN_COMPONENT.style.width = "100%";
    MAIN_COMPONENT.style.height = "100%";
    MAIN_COMPONENT.style.top = "0";
    MAIN_COMPONENT.style.left = "0";
    MAIN_COMPONENT.style.zIndex = "9999";
    MAIN_COMPONENT.style.position = "fixed";
    document.body.appendChild(MAIN_COMPONENT);
    createRMCCSS();
}

createRMCCSS = () => {
    var style = document.createElement("style");
    style.id = "RMC-GAME-STYLE";
    style.innerHTML = "@import 'https://fonts.googleapis.com/css?family=Poiret+One';\
    body {\
      font-family: 'Poiret One', sans-serif;\
    }";
    document.head.appendChild(style);
}

/**
 * Mail subscribe form screen
 */
function createMailSubsScreen() {
    var mailSubsScreen = document.createElement("DIV");
    mailSubsScreen.id = componentsData.mailSubsScreen.id;
    mailSubsScreen.style.width = "100%";
    mailSubsScreen.style.height = "100%";
    mailSubsScreen.style.backgroundColor = generalData.bgColor;
    mailSubsScreen.style.backgroundImage = "url('" + generalData.bgImg + "')";
    mailSubsScreen.style.backgroundRepeat = "no-repeat";
    mailSubsScreen.style.backgroundSize = "cover";
    mailSubsScreen.style.backgroundPosition = "center";
    mailSubsScreen.style.transition = "all 1s";
    mailSubsScreen.style.position = "fixed";
    mailSubsScreen.style.top = "0";
    mailSubsScreen.style.left = "0";
    mailSubsScreen.style.zIndex = "998";

    var container = document.createElement("DIV");
    container.id = "rmc-container";
    container.style.width = window.innerWidth <= 700 ? "80%" : "43%";
    container.style.height = "auto";
    container.style.position = "absolute";
    container.style.transform = "translate(-50%, -50%)";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.textAlign = "center";

    if (componentsData.mailSubsScreen.title.use) {
        var title = document.createElement("DIV");
        title.id = "rmc-mail-subs-title";
        title.style.color = componentsData.mailSubsScreen.title.textColor;
        title.style.fontSize = componentsData.mailSubsScreen.title.fontSize;
        title.style.display = "inline-block";
        title.style.width = "100%";
        title.style.margin = "15px 0";
        title.style.fontFamily = generalData.fontName;
        // title.style.textShadow = "0px 0px 20px "+componentsData.mailSubsScreen.title.textColor;
        title.innerText = componentsData.mailSubsScreen.title.text;
        container.appendChild(title);
    }

    if (componentsData.mailSubsScreen.message.use) {
        var message = document.createElement("DIV");
        message.id = "rmc-mail-subs-message";
        message.style.color = componentsData.mailSubsScreen.message.textColor;
        message.style.fontSize = componentsData.mailSubsScreen.message.fontSize;
        message.style.display = "inline-block";
        message.style.width = "100%";
        message.style.margin = "15px 0";
        message.style.fontFamily = generalData.fontName;
        // message.style.textShadow = "0px 0px 20px "+componentsData.mailSubsScreen.message.textColor;
        message.innerText = componentsData.mailSubsScreen.message.text;
        container.appendChild(message);
    }


    var input = document.createElement("INPUT");
    input.setAttribute("type", "email");
    input.setAttribute("placeholder", componentsData.mailSubsScreen.emailInput.placeHolder);
    input.id = componentsData.mailSubsScreen.emailInput.id;
    input.style.backgroundColor = "white";
    input.style.width = "100%";
    input.style.padding = "9px";
    input.style.border = "1px solid " + componentsData.mailSubsScreen.title.textColor;
    input.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" ////
    input.style.borderRadius = generalData.borderRadius;
    input.style.maxWidth = "-webkit-fill-available";
    input.style.fontSize = "19px";
    input.style.fontWeight = "bold";
    input.style.margin = "15px 0";
    input.style.color = componentsData.mailSubsScreen.title.textColor;
    input.style.marginBottom = "12px";
    input.style.display = "inline-block";
    input.style.fontFamily = generalData.fontName;
    container.appendChild(input);

    var emailAlert = document.createElement("div");
    emailAlert.id = 'emailAlert';
    container.appendChild(emailAlert);



    if (componentsData.mailSubsScreen.emailPermission.use) {
        var emailPermission = createPermitRow(
            componentsData.mailSubsScreen.emailPermission.id,
            componentsData.mailSubsScreen.emailPermission.text,
            componentsData.mailSubsScreen.emailPermission.fontSize,
            generalData.fontName,
            componentsData.mailSubsScreen.emailPermission.url
        )

        container.appendChild(emailPermission);

        var checkboxAlert1 = document.createElement("div");
        checkboxAlert1.id = 'checkboxAlert1';
        container.appendChild(checkboxAlert1);
    }

    if (componentsData.mailSubsScreen.emailPermission.use) {
        var secondPermission = createPermitRow(
            componentsData.mailSubsScreen.secondPermission.id,
            componentsData.mailSubsScreen.secondPermission.text,
            componentsData.mailSubsScreen.emailPermission.fontSize,
            generalData.fontName,
            componentsData.mailSubsScreen.secondPermission.url
        )

        container.appendChild(secondPermission);

        var checkboxAlert2 = document.createElement("div");
        checkboxAlert2.id = 'checkboxAlert2';
        container.appendChild(checkboxAlert2);
    }

    var submit = document.createElement("button");
    submit.id = componentsData.mailSubsScreen.button.id;
    submit.style.backgroundColor = componentsData.mailSubsScreen.button.buttonColor;
    submit.style.color = componentsData.mailSubsScreen.button.textColor;
    submit.style.padding = "15px 30px";
    submit.style.fontSize = componentsData.mailSubsScreen.button.fontSize;
    submit.style.borderRadius = generalData.borderRadius;
    submit.style.border = 0;
    submit.style.position = "absolute";
    submit.style.bottom = "70px";
    submit.style.left = "50%";
    submit.style.width = "fit-content";
    submit.style.transform = "translate(-50%, 0%)";
    submit.style.cursor = "pointer";
    submit.style.fontWeight = "bolder";
    submit.style.fontFamily = generalData.fontName;
    submit.style.boxShadow = "rgb(255 255 255) 0px 0px 20px 9px"
    submit.innerText = componentsData.mailSubsScreen.button.text;

    activePageData.rulesScreen && createRulesScreen();

    submit.addEventListener("click", function () {
        if (emailChecker()) {
            removeAlert("emailAlert")
            if (emailPermitChecker() && secondPermitChecker()) {
                EMAIL = document.querySelector("#" + componentsData.mailSubsScreen.emailInput.id).value.toLowerCase()
                utils.subscribe(EMAIL);
                if (document.querySelector("#" + componentsData.mailSubsScreen.id)) {
                    document.querySelector("#" + componentsData.mailSubsScreen.id).remove();
                    if (!activePageData.rulesScreen) {
                        createGameScreen();
                    }
                }
            } else {
                if (!emailPermitChecker()) {
                    alertChecker(componentsData.mailSubsScreen.alerts.check_consent_message, 'checkboxAlert1')
                }
                else {
                    removeAlert("checkboxAlert1")
                }
                if (!secondPermitChecker()) {
                    alertChecker(componentsData.mailSubsScreen.alerts.check_consent_message, 'checkboxAlert2')
                }
                else {
                    removeAlert("checkboxAlert2")
                }
            }
        } else {
            alertChecker(componentsData.mailSubsScreen.alerts.invalid_email_message, 'emailAlert')
        }
    });

    mailSubsScreen.appendChild(submit);
    mailSubsScreen.appendChild(container);
    MAIN_COMPONENT.appendChild(mailSubsScreen);
}

function createPermitRow(inputId, desc, fontSize, fontName, url) {
    var container = document.createElement("DIV");
    container.style.color = componentsData.mailSubsScreen.title.textColor;
    container.style.fontSize = "13px";
    container.style.margin = "15px 0";
    container.style.width = "100%";
    container.style.display = "flex";
    container.style.alignItems = "center";

    var input = document.createElement("input");
    input.id = inputId;
    input.type = "checkbox";
    input.style.width = "20px";
    input.style.height = "20px";
    input.style.display = "block";
    input.style.marginRight = "15px";
    input.style.float = "left";
    input.style.transform = "scale(1.3)";
    input.style.accentColor = componentsData.mailSubsScreen.title.textColor;

    var text = document.createElement("div");
    text.innerText = desc;
    text.style.fontSize = fontSize;
    text.style.fontFamily = fontName;
    text.style.textDecoration = "underline";
    text.style.color = componentsData.mailSubsScreen.title.textColor;

    text.addEventListener('click', () => {
        utils.linkClicked(url)
        console.log(url, desc);
    })

    container.appendChild(input);
    container.appendChild(text);

    return container;
}

function createAlert(text, id) {
    if (!document.querySelector('#' + id).innerText) {
        var alert = document.createElement("div");
        alert.innerText = text;
        alert.style.width = "100%";
        alert.style.padding = "5px 10px";
        alert.style.zIndex = "999";
        alert.style.textAlign = "left";
        alert.style.color = "#000";
        alert.style.fontSize = "14px";
        alert.style.fontFamily = generalData.fontName;
        alert.style.transform = "translate3d(0,0,3px)";

        document.querySelector('#' + id).appendChild(alert)
    }
    else {

    }
}

function removeAlert(id) {
    if (document.querySelector('#' + id)) {
        document.querySelector('#' + id).innerText = ""
    }
}

function alertChecker(text, id) {
    switch (id) {
        case "checkboxAlert1":
            if (emailPermitChecker()) {
                document.querySelector('#' + id).innerText = ""
            } else {
                createAlert(text, id)
            }
            break;
        case "checkboxAlert2":
            if (secondPermitChecker()) {
                document.querySelector('#' + id).innerText = ""
            } else {
                createAlert(text, id)
            }
            break;
        case "emailAlert":
            if (emailChecker()) {
                document.querySelector('#' + id).innerText = ""
            } else {
                createAlert(text, id)
            }
            break;
        default:
            break;
    }
}

function emailChecker() {
    if (document.querySelector("#" + componentsData.mailSubsScreen.emailInput.id)) {
        var email = document.querySelector("#" + componentsData.mailSubsScreen.emailInput.id).value.toLowerCase();
        var pattern = new RegExp("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}");
        var emailStatus = pattern.test(email);
        if (emailStatus == true) {
            console.log("email checker", true)
            return true
        }
        else {
            console.log("email checker", false)
            return false
        }
    }
    else {
        console.log("email checker", false)
        return false
    }
}

function emailPermitChecker() {
    if (document.querySelector("#" + componentsData.mailSubsScreen.emailPermission.id)) {
        if (document.querySelector("#" + componentsData.mailSubsScreen.emailPermission.id).checked) {
            return true
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}

function secondPermitChecker() {
    if (document.querySelector("#" + componentsData.mailSubsScreen.secondPermission.id)) {
        if (document.querySelector("#" + componentsData.mailSubsScreen.secondPermission.id).checked) {
            return true
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}

/**
 * Close button
 */
function createCloseButton() {
    var closeButton = document.createElement("BUTTON");
    closeButton.id = generalData.closeButtonId;
    closeButton.innerHTML = "&#10006;";
    closeButton.style.position = "absolute";
    closeButton.style.right = "0px";
    closeButton.style.top = "0px";
    closeButton.style.border = "0";
    closeButton.style.color = generalData.closeButtonColor;
    closeButton.style.padding = "5px 10px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "29px";
    closeButton.style.transition = "1s all";
    closeButton.style.borderRadius = generalData.borderRadius;
    closeButton.style.backgroundColor = 'rgba(0,0,0,0)';
    closeButton.style.zIndex = "999";
    closeButton.style.transform = "translate3d(0,0,3px)";
    if (componentsData.gameScreen.scoreboard.position == 'topRight') {
        closeButton.style.left = "0px";
        closeButton.style.right = "auto";
    }

    closeButton.addEventListener("click", function () {
        utils.close();
        document.querySelector("#" + generalData.id) ? document.querySelector("#" + generalData.id).remove() : null;
        document.querySelector("#" + componentsData.mailSubsScreen.id) ? document.querySelector("#" + componentsData.mailSubsScreen.id).remove() : null;
        document.querySelector("#" + componentsData.rulesScreen.id) ? document.querySelector("#" + componentsData.rulesScreen.id).remove() : null;
        document.querySelector("#" + generalData.closeButtonId) ? document.querySelector("#" + generalData.closeButtonId).remove() : null;
        document.documentElement.style.overflow = 'auto';
        utils.pauseSound();
        console.log('Oyun Kapatıldı');
        location.href = "/"
    });

    MAIN_COMPONENT.appendChild(closeButton);
}

/**
 * Rules screen
 */
function createRulesScreen() {
    var rulesScreen = document.createElement("DIV");
    rulesScreen.id = componentsData.rulesScreen.id;
    rulesScreen.style.width = "100%";
    rulesScreen.style.height = "100%";
    rulesScreen.style.position = "fixed";
    rulesScreen.style.transition = "all 1s";
    rulesScreen.style.top = "0";
    rulesScreen.style.left = "0";
    rulesScreen.style.zIndex = "997";

    var rulesIMG = document.createElement("DIV");
    rulesIMG.style.width = "100%";
    rulesIMG.style.height = "100%";
    rulesIMG.style.backgroundImage = "url('" + (componentsData.rulesScreen.bgImage ? componentsData.rulesScreen.bgImage : generalData.bgImg) + "')";
    rulesIMG.style.backgroundRepeat = "no-repeat";
    rulesIMG.style.backgroundSize = "contain";
    rulesIMG.style.backgroundPosition = "center";
    rulesIMG.style.position = "fixed";
    rulesIMG.style.transition = "all 1s";
    rulesIMG.style.top = "0";
    rulesIMG.style.left = "0";
    rulesIMG.style.zIndex = "2";
    rulesIMG.style.transform = " translate3d(0,0,3px)";

    if (componentsData.rulesScreen.bgImage) {
        var rulesScreenBluredBG = document.createElement("DIV");
        rulesScreenBluredBG.style.width = "100%";
        rulesScreenBluredBG.style.height = "100%";
        rulesScreenBluredBG.style.backgroundImage = "url('" + componentsData.rulesScreen.bgImage + "')";
        rulesScreenBluredBG.style.backgroundRepeat = "no-repeat";
        rulesScreenBluredBG.style.backgroundSize = "center";
        rulesScreenBluredBG.style.backgroundPosition = "center";
        rulesScreenBluredBG.style.position = "fixed";
        rulesScreenBluredBG.style.transition = "all 1s";
        rulesScreenBluredBG.style.top = "0";
        rulesScreenBluredBG.style.left = "0";
        rulesScreenBluredBG.style.zIndex = "1";
        rulesScreenBluredBG.style.filter = "blur(35px)";
        rulesScreen.appendChild(rulesScreenBluredBG)
    }


    var submit = document.createElement("div");
    submit.id = componentsData.rulesScreen.button.id;
    submit.style.backgroundColor = componentsData.rulesScreen.button.buttonColor;
    submit.style.color = componentsData.rulesScreen.button.textColor;
    submit.style.padding = "15px 30px";
    submit.style.fontSize = componentsData.rulesScreen.button.fontSize;
    submit.style.borderRadius = generalData.borderRadius;
    submit.style.position = "absolute";
    submit.style.bottom = "70px";
    submit.style.left = "50%";
    submit.style.width = "fit-content";
    submit.style.transform = "translate(-50%, 0%) translate3d(0,0,3px)";
    submit.style.cursor = "pointer";
    submit.style.zIndex = "3";
    submit.style.fontWeight = "bolder";
    submit.style.fontFamily = generalData.fontName;
    submit.innerText = componentsData.rulesScreen.button.text;

    rulesScreen.appendChild(rulesIMG)
    rulesScreen.appendChild(submit);
    MAIN_COMPONENT.appendChild(rulesScreen);


    submit.addEventListener("click", function () {
        document.querySelector("#" + componentsData.rulesScreen.id) ? document.querySelector("#" + componentsData.rulesScreen.id).remove() : null;
        createGameScreen();
    });


}

/**
 * Game area
 */
function createGameScreen() {
    var gameScreen = document.createElement("DIV");
    gameScreen.id = componentsData.gameScreen.id;
    gameScreen.style.width = "100%";
    gameScreen.style.height = "100%";
    gameScreen.style.backgroundColor = generalData.bgColor;
    gameScreen.style.backgroundImage = "url('" + generalData.bgImg + "')";
    gameScreen.style.backgroundRepeat = "no-repeat";
    gameScreen.style.backgroundSize = "cover";
    gameScreen.style.backgroundPosition = "center";
    gameScreen.style.transition = "all 1s";
    gameScreen.style.position = "fixed";
    gameScreen.style.top = "0";
    gameScreen.style.left = "0";
    gameScreen.style.zIndex = "995";

    var gameArea = document.createElement("DIV");
    gameArea.id = componentsData.gameScreen.gameArea;
    gameArea.style.width = gameSettings.gameAreaWidth+"px";
    gameArea.style.height = gameSettings.gameAreaHeight+"px";
    gameArea.style.position = "absolute";
    gameArea.style.transform = "translate(-50%, -50%)";
    gameArea.style.top = "50%";
    gameArea.style.left = "50%";
    gameArea.style.textAlign = "center";
    // gameArea.style.backgroundColor = generalData.bgColor;

    gameScreen.appendChild(gameArea);

    MAIN_COMPONENT.appendChild(gameScreen);
    console.log("oyun başladı");

    setTimeout(() => {
        createScoreBoard();
        startGame();
        utils.sendReport();
    }, 1);
}

function createCard(data, i) {
    if (!data || !data.name) return

    let id = data.name + '-' + i, turn = false;
    var card = document.createElement('div');
    card.id = id;
    card.style.width = cardSettings.cardWidth + 'px';
    card.style.height = cardSettings.cardHeight + 'px';
    card.style.margin = cardSettings.cardMargin + 'px';
    card.style.borderRadius = '10px';
    card.style.zIndex = '99';
    card.style.overflow = 'hidden';
    card.style.display = 'inline-block';
    card.style.position = 'relative';

    let front = document.createElement('div');
    front.style.width = card.style.width;
    front.style.height = card.style.height;
    front.style.overflow = 'hidden';
    front.style.backgroundRepeat = 'no-repeat';
    front.style.backgroundSize = 'contain';
    front.style.backgroundPosition = 'center';
    front.style.backgroundImage = "url('" + data.imgUrl + "')";
    front.style.transformStyle = 'preserve-3d';
    front.style.transition = 'all ' + cardSettings.duration + 'ms cubic-bezier(1, 0.99, 0, -0.02) 0s';
    front.style.position = 'absolute';
    front.style.backfaceVisibility = 'hidden';
    front.style.borderRadius = '10px';
    front.style.transform = 'rotateY(180deg)';


    let back = document.createElement('div');
    back.style.width = card.style.width;
    back.style.height = card.style.height;
    back.style.backgroundRepeat = 'no-repeat';
    back.style.backgroundSize = 'cover';
    back.style.backgroundImage = "url('" + cardSettings.backfaceImg + "')";
    back.style.backgroundColor = cardSettings.backfaceColor;
    back.style.transformStyle = 'preserve-3d';
    back.style.transition = 'all ' + cardSettings.duration + 'ms cubic-bezier(1, 0.99, 0, -0.02) 0s';
    back.style.position = 'absolute';
    back.style.backfaceVisibility = 'hidden';
    back.style.borderRadius = '10px';
    back.style.boxShadow = "5px 2px 20px 0 rgb(46 61 73 / 50%)"


    if (data.empty) {
        front.style.backgroundImage = "url('" + cardSettings.emptyFrontImg + "')";
        front.style.backgroundColor = cardSettings.emptyFrontColor;
    }

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", () => {
        if (CLICKABLE) {
            open(card.id, data)
        }
    })

    return card;
}

function cardSlotAdjuster(row, column, images, blankCard) {
    let result = [];
    // console.log("rowColTotalCountWithMod(row , column)",rowColTotalCountWithMod(row , column));
    images.forEach((url, i) => {
        if (result.length < rowColTotalCountWithMod(row, column)) {
            const cardData = { name: 'card' + (i + 1), imgUrl: url }
            result.push(cardData)
            result.push(cardData)
        }
    });

    // 3. parametre responseConfigden çekilecek 
    if (emptyCardDataAddControl(row, column, blankCard)) {
        result.push({ empty: true, name: 'EMPTY_CARD', imgUrl: blankCard })
    }

    result.sort(() => (Math.random() > .5) ? 1 : -1);


    result = slotCreator(row, column, result)
    console.log(result);

    componentsData.gameScreen.cards = result;
    utils.cardSizeCalculate();
}

function emptyCardDataAddControl(row, column, emptyCardActive) {
    if (!row || !column) return false

    let result = false;
    if (emptyCardActive) {
        result = (row * column) % 2 > 0
    }

    return result
}

function rowColTotalCountWithMod(row, column) {
    if (!row || !column) return 0

    const x = row * column
    const result = x % 2

    return result > 0 ? x - 1 : x
}

function slotCreator(r, c, imgs) {
    let arr = []
    for (let i = 0; i < r; i++) {
        arr.push([])
        for (let j = 0; j < c; j++) {
            arr[i].push(imgs[0])
            imgs.shift();
        }
    }
    return arr
}

function cardSizeCalculator(col) {
    let cardWidth = (window.innerWidth / col) - (cardSettings.cardMargin * 2);
    let cardHeight = cardWidth * 2

    cardSettings.cardWidth = cardWidth
    cardSettings.cardHeight = cardHeight
}

function removeEventListener(id) {
    let card = document.querySelector('#' + id)
    card.outerHTML = card.outerHTML
}

function pairController(id, data) {
    if (LAST_CLICKED_CARD_ID == id) {
        return
    }
    LAST_CLICKED_CARD_ID = id;
    pair.push({
        "name": data.name,
        "id": id
    })
    PAIR_COUNTER++;
    if (PAIR_COUNTER == 2) {
        console.log("pair", pair);
        if (pair[0].name == pair[1].name) {
            setTimeout(() => {
                PAIRS.push(pair);
                removeEventListener(pair[0].id);
                removeEventListener(pair[1].id);
                gameSettings.matchedIconEnable && addPairIcon(pair[0].id)
                gameSettings.matchedIconEnable && addPairIcon(pair[1].id)
                resetPairCheckParams();
                console.log("PPPPPAAAIR", PAIRS);
                PAIR_COUNT++;
                finishChecker();
            }, cardSettings.duration);
        }
        else {
            setTimeout(() => {
                close(pair[0].id);
                close(pair[1].id);
                resetPairCheckParams();
            }, cardSettings.duration);
        }
    }
}

function resetPairCheckParams() {
    LAST_CLICKED_CARD_ID = null;
    PAIR_COUNTER = 0;
    pair = [];
}

function clickableController() {
    CLICKABLE = false
    setTimeout(() => {
        CLICKABLE = true
    }, CLICKABLE_DURATION);
}

function addPairIcon(id) {
    let card = document.querySelector("#" + id)
    var icon = document.createElement("div");
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="green" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>'
    icon.style.backgroundColor = 'white';
    icon.style.position = 'absolute';
    icon.style.color = '#fff';
    icon.style.width = '25px';
    icon.style.height = '25px';
    icon.style.borderRadius = '25px';
    icon.style.bottom = '10px';
    icon.style.right = '10px';
    // card.appendChild(icon)
    card.style.background = "green"
}

function open(cardId, data) {
    // console.log("CLICKED " + cardId + ":", data);
    let card = document.querySelectorAll('#' + cardId + '>div');
    let front = card[0];
    let back = card[1];
    front.style.transform = "rotate3d(0, 1, 0, 0deg)"
    back.style.transform = "rotate3d(0, 1, 0, 180deg)"
    clickableController();
    pairController(cardId, data)
}

function close(cardId) {
    let card = document.querySelectorAll('#' + cardId + '>div');
    let front = card[0];
    let back = card[1];
    front.style.transform = "rotate3d(0, 1, 0, 180deg)"
    back.style.transform = "rotate3d(0, 1, 0, 0deg)"
}

function updateScore(score) {
    document.querySelector('#' + componentsData.gameScreen.scoreboard.score.id).innerHTML = score + ' SANİYE';

}

function startGame() {
    componentsData.gameScreen.cards.forEach((row, i) => {
        row.forEach((card, j) => {
            if (document.querySelector('#' + componentsData.gameScreen.id) && document.querySelector('#' + componentsData.gameScreen.gameArea)) {
                let tmpCard = createCard(card, i + '-' + j)
                tmpCard && document.querySelector('#' + componentsData.gameScreen.gameArea).appendChild(tmpCard);
            }
        });
    });
}

/**
 * Score board
 */
function createScoreBoard() {
    var dashboard = document.createElement("div");
    dashboard.id = componentsData.gameScreen.scoreboard.id;
    dashboard.style.padding = componentsData.gameScreen.scoreboard.type === 'circle' ? '45px 0px' : '45px 0px';
    dashboard.style.position = "fixed";
    dashboard.style.color = "white";
    dashboard.style.textAlign = "center";
    dashboard.style.background = componentsData.gameScreen.scoreboard.background;
    dashboard.style.width = "150px";
    dashboard.style.maxWidth = "150px";
    dashboard.style.margin = "5px";
    dashboard.style.backgroundSize = "contain";
    dashboard.style.fontSize = "24px";
    dashboard.style.transition = "1s all";
    dashboard.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    dashboard = scoreboardPositionChanger(dashboard, componentsData.gameScreen.scoreboard.position);
    componentsData.gameScreen.scoreboard.type !== 'square' && (dashboard.style.borderRadius = componentsData.gameScreen.scoreboard.type == 'circle' ? '50%' : '15px')

    var container = document.createElement("div");
    container.style.position = "absolute";
    container.style.transform = "translate(-50%, -50%)";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.width = "60%";
    container.style.textAlign = "left";

    var _duration = document.createElement("div");
    _duration.innerHTML = gameSettings.duration;
    _duration.id = componentsData.gameScreen.scoreboard.countDown.id;
    _duration.style.fontWeight = "bold";
    _duration.style.marginBottom = "10px";
    _duration.style.transition = "1s all";
    _duration.style.width = "150px";
    _duration.style.maxWidth = "150px";
    _duration.style.color = componentsData.gameScreen.scoreboard.fontColor;
    _duration.style.fontFamily = generalData.fontName;
    _duration.style.fontSize = componentsData.gameScreen.scoreboard.fontSize;

    container.appendChild(_duration);

    dashboard.appendChild(container);
    if (gameSettings.gameScreenSecondScoreEnable) {
        var _score = document.createElement("DIV");
        _score.id = componentsData.gameScreen.scoreboard.score.id;
        _score.innerHTML = SCORE + ' SANİYE';
        _score.style.transition = "1s all";
        _score.style.color = componentsData.gameScreen.scoreboard.fontColor;
        _score.style.fontFamily = generalData.fontName;
        _score.style.fontSize = componentsData.gameScreen.scoreboard.fontSize;

        dashboard.appendChild(_score);
    }
    document.querySelector('#' + componentsData.gameScreen.id).appendChild(dashboard);
    TIME_INTERVAL = utils.startCountDown(document.querySelector('#' + _duration.id), gameSettings.duration);
}

function scoreboardPositionChanger(el, value) {
    switch (value) {
        case 'topLeft':
            el.style.top = '0';
            el.style.left = '0';
            break;
        case 'topRight':
            el.style.top = '0';
            el.style.right = '0';
            break;
        case 'bottomLeft':
            el.style.bottom = '0';
            el.style.left = '0';
            break;
        case 'bottomRight':
            el.style.bottom = '0';
            el.style.right = '0';
            break;
        default:
            el.style.top = '0';
            el.style.left = '0';
            break;
    }
    return el
}

function createFinishScreen(lose) {
    var finishScreen = document.createElement("DIV");
    finishScreen.id = componentsData.finishScreen.id;
    finishScreen.style.width = "100%";
    finishScreen.style.height = "100%";
    finishScreen.style.backgroundColor = generalData.bgColor;
    finishScreen.style.backgroundImage = "url('" + generalData.bgImg + "')";
    finishScreen.style.backgroundRepeat = "no-repeat";
    finishScreen.style.backgroundSize = "cover";
    finishScreen.style.backgroundPosition = "center";
    finishScreen.style.transition = "all 1s";
    finishScreen.style.position = "fixed";
    finishScreen.style.top = "0";
    finishScreen.style.left = "0";
    finishScreen.style.zIndex = "994";

    var container = document.createElement("DIV");
    container.id = "rmc-finish-container";
    container.style.width = "100%";
    container.style.height = "auto";
    container.style.position = "absolute";
    container.style.transform = "translate(-50%, -50%)";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.textAlign = "center";

    if (!lose) {
        if (componentsData.finishScreen.title.use) {
            var title = document.createElement("DIV");
            title.id = "rmc-finish-title";
            title.style.color = componentsData.finishScreen.title.textColor;
            title.style.fontSize = componentsData.finishScreen.title.fontSize;
            title.style.display = "inline-block";
            title.style.margin = "15px 0";
            title.style.width = 'inherit';
            title.style.fontFamily = generalData.fontName;
            title.innerText = utils.winCheck() ? componentsData.finishScreen.title.text+"\n"+SCORE + " SANİYEDE ÇÖZDÜNÜZ" : componentsData.finishScreen.title.loseText;
            container.appendChild(title);
        }
        if (componentsData.finishScreen.message.use) {
            var message = document.createElement("DIV");
            message.id = "rmc-finish-message";
            message.style.color = componentsData.finishScreen.message.textColor;
            message.style.fontSize = componentsData.finishScreen.message.fontSize;
            message.style.display = "inline-block";
            message.style.margin = "15px 0";
            message.style.width = 'inherit';
            message.style.fontFamily = generalData.fontName;
            message.innerText = utils.winCheck() ? componentsData.finishScreen.message.text : componentsData.finishScreen.message.loseText;
            container.appendChild(message);
        }
        var _score = document.createElement("DIV");
        _score.id = 'rmc-finish-finish';
        _score.innerHTML = couponCodes[SCORE];
        _score.style.transition = "1s all";
        _score.style.padding = componentsData.gameScreen.scoreboard.type === 'circle' ? (utils.winCheck() ? '40px 30px' : '70px 20px') : '15px 10px';
        _score.style.width = 'fit-content';
        _score.style.margin = '0 auto';
        _score.style.color = componentsData.gameScreen.scoreboard.fontColor;
        _score.style.fontFamily = generalData.fontName;
        _score.style.fontSize = componentsData.gameScreen.scoreboard.fontSize;
        _score.style.background = componentsData.gameScreen.scoreboard.background;
        componentsData.gameScreen.scoreboard.type !== 'square' && (_score.style.borderRadius = componentsData.gameScreen.scoreboard.type == 'circle' ? '50%' : '15px');
        container.appendChild(_score);

        _score.addEventListener('click', function () {
            utils.copyToClipboard(lose);
            utils.pauseSound();
        });

        confettieParty();
    }
    else {
        // var img = document.createElement("img");
        // img.id = componentsData.finishScreen.lose.id;
        // img.src = componentsData.finishScreen.lose.src
        // img.style.display = "inline-block";
        // img.style.margin = "15px 0";
        // img.style.width = 'inherit';

        let closeButton = document.querySelector("#"+generalData.closeButtonId)
        closeButton.style.transform = "translate(-50%, -50%) translate3d(0px, 0px, 3px) scale(2)";
        closeButton.style.top = "30%";
        closeButton.style.left = "50%";
        closeButton.style.fontFamily = generalData.fontName;
        closeButton.innerText += "\nOyundan Çık";
        // container.appendChild(img);
    }

    var copyButton = document.createElement("div");
    copyButton.id = componentsData.finishScreen.button.id;
    copyButton.style.backgroundColor = lose ? componentsData.finishScreen.lose.loseButtonColor : componentsData.finishScreen.button.buttonColor;
    copyButton.style.color = lose ? componentsData.finishScreen.button.textColor : componentsData.finishScreen.button.textColor;
    copyButton.style.padding = "15px 30px";
    copyButton.style.fontSize = lose ? componentsData.finishScreen.lose.loseButtonTextSize : componentsData.finishScreen.button.fontSize;
    copyButton.style.borderRadius = generalData.borderRadius;
    // copyButton.style.position = "absolute";
    // copyButton.style.bottom = "70px";
    // copyButton.style.left = "50%";
    // copyButton.style.transform = "translate(-50%, 0%) translate3d(0,0,3px)";
    copyButton.style.width = "fit-content";
    copyButton.style.margin = "10px auto";
    copyButton.style.cursor = "pointer";
    copyButton.style.zIndex = "3";
    copyButton.style.fontWeight = "bolder";
    copyButton.style.fontFamily = generalData.fontName;
    copyButton.style.boxShadow = "0px 0px 10px 0px "+(lose ? componentsData.finishScreen.lose.loseButtonColor : componentsData.finishScreen.button.buttonColor)
    copyButton.innerText = lose ? componentsData.finishScreen.lose.buttonLabel : componentsData.finishScreen.button.text;

    container.appendChild(copyButton);

    if (!lose) {utils.saveCodeGotten()}

    copyButton.addEventListener('click', function () {
        utils.copyToClipboard(lose);
        utils.pauseSound();
    });


    copyButton.addEventListener("click", function () {
        if (utils.getMobileOperatingSystem() == 'iOS' && componentsData.finishScreen.button.iOSLink) {
            if (lose) {
                redirection(componentsData.finishScreen.lose.loseIOSLink)
            }
            else {
                redirection(componentsData.finishScreen.button.iOSLink)
            }
        }
    });

    finishScreen.appendChild(container);
    MAIN_COMPONENT.appendChild(finishScreen);
}

function finish(lose) {
    clearInterval(TIME_INTERVAL.timer)
    createFinishScreen(lose);
    document.querySelector('#' + componentsData.gameScreen.id).remove();
}

function maxPairCalculator(row, col) {
    MAX_PAIR_COUNT = Math.floor((row * col) / 2)
    console.log("MAX_PAIR_COUNT", MAX_PAIR_COUNT);
}

function finishChecker() {
    // console.log(PAIR_COUNT,'----',MAX_PAIR_COUNT);
    if (PAIR_COUNT >= MAX_PAIR_COUNT) {
        finish(false);
    }
}

function loseCheck() {
    if (PAIR_COUNT < MAX_PAIR_COUNT) {
        finish(true);
    }
}

function promoCodeCalculator(data) {
    let codes = { 0: "" }, counter = 1;
    data.forEach(range => {
        if (range.rangebottom == range.rangetop) {
            codes[counter] = range.staticcode;
            counter++;
        }
        else {
            for (let index = range.rangebottom; index <= range.rangetop; index++) {
                codes[counter] = range.staticcode;
                counter++;
            }
        }
    });

    couponCodes = codes;
}

function scoreCalculator() {
    let durationEl = document.querySelector('#' + componentsData.gameScreen.scoreboard.countDown.id)
    console.log();
}

function addFonts() {
    if (generalData.fontFiles === undefined) {
        return
    }
    var addedFontFiles = [];
    for (var fontFileIndex in generalData.fontFiles) {
        var fontFile = generalData.fontFiles[fontFileIndex];
        if (addedFontFiles.includes(fontFile)) {
            continue;
        }
        var fontFamily = fontFile.split(".")[0];
        var newStyle = document.createElement('style');
        var cssContent = "@font-face{font-family:" + fontFamily + ";src:url('" + fontFile + "');}";
        newStyle.appendChild(document.createTextNode(cssContent));
        document.head.appendChild(newStyle);
        addedFontFiles.push(fontFile);
    }
};

function ARGBtoRGBA(argb) {
    if (!argb || argb.length < 8) return argb

    if (argb.substr(0, 1) !== '#') return argb.replace(/(..)(......)/, '$2$1')

    return argb.replace(/#(..)(......)/, '#$2$1')
}

function fontSizeCalculator(BEFS) {
    BEFS = parseInt(BEFS)
    switch (BEFS) {
        case 10:
            return 28
            break;
        case 9:
            return 26
            break;
        case 8:
            return 24
            break;
        case 7:
            return 22
            break;
        case 6:
            return 20
            break;
        case 5:
            return 18
            break;
        case 4:
            return 16
            break;
        case 3:
            return 14
            break;
        case 2:
            return 12
            break;
        case 1:
            return 10
            break;
        default:
            return 18
            break;
    }
}

function slashController(text) {
    if (!text) return text

    let pos = text.indexOf('\\n');
    while (pos > -1) {
        text = text.replace("\\n", "\n");
        pos = text.indexOf('\\n');
    }
    return text
}

function redirection(url) {
    location.href = url
}

function getAndroidLink(lose) {
    if (lose) {
        if (componentsData.finishScreen.lose.loseAndroidLink) {
            return componentsData.finishScreen.lose.loseAndroidLink
        }
        else {
            return ""
        }
    } else {
        if (componentsData.finishScreen.button.androidLink) {
            return componentsData.finishScreen.button.androidLink
        } else {
            return ""
        }
    }
}

function getIOSLink(lose) {
    if (lose) {
        if (componentsData.finishScreen.lose.loseIOSLink) {
            return componentsData.finishScreen.lose.loseIOSLink
        }
        else {
            return ""
        }
    } else {
        if (componentsData.finishScreen.button.iOSLink) {
            return componentsData.finishScreen.button.iOSLink
        } else {
            return ""
        }
    }
}

let utils = {
    randNum: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    cardSizeCalculate: () => {
        const rowItemCount = componentsData.gameScreen.cards[0].length;
        const colmItemCount = componentsData.gameScreen.cards.length;
        const w = (gameSettings.gameAreaWidth - (rowItemCount * (cardSettings.cardMargin * 2))) / rowItemCount;
        const h = (gameSettings.gameAreaHeight - (colmItemCount * (cardSettings.cardMargin * 2))) / colmItemCount;

        cardSettings.cardWidth = w;
        cardSettings.cardHeight = h;
        console.log("gameSettings.gameAreaWidth",gameSettings.gameAreaWidth);
        console.log("gameSettings.gameAreaHeight",gameSettings.gameAreaHeight);
        console.log("w",w,"h",h);
    },
    startCountDown: (elem, seconds) => {
        var that = {};

        that.elem = elem;
        that.seconds = seconds;
        that.totalTime = seconds * 100;
        that.usedTime = 0;
        that.startTime = +new Date();
        that.timer = null;

        that.count = function () {
            that.usedTime = Math.floor((+new Date() - that.startTime) / 10);
            var tt = that.totalTime - that.usedTime;
            SCORE = Math.round(that.usedTime / 100)
            // console.log("score",SCORE);
            if (tt <= 0) {
                that.elem.innerHTML = '00:00.00';
                clearInterval(that.timer);
                loseCheck();
            } else {
                var mi = Math.floor(tt / (60 * 100));
                var ss = Math.floor((tt - mi * 60 * 100) / 100);
                var ms = tt - Math.floor(tt / 100) * 100;

                that.elem.innerHTML = that.fillZero(mi) + ":" + that.fillZero(ss) + "." + that.fillZero(ms.toFixed(0));
                gameSettings.gameScreenSecondScoreEnable && updateScore(SCORE)
            }
        };


        if (!that.timer) {
            that.timer = setInterval(that.count, 10);
        }

        that.fillZero = function (num) {
            return num < 10 ? '0' + num : num;
        };

        return that;
    },
    getMobileOperatingSystem: () => {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        if (/iPad|iPhone|iPod|Mac/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        return "unknown";
    },
    getBrowser: () => {
        try {
            // Opera 8.0+
            var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
            if (isOpera) return "Opera"

            // Firefox 1.0+
            var isFirefox = typeof InstallTrigger !== 'undefined';
            if (isFirefox) return "Firefox"

            // Safari 3.0+ "[object HTMLElementConstructor]" 
            var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
            if (!isSafari) isSafari = /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent);

            if (isSafari) return "Safari"

            // Internet Explorer 6-11
            var isIE = /*@cc_on!@*/false || !!document.documentMode;
            if (isIE) return "IE"

            // Edge 20+
            var isEdge = !isIE && !!window.StyleMedia;
            if (isEdge) return "Edge"

            // Chrome 1 - 79
            var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
            if (isChrome) return "Chrome"

            // Edge (based on chromium) detection
            var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
            if (isEdgeChromium) return "EdgeChromium"

            // Blink engine detection
            // var isBlink = (isChrome || isOpera) && !!window.CSS;

            return "unknown"
        } catch (error) {
            console.log("getBrowser error", error);
            return "unknown"
        }
    },
    winCheck: () => {
        return SCORE > 0 ? true : false
    },
    copyToClipboard: (lose) => {
        console.log("NATIVE COPYCLIPBORD");
        if (window.Android) {
            Android.copyToClipboard(lose ? "" : couponCodes[SCORE], getAndroidLink(lose))
        } else if (window.webkit.messageHandlers.eventHandler) {
            window.webkit.messageHandlers.eventHandler.postMessage({
                method: "copyToClipboard",
                couponCode: lose ? "" : couponCodes[SCORE],
                url:getIOSLink(lose)
            })
        }
    },
    sendReport: () => {
        console.log("NATIVE SENDREPORT");
        if (window.Android) {
            Android.sendReport()
        } else if (window.webkit && window.webkit.messageHandlers) {
            window.webkit.messageHandlers.eventHandler.postMessage({
                method: "sendReport"
            })
        }
    },
    close: () => {
        console.log("NATIVE CLOSE");
        if (window.Android) {
            Android.close()
        } else if (window.webkit && window.webkit.messageHandlers) {
            window.webkit.messageHandlers.eventHandler.postMessage({
                method: "close"
            })
        }
    },
    subscribe: (email) => {
        console.log("NATIVE SUBSCRIBE");
        if (!email) return

        if (window.Android) {
            Android.subscribeEmail(email.trim())
        } else if (window.webkit && window.webkit.messageHandlers) {
            window.webkit.messageHandlers.eventHandler.postMessage({
                method: "subscribeEmail",
                email: email.trim()
            })
        }
    },
    saveCodeGotten: () => {
        console.log("NATIVE CODE GOTTEN");
        if (window.Android) {
            Android.saveCodeGotten(couponCodes[SCORE],EMAIL,REPORT)
        } else if (window.webkit && window.webkit.messageHandlers) {
            window.webkit.messageHandlers.eventHandler.postMessage({
                method: "saveCodeGotten",
                code: couponCodes[SCORE],
                email: EMAIL,
                report: REPORT
            })
        }
    },
    linkClicked: (url) => {
        if (window.Android) {
            location.href=url ? url : ""
        } else if (window.webkit && window.webkit.messageHandlers) {
            window.webkit.messageHandlers.eventHandler.postMessage({
                method: "linkClicked",
                url: url ? url : ""
            })
        }
    },
    loadSound: () => {
        // AUDIO = document.createElement("audio")
        // AUDIO.src = generalData.sound;
        // AUDIO.currentTime = 0;
        // AUDIO.setAttribute("playsinline", true);
        // AUDIO.setAttribute("preload", "auto");
        // AUDIO.setAttribute("loop", true);
        // AUDIO.setAttribute("autoplay", true);
        // document.querySelector('head').appendChild(AUDIO);
        // try {
        //     if (utils.getBrowser() == 'Safari') {
        //         let html = document.querySelector('html');
        //         html.addEventListener('touchstart', () => { AUDIO.play(); html.removeEventListener('touchstart', () => { }) })
        //         html.addEventListener('click', () => { AUDIO.play(); html.removeEventListener('click', () => { }) })
        //     }
        //     else {
        //         AUDIO.play();
        //     }
        // } catch (error) {
        //     console.log("loadSound error", error);
        // }
    },
    pauseSound: () => {
        try {
            const audio = document.querySelector("audio")
            if (audio) {
                !audio.paused && audio.pause();
                audio.remove()
            } else {
                console.log("not closed sounnd");
            }
        } catch (error) {
            console.log(error);
        }
    },
};

/**
 * Start configs
 */
function config() {
    document.body.setAttribute('style', '-webkit-user-select:none');
    CLICKABLE_DURATION = cardSettings.duration
    pageChecker();
    createCloseButton();
}



/**
 * Confettie.js
 */


confettieParty = (sec) => {
    startConfetti();
    setTimeout(() => {
        stopConfetti()
    }, sec ? sec : 1000);
}

var maxParticleCount = 150; //set max confetti count
var particleSpeed = 2; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately

(function() {
  startConfetti = startConfettiInner;
  stopConfetti = stopConfettiInner;
  toggleConfetti = toggleConfettiInner;
  removeConfetti = removeConfettiInner;
  var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
  var streamingConfetti = false;
  var animationTimer = null;
  var particles = [];
  var waveAngle = 0;
  
  function resetParticle(particle, width, height) {
    particle.color = colors[(Math.random() * colors.length) | 0];
    particle.x = Math.random() * width;
    particle.y = Math.random() * height - height;
    particle.diameter = Math.random() * 10 + 5;
    particle.tilt = Math.random() * 10 - 10;
    particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    particle.tiltAngle = 0;
    return particle;
  }

  function startConfettiInner() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    window.requestAnimFrame = (function() {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 16.6666667);
        };
    })();
    var canvas = document.getElementById("confetti-canvas");
    if (canvas === null) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("id", "confetti-canvas");
      canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0px");
      MAIN_COMPONENT.appendChild(canvas);
      canvas.width = width;
      canvas.height = height;
      window.addEventListener("resize", function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, true);
    }
    var context = canvas.getContext("2d");
    while (particles.length < maxParticleCount)
      particles.push(resetParticle({}, width, height));
    streamingConfetti = true;
    if (animationTimer === null) {
      (function runAnimation() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (particles.length === 0)
          animationTimer = null;
        else {
          updateParticles();
          drawParticles(context);
          animationTimer = requestAnimFrame(runAnimation);
        }
      })();
    }
  }

  function stopConfettiInner() {
    streamingConfetti = false;
  }

  function removeConfettiInner() {
    stopConfetti();
    particles = [];
  }

  function toggleConfettiInner() {
    if (streamingConfetti)
      stopConfettiInner();
    else
      startConfettiInner();
  }

  function drawParticles(context) {
    var particle;
    var x;
    for (var i = 0; i < particles.length; i++) {
      particle = particles[i];
      context.beginPath();
      context.lineWidth = particle.diameter;
      context.strokeStyle = particle.color;
      x = particle.x + particle.tilt;
      context.moveTo(x + particle.diameter / 2, particle.y);
      context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
      context.stroke();
    }
  }

  function updateParticles() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var particle;
    waveAngle += 0.01;
    for (var i = 0; i < particles.length; i++) {
      particle = particles[i];
      if (!streamingConfetti && particle.y < -15)
        particle.y = height + 100;
      else {
        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.x += Math.sin(waveAngle);
        particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
        particle.tilt = Math.sin(particle.tiltAngle) * 15;
      }
      if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
        if (streamingConfetti && particles.length <= maxParticleCount)
          resetParticle(particle, width, height);
        else {
          particles.splice(i, 1);
          i--;
        }
      }
    }
  }
})();


// Run Game
let responseConfig = {
    // "gamificationRules": {
    //     "backgroundImage": "https:\/\/imgvisilabsnet.azureedge.net\/find_to_win\/uploaded_images\/test\/112_885_490_20221114163254892.jpg",
    //     "buttonLabel": "Oyuna Başlad"
    // },
    "copybutton_text_color": "#fff",
    "mailSubscriptionForm": {
        "placeholder": "E-posta",
        "consentText": "Koşulları kabul ediyorum",
        "title": "Bul Kazana Hoşgeldiniz",
        "message": "Tüm eşleşmeleri tamamla ve indirim kuponlarını kazan",
        "checkConsentMessage": "Lüttfen tüm izinleri işaretleyin",
        "invalidEmailMessage": "Email adresi hatalı",
        "emailPermitText": "Eposta iletişim izni",
        "buttonTitle": "Kaydet",
        "successMessage": "Kayıt başarılı yönlendiriliyorsunuz."
    },
    "ios_lnk": "",
    "title": "Find-To-Win-Test",
    "report": {},
    "promocode_background_color": "#1ec4d2",
    "mailExtendedProps": {
        "buttonTextSize": "10",
        "textSize": "6",
        "buttonTextColor": "#ffffff",
        "titleTextColor": "#e85731",
        "consentTextUrl": "https:\/\/www.example.com",
        "consentTextSize": "5",
        "textColor": "#e85731",
        "emailPermitTextSize": "5",
        "titleFontFamily": "",
        "titleTextSize": "10",
        "emailPermitTextUrl": "https:\/\/www.example.com",
        "buttonColor": "#e85731"
    },
    "gameResultElementsExtended": {
        "titleTextSize": "10",
        "losebuttonTextSize": "10",
        "losebuttonColor": "#383636",
        "textSize": "10",
        "titleTextColor": "#e85731",
        "textColor": "#e85731",
        "losebuttonTextColor": "#e85731"
    },
    "promocode_banner_button_label": "GET",
    "targetingActionType": "findtowin",
    "gamificationRulesExtended": {
        "buttonTextSize": "10",
        "buttonTextColor": "#fffb00",
        "buttonColor": "#000000"
    },
    "background_color": "gray",
    "close_button_color": "#383636",
    "copybutton_label": "Kodu Kopyala",
    "actId": 490,
    "copybutton_text_size": "10",
    "custom_font_family_ios": "'Poiret One', sans-serif",
    "promocode_banner_text_color": "#e85731",
    "backgroundImage": "bg.jpg",
    "auth": "",
    "promoCodes": [
        {
            "rangebottom": 1,
            "rangetop": 5,
            "staticcode": "KOD1000TL"
        },
        {
            "rangebottom": 6,
            "rangetop": 15,
            "staticcode": "KOD25TL"
        },
        {
            "rangebottom": 16,
            "rangetop": 25,
            "staticcode": "KOD15TL"
        },
        {
            "rangebottom": 26,
            "rangetop": 999,
            "staticcode": "KOD10TL"
        }
    ],
    "promocode_text_color": "#e85731",
    "promocode_banner_text": "GET CODE",
    "copybutton_color": "#e85731",
    "copybutton_function": "copy",
    "mailSubscription": true,
    "font_family": "custom",
    "gameElements": {
        "playgroundColumncount": 4,
        "playgroundRowcount": 3,
        "soundUrl": "https:\/\/bariisarslans.github.io\/giftcatchgame\/sound.mp3",
        "durationOfGame":60,
        "cardImages": [
            "apple.png",
            "banana.png",
            "cherries.png",
            "dragon-fruit.png",
            "grapes.png",
            "mango.png",
            "orange.png",
            "watermelon.png"
        ]
    },
    "gameResultElements": {
        "loseImage": "https:\/\/imgvisilabsnet.azureedge.net\/find_to_win\/uploaded_images\/test\/112_885_490_20221018013614608.png",
        "message": "Oyun Tamamlandı.\nKazandığınız indirim kuponunu kopyalayıp\nsiparişinizde kullanabilirsiniz.",
        "title": "Tebrikler",
        "loseButtonLabel": "Kazanamadınız",
        "loseIosLnk": "https:\/\/www.example.com\/en\/"
    },
    "promocode_banner_background_color": "#2e3d49",
    "gameElementsExtended": {
        "scoreboardBackgroundColor": "#e85731",
        "scoreboardShape": "rounded",
        "scoreboardPageposition": "topLeft",
        "backofcardsImage": "",
        "backofcardsColor": "#e85731",
        "blankcardImage": "https:\/\/imgvisilabsnet.azureedge.net\/find_to_win\/uploaded_images\/test\/112_885_490_20221114164359090.jpg"
    }
}
initFindToWinGameIOS(responseConfig);