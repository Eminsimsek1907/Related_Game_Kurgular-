
let MAIN_COMPONENT = document.createElement("DIV"), _interval, AIRPLANE_MAX_RIGHT = false, SCORE = 1, EARNED_SCORE = 1, SUFFICIENT = false, PLAYING = false, FINISH = false, CLICKABLE = true;
let TARGETS = [], CAN = 3, RULES = true, USER_EARNED_MAX_SCORE = 0

let speed = .3;
let config = {
  defaults: {
    maxScore: 101,
    flowRate: speed * 1000,
    gameAreaSize: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    topScoreBoard: false,
    animationDuration: speed + "s",
    cloudFrequency: 1, // azaldıkça sıklık artar, tam sayı alır
    cloudMoveStepSize: 150, // Bulutların akış hızı
    airplaneMoveUPStepSize: 10, // Uçağın yükseliş hızı
    airplaneMoveRIGHTStepSize: 10, // Uçağın uçuş hızı
    scoreIncreaseStepSize: 1, // Score artma hızı
  },
  components: {
    airplane: {
      width: window.innerWidth <= 600 ? 100 : 200,
      height: window.innerWidth <= 600 ? 40 : 80,
    }
  }
}

initGame = (gameAreaComponentId) => {
  document.body.setAttribute('style', '-webkit-user-select:none');
  getGameAreaSize(gameAreaComponentId)
  createMainComponents(gameAreaComponentId)
  createCloseButton()
  createCSS()
  testGame()
  if (RULES) {
    createRules(gameAreaComponentId)
  } else {
    configurate(gameAreaComponentId)
  }
}

testGame = () => {
  config.defaults.maxScore = utils.randNum(50, 100)
}

configurate = () => {
  if (config.defaults.topScoreBoard) {
    createScoreBoard()
  }
  createMilTable()
  createGhostScoreBoard()
  startStopButton3D()
  createMsg("Uçağı Durdur İndirimi Kazan")
  createAirplane()
  createCloud()
}

createRules = (gameAreaComponentId) => {
  RULES = false
  var container = document.createElement("div")
  container.id = "rmc-aviator-rules"
  container.style.width = utils.isMobile() ? "90%" : "50%"
  container.style.height = "50%"
  container.style.position = "absolute"
  container.style.transform = "translate(-50%,-50%)"
  container.style.left = "50%"
  container.style.top = "50%"
  container.style.borderRadius = "15px"
  container.style.background = "#124364"
  container.style.padding = '10px 10px';
  container.style.position = "fixed";
  container.style.color = "white";
  container.style.textAlign = "center";
  container.style.fontFamily = "'Rubik One', sans-serif";
  container.style.fontSize = "18px";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.justifyContent = "space-between";
  container.style.alignItems = "center";
  container.style.cursor = "pointer";

  var title = document.createElement("div")
  title.style.width = "100%"
  title.style.fontSize = "30px"
  title.innerText = "Kurallar"

  createRule = (rule) => {
    var text = document.createElement("div")
    text.style.width = "100%"
    text.style.textAlign = "left"
    text.innerText = rule

    return text
  }

  container.appendChild(title)
  container.appendChild(createRule("1- Uçağı Uçurmak için BAŞLA butonuna basın"))
  container.appendChild(createRule("2- Uçak herhangi bir sayıda kaçabilir, uçak kaçmadan maksimum mile ulaşmaya çalışın"))
  container.appendChild(createRule("3- Toplamda 3 kez oynama hakkınız var"))


  var button = document.createElement("div")
  button.innerText = "OYNA"
  button.style.width = "50%"
  button.style.borderRadius = "5px"
  button.style.color = "#124364"
  button.style.padding = "15px 0"
  button.style.background = "white"

  container.appendChild(button)

  container.addEventListener("click", () => {
    container.remove()
    configurate(gameAreaComponentId)
  })

  MAIN_COMPONENT.appendChild(container)
}

