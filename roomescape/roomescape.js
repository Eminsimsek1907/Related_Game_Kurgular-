
let MAIN_COMPONENT = document.createElement("DIV");
let SCREEN_OPEN = false, LIGHT_OPEN = false, LAPTOP_CLICKABLE = true, BUREAU_OPEN = false, BUREAU_CLICKABLE = true, SAFEBOX_OPEN = false, SAFEBOX_CLICKABLE = true, SAFEBOX_UNLOCK = false, EMAIL = null, PASSWORD = ["", "", "", ""];
let DRILL = false, DRILL_PROGRESS_BAR_SHOW = false, KEY = false, DOOR_OPEN = false, WOOD = false, AUTO_RUN_DRILL = false, DRILL_AUTO_OR_MOVE = "auto", VL_MAIL_FORM_AVAILABLE = false, _VL = null, ASKED = false;
let BAG = {
    electric: 'Elektrik',
    drill: 'Matkap',
    wood: 'Tahta',
    key: 'Anahtar',
}
let COUPON_CODE = "KOD500TL"
const ACTID = "1522"
const WIDTH = window.innerWidth // 1429
const HEIGHT = window.innerHeight // 814

const TEST = false

let config = {
    default: {
        gameAreaWidth: WIDTH,
        gameAreaHeight: HEIGHT,
        components: {
            bag: { width: WIDTH, height: HEIGHT * .1 },
            door: {
                width: WIDTH <= 600 ? WIDTH * .35 : WIDTH * .15,
                height: WIDTH <= 600 ? HEIGHT * .5 : HEIGHT * .6
            },
            safebox: { width: WIDTH * .13, height: WIDTH * .13 },
            board: {
                width: WIDTH <= 600 ? 0 : WIDTH * .3,
                height: WIDTH <= 600 ? 0 : WIDTH * .15
            },
            table: { width: WIDTH * .3, height: HEIGHT * .23, },
            bureau: {
                width: WIDTH <= 600 ? WIDTH * .3 : WIDTH * .12,
                height: WIDTH <= 600 ? WIDTH * .3 : WIDTH * .2
            }
        },
        borderWidth: WIDTH <= 600 ? "1px" : "1px",
        mainComponentId: "RMC-main",
        primaryColor: "#94ac7c",
        secondaryColor: 'white'//"#06181f"
    },
    questions: [
        {
            question: "Türkiye'nin başkenti hangisidir?",
            correctAnswer: "Ankara",
            wrongAnswer: "İstanbul"
        }
    ]
}

test = () => {
    openLight()
    zoomInSafebox()
    document.querySelector("#rmc-roomescape-mailsubs-input").value = "baris.arslan@euromsg.com"
    document.querySelector("#rmc-roomescape-mailsubs-emailpermission").setAttribute("checked",true)
    // keyFound()

    // unlockSafebox()
    // woodFound()
    // openDoor()
}

initGame = () => {
    if (!ACTID) {
        alert("Lütfen bir mail subs form oluşturun ve action id'sini ACTID parametresine atayın.")
        return false
    }
    document.body.setAttribute('style', '-webkit-user-select:none');
    createCSS();
    createMainComponents();
    createCloseButton();
    createDoor();
    createSafeBox();
    createBag();
    createTable();
    createBoard();
    createBureau();
    createLight();
    createOverlay();
    createMailFormScreen();
    createDrillProgressBar();
    laptopClickArrow();
    mailFormRequest();


    setTimeout(() => {
        TEST && test();
    }, 50);
    setTimeout(() => {
        // closeLight()
    }, 3000);
}

createMainComponents = (gameAreaComponentId) => {
    MAIN_COMPONENT.id = config.default.mainComponentId;
    MAIN_COMPONENT.style.width = "100%";
    MAIN_COMPONENT.style.height = ((config.default.gameAreaHeight - config.default.components.bag.height) + 1) + "px";
    MAIN_COMPONENT.style.top = "0";
    MAIN_COMPONENT.style.left = "0";
    MAIN_COMPONENT.style.zIndex = "9999";
    MAIN_COMPONENT.style.position = "fixed";
    MAIN_COMPONENT.style.overflow = "hidden";
    // MAIN_COMPONENT.style.display = "flex";
    // MAIN_COMPONENT.style.alignItems = "baseline";
    // MAIN_COMPONENT.style.justifyContent = "flex-end";
    // MAIN_COMPONENT.style.flexDirection = "column";
    // MAIN_COMPONENT.style.background = "url('./assets/backgrounds/bright.png')";
    MAIN_COMPONENT.style.backgroundRepeat = "no-repeat";
    MAIN_COMPONENT.style.backgroundSize = "cover";
    MAIN_COMPONENT.className = "rmc-body";

    var imgBG = document.createElement("img")
    imgBG.src = "./assets/Yeni/karanlik-bos.png"
    imgBG.style.width = "100%";
    imgBG.style.height = "100%";
    imgBG.style.position = "absolute";
    imgBG.style.zIndex = "0";
    imgBG.style.top = "0";
    imgBG.style.left = "0";
    MAIN_COMPONENT.appendChild(imgBG)

    var imgSpider = document.createElement("img")
    imgSpider.src = "./assets/Yeni/orumcek-agi.png"
    imgSpider.style.width = utils.isMobile() ? "30%" : "15%";
    imgSpider.style.position = "absolute";
    imgSpider.style.zIndex = "0";
    imgSpider.style.top = "0";
    imgSpider.style.right = "0";
    MAIN_COMPONENT.appendChild(imgSpider)

    var imgWallLight = document.createElement("img")
    imgWallLight.id = "rmc-roomescape-wall-light"
    imgWallLight.src = "./assets/Yeni/duvar-isik.png"
    imgWallLight.style.width = utils.isMobile() ? "70%" : "70%";
    imgWallLight.style.height = "80%";
    imgWallLight.style.position = "absolute";
    imgWallLight.style.transform = "translate(-50%, 0%)";
    imgWallLight.style.left = "50%";
    imgWallLight.style.zIndex = "0";
    imgWallLight.style.transition = "1s all";
    imgWallLight.style.opacity = "0";
    imgWallLight.style.bottom = (config.default.components.bag.height + 5) + "px";
    MAIN_COMPONENT.appendChild(imgWallLight)

    var imgFlorLight = document.createElement("img")
    imgFlorLight.id = "rmc-roomescape-flor-light"
    imgFlorLight.src = "./assets/Yeni/yer-isik.png"
    imgFlorLight.style.width = utils.isMobile() ? "70%" : "70%";
    imgFlorLight.style.height = (config.default.components.bag.height / 2) + "px";
    imgFlorLight.style.position = "absolute";
    imgFlorLight.style.transform = "translate(-50%, 0%)";
    imgFlorLight.style.left = "50%";
    imgFlorLight.style.zIndex = "0";
    imgFlorLight.style.transition = "1s all";
    imgFlorLight.style.opacity = "0";
    imgFlorLight.style.bottom = (config.default.components.bag.height / 2) + "px";
    MAIN_COMPONENT.appendChild(imgFlorLight)

    var imgVent = document.createElement("img")
    imgVent.src = "./assets/Yeni/mazgal.png"
    imgVent.style.width = utils.isMobile() ? "20%" : "10%";
    imgVent.style.position = "absolute";
    imgVent.style.right = utils.isMobile() ? "5%" : "10%";
    imgVent.style.top = "15%";
    imgVent.style.zIndex = "0";
    MAIN_COMPONENT.appendChild(imgVent)

    if (gameAreaComponentId) {
        document.querySelector("#" + gameAreaComponentId).appendChild(MAIN_COMPONENT);
    } else {
        document.body.appendChild(MAIN_COMPONENT);
    }
}

createBag = () => {
    var bag = document.createElement("div");
    bag.id = "rmc-roomescape-bag";
    bag.style.width = config.default.components.bag.width + "px";
    bag.style.height = config.default.components.bag.height + "px";
    bag.style.background = "rgb(130 108 100)";
    bag.style.zIndex = "9999999999";
    bag.style.bottom = "0";
    bag.style.left = "0";
    bag.style.display = "flex";
    bag.style.justifyContent = "space-around";
    bag.style.alignItems = "flex-start";
    bag.style.flexDirection = "row";
    bag.style.position = "fixed";

    createBagSlot = (key) => {
        var slot = document.createElement("div");
        slot.id = "rmc-roomescape-slot-" + key;
        slot.style.background = "#c1a692";

        slot.style.borderRadius = "5px";
        slot.style.width = "24%";
        slot.style.height = "100%";
        slot.style.maxWidth = "25%";
        slot.style.position = "relative";
        slot.style.display = "flex";
        slot.style.justifyContent = "center";
        slot.style.alignItems = "center";
        slot.style.transition = "all 2s";

        var item = document.createElement("div");
        item.id = "rmc-roomescape-slot-" + key + "-item";
        item.style.position = "relative";
        item.style.color = config.default.secondaryColor;
        item.style.fontSize = utils.isMobile() ? "15px" : "30px";
        item.innerText = key;

        slot.appendChild(item)

        return slot
    }

    bag.appendChild(createBagSlot(BAG.key));
    bag.appendChild(createBagSlot(BAG.drill));
    bag.appendChild(createBagSlot(BAG.electric));
    bag.appendChild(createBagSlot(BAG.wood));

    document.body.appendChild(bag);
}

