let MAIN_COMPONENT = document.createElement("DIV");
let canvas = document.createElement("CANVAS");
let imageMain = document.createElement("DIV");
let image = document.createElement("IMG");
let base = document.createElement("DIV");
let youWinText = document.createElement("H4");
let couponCodeText = document.createElement("H3");
let couponCode = document.createElement("SPAN");
let copyButton = document.createElement("BUTTON");

function createSTWCSS() {
    var style = document.createElement("style");
    style.id = "RMC-GAME-STYLE";
    style.innerHTML = "@import 'https://fonts.googleapis.com/css?family=Poiret+One';\
    body {\
      font-family: 'Poiret One', sans-serif;\
    }\
    * {\
    padding:0;\
margin: 0;\
box-sizing: border-box;\
}\
body {\
    height: 100vh;\
    background: linear-gradient(135deg, #c3a3f1, #6414e9);\
    overflow: hidden;\
}\
.container {\
    width: 90%;\
    max-width: 500px;\
    height: 100%;\
    max-height: 500px;\
    position: absolute;\
    background-color: #f5f5f5;\
    transform: translate(-50%,-50%);\
    box-shadow: 1px 1px 20px 0px #c1a0f1, -1px -1px 20px 0px #6518e9;\
    top: 50%;\
    left: 50%;\
    border-radius: 0.6em;\
}\
.base, #scratch {\
    height: 100px;\
    width: 100%;\
    position:absolute;\
    bottom: 100px;\
    cursor: grabbing;\
}\
#imageMain {\
    position: absolute;\
    width: 100%;\
    height: 100%;\
}\
#scratchImg {\
    margin: 0 auto;\
    position: relative;\
    display: flex;\
    flex-direction: column;\
    justify-content: center;\
}\
.base {\
    background-color: #ffffff;\
  font-family: 'Poppins', sans-serif;\
  display: flex;\
  flex-direction: column;\
  align-items: center;\
  justify-content: center;\
  box-shadow: 0 1.2em 2.5em rgba(16, 2, 96, 0.15);\
}\
.base h3 {\
    font-weight: 600;\
    font-size: 1.5em;\
    color: #6518e9;\
}\
.base h4 {\
    font-weight: 400;\
    color: #c1a0f1;\
}\
#scratch {\
    -webkit-tap-highliht-color: transparent;\
    -webkit-touch-callout: none;\
    -webkit-user-select: none;\
    user-select: none;\
}\
.rmc-finish-button {\
  background: #6518e9;\
  border-radius: 999px;\
  box-shadow: #6518e9 0 10px 20px -10px;\
  box-sizing: border-box;\
  color: #FFFFFF;\
  cursor: pointer;\
  font-family: Inter,Helvetica,'Apple Color Emoji','Segoe UI Emoji',NotoColorEmoji,'Noto Color Emoji','Segoe UI Symbol','Android Emoji',EmojiSymbols,-apple-system,system-ui,'Segoe UI',Roboto,'Helvetica Neue','Noto Sans',sans-serif;\
  font-size: 16px;\
  font-weight: 700;\
  opacity: 1;\
  outline: 0 solid transparent;\
  padding: 20px;\
  user-select: none;\
  -webkit-user-select: none;\
  touch-action: manipulation;\
  word-break: break-word;\
  border: 0;\
  bottom: 0;\
  width: 100%;\
  max-width: 275px;\
  position: absolute;\
  left: 50%;\
  transform: translate(-50%, -40%);\
  display: none;\
}\
";
    document.head.appendChild(style);
}

let componentsData = {
    mailSubsScreen: {
        id: "rmc-mail-subs-screen",
        title: {
            use: false,
            text: 'İndirim Kazan',
            textColor: 'lightblue',
            fontSize: '19px'
        },
        message: {
            use: false,
            text: 'İndirim Kazanmak için formu doldur ve oyunu oyna.',
            textColor: 'darkblue',
            fontSize: '15px'
        },
        emailPermission: {
            use: false,
            id: 'rmc-email-permission-checkbox',
            text: 'Burası eposta izin metnidir. İncelemek için tıklayın.',
            fontSize: '15px',
            url: 'www.google.com',
        },
        secondPermission: {
            use: false,
            id: 'rmc-second-permission-checkbox',
            text: 'Koşulları kabul ediyorum.',
            fontSize: '15px',
            url: 'www.google.com',
        },
        button: {
            use: true,
            id: 'rmc-mail-subs-button',
            text: 'Kaydet ve Devam Et',
            textColor: 'darkblue',
            buttonColor: 'lightblue',
            fontSize: '15px'
        },
        emailInput: {
            id: 'rmc-email-input',
            placeHolder: 'Email',
            value: '',
        },
        alerts: {
            invalid_email_message: "Please enter a valid E-Mail Address.",
            check_consent_message: "Please confirm you accept the terms of use."
        }
    },
    gameScreen: {
        id: "rmc-game-screen",
        image: "",
        contentTitle: "",
        contentBody: "",
        scratchColor: "#fff"
    },
    finishScreen: {
        id: 'rmc-finish-screen',
        title: {
            use: false,
            text: 'Tebrikler',
            loseText: '',
            textColor: 'lightblue',
            fontSize: '19px'
        },
        message: {
            use: false,
            text: ', İndirim Kazandınız',
            loseText: '',
            textColor: 'darkblue',
            fontSize: '15px'
        },
        couponCode: {
            use: true,
            id: 'rmc-coupon-code',
            code: "1234",
            fontSize: '15px',
            background: '#fff',
            textColor: '#000'
        },
        button: {
            use: true,
            id: 'rmc-finish-button',
            text: 'Kodu Kopyala',
            textColor: 'darkblue',
            buttonColor: 'lightblue',
            fontSize: '15px',
            androidLink: '',
            iOSLink: ''
        }
    }
}