createAirplaneSceneCSS = (left, callback) => {
  var style = document.createElement("style");
  style.id = "vlAirplaneSceneStyle";
  style.innerHTML = "@keyframes airplaneScene {" +
    "0%   {left: " + (left) + "px; transform: scale(1)}" +
    "10%  {left: " + (left + 20) + "px; transform: scale(1.1)}" +
    "50%  {left: " + (left) + "px; transform: scale(1.2)}" +
    "75%  {left: " + (left - 20) + "px; transform: scale(1.1)}" +
    "100% {left: " + (left) + "px; transform: scale(1)}" +
    "}" +
    "@keyframes airplaneFinishScene {" +
    "0%   {left: " + (left) + "px;}" +
    "10%  {left: " + (left - 40) + "px;}" +
    "50%  {left: " + (left - 50) + "px;}" +
    // "75%  {left: " + (left + 2000) + "px;}" +
    "100% {left: " + (left + 2000) + "px;}" +
    "}";

  document.head.appendChild(style);
  callback()
}

createMainComponents = (gameAreaComponentId) => {
  MAIN_COMPONENT.id = "rmc-aviator-main";
  MAIN_COMPONENT.style.width = "100%";
  MAIN_COMPONENT.style.height = "100%";
  MAIN_COMPONENT.style.top = "0";
  MAIN_COMPONENT.style.left = "0";
  MAIN_COMPONENT.style.zIndex = "9999";
  MAIN_COMPONENT.style.position = "fixed";
  MAIN_COMPONENT.style.overflow = "hidden";
  MAIN_COMPONENT.style.background = "linear-gradient(#6B93BD, #ffffff)";

  // var imgBG = document.createElement("img")
  // imgBG.src = "./assets/arkaplan.png"
  // // imgBG.style.width = "100%";
  // imgBG.style.height = "100%";
  // imgBG.style.position = "absolute";
  // imgBG.style.zIndex = "0";
  // imgBG.style.top = "0";
  // imgBG.style.left = "0";
  // MAIN_COMPONENT.appendChild(imgBG)

  var container = document.createElement("div")
  container.className = "tech-slideshow-background";
  container.innerHTML = '<div class="mover-background" style="background:url(./assets/arkaplan.png);background-size: contain;"></div>'
  container.style.width = config.defaults.gameAreaSize.width+"px";
  container.style.height = (config.defaults.gameAreaSize.height)+"px";
  container.style.zIndex = "0";
  container.style.position = "fixed";
  container.style.top = "0px";
  container.style.left = "0";
  MAIN_COMPONENT.appendChild(container)

  if (gameAreaComponentId) {
    document.querySelector("#" + gameAreaComponentId).appendChild(MAIN_COMPONENT);
  } else {
    document.body.appendChild(MAIN_COMPONENT);
  }
}

createCloseButton = () => {
  var closeButton = document.createElement("BUTTON");
  closeButton.id = "close";
  closeButton.innerHTML = "&#10006;";
  closeButton.style.position = "absolute";
  closeButton.style.right = "0px";
  closeButton.style.top = "0px";
  closeButton.style.border = "0";
  closeButton.style.color = "#fff";
  closeButton.style.padding = "5px 10px";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontSize = "29px";
  closeButton.style.borderRadius = "5px";
  closeButton.style.backgroundColor = 'rgba(0,0,0,0)';
  closeButton.style.zIndex = "99999999";
  closeButton.style.transform = "translate3d(0,0,3px)";

  closeButton.addEventListener("click", function () {
    stopGame();
    console.log('Oyun Durdu');
    location.href = "/"
  });

  MAIN_COMPONENT.appendChild(closeButton);
}

createScoreBoard = () => {
  var dashboard = document.createElement("div");
  dashboard.id = "scoreboard";
  dashboard.style.padding = '10px 0px';
  dashboard.style.position = "fixed";
  dashboard.style.color = "white";
  dashboard.style.textAlign = "center";
  dashboard.style.fontFamily = "'Rubik One', sans-serif";
  dashboard.style.background = '#124364';
  dashboard.style.textDecoration = 'none';
  dashboard.style.width = "370px";
  dashboard.style.minWidth = "max-content";
  dashboard.style.margin = "5px -5px";
  dashboard.style.backgroundSize = "contain";
  dashboard.style.left = "10px";
  dashboard.style.borderRadius = "5px";
  dashboard.style.fontSize = "25px";
  dashboard.style.zIndex = "9999";
  dashboard.style.transition = "1s all";

  var _score = document.createElement("DIV");
  _score.id = "score";
  _score.innerText = '0 MIL';
  _score.style.transition = "1s all";

  dashboard.appendChild(_score);
  MAIN_COMPONENT.appendChild(dashboard);
}