createDoor = () => {
    var doorBorder = document.createElement("div");
    doorBorder.id = "rmc-roomescape-doorborder";
    // doorBorder.style.border = config.default.borderWidth + " solid " + config.default.secondaryColor;
    doorBorder.style.position = "absolute"
    doorBorder.style.bottom = (config.default.components.bag.height + 5) + "px"
    doorBorder.style.left = "5%"
    doorBorder.style.borderRadius = "5px 5px 0 0"
    doorBorder.style.width = (config.default.components.door.width + 20) + 'px';
    doorBorder.style.height = (config.default.components.door.height - 5) + 'px';
    // doorBorder.style.background = "url('https://media0.giphy.com/media/3azuwqo4dxVIItkMgy/giphy.gif?cid=790b7611ae41233e9a69401c6e49510e15e1f5b87ad44f2c&rid=giphy.gif&ct=g')"
    doorBorder.style.backgroundSize = "cover"
    doorBorder.style.backgroundRepeat = "no-repeat"
    doorBorder.style.background = "#331c1d"
    doorBorder.style.display = "flex"
    doorBorder.style.alignItems = "flex-end"
    doorBorder.style.justifyContent = "center"

    var borderImg = document.createElement("img")
    borderImg.src = "./assets/door/mentese.png"
    borderImg.style.width = "100%"
    borderImg.style.height = "100%"

    doorBorder.appendChild(borderImg)

    var door = document.createElement("img");
    door.id = "rmc-roomescape-door";
    door.className = "door"
    door.src = "./assets/door/kapi.png"
    door.style.transformOrigin = "left";
    door.style.width = utils.isMobile() ? "80%" : "85%";
    door.style.height = "95%";
    // door.style.background = "url('./assets/door/kapi.png')"
    // door.style.backgroundSize = "cover"
    // door.style.backgroundRepeat = "no-repeat"
    // door.style.opacity = "0"


    createWood = () => {
        const w = 150
        const h = 50
        var wood = document.createElement("div");
        wood.id = "rmc-roomescape-wood";
        wood.style.position = "absolute"
        wood.style.right = "-80px"
        wood.style.top = utils.isMobile() ? "10%" : "30%"
        wood.style.width = w + 'px';
        wood.style.minWidth = '100px';
        wood.style.minHeight = '40px';
        wood.style.height = h + 'px';
        wood.style.zIndex = '99';

        var target = document.createElement("div");
        target.id = "rmc-roomescape-wood-target";
        target.className = "rmc-center"
        target.style.zIndex = "99"
        target.style.background = "radial-gradient(transparent, rgba(0,0,0,0.5))"
        target.style.width = "100px"
        target.style.height = "100px"
        target.style.borderRadius = "100px"
        target.style.opacity = "0"

        wood.appendChild(target)


        let woodImg = createImg("./assets/door/kapi-tahta.png")
        wood.appendChild(woodImg)

        return wood
    }

    createFinishScreen = () => {
        var finish = document.createElement("div");
        finish.style.width = "80%"
        finish.style.height = "50%"
        finish.style.borderRadius = "5px"
        finish.style.border = config.default.borderWidth + " solid " + config.default.secondaryColor;
        finish.style.background = config.default.primaryColor
        finish.style.color = config.default.secondaryColor
        finish.style.position = "absolute"
        finish.style.top = "50%"
        finish.style.left = "50%"
        finish.style.transform = "translate(-50%, -50%)"

        var text = document.createElement("div");
        text.style.textAlign = "center"
        text.style.height = "70%"
        text.innerText = "Kupon kodu kazandınız.\n123456"

        var button = document.createElement("div");
        button.style.textAlign = "center"
        button.style.height = "30%"
        button.innerText = "Kopyala"

        finish.appendChild(text)
        finish.appendChild(button)

        return finish
    }

    doorBorder.appendChild(createWood())
    // doorBorder.appendChild(createFinishScreen())

    doorBorder.appendChild(door)
    MAIN_COMPONENT.appendChild(doorBorder)
}

createKey = () => {
    const size = 70
    var key = document.createElement("div")
    key.id = "rmc-roomescape-key"
    key.style.background = "url('./assets/safebox/anahtar.png')"
    key.style.backgroundRepeat = "no-repeat"
    key.style.backgroundSize = "contain"
    key.style.width = size + "px"
    key.style.height = size + "px"
    key.style.position = "absolute";
    key.style.overflow = "hidden";
    key.style.zIndex = "3";
    key.style.bottom = "0";
    // key.style.backgroundColor = backgroundColor;
    // key.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="' + icon + '" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zm40-176c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40z"/></svg>'

    addListenersKey = () => {
        let isRun = false;
        const doorCords = document.querySelector("#rmc-roomescape-door").getClientRects()[0]
        // key down
        key.addEventListener("mousedown", function (e) {
            if (KEY) {
                isRun = true
                key.style.position = "fixed"
                key.style.left = (e.clientX - (parseFloat(key.style.width) / 2)) + "px";
                key.style.top = (e.clientY - (parseFloat(key.style.height) / 2)) + "px";
                key.style.transform = "scale(1)"
            }
        });

        key.addEventListener("touchstart", function (e) {
            if (KEY) {
                isRun = true
                key.style.position = "fixed"
                key.style.left = (e.touches[0].clientX - (parseFloat(key.style.width) / 2)) + "px";
                key.style.top = (e.touches[0].clientY - (parseFloat(key.style.height) / 2)) + "px";
                key.style.transform = "scale(1)"
            }
        });

        // window move
        window.addEventListener("mousemove", function (e) {
            if (isRun) {
                key.style.left = (e.clientX - (parseFloat(key.style.width) / 2)) + "px";
                key.style.top = (e.clientY - (parseFloat(key.style.height) / 2)) + "px";
                moveKey(doorCords, e.clientX, e.clientY)
            }
        });

        window.addEventListener("touchmove", function (e) {
            if (isRun) {
                key.style.left = (e.touches[0].clientX - (parseFloat(key.style.width) / 2)) + "px";
                key.style.top = (e.touches[0].clientY - (parseFloat(key.style.height) / 2)) + "px";
                moveKey(doorCords, e.touches[0].clientX, e.touches[0].clientY)
            }
        });

        // mouse up, touch end
        window.addEventListener("touchend", function () {
            if (KEY) {
                isRun = false
                keyPositionReset(key)
            }
        });

        window.addEventListener("mouseup", function (e) {
            if (KEY) {
                isRun = false
                keyPositionReset(key)
            }
        });
    }

    addListenersKey()

    return key
}

createSafeBox = () => {
    let left = config.default.components.door.width * 1.6
    let size = config.default.components.safebox.width > 150 ? config.default.components.safebox.width : 150
    if (utils.isMobile()) {
        const doorCords = utils.getRects("#rmc-roomescape-doorborder")
        size = 110
        left = doorCords.x + doorCords.width + 30
    }
    var safebox = document.createElement("div");
    safebox.id = "rmc-roomescape-safebox";
    safebox.style.width = size + "px"
    safebox.style.height = size + "px"
    safebox.style.position = "absolute"
    safebox.style.bottom = "0px"
    safebox.style.left = left + "px"
    safebox.style.zIndex = "9999"
    safebox.style.transition = "all .5s"
    safebox.style.borderRadius = "15px"
    safebox.style.display = "flex"
    safebox.style.justifyContent = "flex-end"
    safebox.style.alignItems = "center"
    safebox.style.flexDirection = "column"

    var img = document.createElement("img")
    img.src = "./assets/safebox/kasa-kapali.png"
    img.id = "rmc-roomescape-safebox-closed";
    img.style.height = "100%";
    // img.style.position = "absolute";
    img.style.zIndex = "4";
    img.style.top = "0";
    img.style.left = "0";
    safebox.appendChild(img)

    safebox.appendChild(createKey())

    safebox.addEventListener('click', () => {
        if (SAFEBOX_CLICKABLE) {
            SAFEBOX_CLICKABLE = false
            if (SAFEBOX_OPEN) {
                zoomOutSafebox()
            } else {
                if (!SAFEBOX_UNLOCK) {
                    zoomInSafebox()
                }
            }
        }
    })

    MAIN_COMPONENT.appendChild(safebox)
}

createSafeboxDoorCloseButton = () => {
    var closeButton = document.createElement("BUTTON");
    closeButton.id = "rmc-roomescape-safebox-close-button";
    closeButton.innerHTML = "&#10006;";
    closeButton.style.position = "absolute";
    closeButton.style.right = "0px";
    closeButton.style.top = "0px";
    closeButton.style.border = "0px solid"
    closeButton.style.color = config.default.secondaryColor;
    // closeButton.style.padding = "5px 10px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "20px";
    closeButton.style.borderRadius = "10px";
    closeButton.style.backgroundColor = config.default.primaryColor;
    closeButton.style.zIndex = "99999990";
    closeButton.style.transform = "translate3d(0,0,3px)";

    closeButton.addEventListener("click", function () {
        zoomOutSafebox();
    });

    return closeButton
}

createBoard = () => {
    if (!utils.isMobile()) {
        const doorCords = utils.getRects("#rmc-roomescape-doorborder")
        let left = (doorCords.x + doorCords.width) + (config.default.components.table.width / 2)
        let top = doorCords.y
        var board = document.createElement("img");
        board.id = "rmc-roomescape-board";
        board.src = "./assets/board/board.png";
        board.style.height = config.default.components.board.height + "px";
        board.style.position = "absolute";
        board.style.top = top + "px";
        board.style.left = left + "px";
        board.style.zIndex = "1";

        MAIN_COMPONENT.appendChild(board)
    }
}

createBureau = () => {
    let left;
    if (utils.isMobile()) {
        const doorCords = utils.getRects("#rmc-roomescape-doorborder")
        left = (doorCords.x + doorCords.width) + 50;
    } else {
        const tableCords = utils.getRects("#rmc-roomescape-table")
        left = (tableCords.x + tableCords.width) + 50
    }
    const w = config.default.components.bureau.width
    var bureau = document.createElement("div");
    bureau.id = "rmc-roomescape-bureau";
    bureau.style.width = w + "px";
    bureau.style.height = config.default.components.bureau.height + "px";
    // bureau.style.border = config.default.borderWidth + " solid red" 
    bureau.style.position = "absolute";
    bureau.style.bottom = (config.default.components.bag.height + 3) + "px";
    bureau.style.left = left + "px";
    // bureau.style.zIndex = "99"; // ışık kapalıyken mobilde tıklanamadığı için kapatıldı
    bureau.style.display = "flex"
    bureau.style.flexDirection = "column"
    bureau.style.justifyContent = "flex-end"


    let bureauTop = document.createElement("img")
    bureauTop.src = "./assets/bureau/dolap-ust.png"
    bureauTop.style.width = "100%"
    bureauTop.style.zIndex = "10"

    let bureauMidContainer = document.createElement("div")
    bureauMidContainer.id = "rmc-roomescape-bureau-mid"
    bureauMidContainer.style.width = "100%"
    bureauMidContainer.style.position = "relative"
    bureauMidContainer.style.display = "flex"
    bureauMidContainer.style.justifyContent = "center"
    bureauMidContainer.style.alignItems = "center"
    bureauMidContainer.style.flexDirection = "column"
    bureauMidContainer.style.transition = ".3s all"
    bureauMidContainer.style.top = "0"
    bureauMidContainer.style.left = "0"
    bureauMidContainer.style.transformOrigin = "top"
    // bureauMidContainer.style.zIndex = "999"

    const bureauMidInsideWidth = (w * .8)
    const bureauMidInsideHeight = (w / 9.8)
    let bureauMidInside = document.createElement("img")
    bureauMidInside.src = "./assets/bureau/dolap-orta-ic.png"
    bureauMidInside.style.width = bureauMidInsideWidth + "px"
    bureauMidInside.style.height = bureauMidInsideHeight + "px"
    bureauMidInside.style.top = -(bureauMidInsideHeight - 1) + "px"
    bureauMidInside.style.left = (w * .15) + "px"
    bureauMidInside.style.position = "absolute"

    let bureauMid = document.createElement("img")
    bureauMid.src = "./assets/bureau/dolap-orta.png"
    bureauMid.style.width = "100%"
    bureauMid.style.zIndex = "12"

    bureauMidContainer.appendChild(bureauMidInside)
    bureauMidContainer.appendChild(createDrill())
    bureauMidContainer.appendChild(bureauMid)

    let bureauBottom = document.createElement("img")
    bureauBottom.src = "./assets/bureau/dolap-alt.png"
    bureauBottom.style.width = "100%"

    if (utils.isMobile()) {
        bureau.appendChild(createLaptop(true))
    }

    bureau.appendChild(bureauTop)
    bureau.appendChild(bureauMidContainer)
    bureau.appendChild(bureauBottom)

    bureauMidContainer.addEventListener("click", () => {
        if (BUREAU_CLICKABLE) {
            BUREAU_CLICKABLE = false
            if (BUREAU_OPEN && DRILL) {
                closeBureau()
            } else {
                openBureau(bureauMidInsideHeight + 4)
            }
            setTimeout(() => {
                BUREAU_CLICKABLE = true
            }, 800);
        }
    })


    MAIN_COMPONENT.appendChild(bureau)
}

