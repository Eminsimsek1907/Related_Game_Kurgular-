function initGame(){

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  //Global Head Variable
  var head = document.getElementsByTagName('head')[0];
  
  
  //Hammer JS Added
  JS=document.createElement("script");
  JS.type="text/javascript";
  JS.async=true;
  JS.src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js";
  JS.onload=runGame;
  JS.onerror = function () {
      _this.OnError();
  };
  // Font Awesome CSS Added
  var style = document.createElement('link');
  style.type = 'text/css';
  style.rel = "stylesheet";
  style.href = '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
  
  head.appendChild(JS);
  head.appendChild(style);
  
  // RunGame Function
  function runGame(){
  
  //Global Device Variable
  var isDesktop= window.innerWidth>600;
  
  //Global Variable Defination
  var slideleft=0;
  var slideright=0;
  var slidetotal=0;
  //All Css 
  var style= document.createElement("style");
  style.innerHTML= `
  .tinder {width: 100vw;height: 87vh;max-width: 650px; max-height: 650px; overflow: hidden;display: flex;flex-direction: column;position: relative;opacity: 0;transition: opacity 0.1s ease-in-out;}
  .loaded.tinder {opacity: 1;}
  .tinder--status {position: absolute;top: 50%;margin-top: -30px;z-index: 2;width: 100%;text-align: center;pointer-events: none;}
  .tinder--status i {font-size: 100px;opacity: 0;transform: scale(0.3);transition: all 0.2s ease-in-out;position: absolute;width: 100px;margin-left: -50px;}
  .tinder_love .fa-heart{  opacity: 1;  transform: scale(1.07); }
  .tinder_nope .fa-remove {  opacity: 1;transform: scale(1.07); }
  .tinder_love #love {background: rgba(75, 181, 67,.7) !important}
  .tinder_nope #nope {background: rgba(255, 0, 0,.7) !important}
  .tinder--cards {flex-grow: 1;text-align: center;display: flex;justify-content: center;align-items: flex-end;z-index: 1;}
  .tinder--card {margin: 0; padding: 0; display: inline-block;width: 90vw;max-width: 400px;height: 70vh;max-height: 400px;background: #FFFFFF;border-radius: 8px;overflow: hidden;position: absolute;will-change: transform;transition: all 0.3s ease-in-out;cursor: -webkit-grab;cursor: -moz-grab;cursor: grab;}
  .moving.tinder--card {  transition: none;  cursor: -webkit-grabbing;  cursor: -moz-grabbing;  cursor: grabbing;}
  .tinder--card img {  max-width: 100%;  pointer-events: none;}
  .tinder--card h3 {  margin-top: 32px;  font-size: 32px;  padding: 0 16px;  pointer-events: none;}
  .tinder--card p {  margin-top: 24px;  font-size: 20px;  padding: 0 16px;  pointer-events: none;}
  .tinder--buttons {   display: flex;   justify-content: center;  align-items: center;flex: 0 0 130px;  text-align: center;  padding-top: 20px; z-index: 5;}
  .tinder--buttons button {  border-radius: 50%; min-width: 77px;  min-height: 77px;  border: 0;  background: white;  display: inline-block;  margin: 0 7px;}
  .tinder--buttons button:focus {outline: 0;}
  .tinder--buttons i {  font-size: 39px;  vertical-align: middle;}
  .fa-heart {color: #80E0A7;}
  .fa-remove {color: #FF585D;}
  #cookie-status{ display:block !important;}
  #vl_likeCard_overlay_wrapper{position: absolute; top: 0; right: 0; left: 0; bottom: 0;}
  #vl_likeCard_overlay{position: fixed; top: 0; bottom: 0; left: 0; right: 0; opacity: 0.3; width: 100%; height: 100%; background-color: black; z-index:100000003}
  #vl_likeCard_content_fixed{overflow:hidden; border-radius:10px; position: fixed; top: 50%; left: 50%; opacity: 1; z-index: 100000004; webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);}
  #img_lightbox_close{position: absolute; top: 10px; right: 10px; cursor: pointer; opacity: 1; z-index: 100000003;}
  .btn_back{background: green !important;}
  .vl_tinder_back_image{position: fixed; min-width:515px;}
  @media only screen and (max-width: 600px) {.tinder--card {display: inline-block;width: 90vw;max-width: 400px;background: transparent;border-radius: 8px;overflow: hidden;position: absolute;will-change: transform;transition: all 0.3s ease-in-out;cursor: -webkit-grab;cursor: -moz-grab;cursor: grab;}}
  `;
  
  document.head.appendChild(style);
  
  // Fire Tinder Function
  function vlLikeCard(){
  
      var visi=document.createElement("div");
      visi.setAttribute("id","vl_likecard_container");
  
      var overlay = document.createElement("div");
      overlay.setAttribute("id","vl_likeCard_overlay_wrapper");
  
      overlay.style.zIndex="1000003";
      var overlay_light = document.createElement("div"); 
      overlay_light.setAttribute("id","vl_likeCard_overlay"); 
      overlay.appendChild(overlay_light);
  
      var overlay_content=document.createElement("div");
      overlay_content.setAttribute("id","vl_likeCard_content_fixed");
  
      var popbox = document.createElement("div");
      popbox.setAttribute("id","vl_likeCard_popbox");
      popbox.style.height='auto';
      popbox.style.width='auto';
     
      var img = document.createElement("img");
      img.className="vl_tinder_back_image";
      img.src= isDesktop ? "https://imgvisilabsnet.azureedge.net/banner/uploaded_images/244_1240_20220127131930980.jpg" : "https://imgvisilabsnet.azureedge.net/banner/uploaded_images/244_1240_20220127131943084.jpg";
      popbox.append(img);
      var vl_card_like = document.createElement("div");
      vl_card_like.innerHTML= `
      <div class="tinder">
        <div class="tinder--status">
          <i class="fa fa-remove"></i>
          <i class="fa fa-heart"></i>
        </div>
          <div class="tinder--cards">
            <div data-id="rare" class="tinder--card">
             <img src="https://imgvisilabsnet.azureedge.net/banner/uploaded_images/244_1240_20220127131509423.jpg">
            </div>
            <div data-id="avokado" class="tinder--card">
             <img src="https://imgvisilabsnet.azureedge.net/banner/uploaded_images/244_1240_20220127131522863.jpg">
            </div>
            <div data-id="midnight" class="tinder--card">
             <img src="https://imgvisilabsnet.azureedge.net/banner/uploaded_images/244_1240_20220127131533498.jpg">
            </div>
            <div data-id="ultra" class="tinder--card">
             <img src="https://imgvisilabsnet.azureedge.net/banner/uploaded_images/244_1240_20220127131549213.jpg">
            </div>
         </div>
                <div class="tinder--buttons">
                   <button id="nope"><i class="fa fa-remove"></i></button>
                  <button id="love"><i class="fa fa-heart"></i></button>
                </div>
      </div>`;
      
    popbox.append(vl_card_like);
      var cls_btn = document.createElement("div");
      cls_btn.innerHTML = '<button id="vl-form-close" style="position: absolute; width:auto; right: 0px; top: 0px; border: 0px; color: #fff; padding: 5px 10px; cursor: pointer; font-size: 29px; transition: all 1s ease 0s; border-radius: 10px; background-color: rgba(0, 0, 0, 0); z-index: 999; transform: translate3d(0px, 0px, 3px);">✖</button>'
      cls_btn.onclick=closeclick;
  
      overlay_content.appendChild(popbox);
      overlay_content.appendChild(cls_btn); 
  
      visi.appendChild(overlay);
      visi.appendChild(overlay_content);
  
      document.querySelector("body").appendChild(visi);
  
  
  function closeclick(){
      var t=document.querySelector("#vl_likecard_container");
      t.remove();
      
      location.href = "/"
  }
  
  }
  
  vlLikeCard();
  
  var tinderContainer = document.querySelector('.tinder');
  var allCards = document.querySelectorAll('.tinder--card');
  var nope = document.getElementById('nope');
  var love = document.getElementById('love');
  
  function initCards(card, index) {
    var newCards = document.querySelectorAll('.tinder--card:not(.removed)');
  
    newCards.forEach(function (card, index) {
      card.style.zIndex = allCards.length - index;
      card.style.transform = `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;
      card.style.opacity = (10 - index) / 10; 
    });
    
    tinderContainer.classList.add('loaded');
  }
  
  initCards();
  
  allCards.forEach(function (el) {
    var hammertime = new Hammer(el);
  
    hammertime.on('pan', function (event) {
      el.classList.add('moving');
    });
  
    hammertime.on('pan', function (event) {
      if (event.deltaX === 0) return;
      if (event.center.x === 0 && event.center.y === 0) return;
  
      tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
      tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;
  
      event.target.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
    });
  
    hammertime.on('panend', function (event) {
      el.classList.remove('moving');
      if(tinderContainer.classList.value.includes("tinder_nope")){
        slideleft++;
        slideright=0;
        console.log("Sola Kaydı :" ,slideleft);
      }
      else if (tinderContainer.classList.value.includes("tinder_love")){
        slideright++;
        slideleft=0;
        console.log("Sağa kaydı :" , slideright);
      }
      tinderContainer.classList.remove('tinder_love');
      tinderContainer.classList.remove('tinder_nope');
  
      var moveOutWidth = document.body.clientWidth;
      var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
  
      event.target.classList.toggle('removed', !keep);
  
      if (keep) {
        event.target.style.transform = '';
        slideright=0;slideleft=0;
      } else {
        var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        var toX = event.deltaX > 0 ? endX : -endX;
        var endY = Math.abs(event.velocityY) * moveOutWidth;
        var toY = event.deltaY > 0 ? endY : -endY;
        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;
  
        event.target.style.transform = `translate(${toX}px, ${(toY + event.deltaY)}px) rotate(${rotate}deg)`;
        initCards();
        
        console.log("sildi ise okdir");
        if(slideright>0){
          sendEvent(true);
          slideright=0;
        }
        if(slideleft>0){
          sendEvent(false);
        }
      }
    });
  });
  
  function createButtonListener(love) {
    return function (event) {
      var cards = document.querySelectorAll('.tinder--card:not(.removed)');
      var moveOutWidth = document.body.clientWidth * 1.5;
  
      if (!cards.length){
        console.log("elemanyok");
      }
  
      var card = cards[0];
      card.classList.add('removed');
      var removedcards = document.querySelectorAll('.removed');
      console.log(removedcards);
      if (love) {
        card.style.transform = `translate(${moveOutWidth}px, -100px) rotate(-30deg)`;
        sendEvent(true);
  
      } else {
        card.style.transform = `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;
        sendEvent(false);
      }
  
      initCards();
  
      event.preventDefault();
    };
  }
  
  var nopeListener = createButtonListener(false);
  var loveListener = createButtonListener(true);
  
  nope.addEventListener('click', nopeListener);
  love.addEventListener('click', loveListener);
  
  function sendEvent(send){
  
  var deltaElem= document.querySelectorAll(".tinder--card")[slidetotal];
  var useEventAttr=deltaElem.getAttribute("data-id");
  
  if(send){
  console.log("sağa kaydı event gitti" + useEventAttr);
   document.cookie = "ProductType="+useEventAttr+"; expires=Thu, 18 Dec 2023 12:00:00 UTC";
   SecondSettingsPopup(useEventAttr);
    
  }
  else{
    console.log("sola kaydı event gitti" + useEventAttr);
     document.cookie = "ProductType=allnope; expires=Thu, 18 Dec 2023 12:00:00 UTC";
     
  }
  slidetotal++;
  if(slidetotal==4){
    console.log("tüm ürünler bitti kurguyu kapat");
    var controlCookie=getCookie("ProductType");
    if(controlCookie=="allnope"){
    }
    document.querySelector("#vl_likecard_container").remove();
  }
  }
  }
  

  function SecondSettingsPopup(imagetype) {
    var isDesktop= window.innerWidth>600;
    var desktopWidth = "650px";
    var desktopHeight = "auto";
    var mobileWidth = window.innerWidth+"px";
    var mobileHeight = "auto";
    var image;
    var code;
    switch (imagetype) {
        case "rare":
        image="secondpop.gif";
        code="Rare";
      break;
        case "avokado":
        image="secondpop.gif";
        code="Avokado";
      break;
        case "midnight":
        image="secondpop.gif";
        code="Midnight";
      break;
        case "ultra":
        image="secondpop.gif";
        code="Ultra";
      break;

      }

    LikeCardChoosePopup(desktopWidth, desktopHeight, mobileWidth, mobileHeight, image, code);
}


function LikeCardChoosePopup(width, height, mWidth, mHeight, img, code ) {
    if (!document.querySelector(".vl-ChoosePopup-container")) {
        var style = document.createElement("style");
        style.innerHTML = `
        .vl-ChoosePopup-container{z-index: 999999999;width: 100%;height: 100%;position: fixed;top: 0;left: 0;}
        .vl-likecard-givecode{    position: absolute;width: 125px;height: 41px;right: 14%;bottom: 25%;}
        .vl-likecard-tryagain{position: absolute;width: 250px;right: 4%;bottom: 16%;height: 49px;}
        .vl-ChoosePopup-overlay{z-index: 10000;width: 100%;height: 100%;background: black;opacity: 0.8;position: fixed;top: 0;left: 0;}
        .vl-ChoosePopup{overflow:hidden; border-radius:10px; position:absolute;z-index:100001;width:${width};height:${height};left: 50%;top: 50%;transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);}
        .vl-ChoosePopup > a > img {width:${width};height:${height};}
        .vl-ChoosePopup-close{position: absolute;right: 5px;top: 5px;cursor: pointer;z-index: 100002;width:25px;height:25px;}
        @media only screen and (max-width: 768px) {
            .vl-ChoosePopup {width:${mWidth};height:${mHeight};}
            .vl-ChoosePopup > a > img {width:${mWidth};height:${mHeight};}
            .vl-ChoosePopup-close{font-size: 15px;line-height: 15px;}
            .vl-likecard-givecode{position: absolute;width: 72px;height: 26px;right: 14%;bottom: 25%;;}
            .vl-likecard-tryagain{position: absolute;width: 147px;right: 4%;bottom: 16%;height: 32px;}
        }
    `;
        document.head.append(style);

        var div = document.createElement("div");
        div.setAttribute("class", "vl-ChoosePopup-container");
        div.innerHTML = `
        <div class="vl-ChoosePopup-overlay"></div> 
        <div class="vl-ChoosePopup">
        <img class="vl-likecard-secondimg" data-id=${code} src=${img}>
        <div class="vl-likecard-givecode"></div>
        <div class="vl-likecard-tryagain"></div>
        <button id="vl-form-close" class="vl-ChoosePopup-close" style="position: absolute; width:auto; right: 0px; top: 0px; border: 0px; color: #fff; padding: 5px 10px; cursor: pointer; font-size: 29px; transition: all 1s ease 0s; border-radius: 10px; background-color: rgba(0, 0, 0, 0); z-index: 999; transform: translate3d(0px, 0px, 3px);">✖</button>
        </div>
    `;
        document.body.append(div);
 

        document.querySelector(".vl-ChoosePopup-overlay").addEventListener("click", closePopup);
        document.querySelector(".vl-ChoosePopup-close").addEventListener("click", closePopup);
        document.querySelector(".vl-likecard-givecode").addEventListener("click", runcodepopup);
        document.querySelector(".vl-likecard-tryagain").addEventListener("click", closePopup);


        function closePopup() {
            document.querySelector(".vl-ChoosePopup-container").remove();
        }

        function runcodepopup(){
            
            var likecardgame=document.querySelector("#vl_likecard_container");
            if(likecardgame)
            {
                document.querySelector("#vl_likecard_container").remove();
            }
            document.querySelector(".vl-ChoosePopup-container").remove();
        }
    }
}
}