createMilTable = () => {
  var mils = document.createElement("div");
  mils.id = "mils";
  mils.style.position = "fixed";
  // mils.style.width = "350px";
  // mils.style.height = "auto";
  // mils.style.minWidth = "max-content";
  // mils.style.maxWidth = "350px";
  mils.style.textAlign = "center";
  mils.style.fontFamily = "'Rubik One', sans-serif";
  mils.style.textDecoration = 'none';
  mils.style.margin = "5px";
  // mils.style.left = "-10px";
  mils.style.top = config.defaults.topScoreBoard ? "60px" : "0px";
  mils.style.zIndex = "999";
  mils.style.fontSize = "18px";
  mils.style.transition = "1s all";
  mils.style.display = "flex"
  mils.style.justifyContent = "center"
  mils.style.flexDirection = "column"
  mils.style.alignItems = "center"

  var container = document.createElement("div");
  container.style.padding = '10px 10px';
  container.style.borderRadius = "5px";
  container.style.background = '#124364';
  container.style.color = "white";

  createRow = (id, award, msg) => {
    TARGETS.push({ target: false, award: award })
    var row = document.createElement("DIV");
    row.id = "mil-target-" + id
    row.style.display = "flex"
    row.style.justifyContent = "center"
    row.innerText = msg;
    return row
  }

  container.appendChild(createRow("1", 5, "1 - 5 arası 5 TL"));
  container.appendChild(createRow("2", 10, "5 - 10 arası 10 TL"));
  container.appendChild(createRow("3", 50, "10 - 50 arası 50 TL"));
  container.appendChild(createRow("4", 100, "50 - 100 arası 100 TL"));
  container.appendChild(createRow("5", 1000, "100 üzeri MİL x 1 TL"));

  mils.appendChild(createCANBoard())
  mils.appendChild(container)
  mils.appendChild(createUserEarnedMaxScore())
  mils.appendChild(createCopyCoupon())

  MAIN_COMPONENT.appendChild(mils)
}

createCopyCoupon = () => {
  var container = document.createElement("div")
  container.id = "rmc-aviator-copy-button"
  container.style.width = "100%"
  container.style.background = "#124364"
  container.style.display = "flex"
  container.style.color = "white"
  container.style.justifyContent = "center"
  container.style.alignItems = "center"
  container.style.margin = "2.5px 0"
  container.style.borderRadius = "5px";
  container.style.flexDirection = "row"
  container.style.zIndex = "999"
  container.style.padding = "5px 0"

  var text = document.createElement("div")
  text.innerText = 'Kopyala'

  var svg = document.createElement("div")
  svg.style.width = "25px"
  svg.style.marginLeft = "10px"
  svg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z"/></svg>'

  container.appendChild(text)
  container.appendChild(svg)

  container.addEventListener("click", () => {
    if (!USER_EARNED_MAX_SCORE) {
      createMsg("Henüz bir kupon kodu kazanılmadı", true)
    }
    else {
      createMsg("Kupon kodu kopyalandı")
      utils.copy("CODE" + USER_EARNED_MAX_SCORE + "TL")
    }
  })

  return container
}

createGhostScoreBoard = () => {
  var dashboard = document.createElement("div");
  dashboard.id = "vlGhostScoreboard";
  dashboard.style.position = "absolute";
  dashboard.style.color = "rgba(255,255,255,1)";
  dashboard.style.textAlign = "center";
  dashboard.style.fontFamily = "'Rubik One', sans-serif";
  dashboard.style.textDecoration = 'none';
  dashboard.style.transition = "1s all";
  dashboard.style.transform = "translate(-50%, -50%)";
  dashboard.style.left = "50%";
  dashboard.style.top = "50%";

  var _score = document.createElement("DIV");
  _score.id = "ghostscore";
  _score.innerText = '0 MIL';
  _score.style.transition = "1s all";
  _score.style.fontSize = utils.isMobile() ? "150px" : "150px";

  dashboard.appendChild(_score);
  MAIN_COMPONENT.appendChild(dashboard);
}