let context = canvas.getContext("2d", {
    willReadFrequently: true
});

function initGame(responseConfig) {
    const res = responseConfig.actiondata;
    const ext = res.ExtendedProps;
    componentsData.gameScreen.image = res.img;
    componentsData.gameScreen.contentTitle = res.content_title;
    componentsData.gameScreen.contentBody = res.content_body;
    componentsData.gameScreen.scratchColor = res.scratch_color;
    componentsData.finishScreen.button.text = res.copybutton_label;
    componentsData.finishScreen.couponCode.code = res.promotion_code;
    createMainComponents();
    createGameElements();
}

function createGameElements() {
    imageMain.id = "imageMain";
    createDescription()
    // image.id = "scratchImg";
    // image.src = componentsData.gameScreen.image;
    // imageMain.appendChild(image);
    base.className = "base";
    youWinText.innerText = componentsData.finishScreen.title.text+ componentsData.finishScreen.message.text;
    // couponCodeText.innerText =;
    couponCode.id = componentsData.finishScreen.couponCode.id;
    couponCode.innerText = componentsData.finishScreen.couponCode.code;
    canvas.id = "scratch";
    canvas.setAttribute("height", 100);
    copyButton.className = componentsData.finishScreen.button.id;
    copyButton.setAttribute("role", "button");
    copyButton.innerText = componentsData.finishScreen.button.text;
    MAIN_COMPONENT.appendChild(imageMain);
    MAIN_COMPONENT.appendChild(base);
    MAIN_COMPONENT.appendChild(canvas);
    MAIN_COMPONENT.appendChild(copyButton);
    base.appendChild(youWinText);
    base.appendChild(couponCodeText);
    couponCodeText.appendChild(couponCode);
    canvas.setAttribute("width", canvas.clientWidth);
    otherElements(canvas.clientWidth, canvas.clientHeight);
    utils.init(componentsData.gameScreen.scratchColor);
}

function createDescription() {
    var container = document.createElement("div")
    // container.style.background = 'red'
    container.style.width = '90%'
    // container.style.height = '100%'
    container.style.display = 'flex'
    container.style.justifyContent = 'center'
    container.style.alignItems = 'center'
    container.style.flexDirection = 'column'
    container.style.position = 'absolute'
    container.style.top = '30%'
    container.style.left = '50%'
    container.style.transform = 'translate(-50%, -50%)'


    var title = document.createElement("div")
    title.style.fontSize = "30px"
    title.style.fontWeight = "bold"
    title.style.textAlign = "center"
    title.style.margin = "15px"
    title.style.color = componentsData.gameScreen.scratchColor[1]
    title.innerText = componentsData.gameScreen.contentTitle

    var description = document.createElement("div")
    description.style.fontSize = "20px"
    description.style.margin = "20px"
    description.style.textAlign = "center"
    description.style.color = componentsData.gameScreen.scratchColor[1]
    description.innerText = componentsData.gameScreen.contentBody

    container.appendChild(title)
    container.appendChild(description)

    imageMain.appendChild(container)
}

function createMainComponents() {
    MAIN_COMPONENT.className = "container"
    document.body.appendChild(MAIN_COMPONENT);
    createSTWCSS();
}

function otherElements(canvasWidth, canvasHeight) {
    let mouseX = 0;
    let mouseY = 0;
    let isDragged = false;
    let events = {
        mouse: {
            down: "mousedown",
            move: "mousemove",
            up: "mouseup",
        },
        touch: {
            down: "touchstart",
            move: "touchmove",
            up: "touchend",
        },
    };
    let deviceType = "";
    const isTouchDevice = () => {
        try {
            document.createEvent("TouchEvent");
            deviceType = "touch";
            return true;
        } catch (e) {
            deviceType = "mouse";
            return false;
        }
    };
    let rectLeft = canvas.getBoundingClientRect().left;
    let rectTop = canvas.getBoundingClientRect().top;
    const getXY = (e) => {
        mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
        mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
    };
    isTouchDevice();
    canvas.addEventListener(events[deviceType].down, (event) => {
        isDragged = true;
        getXY(event);
        scratch(mouseX, mouseY);
        console.log(mouseX + " " + mouseY);
    });
    canvas.addEventListener(events[deviceType].move, (event) => {
        if (!isTouchDevice()) {
            event.preventDefault();
        }
        if (isDragged) {
            getXY(event);
            scratch(mouseX, mouseY);
            console.log("worked move");
        }
    });
    canvas.addEventListener(events[deviceType].up, () => {
        isDragged = false;
        console.log("worked up");
    });
    const scratch = (x, y) => {
        context.globalCompositeOperation = "destination-out";
        context.beginPath();
        context.arc(x, y, (canvasWidth / 100) * 5, 0, 2 * Math.PI);
        context.fill();
        if (((utils.fullAmount(32, canvasWidth, canvasHeight) * 100) | 0) <= 70) {
            copyButton.style.display = "block";
        }
    };
}