createTable = () => {
    if (!utils.isMobile()) {
        const doorCords = utils.getRects("#rmc-roomescape-doorborder")
        var table = document.createElement("div");
        table.id = "rmc-roomescape-table";
        table.style.width = config.default.components.table.width + "px";
        table.style.height = config.default.components.table.height + "px";
        table.style.position = "absolute";
        table.style.left = (doorCords.x + doorCords.width) + (config.default.components.table.width / 2) + "px";
        // table.style.border = "1px solid red";
        table.style.bottom = (config.default.components.bag.height + 3) + "px"
        // table.style.background = "url('./assets/table/table.png')";
        table.style.backgroundSize = "cover"
        table.style.backgroundRepeat = "no-repeat"
        table.style.backgroundPosition = "center"
        // table.style.zIndex = 9

        var img = document.createElement("img")
        img.src = "./assets/table/table.png"
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.position = "absolute";
        img.style.zIndex = "0";
        img.style.bottom = "0";
        img.style.left = "0";
        img.style.objectFit = "fill";
        table.appendChild(img)

        table.appendChild(createLaptop(false))
        MAIN_COMPONENT.appendChild(table)
    }
}

createLaptop = (mobile) => {
    var laptop = document.createElement("div");
    laptop.id = "rmc-roomescape-laptop";
    laptop.style.width = "151px";
    laptop.style.height = "80px";
    laptop.style.position = "absolute";
    laptop.style.display = "flex";
    laptop.style.flexDirection = "column";
    laptop.style.alignItems = "center";
    laptop.style.zIndex = "999999999";
    if (mobile) {
        laptop.style.bottom = ((config.default.components.bureau.height * .9) + 80) + "px";
    } else {
        laptop.style.left = "30%";
        laptop.style.top = "-" + (parseInt(config.default.borderWidth) + 80) + "px";
    }

    var screen = document.createElement("div");
    screen.id = "rmc-roomescape-laptop-screen";
    screen.style.width = "100%";
    screen.style.height = "100%";
    // screen.style.overflow = "hidden";
    screen.style.bottom = "0px"
    screen.style.position = "absolute"
    // screen.style.background = config.default.primaryColor;
    screen.style.borderRadius = "10px 10px 0 0";
    screen.style.transition = "all 1s cubic-bezier(1, -0.16, 0.53, 1) 0s";
    // screen.style.border = config.default.borderWidth + " solid " + config.default.secondaryColor;
    screen.style.background = "url('./assets/table/laptop.png')";
    screen.style.backgroundSize = "contain"
    screen.style.backgroundRepeat = "no-repeat"

    var shadow = document.createElement("div");
    shadow.id = "rmc-roomescape-laptop-shadow";
    shadow.className = "rmc-center"
    shadow.style.width = "50%";
    shadow.style.height = "70%";
    shadow.style.boxShadow = "rgb(255 255 255 / 51%) 0px 0px 70px 20px"
    laptop.appendChild(shadow)

    var battery = document.createElement("div");
    battery.id = "rmc-roomescape-laptop-screen-battery";
    battery.className = "rmc-center";
    battery.style.width = "40%";

    var batteryValue = document.createElement("img");
    batteryValue.id = "rmc-roomescape-laptop-screen-battery-value";
    batteryValue.src = "./assets/battery-empty.png"
    batteryValue.style.width = "100%";
    batteryValue.style.animation = "1s cubic-bezier(1, -0.57, 0, 0.96) 0s infinite normal none running battery"
    batteryValue.style.transition = "all .3s"

    laptop.addEventListener('click', () => {
        if (LAPTOP_CLICKABLE) {
            console.log("laptop");
            LAPTOP_CLICKABLE = false
            zoomInLaptopScreen()
        }

        // setTimeout(() => {
        //     zoomOutLaptopScreen()
        // }, 2000);
    })

    // battery.appendChild(batteryLip)
    battery.appendChild(batteryValue)
    screen.appendChild(battery)
    laptop.appendChild(screen)
    // laptop.appendChild(keyboard)
    return laptop
}

createHackingScreen = () => {
    const qu = config.questions[utils.randNum(0, config.questions.length - 1)]
    var hacking = document.createElement("div");
    hacking.id = "rmc-roomescape-hacking-screen";
    hacking.className = "rmc-center";
    hacking.style.width = "50%"
    hacking.style.height = "50%"
    hacking.style.background = "#94ac7c"
    hacking.style.border = "2px solid white"
    hacking.style.color = "white"
    hacking.style.textAlign = "center"
    hacking.style.borderRadius = "5px"
    hacking.style.position = "relative"
    hacking.style.display = "flex"
    hacking.style.justifyContent = "space-evenly"
    hacking.style.alignItems = "center"
    hacking.style.flexDirection = "column"
    hacking.style.padding = "10px"
    hacking.innerText = "Sistemi hackle ve jeneratörü devreye sok"
    if (utils.isMobile()) {
        hacking.style.fontSize = "15px"
    }else{
        hacking.style.fontSize = "20px"
    }

    var question = document.createElement("div")
    question.style.marginTop = utils.isMobile() ? "0px" : "15px"
    question.innerText = qu.question

    var answers = document.createElement("div")
    answers.style.width = "100%"
    answers.style.height = "25px"
    // answers.style.position = "absolute"
    answers.style.display = "flex"
    answers.style.flexDirection = "row"
    answers.style.justifyContent = "space-around"
    if (utils.isMobile()) {
        answers.style.marginTop = "5px"
    }else{
        answers.style.bottom = "5px"
    }

    var correctAnswer = document.createElement("div")
    correctAnswer.style.borderRadius = "5px"
    correctAnswer.style.height = "100%"
    correctAnswer.style.width = "40%"
    correctAnswer.style.padding = utils.isMobile() ? "0px" : "5px"
    // correctAnswer.style.marginLeft = "5px"
    correctAnswer.style.background = "rgba(0,0,0,.2)"
    // correctAnswer.style.border = "2px solid green"
    correctAnswer.innerText = qu.correctAnswer

    var wrongAnswer = document.createElement("div")
    wrongAnswer.style.borderRadius = "5px"
    wrongAnswer.style.height = "100%"
    // wrongAnswer.style.marginLeft = "5px"
    wrongAnswer.style.width = "40%"
    wrongAnswer.style.padding = utils.isMobile() ? "0px" : "5px"
    // wrongAnswer.style.marginRight = "5px"
    wrongAnswer.style.background = "rgba(0,0,0,.2)"
    // wrongAnswer.style.border = "2px solid green"
    wrongAnswer.innerText = qu.wrongAnswer

    correctAnswer.addEventListener('click', () => {
        zoomOutLaptopScreen()
        if (!LIGHT_OPEN) {
            // createMsg("Doğru cevap, sistem hacklendi. Jenaratör devreye giriyor...", false)
            setTimeout(() => {
                openLight()
            }, 1000);
        } else {
            createMsg("Jenaratör zaten devrede", false)
        }
    })

    wrongAnswer.addEventListener('click', () => {
        zoomOutLaptopScreen()
        if (LIGHT_OPEN) {
            createMsg("Yanlış cevap, bilgisayar hacklendi. Jenaratör devreden çıkıyor...", true)
            setTimeout(() => {
                closeLight()
            }, 1000);
        } else {
            createMsg("Jenaratör çalışmadı tekrar dene", false)
        }
    })

    answers.appendChild(correctAnswer)
    answers.appendChild(wrongAnswer)
    hacking.appendChild(question)
    hacking.appendChild(answers)

    return hacking
}

createLight = () => {
    var light = document.createElement("div");
    light.id = "rmc-roomescape-light";
    light.className = "rmc-center";
    light.style.width = "100px";
    light.style.height = "30px";
    light.style.top = "0px";
    light.style.transform = "translate(-50%, 0%)";
    light.style.display = "flex";
    light.style.flexDirection = "column";
    light.style.alignItems = "center";
    light.style.zIndex = "9999";
    // light.style.overflow="hidden";

    var img = document.createElement("img")
    img.src = "./assets/Yeni/lamba.png"
    img.style.width = "100px";
    // img.style.height = "100%";
    img.style.position = "absolute";
    img.style.zIndex = "2";
    img.style.top = "0";
    img.style.left = "0";
    light.appendChild(img)

    // var rope = document.createElement("div");
    // rope.className = "rmc-center";
    // rope.style.width = "5px";
    // rope.style.height = "50px";
    // rope.style.background = "white";

    var bulb = document.createElement("div");
    bulb.id = "rmc-roomescape-bulb";
    bulb.style.width = "25px";
    bulb.style.height = "25px";
    bulb.style.position = "absolute";
    bulb.style.bottom = "-50px";
    bulb.style.borderRadius = "50px";
    bulb.style.background = "white";
    bulb.style.transition = "1s";
    bulb.style.zIndex = "1";

    // light.appendChild(rope)
    light.appendChild(bulb)
    MAIN_COMPONENT.appendChild(light)
}