getGameAreaSize = (gameAreaComponentId) => {
  if (gameAreaComponentId) {
    const component = document.querySelector("#" + gameAreaComponentId)
    config.defaults.gameAreaSize = {
      width: component.offsetWidth,
      height: component.offsetHeight,
    }
  } else {
    config.defaults.gameAreaSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }
}

createAirplane = () => {
  var airplane = document.createElement("img");
  airplane.id = "airplane";
  airplane.src = "./assets/ucak.gif";
  airplane.style.width = config.components.airplane.width + "px";
  airplane.style.height = config.components.airplane.height + "px";
  airplane.style.zIndex = "999";
  airplane.style.position = "absolute";
  airplane.style.bottom = "150px";
  airplane.style.left = "0px";
  airplane.style.transition = "all " + config.defaults.animationDuration + " linear 0s";
  MAIN_COMPONENT.appendChild(airplane);
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
  msg.style.top = "-100px";
  msg.style.opacity = "1";
  msg.style.color = "white";
  msg.style.zIndex = "99999";
  msg.style.background = danger ? "#fb6a78" : "rgb(107, 147, 189)";
  msg.style.transform = "translate(-50%, -50%)";
  msg.style.left = "50%";
  msg.style.transition = "all .2s linear 0s";
  MAIN_COMPONENT.appendChild(msg);

  try {
    setTimeout(() => {
      document.querySelector("#vlMsg" + randId).style.top = "10%"
    }, 200);
    setTimeout(() => {
      document.querySelector("#vlMsg" + randId).style.top = "-100px"
    }, 2700);
    setTimeout(() => {
      document.querySelector("#vlMsg" + randId).remove()
    }, 3000);
  } catch (error) { }

}

airplaneMove = () => {
  if (!AIRPLANE_MAX_RIGHT && !FINISH) {
    let airplane = document.querySelector("#airplane")
    if (airplane) {
      let airplaneLeft = parseInt(airplane.style.left)
      let airplaneBottom = parseInt(airplane.style.bottom)
      let leftMax = false, bottomMax = false
      if ((airplaneBottom + (config.defaults.airplaneMoveUPStepSize * 2)) < (config.defaults.gameAreaSize.height - config.components.airplane.height)) {
        airplane.style.bottom = (airplaneBottom + config.defaults.airplaneMoveUPStepSize) + "px"
      }
      else { bottomMax = true }

      if ((airplaneLeft + config.defaults.airplaneMoveRIGHTStepSize) < (config.defaults.gameAreaSize.width - config.components.airplane.width)) {
        airplane.style.left = (airplaneLeft + config.defaults.airplaneMoveRIGHTStepSize) + "px"
      }
      else { leftMax = true }

      if (leftMax && bottomMax) {
        AIRPLANE_MAX_RIGHT = true
        airplaneMaxTopAnimation();
      }
    }
  }
}

airplaneMaxTopAnimation = () => {
  console.log("airplaneMaxTopAnimation");

  let airplane = document.querySelector("#airplane")
  createAirplaneSceneCSS(parseInt(airplane.style.left), () => {
    airplane.style.animation = "airplaneScene 3s linear infinite"
  })
}

airplaneFinishAnimation = () => {
  console.log("airplaneFinishAnimation");

  let airplane = document.querySelector("#airplane")

  createAirplaneSceneCSS(parseInt(airplane.style.left), () => {
    airplane.style.animation = "airplaneFinishScene 2s cubic-bezier(1, 1, 1, 1)"
    setTimeout(() => {
      airplane.remove();
    }, 2000);
  })
}

startGameAnimation = (callback) => {
  document.querySelector("#airplane").src = "./assets/ucak.gif";
  callback()
}