function getAndroidLink() {
    if (componentsData.finishScreen.button.androidLink) {
        return componentsData.finishScreen.button.androidLink
    } else {
        return ""
    }
}

function getIOSLink() {
    if (componentsData.finishScreen.button.iOSLink) {
        return componentsData.finishScreen.button.iOSLink
    } else {
        return ""
    }
}

function createMsg(text, danger) {
    const randId = utils.randNum(1, 999999);
    var msg = document.createElement("div");
    msg.id = "vlMsg" + randId;
    msg.innerText = text;
    msg.style.zIndex = "9999999";
    msg.style.padding = "20px 25px";
    msg.style.borderRadius = "15px";
    msg.style.position = "fixed";
    msg.style.verticalAlign = "middle";
    msg.style.textAlign = "center";
    msg.style.top = "-100px";
    msg.style.color = "white";
    msg.style.fontSize = "16px";
    msg.style.background = danger ? "#fb6a78" : "#6414e9";
    msg.style.transform = "translate(-50%, -50%)";
    msg.style.left = "50%";
    msg.style.transition = "all .2s linear 0s";
    document.body.appendChild(msg);
    setTimeout(() => {
        document.querySelector("#vlMsg" + randId).style.top = "25%"
    }, 200);
    setTimeout(() => {
        document.querySelector("#vlMsg" + randId).style.opacity = "0"
    }, 2700);
    setTimeout(() => {
        document.querySelector("#vlMsg" + randId).remove()
    }, 3000);
}

function createCloseButton() {
    var closeButton = document.createElement("BUTTON");
    closeButton.id = "closeButton"
    closeButton.innerHTML = "&#10006;";
    closeButton.style.position = "absolute";
    closeButton.style.right = "0px";
    closeButton.style.top = "0px";
    closeButton.style.border = "0";
    closeButton.style.color = "#6414e9";
    closeButton.style.padding = "5px 10px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "29px";
    closeButton.style.transition = "1s all";
    closeButton.style.borderRadius = "10px"
    closeButton.style.backgroundColor = 'rgba(0,0,0,0)';
    closeButton.style.zIndex = "999";
    closeButton.style.transform = "translate3d(0,0,3px)";
    closeButton.addEventListener("click", function () {
        console.log('Oyun Kapatıldı');
        window.location.href = "/";
    });
    MAIN_COMPONENT.appendChild(closeButton);
}

let utils = {
    randNum: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    fullAmount: function (stride, canvasWidth, canvasHeight) {
        var i, l;
        var count, total;
        var pixels, pdata;
        if (!stride || stride < 1) {
            stride = 1;
        }
        stride *= 10;
        pixels = context.getImageData(0, 0, canvasWidth, canvasHeight);
        pdata = pixels.data;
        l = pdata.length;
        total = (l / stride) | 0;
        for (i = count = 0; i < l; i += stride) {
            if (pdata[i] != 0) {
                count++;
            }
        }
        return count / total;
    },
    init: (color) => {
        console.log(color);
        let gradientColor = context.createLinearGradient(0, 0, 235, 235);
        gradientColor.addColorStop(0, color[0]);
        gradientColor.addColorStop(1, color[1]);
        context.fillStyle = gradientColor;
        context.fillRect(0, 0, canvas.clientWidth, 100);
    },
    copyToClipboard: () => {
        console.log("NATIVE COPYCLIPBORD");
        navigator.clipboard.writeText(componentsData.finishScreen.couponCode.code);
        copyButton.innerText = "Kopyalandı";
        createMsg("Başarılı şekilde kopyalandı", false)
        try {
            if (window.Android) {
                Android.copyToClipboard(componentsData.code.text, getAndroidLink())
            } else if (window.webkit.messageHandlers.eventHandler) {
                window.webkit.messageHandlers.eventHandler.postMessage({
                    method: "copyToClipboard",
                    couponCode: componentsData.finishScreen.couponCode.code,
                    url: getIOSLink()
                })
            }
        } catch (error) { }
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
        location.href = "/"
        if (window.Android) {
            Android.close()
        } else if (window.webkit && window.webkit.messageHandlers) {
            window.webkit.messageHandlers.eventHandler.postMessage({
                method: "close"
            })
        }
    },
};

createCloseButton();


copyButton.addEventListener("click", function () {
    utils.copyToClipboard();
});