createLightning = () => {
    const size = 60
    var lightning = document.createElement("div");
    lightning.id = "rmc-roomescape-lightning";
    lightning.style.width = size + "px";
    lightning.style.height = (size / 2) + "px";
    lightning.style.position = "absolute";
    lightning.style.overflow = "hidden";
    lightning.style.background = "url('./assets/battery-filled.png')";
    lightning.style.backgroundSize = "contain";
    lightning.style.backgroundRepeat = "no-repeat";
    // lightning.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="' + icon + '" d="M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z"/></svg>'

    return lightning
}

createDrill = () => {
    const size = 70
    var drill = document.createElement("div");
    drill.id = "rmc-roomescape-drill";
    drill.style.background = "url('./assets/bureau/drill.png')";
    drill.style.backgroundSize = "contain";
    drill.style.backgroundRepeat = "no-repeat";
    drill.style.backgroundPosition = "center";
    drill.style.width = size + "px";
    drill.style.height = size + "px";
    drill.style.position = "absolute";
    drill.style.zIndex = "11";
    drill.style.top = "0";
    if (utils.isMobile()) {
        drill.style.opacity = "0";
    }

    addListenersDrill = () => {
        let isRun = false;
        const woodCords = document.querySelector("#rmc-roomescape-wood").getClientRects()[0]
        // dril down
        drill.addEventListener("mousedown", function (e) {
            if (DRILL) {
                console.log("222");
                isRun = true
                drill.style.position = "fixed"
                drill.style.left = (e.clientX - (parseFloat(drill.style.width) / 2)) + "px";
                drill.style.top = (e.clientY - (parseFloat(drill.style.height) / 2)) + "px";
                drill.style.transform = "scale(1)"
            }
        });

        drill.addEventListener("touchstart", function (e) {
            if (DRILL) {
                isRun = true
                drill.style.position = "fixed"
                drill.style.left = (e.touches[0].clientX - (parseFloat(drill.style.width) / 2)) + "px";
                drill.style.top = (e.touches[0].clientY - (parseFloat(drill.style.height) / 2)) + "px";
                drill.style.transform = "scale(1)"
            }
        });

        // window move
        window.addEventListener("mousemove", function (e) {
            if (isRun) {
                drill.style.left = (e.clientX - (parseFloat(drill.style.width) / 2)) + "px";
                drill.style.top = (e.clientY - (parseFloat(drill.style.height) / 2)) + "px";
                runDrill(woodCords, e.clientX, e.clientY)
            }
        });

        window.addEventListener("touchmove", function (e) {
            if (isRun) {
                drill.style.left = (e.touches[0].clientX - (parseFloat(drill.style.width) / 2)) + "px";
                drill.style.top = (e.touches[0].clientY - (parseFloat(drill.style.height) / 2)) + "px";
                runDrill(woodCords, e.touches[0].clientX, e.touches[0].clientY)
            }
        });

        // mouse up, touch end
        window.addEventListener("touchend", function () {
            if (DRILL) {
                isRun = false
                drillPositionReset(drill)
                if (DRILL_AUTO_OR_MOVE == "move") {
                    hideDrilProgressBar()
                }
            }
        });

        window.addEventListener("mouseup", function (e) {
            if (DRILL) {
                isRun = false
                drillPositionReset(drill)
                if (DRILL_AUTO_OR_MOVE == "move") {
                    hideDrilProgressBar()
                }
            }
        });
    }

    addListenersDrill()

    return drill
}

createDrillProgressBar = () => {
    const doorCords = utils.getRects("#rmc-roomescape-doorborder")
    var container = document.createElement("div");
    container.id = "rmc-roomescape-drilprogressbar";
    container.style.width = utils.isMobile() ? "70%" : "40%";
    container.style.height = "30px";
    container.style.position = "fixed";
    container.style.top = (doorCords.y - 50) + "px";
    container.style.left = (doorCords.x) + "px";
    container.style.borderRadius = "50px";
    container.style.opacity = "0";
    container.style.border = "3px solid brown"
    container.style.background = "white";
    container.style.zIndex = "-5555";

    var item = document.createElement("div");
    item.id = "rmc-roomescape-drilprogressbar-value";
    item.style.width = "0%";
    item.style.height = "100%";
    item.style.background = "#94ac7c";
    item.style.borderRadius = "50px";

    container.appendChild(item)
    MAIN_COMPONENT.appendChild(container)
}

createOverlay = () => {
    var overlay = document.createElement("div");
    overlay.id = "rmc-roomescape-overlay";
    overlay.style.width = config.default.gameAreaWidth + "px";
    overlay.style.height = config.default.gameAreaHeight + "px";
    overlay.style.bottom = "0px";
    overlay.style.left = "0px";
    overlay.style.zIndex = "99999";
    overlay.style.position = "absolute";
    overlay.style.transition = "all 1s cubic-bezier(1, -0.16, 0.53, 1) 0s";
    overlay.style.background = "rgba(0,0,0,.5)";

    overlay.addEventListener("click", () => {
        zoomOutLaptopScreen()
    })

    MAIN_COMPONENT.appendChild(overlay)
}

createArrow = (top, left, zIndex, directionRight) => {
    directionRight = directionRight ? directionRight : false
    let oldArrow = document.querySelector("#rmc-roomescape-arrow")
    if (oldArrow) {
        console.log("old", top, left);
        oldArrow.style.top = top + "px";
        oldArrow.style.left = left + "px";
        oldArrow.style.zIndex = zIndex;
        oldArrow.style.transform = directionRight ? "rotateY(180deg)" : "rotateY(0deg)"
    } else {
        console.log("new", top, left);
        var arrow = document.createElement("div");
        arrow.id = "rmc-roomescape-arrow";
        arrow.style.background = "url('./assets/ok.png')";
        arrow.style.backgroundSize = "contain";
        arrow.style.backgroundRepeat = "no-repeat";
        arrow.style.backgroundPosition = "center";
        arrow.style.width = "100px";
        arrow.style.height = "50px";
        arrow.style.top = top + "px";
        arrow.style.left = left + "px";
        arrow.style.zIndex = "99999999";
        arrow.style.position = "fixed";
        arrow.style.transition = "all 1s";
        arrow.style.animation = "1s cubic-bezier(1, 1, 0, 0) 0s infinite normal none running arrow";
        arrow.style.transform = directionRight ? "rotateY(180deg)" : "rotateY(0deg)";
        arrow.style.zIndex = zIndex;
        MAIN_COMPONENT.appendChild(arrow);
    }
}

createNavigationBox = (top, left, text) => {
    if (utils.isMobile()) {
        top = 100;
        left = 0;
    }
    let oldBox = document.querySelector("#rmc-roomescape-navigation-box")
    if (oldBox) {
        console.log("old", top, left);
        oldBox.style.top = top + "px";
        oldBox.style.left = left + "px";
        oldBox.innerText = text;
    } else {
        console.log("new", top, left);
        var box = document.createElement("div");
        box.id = "rmc-roomescape-navigation-box";
        box.style.background = "#94ac7c";
        box.style.border = "3px solid white";
        box.style.borderRadius = "5px";
        box.style.padding = "25px";
        box.style.color = "white";
        box.style.top = top + "px";
        box.style.left = left + "px";
        box.style.zIndex = "99999";
        box.style.position = "fixed";
        box.style.transition = "all 1s";
        box.innerText = text;
        MAIN_COMPONENT.appendChild(box);
    }
}

createMsg = (text, danger) => {
    const randId = utils.randNum(1, 999999);
    var msg = document.createElement("div");
    msg.id = "vlMsg" + randId;
    msg.innerText = text;
    msg.style.zIndex = "1";
    msg.style.padding = "20px 25px";
    msg.style.borderRadius = "15px";
    msg.style.position = "absolute";
    msg.style.verticalAlign = "middle";
    msg.style.textAlign = "center";
    msg.style.fontFamily = "'Rubik One', sans-serif";
    // msg.style.opacity = "0";
    msg.style.color = config.default.secondaryColor;
    msg.style.background = danger ? "#fb6a78" : "#94ac7c";
    msg.style.transform = "translate(-50%, -50%)";
    msg.style.top = "-100px";
    msg.style.left = "50%";
    msg.style.zIndex = "99999999999999";
    msg.style.fontSize = "15px";
    msg.style.transition = "all .1s linear 0s";
    MAIN_COMPONENT.appendChild(msg);

    setTimeout(() => {
        document.querySelector("#vlMsg" + randId).style.top = "10%"
    }, 200);
    setTimeout(() => {
        document.querySelector("#vlMsg" + randId).style.opacity = "0"
    }, 2700);
    setTimeout(() => {
        document.querySelector("#vlMsg" + randId).remove()
    }, 3000);
}

createImg = (src) => {
    let img = document.createElement("img")
    img.src = src
    img.style.width = "100%"
    img.style.height = "100%"

    return img
}

createCloseButton = () => {
    var closeButton = document.createElement("BUTTON");
    closeButton.id = "close";
    closeButton.innerHTML = "&#10006;";
    closeButton.style.position = "absolute";
    closeButton.style.right = "0px";
    closeButton.style.top = "0px";
    closeButton.style.border = "0";
    closeButton.style.color = config.default.secondaryColor;
    closeButton.style.padding = "5px 10px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "29px";
    closeButton.style.borderRadius = "5px";
    closeButton.style.backgroundColor = 'rgba(0,0,0,0)';
    closeButton.style.zIndex = "9999999";
    closeButton.style.transform = "translate3d(0,0,3px)";

    closeButton.addEventListener("click", function () {
        stopGame();
        console.log('Oyun Durdu');
        location.href = "/"
    });

    MAIN_COMPONENT.appendChild(closeButton);
}

createDrillFoundCSS = (callback) => {
    const drillBagCords = utils.getRects("#rmc-roomescape-slot-" + BAG.drill)
    const drillCords = utils.getRects("#rmc-roomescape-drill")
    let direction = "", diff = 0

    if (drillBagCords.left < drillCords.left) {
        direction = "-"
        diff = drillCords.left - drillBagCords.left
    }
    var style = document.createElement("style");
    style.id = "rmc-drill-style";
    style.innerHTML = "@keyframes drillFound { \
        0%   {top: 0px;  left: 50px;}\
        10%  {top: -100px: left: 50px;}\
        20%  {top: -10px: left:"   + direction + (diff * .2) + "px;}\
        30%  {top: -20px: left:"   + direction + (diff * .4) + "px;}\
        40%  {top: -10px: left:"   + direction + (diff * .6) + "px;}\
        50%  {top: -10px: left:"   + direction + (diff * .8) + "px;}\
        60%  {top: "+ (drillBagCords.y) + "px: left:" + direction + (diff) + "px;}\
        70%  {top: "+ (drillBagCords.y * .3) + "px: left:" + direction + (diff) + "px;}\
        80%  {top: "+ (drillBagCords.y * .6) + "px: left:" + direction + (diff) + "px;}\
        90%  {top: "+ (drillBagCords.y * .9) + "px: left:" + direction + (diff) + "px;}\
        100% {top: "+ (drillBagCords.y) + "px: left:" + direction + (diff) + "px;}\
    }";
    document.head.appendChild(style);
    callback()
}