// createCloud = () => {
//   var cloud = document.createElement("div");
//   cloud.className = "cloud";
//   cloud.style.width = "100px";
//   cloud.style.height = "50px";
//   cloud.style.zIndex = "9";
//   cloud.style.left = config.defaults.gameAreaSize.width + 20 + "px";
//   cloud.style.top = utils.randNum(0, config.defaults.gameAreaSize.height - 200) + "px";
//   cloud.style.position = "absolute";
//   cloud.style.transition = "all " + config.defaults.animationDuration + " linear 0s";

//   var puf1 = document.createElement("div");
//   puf1.style.width = "50px";
//   puf1.style.height = "50px";
//   puf1.style.left = "10px";
//   puf1.style.borderRadius = "50px";
//   puf1.style.background = "white";
//   puf1.style.float = "left";
//   puf1.style.position = "absolute";

//   var puf2 = document.createElement("div");
//   puf2.style.width = "100px";
//   puf2.style.height = "35px";
//   puf2.style.borderRadius = "50px";
//   puf2.style.float = "left";
//   puf2.style.bottom = "0";
//   puf2.style.background = "white";
//   puf2.style.position = "absolute";

//   var puf3 = document.createElement("div");
//   puf3.style.width = "30px";
//   puf3.style.height = "30px";
//   puf3.style.left = "45px";
//   puf3.style.top = "5px";
//   puf3.style.borderRadius = "50px";
//   puf3.style.background = "white";
//   puf3.style.float = "left";
//   puf3.style.position = "absolute";

//   cloud.appendChild(puf1)
//   cloud.appendChild(puf2)
//   cloud.appendChild(puf3)
//   MAIN_COMPONENT.appendChild(cloud);
// }

createCloud = () => {
  var container = document.createElement("div")
  container.className = "tech-slideshow";
  container.innerHTML = '<div class="mover-1"></div>'
  container.style.width = config.defaults.gameAreaSize.width+"px";
  container.style.height = (config.defaults.gameAreaSize.height*.3)+"px";
  container.style.zIndex = "99";
  container.style.position = "fixed";
  container.style.top = "50px";
  container.style.left = "0";

  MAIN_COMPONENT.appendChild(container);
}

updateGame = () => {
  let counter = 0;
  _interval = setInterval(() => {
    airplaneMove()

    if (!FINISH) {
      if (SCORE <= config.defaults.maxScore) {
        updateScore(SCORE)
      } else {
        FINISH = true
        tryAgainButton()
        airplaneFinishAnimation()
        if (!SUFFICIENT) {
          missThePlane()
        }
        // stopGame();
        // return;
      }
    }

    counter++;
    if (!FINISH) {
      SCORE += config.defaults.scoreIncreaseStepSize;
    }
  }, config.defaults.flowRate);
}

updateScore = (value) => {
  if (config.defaults.topScoreBoard) {
    let score = document.querySelector("#score")
    score.innerText = "" + (value).toFixed(0) + " TL İndirim"
  }


  if (!SUFFICIENT) {
    updateMilsTable(value)

    let buttonScore = document.querySelector("#vl3DButtonText")
    buttonScore.innerText = "DURDUR " + (value).toFixed(0) + " MIL"

    let ghostscore = document.querySelector("#ghostscore")
    ghostscore.innerText = (value).toFixed(0) + " MIL"
  } else {
    let ghostscore = document.querySelector("#ghostscore")
    ghostscore.innerText = (value).toFixed(0) + " MIL"
  }
}