createCSS = () => {
    var style = document.createElement("style");
    style.id = "rmc-style";
    style.innerHTML = "@import 'https://fonts.googleapis.com/css?family=Poiret+One';\
    @font-face {\
        font-family: digital;\
        src: url(ds_digital/DS-DIGI.TTF);\
      }\
    .rmc-body {\
        font-family: 'Poiret One', sans-serif;\
        font-size: 25px\
    }\
    .rmc-center {\
        transform :translate(-50%, -50%);\
        top: 50%;\
        left: 50%;\
        position: absolute;\
    }\
    @keyframes battery { \
        0%   {opacity: 0;}\
        100%   {opacity: 1;}\
    }\
    @keyframes arrow { \
        0%   {margin-left: 0px;}\
        50%   {margin-left: -25px;}\
    }\
    @keyframes progressbar { \
        0%   {width: 0px;}\
        100%   {width: 100%;}\
    }\
    @keyframes safebox { \
        40%   {top:-45px;left: 0px}\
        50%   {top:-45px;transform:rotate(0deg)}\
        100%   {top: 69px; left: -123px; transform:rotate(-37deg);z-index: 111;}\
    }\
    .cabinetDoor { \
        width: 45%;\
        height: 90%;\
        position: relative;\
        border-radius: 5px;\
        transition: all .5s;\
        background-color: "+ config.default.primaryColor + ";\
        border: "+ config.default.borderWidth + " solid " + config.default.secondaryColor + ";\
        -webkit-transform-style: preserve-3d;\
        -webkit-backface-visibility: hidden;\
    }\
    .cabinetDoor:after {\
        content: '';\
        right: 0px;\
        bottom: 0px;\
        position: absolute;\
        border-radius: 5px;\
        top: 0px;\
        left: 0px;\
        background-color: "+ config.default.primaryColor + ";\
        border: "+ config.default.borderWidth + " solid " + config.default.secondaryColor + ";\
        -webkit-transform: rotateY( 180deg );\
        -webkit-transform-style: preserve-3d;\
        -webkit-backface-visibility: hidden;\
    }\
    .door { \
        position : absolute;\
        borderRadius : 5px 5px 0 0;\
        width : "+ (config.default.components.door.width - 20) + "px;\
        height : "+ (config.default.components.door.height - 30) + "px;\
        transformOrigin : left;\
        z-index : 9;\
        -webkit-transform-style: preserve-3d;\
        -webkit-backface-visibility: hidden;\
    }\
    .door:after {\
        content: '';\
        position : absolute;\
        borderRadius : 5px 5px 0 0;\
        width : "+ (config.default.components.door.width - 20) + "px;\
        height : "+ (config.default.components.door.height - 30) + "px;\
        -webkit-transform: rotateY( 180deg );\
        -webkit-transform-style: preserve-3d;\
        -webkit-backface-visibility: hidden;\
    }";
    document.head.appendChild(style);
}