updateMilsTable = (value) => {
  if (value >= 1 && value <= 5 && !TARGETS[0].target) {
    TARGETS[0].target = true
    EARNED_SCORE = TARGETS[0].award
    let target = document.querySelector("#mil-target-1")
    target.style.color = "green"
    target.appendChild(createSVG())
  }
  if (value >= 5 && value <= 10 && !TARGETS[1].target) {
    TARGETS[1].target = true
    EARNED_SCORE = TARGETS[1].award
    let target = document.querySelector("#mil-target-2")
    target.style.color = "green"
    target.appendChild(createSVG())
  }
  if (value >= 10 && value <= 50 && !TARGETS[2].target) {
    TARGETS[2].target = true
    EARNED_SCORE = TARGETS[2].award
    let target = document.querySelector("#mil-target-3")
    target.style.color = "green"
    target.appendChild(createSVG())
  }
  if (value >= 50 && value <= 100 && !TARGETS[3].target) {
    TARGETS[3].target = true
    EARNED_SCORE = TARGETS[3].award
    let target = document.querySelector("#mil-target-4")
    target.style.color = "green"
    target.appendChild(createSVG())
  }
  if (value > 100 && !TARGETS[4].target) {
    TARGETS[4].target = true
    EARNED_SCORE = TARGETS[3].award
    let target = document.querySelector("#mil-target-5")
    target.style.color = "green"
    target.appendChild(createSVG())
  }
}

createSVG = () => {
  var container = document.createElement("div")
  container.style.width = "20px"
  container.style.margin = "0 10px"
  container.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 512 512"><path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>'

  return container
}

makeAllTargetsRed = () => {
  TARGETS.forEach((t, i) => {
    if (t.target) {
      let targetEl = document.querySelector("#mil-target-" + (i + 1))
      targetEl.style.color = "red"
      let targetSVGEl = document.querySelector("#mil-target-" + (i + 1) + " svg")
      targetSVGEl.setAttribute("fill", "red")
    }
  });
}

createCANBoard = () => {
  var container = document.createElement("div")
  container.id = "rmc-canlar"
  container.style.width = "100%"
  container.style.background = "#124364"
  container.style.display = "flex"
  container.style.justifyContent = "center"
  container.style.alignItems = "center"
  container.style.margin = "2.5px 0"
  container.style.borderRadius = "5px";
  container.style.flexDirection = "row"
  container.style.zIndex = "999"
  container.style.padding = "5px 0"

  createHeart = (id, fill) => {
    const color = fill ? "green" : "gray"
    const size = 30
    var heart = document.createElement("div")
    heart.id = "rmc-heart-" + id
    heart.style.width = size + "px"
    heart.style.margin = "0 2px"
    heart.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="' + color + '" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>'

    return heart
  }

  for (let i = 0; i < 3; i++) {
    if (CAN <= i) {
      container.appendChild(createHeart(i, false))
    } else {
      container.appendChild(createHeart(i, true))
    }
  }

  // MAIN_COMPONENT.appendChild(container)
  return container
}

changeHeartColor = () => {
  var heart = document.querySelector("#rmc-heart-" + CAN + " svg")
  if (heart) {
    heart.setAttribute("fill", "gray")
  }
}

createUserEarnedMaxScore = () => {
  var container = document.createElement("div")
  container.id = "rmc-aviator-userEarnedMaxScore"
  container.style.color = "white"
  container.style.width = "100%"
  container.style.background = "#124364"
  container.style.borderRadius = "5px";
  container.style.height = "min-content"
  container.style.top = "150px"
  container.style.margin = "2.5px 0"
  container.style.display = "flex"
  container.style.flexDirection = "row"
  container.style.zIndex = "999"
  container.style.display = "flex"
  container.style.justifyContent = "center"
  container.style.alignItems = "center"
  container.style.padding = "5px 0"
  container.innerHTML = "En Yüksek Mil : " + USER_EARNED_MAX_SCORE

  // MAIN_COMPONENT.appendChild(container)
  return container
}

updateUserEarnedMaxScore = (score) => {
  if (score > USER_EARNED_MAX_SCORE) {
    USER_EARNED_MAX_SCORE = score
    var uems = document.querySelector("#rmc-aviator-userEarnedMaxScore")
    if (uems) {
      uems.innerText = "En Yüksek Mil : " + USER_EARNED_MAX_SCORE
    }
  }
}

startGame = () => {
  startGameAnimation(() => {
    updateGame();
  })
}

stopGame = () => {
  clearInterval(_interval)
  // updateScore(SCORE)
  console.log("OYUN BITTI " + SCORE)
  let airplane = document.querySelector("#airplane")
  if (airplane) {
    document.querySelector("#airplane").style.animation = "";
  }
}

clearGameArea = (callback) => {
  let main = document.querySelector("#rmc-aviator-main")
  if (main) {
    main.remove()
    MAIN_COMPONENT = null
    callback(true)
  } else {
    callback(false)
  }
}

sufficientGame = () => {
  startConfetti()
  setTimeout(() => {
    stopConfetti()
  }, 1000);
  SUFFICIENT = true;
  updateUserEarnedMaxScore(SCORE);
  createMsg(EARNED_SCORE + " TL indirim kazandınız.")
  let buttonScore = document.querySelector("#vl3DButtonText")
  buttonScore.innerText = "KAZANILAN " + (EARNED_SCORE).toFixed(0) + "TL"
  console.log("KAZANILAN PUAN " + EARNED_SCORE)
}

missThePlane = () => {
  makeAllTargetsRed()
  let button = document.querySelector("#vl3DButton");
  let text = document.querySelector("#vl3DButtonText");
  text.innerText = "Uçağı Kaçırdın";
  button.style.filter = "hue-rotate(141deg)";
  createMsg("Uçağı kaçırdın, indirim kazanamadın.", true)
}

tryAgainButton = async () => {
  CLICKABLE = false
  let button = document.querySelector("#vl3DButton");
  let text = document.querySelector("#vl3DButtonText");
  let countdown = document.querySelector("#rmc-aviator-countdown");

  for (let i = 3; i >= 0; i--) {
    await _wait(1000)
    countdown.innerText = i
  }

  console.log("CAN", CAN);
  if (CAN > 0) {
    SCORE = 0;
    text.innerText = "Tekrar dene"
    button.style.filter = "hue-rotate(0deg)";
    countdown.innerText = ""
    CLICKABLE = true
  } else {
    text.innerText = "Canların Bitti"
    countdown.innerText = ""
  }
}

resetGame = () => {
  TARGETS.forEach(t => {
    t.target = false
  });

  stopGame();
  clearGameArea((result) => {
    if (result) {
      MAIN_COMPONENT = document.createElement("DIV"), _interval = null, AIRPLANE_MAX_RIGHT = false, SCORE = 1, EARNED_SCORE = 1, SUFFICIENT = false, PLAYING = false, FINISH = false, CLICKABLE = true;
      initGame()
    } else {
      alert("Sayfayı yenileyin")
    }
  })
}


createCSS = () => {
  var clickSpeed = .2;
  var style = document.createElement("style");
  style.id = "vl3DButtonStyle";
  style.innerHTML = "@import 'https://fonts.googleapis.com/css?family=Rubik+One';\
  .button::before, .button::after {\
    position: absolute;\
    content: '';\
    transition: all "+ clickSpeed + "s;\
  }\
  .button {\
    display: inline-block;\
    padding: 20px 40px;\
    color: white;\
    position: absolute;\
    top: 90%;\
    left: 50%;\
    transform: translate(-50%, -50%);\
    vertical-align: middle;\
    text-align: center;\
    font-family: 'Rubik One', sans-serif;\
    text-decoration: none;\
    width: max-content;\
    min-width: 50%;\
    font-size: 4vw;\
    transition: all "+ clickSpeed + "s;\
    background-color: #3498db;\
    cursor:pointer;\
  }\
  .button::before {\
    bottom: -15px;\
    height: 15px;\
    width: 100%;\
    left: 8px;\
    transform: skewX(45deg);\
    background-color: #196090;\
  }\
  .button::after {\
    right: -15px;\
    height: 100%;\
    width: 15px;\
    bottom: -8px;\
    transform: skewY(45deg);\
    background-color: #124364;\
  }\
  .button:active {\
    margin-left: 10px;\
    margin-top: 10px;\
  }\
  .button:active::before {\
    bottom: -5px;\
    height: 5px;\
    left: 3px;\
  }\
  .button:active::after {\
    right: -5px;\
    width: 5px;\
    bottom: -3px;\
  }\
  .tech-slideshow {\
    height: 200px;\
    max-width: 100%;\
    margin: 0 auto;\
    position: relative;\
    overflow: hidden;\
    transform: translate3d(0, 0, 0);\
    z-index: 999999;\
}\
.tech-slideshow>div {\
    height: 200px;\
    width: 6675px;\
    background: url(./assets/bulutlar.png);\
    background-size: contain;\
    position: absolute;\
    top: 0;\
    left: 0;\
    height: 100%;\
    transform: translate3d(0, 0, 0);\
}\
.tech-slideshow .mover-1 {\
    animation: moveSlideshow 15s linear infinite;\
}\
@keyframes moveSlideshow {\
    100% {\
        transform: translateX(-66.6666%);\
    }\
}\
.tech-slideshow-background {\
  height: 200px;\
  max-width: 100%;\
  margin: 0 auto;\
  position: relative;\
  overflow: hidden;\
  transform: translate3d(0, 0, 0);\
  z-index: 999999;\
}\
.tech-slideshow-background>div {\
  height: 200px;\
  width: 6675px;\
  background: url(./assets/bulutlar.png);\
  background-size: contain;\
  position: absolute;\
  top: 0;\
  left: 0;\
  height: 100%;\
  transform: translate3d(0, 0, 0);\
}\
.tech-slideshow-background .mover-background {\
  animation: moveSlideshowBackground 70s linear infinite;\
}\
@keyframes moveSlideshowBackground {\
  100% {\
      transform: translateX(-66.6666%);\
  }\
}\
";
  document.head.appendChild(style);
}