createMailFormScreen = () => {
    const safeboxCords = utils.getRects("#rmc-roomescape-safebox")
    function createMailSubsScreen() {
        let w, h, left, top;

        if (utils.isMobile()) {
            w = config.default.gameAreaWidth * .8
            h = config.default.gameAreaHeight * .7
            left = config.default.gameAreaWidth * .1
            top = 80
        }else{
            w = config.default.gameAreaWidth * 0.3
            h = (config.default.gameAreaHeight * .7)
            left = ((safeboxCords.x + (safeboxCords.width / 2)) - w / 2)
            top = 20
        }
        

        var mailSubsScreen = document.createElement("DIV");
        mailSubsScreen.id = "rmc-roomescape-mailsubs";
        mailSubsScreen.style.width = w + "px";
        mailSubsScreen.style.height = h + "px";
        mailSubsScreen.style.borderRadius = "5px";
        mailSubsScreen.style.backgroundColor = "#94ac7c";
        mailSubsScreen.style.border = "3px solid white";
        mailSubsScreen.style.transition = "all .5s";
        mailSubsScreen.style.zIndex = "999999999";
        mailSubsScreen.style.top = top+"px";
        mailSubsScreen.style.left = (left > 0 ? left : 0) + "px";
        mailSubsScreen.style.position = "relative";
        mailSubsScreen.style.transform = "scale(.00001)";
        mailSubsScreen.style.transformOrigin = "bottom"
        mailSubsScreen.style.boxShadow = "0 0px 25px 0 rgba(0, 0, 0, .5)"


        var container = document.createElement("DIV");
        container.id = "rmc-roomescape-mailsubs-container";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.textAlign = "center";
        container.style.borderRadius = "15px";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.justifyContent = "space-between";
        container.style.alignItems = "center";
        // container.style.border = config.default.borderWidth + " solid red"

        var message = document.createElement("DIV");
        message.id = "rmc-roomescape-mailsubs-message";
        message.style.color = "white";
        message.style.fontSize = "20px";
        message.style.display = "inline-block";
        message.style.width = "80%";
        message.style.margin = "15px 0";
        message.innerText = "Kasanın şifresini öğrenmek için eposta adresini gir.";
        container.appendChild(message);


        var input = document.createElement("INPUT");
        input.setAttribute("type", "email");
        input.setAttribute("placeholder", "Email");
        input.id = "rmc-roomescape-mailsubs-input";
        input.style.backgroundColor = "white";
        input.style.width = "80%";
        input.style.padding = "5px 0";
        input.style.border = "1px solid rgba(0,0,0,0.2)"
        input.style.boxShadow = "0 0px 3px 0 rgba(0, 0, 0, .3)"
        input.style.borderRadius = "5px";
        input.style.maxWidth = "-webkit-fill-available";
        input.style.fontSize = "15px";
        input.style.margin = "15px 0 5px 0";
        input.style.color = config.default.primaryColor;
        input.style.marginBottom = "12px";
        input.style.display = "inline-block";
        container.appendChild(input);

        var emailPermission = createPermitRow(
            "rmc-roomescape-mailsubs-emailpermission",
            "Kullanım koşullarını kabul ediyorum",
            "15px",
            "",
            "/"
        )

        container.appendChild(emailPermission);

        var submit = document.createElement("button");
        submit.id = "rmc-roomescape-mailsubs-submit";
        submit.style.backgroundColor = "#748d5c";
        submit.style.color = "white";
        submit.style.padding = "5px 30px";
        submit.style.fontSize = "15px";
        submit.style.borderRadius = "5px";
        submit.style.border = 0;
        submit.style.width = "fit-content";
        submit.style.cursor = "pointer";
        submit.style.fontWeight = "bolder";
        submit.innerText = "ŞİFRE AL";

        submit.addEventListener("click", function () {
            if (emailChecker()) {
                removeAlert("emailAlert")
                if (emailPermitChecker()) {
                    EMAIL = document.querySelector("#rmc-roomescape-mailsubs-input").value.toLowerCase()
                    // vlReq(EMAIL)
                    sendMail(EMAIL)
                } else {
                    if (!emailPermitChecker()) {
                        alertChecker("Kullanım koşullarını onaylamadan devam edilemez.", 'checkboxAlert1')
                    }
                    else {
                        removeAlert("checkboxAlert1")
                    }
                    // if (!secondPermitChecker()) {
                    //     alertChecker("Kullanım koşullarını onaylamadan devam edilemez.", 'checkboxAlert2')
                    // }
                    // else {
                    //     removeAlert("checkboxAlert2")
                    // }
                }
            } else {
                alertChecker("email hatalı", 'emailAlert')
            }
        });
        container.appendChild(submit)


        container.appendChild(createKeyTool())
        // container.appendChild(hr)
        // container.appendChild(container)
        mailSubsScreen.appendChild(container);
        mailSubsScreen.appendChild(createSafeboxDoorCloseButton())
        MAIN_COMPONENT.appendChild(mailSubsScreen);
    }

    function createPermitRow(inputId, desc, fontSize, fontName, url) {
        var container = document.createElement("DIV");
        container.style.color = "green";
        container.style.fontSize = "13px";
        container.style.margin = "15px 0";
        container.style.width = "80%";
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
        input.style.accentColor = "green";

        var text = document.createElement("div");
        text.innerText = desc;
        text.style.fontSize = fontSize;
        text.style.fontFamily = fontName;
        // text.style.textDecoration = "underline";
        text.style.color = "white";

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
            alert.style.color = "red";
            alert.style.fontSize = "19px";
            alert.style.fontWeight = "bolder";
            // alert.style.fontFamily = generalData.fontName;
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
                    // createAlert(text, id)
                    createMsg(text, true)
                }
                break;
            case "checkboxAlert2":
                if (secondPermitChecker()) {
                    document.querySelector('#' + id).innerText = ""
                } else {
                    // createAlert(text, id)
                    createMsg(text, true)
                }
                break;
            case "emailAlert":
                if (emailChecker()) {
                    document.querySelector('#' + id).innerText = ""
                } else {
                    // createAlert(text, id)
                    createMsg(text, true)
                }
                break;
            default:
                break;
        }
    }

    function emailChecker() {
        if (document.querySelector("#rmc-roomescape-mailsubs-input")) {
            var email = document.querySelector("#rmc-roomescape-mailsubs-input").value.toLowerCase();
            var emailStatus = utils.emailValidator(email)
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
        if (document.querySelector("#rmc-roomescape-mailsubs-emailpermission")) {
            if (document.querySelector("#rmc-roomescape-mailsubs-emailpermission").checked) {
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
        if (document.querySelector("#rmc-roomescape-mailsubs-secondpermission")) {
            if (document.querySelector("#rmc-roomescape-mailsubs-secondpermission").checked) {
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

    function createKeyTool() {
        let container = document.createElement("div")
        container.id = "rmc-roomescape-keytool"
        container.style.width = "80%";
        container.style.height = "100%";
        container.style.border = "0px solid white"
        container.style.borderRadius = "15px"
        container.style.overflow = "hidden"
        container.style.transition = "all 1s"
        container.style.color = "white"


        let screen = document.createElement("div")
        screen.id = "rmc-roomescape-keytool-screen"
        screen.style.width = "100%"
        screen.style.height = "20%"
        // screen.style.border = "1px solid white"
        // screen.style.borderWidth = "0 0 1px 0"
        screen.style.justifyContent = "center"
        screen.style.alignItems = "center"
        screen.style.display = "flex"
        screen.style.flexDirection = "row"

        let keys = document.createElement("div")
        keys.style.width = "100%"
        keys.style.height = "80%"
        keys.style.flexWrap = "wrap"
        keys.style.justifyContent = "center"
        keys.style.alignContent = "center"
        keys.style.display = "flex"

        screen.appendChild(createScreenKey())
        screen.appendChild(createScreenKey())
        screen.appendChild(createScreenKey())
        screen.appendChild(createScreenKey())

        container.appendChild(screen)

        keys.appendChild(createKeyButton("1"))
        keys.appendChild(createKeyButton("2"))
        keys.appendChild(createKeyButton("3"))

        keys.appendChild(createKeyButton("4"))
        keys.appendChild(createKeyButton("5"))
        keys.appendChild(createKeyButton("6"))

        keys.appendChild(createKeyButton("7"))
        keys.appendChild(createKeyButton("8"))
        keys.appendChild(createKeyButton("9"))

        keys.appendChild(createKeyButton("0", true))
        keys.appendChild(createKeyButton("<", false, true))

        container.appendChild(keys)
        return container
    }

    function createKeyButton(text, full, backspace) {
        let key = document.createElement("div")
        key.style.width = full ? "60.4%" : "30%"
        key.style.height = "20%"
        key.style.display = "flex"
        key.style.alignItems = "center"
        key.style.justifyContent = "center"
        // key.style.borderRadius = "5px"
        key.style.color = "#748d5c"
        key.style.background = "#a9bd96"
        key.style.fontFamily = "digital";
        key.style.transition = "color 1s cubic-bezier(0, 1.24, 0.14, 1.12) 0s";
        key.style.fontSize = "40px";
        key.style.border = "1px solid " + config.default.primaryColor
        key.innerText = text

        if (backspace) {
            key.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" viewBox="0 0 576 512"><path fill="#748d5c" d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>'
            key.style.width = "29.8%"
        }

        key.addEventListener("click", () => {
            if (backspace) {
                deletePassword()
            } else {
                writePassword(text)
            }
        })

        return key
    }

    function createScreenKey() {
        let key = document.createElement("div")
        key.style.width = "15%"
        key.style.height = "50%"
        key.style.display = "flex"
        key.style.alignItems = "center"
        key.style.justifyContent = "center"
        key.style.fontSize = "80px"
        key.style.border = "1px solid white"
        key.style.borderWidth = "0 0 1px 0"
        key.style.margin = "0 15px"
        key.style.fontFamily = "digital";
        key.style.transition = "color 1s cubic-bezier(0, 1.24, 0.14, 1.12) 0s";

        return key
    }

    createMailSubsScreen()
}

// FX
openLight = () => {
    if (!LIGHT_OPEN) {
        LIGHT_OPEN = true
        let light = document.querySelector("#rmc-roomescape-bulb")
        light.style.boxShadow = "rgb(255 255 255) 0px 20px 1332px 81px, rgb(255 255 255) 0px 0px 20px 0px"
        let overlay = document.querySelector("#rmc-roomescape-overlay")
        overlay.style.opacity = "0"
        overlay.style.zIndex = "0"
        let screen = document.querySelector("#rmc-roomescape-laptop-shadow")
        screen.style.boxShadow = "rgb(0 0 0 / 51%) 0px 0px 0px 0px, rgb(0 0 0 / 50%) 0px 0px 0px 0px"
        let elektrik = document.querySelector("#rmc-roomescape-slot-" + BAG.electric)
        elektrik.style.background = config.default.primaryColor
        elektrik.style.boxShadow = "rgb(148 172 124 / 51%) 0px 0px 40px 0px"
        elektrik.querySelector("#rmc-roomescape-slot-" + BAG.electric + "-item").style.display = 'none'
        elektrik.appendChild(createLightning("green"))
        let batteryValue = document.querySelector("#rmc-roomescape-laptop-screen-battery-value")
        batteryValue.src = "./assets/battery-filled.png"
        batteryValue.style.animation = "auto"
        let wallLight = document.querySelector("#rmc-roomescape-wall-light")
        wallLight.style.opacity = "1"
        let florLight = document.querySelector("#rmc-roomescape-flor-light")
        florLight.style.opacity = "1"


        if (!DRILL) {
            bureauClickArrow()
        } else if (!WOOD) {
            woodArrow()
        } else if (!KEY) {
            safeboxClickArrow()
        } else {
            doorArrow()
        }
    }
}

closeLight = () => {
    if (LIGHT_OPEN) {
        LIGHT_OPEN = false
        let light = document.querySelector("#rmc-roomescape-bulb")
        light.style.boxShadow = "rgb(0 0 0) 0px 0px 0px 0px, rgb(0 0 0) 0px 0px 0px 0px"
        let overlay = document.querySelector("#rmc-roomescape-overlay")
        overlay.style.opacity = "1"
        overlay.style.zIndex = "99999"
        let screen = document.querySelector("#rmc-roomescape-laptop-shadow")
        screen.style.boxShadow = "rgb(255 255 255 / 51%) 0px 0px 70px 20px"
        let elektrik = document.querySelector("#rmc-roomescape-slot-" + BAG.electric)
        elektrik.style.boxShadow = "rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px"
        elektrik.style.background = "#c1a692"
        elektrik.querySelector("#rmc-roomescape-lightning").remove()
        elektrik.querySelector("#rmc-roomescape-slot-" + BAG.electric + "-item").style.display = 'block'
        let batteryValue = document.querySelector("#rmc-roomescape-laptop-screen-battery-value")
        batteryValue.src = "./assets/battery-empty.png"
        batteryValue.style.animation = "1s cubic-bezier(1, -0.57, 0, 0.96) 0s infinite normal none running battery"
        let wallLight = document.querySelector("#rmc-roomescape-wall-light")
        wallLight.style.opacity = "0"
        let florLight = document.querySelector("#rmc-roomescape-flor-light")
        florLight.style.opacity = "0"

        laptopClickArrow()
    }
}

zoomInLaptopScreen = () => {
    console.log("zoomin");
    if (!SCREEN_OPEN) {
        SCREEN_OPEN = true
        const animSpeed = .3
        const w = utils.isMobile() ? config.default.gameAreaWidth * .9 : config.default.gameAreaWidth / 2
        const h = w * .58
        const r = utils.isMobile() ? "0px" : "auto" ;
        let screen = document.querySelector("#rmc-roomescape-laptop-screen")
        screen.style.transition = "all " + animSpeed + "s";
        screen.style.zIndex = '99'
        screen.style.width = w + 'px'
        screen.style.height = h + 'px'
        // screen.style.left = "auto"
        screen.style.right = r
        screen.style.bottom = "0px"
        screen.style.top = "auto"

        let battery = document.querySelector("#rmc-roomescape-laptop-screen-battery")
        battery.style.transform = "scale(.3)"
        battery.style.transition = "all " + animSpeed + "s"
        battery.style.top = utils.isMobile() ? "-11px" : "-15px"
        battery.style.left = "auto"
        battery.style.right = "0px"
        battery.style.borderWidth = "5px"
        battery.style.borderRadius = "20px"

        screen.appendChild(createHackingScreen())
    }
}

zoomOutLaptopScreen = () => {
    if (SCREEN_OPEN) {
        SCREEN_OPEN = false
        let screen = document.querySelector("#rmc-roomescape-laptop-screen")
        screen.style.width = "100%";
        screen.style.height = "100%";
        screen.style.zIndex = '0'
        screen.style.bottom = "0px"
        setTimeout(() => {
            screen.style.transition = "all 1s cubic-bezier(1, -0.16, 0.53, 1) 0s";
            LAPTOP_CLICKABLE = true
        }, 1000);


        let battery = document.querySelector("#rmc-roomescape-laptop-screen-battery")
        battery.style.transition = "all .3s"
        battery.style.transform = "translate(-50%, -50%) scale(1)"
        // battery.style.width = "40%";
        // battery.style.height = "20%";
        battery.style.top = "50%"
        battery.style.left = "50%"

        screen.querySelector("#rmc-roomescape-hacking-screen").remove()
    }
}

openDoor = () => {
    if (!DOOR_OPEN && WOOD) {
        DOOR_OPEN = true
        let door = document.querySelector("#rmc-roomescape-door")

        door.style.transition = "all 2s"
        door.style.transform = "perspective(1300px) translateZ(0px) translateX(0px) translateY(0px) rotateY(-60deg)"
        setTimeout(() => {
            couponCodeBox()

            startConfetti()
            setTimeout(() => {
                stopConfetti()
            }, 2000);
        }, 2000);
    }
}

openBureau = (h) => { 
    if (!BUREAU_OPEN) {
        BUREAU_OPEN = true
        let bureauMidContainer = document.querySelector("#rmc-roomescape-bureau-mid")

        bureauMidContainer.style.transform = "scale(1.3)"
        bureauMidContainer.style.top = h + "px"
        bureauMidContainer.style.left = "-2px"

        setTimeout(() => {
            bureauMidContainer.style.zIndex = "22"
            if (!DRILL) {
                drillFound()
            }
        }, 500);

    }
}

closeBureau = () => {
    if (BUREAU_OPEN) {
        BUREAU_OPEN = false
        let bureauMidContainer = document.querySelector("#rmc-roomescape-bureau-mid")

        bureauMidContainer.style.transform = "scale(1)"
        bureauMidContainer.style.left = "0px"
        bureauMidContainer.style.top = "0px"
        bureauMidContainer.style.zIndex = "0"
    }
}

drillFound = () => {
    drillFoundAnimation(() => {
        // createMsg("Matkabı buldun, tahtanın üzerinde gezdir.")
        let drillSlot = document.querySelector("#rmc-roomescape-slot-" + BAG.drill)
        drillSlot.style.background = config.default.primaryColor
        drillSlot.style.boxShadow = "rgb(148 172 124 / 51%) 0px 0px 40px 0px"
        let bagDrillSlot = drillSlot.querySelector("#rmc-roomescape-slot-" + BAG.drill + "-item")
        if (bagDrillSlot) {
            bagDrillSlot.remove()
        }

        let drill = document.querySelector("#rmc-roomescape-drill")
        drill.style.position = "inherit"
        drill.style.transform = "scale(.8)"
        drillSlot.appendChild(drill)
        DRILL = true
        woodArrow()
        document.querySelector("#rmc-roomescape-wood-target").style.opacity = "1"
    })
}

drillFoundAnimation = (callback) => {
    let drill = document.querySelector("#rmc-roomescape-drill")
    drill.style.opacity = "1"
    drill.style.transition = "1s all"
    drill.style.position = "fixed"
    drill.style.zIndex = "11"
    if (utils.isMobile()) {
        drill.style.left = "auto"
        drill.style.top = "-70px"
    } else {
        drill.style.left = "50px"
        drill.style.top = "-250px"
    }
    // createDrillFoundCSS(()=>{
    //     drill.style.animation = "1s cubic-bezier(1, 1, 0, 0) 0s 1 normal none running drillFound"
    // })
    setTimeout(() => {
        drill.style.transition = "0s all"
        drill.style.position = "inherit"
        drill.style.top = "0px"
        drill.style.transform = "scale(.8)"
        drillPositionReset(drill)
        callback()
    }, 2000);
}

runDrill = (woodCords, x, y) => {
    if (DRILL_AUTO_OR_MOVE == "auto") {
        if (!AUTO_RUN_DRILL) {
            const MIN_X = woodCords.x
            const MAX_X = MIN_X + woodCords.width
            const MIN_Y = woodCords.y
            const MAX_Y = MIN_Y + woodCords.height
            if (x > MIN_X && x < MAX_X && y > MIN_Y && y < MAX_Y) {
                autoRunDrill()
            }
        }
    } else {
        const MIN_X = woodCords.x
        const MAX_X = MIN_X + woodCords.width
        const MIN_Y = woodCords.y
        const MAX_Y = MIN_Y + woodCords.height

        if (x > MIN_X && x < MAX_X && y > MIN_Y && y < MAX_Y) {
            showDrilProgressBar()
            processProgressBar()
        } else {
            hideDrilProgressBar()
        }
    }
}

autoRunDrill = () => {
    if (!AUTO_RUN_DRILL) {
        AUTO_RUN_DRILL = true
        showDrilProgressBar()
        const duration = 1000
        let drilprogressbar = document.querySelector("#rmc-roomescape-drilprogressbar-value")
        drilprogressbar.style.animation = duration + "ms cubic-bezier(1, 1, 0, 0) 0s normal none running progressbar"
        setTimeout(() => {
            cloneDrillForRemoveListeners()
        }, duration);
    }
}

keyFound = () => {
    keyAnimation(() => {
        KEY = true
        // createMsg("Anahtarı buldun, kapıya sürükle ve son adımı tamamla.")
        let keySlot = document.querySelector("#rmc-roomescape-slot-" + BAG.key)
        keySlot.style.background = config.default.primaryColor
        keySlot.style.boxShadow = "rgb(148 172 124 / 51%) 0px 0px 40px 0px"
        let bagKeySlot = keySlot.querySelector("#rmc-roomescape-slot-" + BAG.key + "-item")
        if (bagKeySlot) {
            bagKeySlot.remove()
        }

        let key = document.querySelector("#rmc-roomescape-key")
        keySlot.appendChild(key)

        doorArrow()
    })
}

keyAnimation = (callback) => {
    let key = document.querySelector("#rmc-roomescape-key")
    key.style.transition = "1s all"
    key.style.position = "absolute"
    key.style.zIndex = "2"
    // key.style.left = "50px"
    key.style.bottom = utils.isMobile() ? "70px" : "250px"
    setTimeout(() => {
        keyPositionReset(key)
        callback()
    }, 1500);
}

moveKey = (doorCords, x, y) => {
    const MIN_X = doorCords.x
    const MAX_X = MIN_X + doorCords.width
    const MIN_Y = doorCords.y
    const MAX_Y = MIN_Y + doorCords.height

    if (x > MIN_X && x < MAX_X && y > MIN_Y && y < MAX_Y) {
        console.log("KAPI AÇILIYOR", "KUPON KODUNUZ CART CURT");
        openDoor()
    }
}

showDrilProgressBar = () => {
    if (!DRILL_PROGRESS_BAR_SHOW) {
        DRILL_PROGRESS_BAR_SHOW = true
        var pb = document.querySelector("#rmc-roomescape-drilprogressbar")
        pb.style.opacity = "1"
        pb.style.zIndex = "99999999"
    }
}

hideDrilProgressBar = () => {
    if (DRILL_PROGRESS_BAR_SHOW) {
        DRILL_PROGRESS_BAR_SHOW = false
        var pb = document.querySelector("#rmc-roomescape-drilprogressbar")
        pb.style.opacity = "0"
        pb.style.zIndex = "-5555"
    }
}

processProgressBar = () => {
    if (!WOOD) {
        let value = document.querySelector("#rmc-roomescape-drilprogressbar-value")
        const percent = parseInt(value.style.width)
        if (percent < 100) {
            value.style.width = (percent + 1) + "%"
        } else {
            console.log("WOOD true");
            cloneDrillForRemoveListeners()
        }
    }
}

zoomInSafebox = () => {
    if (!SAFEBOX_OPEN) {
        SAFEBOX_OPEN = true
        let mailSubs = document.querySelector("#rmc-roomescape-mailsubs")
        mailSubs.style.transform = "scale(1)"
        mailSubs.style.opacity = "1"
        // let safebox = document.querySelector("#rmc-roomescape-safebox")
        // safebox.style.position = "fixed"
        // safebox.style.bottom = "300px"
        // safebox.style.left = "50%"
        // safebox.style.transform = "scale(3)"
        setTimeout(() => {
            SAFEBOX_CLICKABLE = true
            propmtUseExvidEmail()
        }, 1000);
    }
}

zoomOutSafebox = (callback) => {
    if (SAFEBOX_OPEN) {
        SAFEBOX_OPEN = false
        let mailSubs = document.querySelector("#rmc-roomescape-mailsubs")
        mailSubs.style.transform = "scale(.0001)"
        mailSubs.style.opacity = "0"
        // let safebox = document.querySelector("#rmc-roomescape-safebox")
        // safebox.style.position = "absolute"
        // safebox.style.bottom = config.default.components.bag.height + "px"
        // safebox.style.left = left
        // safebox.style.transform = "scale(1)"
        setTimeout(() => {
            SAFEBOX_CLICKABLE = true
            callback && callback()
        }, 1000);
    }
}

unlockSafebox = () => {
    SAFEBOX_UNLOCK = true 
    unlockAnimation = () => {
        let safebox = document.querySelector("#rmc-roomescape-safebox")

        let sb_top = document.createElement("img")
        sb_top.src = "./assets/safebox/kasa-acik-ust.png"
        sb_top.style.width = "100%"
        // sb_top.style.marginBottom = "-11px"
        sb_top.style.top = "0px"
        sb_top.style.left = "0px"
        sb_top.style.marginBottom = "0px"
        sb_top.style.position = "absolute"
        sb_top.style.zIndex = "1"
        // sb_top.style.transition = "all 1s"

        let sb_bottom = document.createElement("img")
        sb_bottom.src = "./assets/safebox/kasa-acik-alt.png"
        sb_bottom.style.width = "120%"
        sb_bottom.style.zIndex = "4";

        safebox.appendChild(sb_top)
        safebox.appendChild(sb_bottom)
        document.querySelector("#rmc-roomescape-safebox-closed").remove()

        setTimeout(() => {
            // sb_top.style.marginBottom = "40px"
            sb_top.style.animation = "1s cubic-bezier(1, 1, 0, 0) 0s normal none running safebox"
            setTimeout(() => {
                sb_top.style.transition = "0s all"
                sb_top.style.position = "absolute"
                sb_top.style.top = "69px"
                sb_top.style.left = "-123px"
                sb_top.style.transform = "rotate(-37deg)"
                sb_top.style.zIndex = "111"
                keyFound()
            }, 1000);
        }, 100);

    }

    if (SAFEBOX_OPEN) {
        zoomOutSafebox(() => {
            unlockAnimation()
        })
    } else {
        unlockAnimation()
    }
}

writePassword = (value) => {
    const i = PASSWORD.indexOf("")
    if (~i) {
        PASSWORD[i] = value
        updatePasswordScreen()
    }
    checkPassword()
}

deletePassword = () => {
    let deleteIndex = findToBeDeleteIndex()
    if (~deleteIndex) {
        PASSWORD[deleteIndex] = ""
        updatePasswordScreen()
    }

    checkPassword()
}

updatePasswordScreen = () => {
    let slots = document.querySelectorAll("#rmc-roomescape-keytool-screen div")
    slots.forEach((slot, j) => {
        slot.innerText = PASSWORD[j]
        if (PASSWORD[j]) {
            slot.style.borderWidth = "0 0 0 0"
        } else {
            slot.style.borderWidth = "0 0 1px 0"
        }
    });
}

checkPassword = () => {
    const check = PASSWORD.indexOf("")
    let keytool = document.querySelector("#rmc-roomescape-keytool")
    if (!~check) {
        if (SAFEBOX_UNLOCK) {
            createMsg("Kasa zaten açık")
            return false
        }
        const pass = PASSWORD.join("")
        if (pass == "1234") {
            // keytool.style.boxShadow = "rgb(0 255 0 / 51%) 0px 0px 50px 0px, rgb(0 255 0 / 50%) 0px 0px 0px 0px"
            // keytool.style.borderColor = "rgb(0 255 0 / 51%)"
            keytool.style.color = "rgb(0 255 0 / 51%)"
            createMsg("Şifre doğru, kasa açılıyor.")
            setTimeout(() => {
                unlockSafebox()
            }, 1500);
        } else {
            // keytool.style.boxShadow = "rgb(255 0 0 / 51%) 0px 0px 50px 0px, rgb(255 0 0 / 50%) 0px 0px 0px 0px"
            // keytool.style.borderColor = "rgb(255 0 0 / 51%)"
            keytool.style.color = "rgb(255 0 0 / 51%)"

            createMsg("Şifre yanlış", true)
        }
    }
}

findToBeDeleteIndex = () => {
    let k = -1
    for (let i = PASSWORD.length - 1; i >= 0; i--) {
        if (PASSWORD[i] !== "") {
            return i
        }
    }
    return k
}

cloneDrillForRemoveListeners = () => {
    hideDrilProgressBar()
    woodFound()
    var oldDrill = document.querySelector("#rmc-roomescape-drill")
    drillPositionReset(oldDrill)
    var drill = oldDrill.cloneNode(true);
    oldDrill.parentNode.replaceChild(drill, oldDrill);
}

drillPositionReset = (drill) => {
    drill.style.position = "inherit"
    drill.style.left = "0px";
    drill.style.top = "0px";
    drill.style.transform = "scale(.8)"
}

keyPositionReset = (key) => {
    key.style.position = "inherit"
    key.style.left = "0px";
    key.style.top = "0px";
    key.style.transform = "scale(.8)"
    key.style.transition = "0s all"
}

woodFound = () => {
    WOOD = true
    let woodSlot = document.querySelector("#rmc-roomescape-slot-" + BAG.wood)
    woodSlot.style.background = config.default.primaryColor
    woodSlot.style.boxShadow = "rgb(148 172 124 / 51%) 0px 0px 40px 0px"
    let bagWoodText = woodSlot.querySelector("#rmc-roomescape-slot-" + BAG.wood + "-item")
    if (bagWoodText) {
        bagWoodText.remove()
    }

    let wood = document.querySelector("#rmc-roomescape-wood")
    wood.style.position = "inherit"
    wood.style.transform = "scale(.4)"
    wood.style.width = "auto"
    wood.style.right = "0"
    wood.style.top = "0"
    woodSlot.appendChild(wood)
    safeboxClickArrow()
    document.querySelector("#rmc-roomescape-wood-target").style.opacity = "0"
}

mailFormRequest = (email) => {
    try {
        _VL = new Visilabs()
        _VL.AddParameter("OM.domain", "one2onestore.com")
        _VL.AddParameter("OM.exVisitorID", "baris."+utils.randNum(1,99999)+".arslan@euromsg.com") //////
        _VL.AddParameter("OM.roomescape", email)
        _VL.Collect()
        _VL.SuggestActions()
        checkMailForm()
    } catch (error) {
        console.log("vl");
    }
}

checkMailForm = () => {
    let counter = 0;
    let _interval = setInterval(() => {
        counter++;
        vlMailFormHide((result)=>{
            if (result) {
                clearInterval(_interval)
                console.log("vl mail form gizlendi");
                VL_MAIL_FORM_AVAILABLE = true
            }
        })
        if (counter >= 20) {
            clearInterval(_interval)
            console.log("vl mail form gizlenemedi, deneme sayısı aşıldı");
        }
    }, 300);
}

vlMailFormHide = (callback) => {
    try {
        const vlMailFormOverlay = document.querySelector("#bio_ep_bg")
        const vlMailForm = document.querySelector("#bio_ep")
        let result = false
        if (vlMailFormOverlay) {
            vlMailFormOverlay.remove()
            result = true
        }
        if (vlMailForm) {
            vlMailForm.style.left = "-99999px";
            callback(result)
        }
    } catch (error) {
        console.log("Mail form bulunamadı.");
    }
}

sendMail = (mail) => {
    if (!mail) {
        createMsg("Mail formatı uygun değil")
        return false
    }
    if (VL_MAIL_FORM_AVAILABLE) {
        let mailInput = document.querySelector("#visilabs_mail_subscription_form_input_"+ACTID)
        let checkbox = document.querySelector("#visilabs_mail_subscription_form_consent_checkbox_"+ACTID)
        let button = document.querySelector("#visilabs_mail_subscription_form_button_"+ACTID)
        
        if (mailInput) {
            mailInput.value = mail
            if (checkbox) { 
                checkbox.setAttribute("checked",true)
                if (button) {
                    button.click()
                    createMsg("İşlem Başarılı\nŞifre için gelen kutunu kontrol et.")
                }else{createMsg("Form doğru doldurulmadı",true);console.log("send button bulunamadı")}
            }else{createMsg("Form doğru doldurulmadı",true);console.log("checkbox bulunamadı")}
        }else{createMsg("Form doğru doldurulmadı",true);console.log("input bulunamadı")}
    }else{
        createMsg("Mail form ekranında bir problem oluştu. Lütfen tekrar deneyin",true)
        mailFormRequest()
    }
}

checkExvidIsEmail = (callback) => {
    try {
        if (_VL) {
            let exvid = _VL.Parameters['OM.exVisitorID']
            exvid = "baris.arslan@euromsg.com"
            if (exvid) {
                exvid = unescape(exvid)
                if (utils.emailValidator(exvid)) {
                    callback(exvid)
                }else{
                    console.log("exvisitorid email değil",exvid);
                    callback(false)
                }
            } else { callback(false) }
        } else { callback(false) }
    } catch (error) {
        callback(false)
    }
}

propmtUseExvidEmail = () => {
    try {
        if (!ASKED) {
            ASKED = true
            checkExvidIsEmail((exvid)=>{
                if (exvid) {
                    if (confirm('Daha önceden kayıtlı email adresini kullanmak ister misiniz? '+ exvid)) {
                        document.querySelector("#rmc-roomescape-mailsubs-input").value = exvid
                        console.log("EMAİL EXVİD",exvid);
                    }
                }
            })
        }
    } catch (error) {
        
    }
}

stopGame = () => {
    location.href = "/"
}

laptopClickArrow = () => {
    const cords = utils.getRects("#rmc-roomescape-laptop")
    if (utils.isMobile()) {
        createArrow(
            (cords.y + ((cords.height / 2) - 25)),
            (cords.x - (cords.width/2)),
            "99999999",
            true
        )
    }else{
        createArrow(
            (cords.y + ((cords.height / 2) - 25)),
            (cords.x + cords.width),
            "99999999",
            false
        )
    }
    const boardCords = utils.getRects("#rmc-roomescape-board")
    createNavigationBox(
        (boardCords.y),
        (boardCords.x),
        "Elektirikleri açmak için bilgisayarı kullan"
    )
}

bureauClickArrow = () => {
    removeNavigationBox()
    const cords = utils.getRects("#rmc-roomescape-bureau-mid")
    createArrow(
        (cords.y + ((cords.height / 2) - 25)),
        (cords.x + cords.width),
        "999999999",
        false
    )
}

woodArrow = () => {
    const cords = utils.getRects("#rmc-roomescape-wood")
    createArrow(
        (cords.y + ((cords.height / 2) - 25)),
        (cords.x + cords.width),
        "999999999",
        false
    )
    const doorCords = utils.getRects("#rmc-roomescape-doorborder")
    createNavigationBox(
        (doorCords.y + 50),
        (doorCords.x + doorCords.width + 50),
        "Matkabı sürükle ve tahtayı sök."
    )
}

safeboxClickArrow = () => {
    const cords = utils.getRects("#rmc-roomescape-safebox")
    createArrow(
        (cords.y + ((cords.height / 2) - 25)),
        (cords.x + cords.width),
        "999999999",
        false
    )
    removeNavigationBox()
}

doorArrow = () => {
    const cords = utils.getRects("#rmc-roomescape-doorborder")
    createArrow(
        (cords.y + ((cords.height / 2) - 25)),
        (cords.x + cords.width),
        "9999999999",
        false
    )
    const doorCords = utils.getRects("#rmc-roomescape-doorborder")
    createNavigationBox(
        (doorCords.y + 50),
        (doorCords.x + doorCords.width + 50),
        "Anahtarı kapıya sürükle ve kapıyı aç."
    )
}

couponCodeBox = () => {
    removeNavigationBox()
    removeArrow()
    const doorCords = utils.getRects("#rmc-roomescape-doorborder")
    var box = document.createElement("div");
    box.id = "rmc-roomescape-coupon-code-box";
    box.style.background = "#94ac7c";
    box.style.border = "3px solid white";
    box.style.borderRadius = "5px";
    box.style.padding = "25px";
    box.style.color = "white";
    box.style.top = (doorCords.y + (doorCords.height * .2)) + "px";
    box.style.left = (doorCords.x + (doorCords.width - 50)) + "px";
    box.style.zIndex = "99999999999";
    box.style.position = "fixed";
    box.style.transition = "all 1s";
    box.style.textAlign = "center";
    box.innerHTML = "Tebrikler<br>Kupon kodunuz <b>" + COUPON_CODE + "<b/> <br>";

    var button = document.createElement("div")
    button.id = "rmc-roomescape-copy-button"
    button.style.padding = "15px 5px"
    button.style.borderRadius = "5px"
    button.style.marginTop = "15px"
    button.style.fontSize = "20px"
    button.style.background = "rgba(0,0,0,0.5)"
    button.innerText = "Kopyala"
    button.addEventListener("click", () => {
        utils.copy(COUPON_CODE)
    })
    button.addEventListener("touchstart", () => {
        utils.copy(COUPON_CODE)
    })
    box.appendChild(button)
    MAIN_COMPONENT.appendChild(box);
}

removeNavigationBox = () => {
    const navigationBox = document.querySelector("#rmc-roomescape-navigation-box")
    if (navigationBox) {
        navigationBox.remove()
    }
}

removeArrow = () => {
    const arrow = document.querySelector("#rmc-roomescape-arrow")
    if (arrow) {
        arrow.remove()
    }
}



let utils = {
    randNum: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    isMobile: () => {
        if (WIDTH <= 600) {
            return true
        } else {
            return false
        }
    },
    getRects: (id) => {
        const el = document.querySelector(id)
        if (el) {
            return el.getClientRects()[0]
        }
        return false
    },
    copy: (value) => {
        if (!navigator.clipboard) {
            var elem = document.createElement("textarea");
            document.body.appendChild(elem);
            elem.value = value;
            elem.select();
            document.execCommand("copy");
            document.body.removeChild(elem);
        } else {
            navigator.clipboard.writeText(value);
        }
        createMsg("Kopyalandı")
        let button = document.querySelector("#rmc-roomescape-copy-button")
        if (button) {
            button.innerText = "Kopyalandı"
        }
    },
    emailValidator: (email) => {
        email = email.toLowerCase()
        var pattern = new RegExp("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}");
        var emailStatus = pattern.test(email);
        return emailStatus
    }
}


/**
 * CONFETTI
 */
var maxParticleCount = 150; //set max confetti count
var particleSpeed = 2; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately

(function () {
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
    window.requestAnimFrame = (function () {
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
      document.body.appendChild(canvas);
      canvas.width = width;
      canvas.height = height;
      window.addEventListener("resize", function () {
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