startStopButton3D = () => {
  var button = document.createElement("a");
  button.id = "vl3DButton";
  button.className = "button";

  var text = document.createElement("div");
  text.id = "vl3DButtonText"
  text.innerText = "BAŞLAT";

  var countdown = document.createElement("div")
  countdown.id = "rmc-aviator-countdown"
  countdown.innerText = ""
  countdown.style.width = "min-content"
  countdown.style.position = "absolute"
  countdown.style.color = "#124364"
  countdown.style.right = "10px"
  countdown.style.top = "50%"
  countdown.style.transform = "translate(-50%, -50%)";

  button.appendChild(text)
  button.appendChild(countdown)

  button.addEventListener('mouseup', () => {
    startOrStop()
  })

  startOrStop = () => {
    if (!FINISH) {
      if (PLAYING) {
        PLAYING = false
        sufficientGame()
      } else {
        if (!SUFFICIENT) {
          CAN--;
          changeHeartColor()
          PLAYING = true
          text.innerText = "DURDUR";
          startGame()
        } else {
          createMsg("Bir kere çekildikten sonra aynı tura tekrar katılamazsınız.", true)
        }
      }
    } else {
      if (CAN > 0 && CLICKABLE) {
        CAN--;
        resetGame()
        PLAYING = true
        startGame()
      } else {
        if (SUFFICIENT) {
          createMsg(EARNED_SCORE + "% indirim kazandınız.")
        } else {
          text.innerText = "Uçağı Kaçırdın";
          createMsg("Uçağı Kaçırdın", true)
        }
      }
    }
  }

  MAIN_COMPONENT.appendChild(button)
}


const _wait = (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, duration);
  })
}

let utils = {
  randNum: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  isMobile: () => {
    if (window.innerWidth <= 600) {
      return true
    } else {
      return false
    }
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
  }
}

// Oyun bitince uçak uçup gitme efekti
// butona tıklayınca kazandınız ekrannı
// kazanamayınca kaybettiniz mesajı
// Buttona tekrar tıklayınca oynayamazsınız mesajı

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

/**
 * 1- arkadan akacak bir bulut arka planı
 * 2- kuponu al butonu 3D
 * 3- başlama için geri sayım
 * 4- uçak yok olma animasyonu
 * 5- başlama için zeminden kalkış
 * 6- uçağın arkasında belirecek iz düşümü
 * 7- uçak oyun alanı sonuna gelince zirveye çıkmış olacak ve ileri geri animasyon olacak
 * 8- uçacağı max puan başta belli
 */