initGame = () => {
  var random = Math.random
    , cos = Math.cos
    , sin = Math.sin
    , PI = Math.PI
    , PI2 = PI * 2
    , timer = undefined
    , frame = undefined
    , confetti = [];

  var particles = 10
    , spread = 40
    , sizeMin = 3
    , sizeMax = 12 - sizeMin
    , eccentricity = 10
    , deviation = 100
    , dxThetaMin = -.1
    , dxThetaMax = -dxThetaMin - dxThetaMin
    , dyMin = .13
    , dyMax = .18
    , dThetaMin = .4
    , dThetaMax = .7 - dThetaMin;

  var colorThemes = [
    function() {
      return color(200 * random()|0, 200 * random()|0, 200 * random()|0);
    }, function() {
      var black = 200 * random()|0; return color(200, black, black);
    }, function() {
      var black = 200 * random()|0; return color(black, 200, black);
    }, function() {
      var black = 200 * random()|0; return color(black, black, 200);
    }, function() {
      return color(200, 100, 200 * random()|0);
    }, function() {
      return color(200 * random()|0, 200, 200);
    }, function() {
      var black = 256 * random()|0; return color(black, black, black);
    }, function() {
      return colorThemes[random() < .5 ? 1 : 2]();
    }, function() {
      return colorThemes[random() < .5 ? 3 : 5]();
    }, function() {
      return colorThemes[random() < .5 ? 2 : 4]();
    }
  ];
  function color(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function interpolation(a, b, t) {
    return (1-cos(PI*t))/2 * (b-a) + a;
  }
  var radius = 1/eccentricity, radius2 = radius+radius;
  function createPoisson() {

    var domain = [radius, 1-radius], measure = 1-radius2, spline = [0, 1];
    while (measure) {
      var dart = measure * random(), i, l, interval, a, b, c, d;

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        a = domain[i], b = domain[i+1], interval = b-a;
        if (dart < measure+interval) {
          spline.push(dart += a-measure);
          break;
        }
        measure += interval;
      }
      c = dart-radius, d = dart+radius;

      for (i = domain.length-1; i > 0; i -= 2) {
        l = i-1, a = domain[l], b = domain[i];
        
        if (a >= c && a < d)
          if (b > d) domain[l] = d; 
          else domain.splice(l, 2); 
        else if (a < c && b > c)
          if (b <= d) domain[i] = c; 
          else domain.splice(i, 0, c, d);
      }

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i+1]-domain[i];
    }

    return spline.sort();
  }

  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top      = '0';
  container.style.left     = '0';
  container.style.width    = '100%';
  container.style.height   = '0';
  container.style.overflow = 'visible';
  container.style.zIndex   = '9999';

  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style, innerStyle = this.inner.style;
    outerStyle.position = 'absolute';
    outerStyle.width  = (sizeMin + sizeMax * random()) + 'px';
    outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
    innerStyle.width  = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = '50px';
    outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
    this.axis = 'rotate3D(' +
      cos(360 * random()) + ',' +
      cos(360 * random()) + ',0,';
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + 'deg)';

    this.x = window.innerWidth * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + 'px';
    outerStyle.top  = this.y + 'px';

    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length-1; i < l; ++i)
      this.splineY[i] = deviation * random();
    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function(height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      var phi = this.frame % 7777 / 7777, i = 0, j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi-this.splineX[i]) / (this.splineX[j]-this.splineX[i])
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + 'px';
      outerStyle.top  = this.y + rho * sin(phi) + 'px';
      innerStyle.transform = this.axis + this.theta + 'deg)';
      return this.y > height+deviation;
    };
  }

  function poof() {
    if (!frame) {

      document.body.appendChild(container);

      var theme = colorThemes[0]
        , count = 0;
      (function addConfetto() {
        var confetto = new Confetto(theme);
        confetti.push(confetto);
        container.appendChild(confetto.outer);
        timer = setTimeout(addConfetto, spread * random());
      })(0);


      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = window.innerHeight;

        for (var i = confetti.length-1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length)
          return frame = requestAnimationFrame(loop);

        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  function createAudio(){
    var html=document.createElement("html");
    html.style.display = "none"
    html.innerHTML=`
    <audio controls autoplay>
    <source src="https://cdn.discordapp.com/attachments/807578340050993155/1045821665751339150/2014-yilbasi-sarkisi-jingle-bells.mp3" type="audio/ogg">
    </audio>`
document.body.append(html);
setTimeout(() => {
  window.location.reload();
}, 99000);
  }

  var style = document.createElement("style");
  style.innerHTML="@keyframes airplaneScene {"+
                      "0%   {left: 2500px;}"+
                      "50%  {left: 50px;}"+
                      "75%  {left: 150px;}"+
                      "100% {left: -5000px;}"+
                  "}"+
                  "@keyframes boxScene {"+
                      "0%   {top: "+(window.innerHeight-300)*0.15+"px;width:0px;height:0px; left:250px}"+
                      "25%  {top: "+(window.innerHeight-300)*0.55+"px;transform: rotate(-25deg);left:150px;width:230px;height:300px}"+
                      "50%  {top: "+(window.innerHeight-300)*0.75+"px;transform: rotate(25deg);left:-50px;width:230px;height:300px}"+
                      "75%  {top: "+(window.innerHeight-300)*0.85+"px;transform: rotate(-15deg);left:150px;width:230px;height:300px}"+
                      "100% {top: "+(window.innerHeight-300)+"px;transform: rotate(0deg);left:50px;width:230px;height:300px}"+
                  "}"+ 
                  "@keyframes vl-popup {"+
                  "0%   {left: 2500px;}"+
                  "50%  {left: 50%;}"
              "}";
                  
  document.head.appendChild(style);
var start = document.createElement("div");
  start.id="vlStartButton";
  start.style.position="fixed";
  start.style.left="50px";
  start.style.top=window.innerHeight-300+"px";
  start.style.width="230px";
  start.style.height="300px";
  start.style.borderRadius="15px";
  start.style.color="white";
  start.style.cursor="pointer";
  start.style.transition="5s all";
  start.style.animation="boxScene 7s cubic-bezier(1, 1, 1, 1)";
  start.style.opacity="1";
  start.style.zIndex="9999";
  start.innerHTML="<img style='position:absolute;z-index:9998;width:100%;height:100%' src='./Paket.png'/>";
  
var startDiv = document.createElement("DIV");
  startDiv.id="vl-startDiv";
  startDiv.style.width="350px";
  startDiv.style.padding="15px";
  startDiv.style.position="fixed";
  startDiv.style.top="50px";
  startDiv.style.left="5000px";
  startDiv.style.transition="5s all";
  startDiv.style.zIndex="9998";
  startDiv.style.animation="airplaneScene 7s";
  
var startAirplane = document.createElement("IMG");
  startAirplane.id="vl-startAirplane";
  startAirplane.src="./Geyikler.gif";
  startAirplane.style.width="400px";
  startAirplane.style.maxWidth="none";
  startDiv.appendChild(startAirplane);

  start.addEventListener("click",function () {
      document.querySelector("#vlStartButton").style.opacity="0";
      poof();
      createAudio();
      FirePopup();
      clickScreen();
     
  });

  if (!document.querySelector("#vl-startDiv")) {
      document.body.appendChild(startDiv);
      setTimeout(() => {
          document.body.appendChild(start);
      }, 3000);
  }
  const config = {
    desktopWidth: "600px",
    mobileWidth: "330px",
    img: "https://cdn.discordapp.com/attachments/807578340050993155/1044397304725119016/Pembe_Sar_ve_Mavi_Tipografik_Dogum_Gunu_Hareketli_Kart.gif",
    url: "https://www.saglammetal.com/tr/uye-kayit",
  };
  function FirePopup() {
    setTimeout(() => {
      if (!document.querySelector('#vl-popup-container') && !document.querySelector('.vl-popup-container')) {
          initPopup();
      }
  }, 100);
  function initPopup() {
      const vlConfig = {
          desktopWidth: "600px",
          mobileWidth: "300px",
          backgroundColor: "gray",
          activeThumbnailColor: "black",
      };
      const items = [
          {
              src: window.innerWidth > 768 ? "https://imgvisilabsnet.azureedge.net/banner/uploaded_images/376_1391_20221009111247228.jpg" : "https://imgvisilabsnet.azureedge.net/banner/uploaded_images/376_1391_20221009132942108.jpg",
              title: "New Season Color Balance Collection",
              href: "https://www.xint.com.tr/new-collection",
          },
          {
              src: window.innerWidth > 768 ? "https://imgvisilabsnet.azureedge.net/banner/uploaded_images/376_1391_20221009111350120.jpg" : "https://imgvisilabsnet.azureedge.net/banner/uploaded_images/376_1391_20221009133003556.jpg",
              title: "Basic Collection",
              href: "https://www.xint.com.tr/tum-urunler?multi=51-89+51-91+49-45+47-40+59-198&sort=5",
          },
          {
              src: window.innerWidth > 768 ? "https://imgvisilabsnet.azureedge.net/banner/uploaded_images/376_1391_20221009111548072.jpg" : "https://imgvisilabsnet.azureedge.net/banner/uploaded_images/376_1391_20221009133022053.jpg",
              title: "3XL 4XL 5XL",
              href: "https://www.xint.com.tr/mcl",
          },
          {
              src: window.innerWidth > 768 ? "https://imgvisilabsnet.azureedge.net/banner/uploaded_images/376_1391_20221009111626069.jpg" : "https://imgvisilabsnet.azureedge.net/banner/uploaded_images/376_1391_20221009133039791.jpg",
              title: "hosgeldin100",
              href: "https://www.xint.com.tr/uye-kayit",
          },
      ];
      const campName = "Slidepopup - 09.10.22";
      if (!document.querySelector('style#vl-carousel-popup-style')) {
          const style = document.createElement("style");
          style.id = "vl-carousel-popup-style";
          style.innerHTML = `
          #vl-popup-container {
              z-index: 10000;
              width: 100%;
              height: 100%;
              position: fixed;
              top: 0;
              left: 0;
          }
  
          #vl-popup-overlay{
              z-index: 10000;
              width: 100%;
              height: 100%;
              background: black;
              opacity: 0.6;
              position: fixed;
              top: 0;
              left: 0;
          }
  
          #vl-carousel-popup {
              position:absolute;
              width: calc(${vlConfig.desktopWidth} + 1rem);
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);
              -webkit-transform: translate(-50%,-50%);
              z-index: 100001;
              overflow: hidden;
              padding: 1rem;
              background-color: ${vlConfig.backgroundColor};
              border-radius: 1rem;
              transform-origin: top left;
              animation: vl-scale-in-center 0.5s ease-in-out forwards;
          }
  
          #vl-carousel-popup #vl-carousel-close {
              position: absolute;
              right: 1em;
              top: 1em;
              width: 2em;
              height: 2em;
              cursor: pointer;
              z-index: 100002;
              background-color: white;
              border-radius: 50%;
          }
  
          #vl-carousel-popup #vl-carousel-close svg {
              width: 2em;
              height: 2em;
          }
  
          #vl-carousel-popup .vl-carousel-slider {
              position: relative;
              overflow: hidden;
          }
  
          #vl-carousel-popup .vl-carousel-slide {
              transition: all 0.5s ease-in-out;
              overflow: hidden;
              border-radius: 1rem;
          }
  
          #vl-carousel-popup .vl-carousel-slide img {
              width: 100%;
              height: 100%;
              object-fit: cover;
          }
  
          #vl-carousel-popup .vl-thumbnails {
              display: grid;
              gap: 1rem;
              width: 100%;
              padding: 1rem;
              grid-template-columns: repeat(${items.length}, 1fr);
              box-sizing: border-box;
          }
  
          #vl-carousel-popup .vl-thumbnails img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              cursor: pointer;
              transition: all 0.5s ease-in-out;
              border-radius: 1rem;
              border: 1px solid ${vlConfig.backgroundColor};
          }
  
          #vl-carousel-popup .vl-thumbnails img.vl-active {
              border: 1px solid ${vlConfig.activeThumbnailColor};
          }
  
          #vl-carousel-popup .vl-carousel-btn {
              all: unset;
              position: absolute;
              width: 2em;
              height: 2em;
              border: none;
              border-radius: 50%;
              z-index: 100002;
              cursor: pointer;
              background-color: white;
              top: 50%;
              transform: translate(0,-50%);
              transition: all 0.5s ease-in-out;
          }
  
          #vl-carousel-popup .vl-carousel-btn svg {
              width: 2em;
              height: 2em;
          }
  
          #vl-carousel-popup .vl-carousel-btn:active {
              scale: 1.1;
          }
  
          #vl-carousel-popup .vl-carousel-btn-next {
              right: 0;
          }
  
          #vl-carousel-popup .vl-carousel-btn-prev {
              left: 0;
          }
          
          #vl-carousel-popup  .slick-list {
              overflow: hidden;
          }
  
          #vl-carousel-popup  .slick-track {
              display: flex;
          }
  
          @keyframes vl-scale-in-center {
              0% {
              scale: 0;
              opacity: 0;
              }
              100% {
              scale: 1;
              opacity: 1;
              }
          }
  
          @keyframes vl-scale-out-center {
              0% {
                  scale: 1;
                  opacity: 1;
              }
              100% {
                  scale: 0;
                  opacity: 0;
              }
          }
  
          @media only screen and (max-width: 768px) {
              #vl-carousel-popup {
                  width: calc(${vlConfig.mobileWidth} + 1rem);
                  max-height: 100%;
              }
          }
          `;
          document.head.append(style);
      }
      const closeSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="16"></circle><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="160" y1="160" x2="96" y2="96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
      `;
  
      const nextSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="16"></circle><polyline points="134.1 161.9 168 128 134.1 94.1" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
      `;
  
      const prevSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="16"></circle><polyline points="121.9 161.9 88 128 121.9 94.1" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
      `;
  
      const container = document.createElement("div");
      container.id = "vl-popup-container";
      const overlay = document.createElement("div");
      overlay.id = "vl-popup-overlay";
  
      const carousel = document.createElement("div");
      carousel.id = "vl-carousel-popup";
  
      const close = document.createElement("div");
      close.id = "vl-carousel-close";
      close.innerHTML = closeSvg;
  
      const slider = document.createElement('div');
      slider.className = "vl-carousel-slider";
  
      const thumbnails = document.createElement("div");
      thumbnails.className = "vl-thumbnails";
  
      for (let index = 0; index < items.length; index++) {
          const { src, title, href } = items[index];
          let slideElement = document.createElement("div");
          if (href) {
              slideElement = document.createElement("a");
              slideElement.href = href;
              slideElement.addEventListener("click", () => {
                  // <%VLSendClickFunc%>
                  var vl = new Visilabs();
                  vl.AddParameter('OM.click', campName);
                  vl.AddParameter("OM.clickDet", title);
                  vl.Collect();
              });
          }
          slideElement.className = "vl-carousel-slide";
          slideElement.dataset.slide = index;
  
          const imgElement = document.createElement("img");
          imgElement.src = src;
          imgElement.alt = title;
          imgElement.title = title;
          slideElement.append(imgElement);
          slider.append(slideElement);
  
          const thumbnailElement = document.createElement("img");
          thumbnailElement.src = src;
          thumbnailElement.alt = title;
          thumbnailElement.title = title;
          thumbnails.append(thumbnailElement)
      }
  
      carousel.append(close, slider, thumbnails);
      container.append(overlay, carousel);
  
      if (document.querySelector('[src*="/npm/slick-carousel"]')) {
          initSlick();
      } else {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js";
          script.onload = initSlick;
          document.head.append(script);
      }
      function initSlick() {
          container.style.display = 'none';
          document.body.append(container);
          $("#vl-carousel-popup .vl-carousel-slider").slick({
              dots: false,
              infinite: true,
              speed: 500,
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: false,
              fade: true,
              autoplaySpeed: 2000,
              prevArrow: `<div class="vl-carousel-btn vl-carousel-btn-prev">${prevSvg}</div>`,
              nextArrow: `<div class="vl-carousel-btn vl-carousel-btn-next">${nextSvg}</div>`,
              responsive: [
                  {
                      breakpoint: 768,
                      settings: {
                          arrows: false,
                      }
                  },
              ]
          });
  
          container.style.display = 'block';
          $("#vl-carousel-popup .vl-carousel-slider").slick('refresh');
          // <%VLSendImpressionFunc%>
  
          const initalSlide = $('#vl-carousel-popup .vl-carousel-slider').slick('slickCurrentSlide');
          $(`#vl-carousel-popup .vl-thumbnails > img:nth-child(${initalSlide + 1})`).addClass('vl-active');
  
          $('#vl-carousel-popup .vl-carousel-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              $('#vl-carousel-popup .vl-thumbnails > img').removeClass('vl-active');
              $(`#vl-carousel-popup .vl-thumbnails > img:nth-child(${nextSlide + 1})`).addClass('vl-active');
          });
  
          $('#vl-carousel-popup .vl-thumbnails > img').click(function () {
              $('#vl-carousel-popup .vl-carousel-slider').slick('slickGoTo', $(this).index());
          });
  
          close.addEventListener("click", closePopup);
          overlay.addEventListener("click", closePopup);
          function closePopup() {
              carousel.style.animation = "vl-scale-out-center 0.5s ease-in-out forwards";
              setTimeout(() => {
                  container.remove();
              }, 500);
          }
      }
  }
  
  }
  
              
  function clickScreen(){
    var smokeyness=100; 
var density=40; 

var swide=800;
var shigh=600;
var toke=new Array();
var tokex=new Array();
var tokedx=new Array();
var tokey=new Array();
var nicotine=new Array();
var mousedown=false;
var x=400;
var y=300;
var sleft=sdown=0;
var ie_version=(navigator.appVersion.indexOf("MSIE")!=-1)?parseFloat(navigator.appVersion.split("MSIE")[1]):false;

function addLoadEvent(funky) {
  var oldonload=window.onload;
  if (typeof(oldonload)!='function') window.onload=funky;
  else window.onload=function() {
    if (oldonload) oldonload();
    funky();
  }
}

puff();

function puff() { if (document.getElementById) {
  var i, fag;
  for (i=0; i<smokeyness; i++) {
    fag=document.createElement("div");
    fag.innerHTML="☃️";
    toke[i]=fag.style;
    toke[i].position="absolute";
    toke[i].backgroundColor="transparent";
    toke[i].font="bold "+density+"px Tahoma, Geneva, sans-serif";
    //toke[i].color="rgba(234,234,234,0.033)";
    toke[i].zIndex="9999999";
    toke[i].pointerEvents="none";
    toke[i].visibility="hidden";
    //fag.appendChild(document.createTextNode(String.fromCharCode('0x25CF')));

    document.body.appendChild(fag);
    tokey[i]=false;
  }
  set_scroll();
  set_width();
  setInterval(drag, 25);
}}

function drag() {
  var c;
  if (mousedown) for (c=0; c<smokeyness; c++) if (tokey[c]===false) {
    toke[c].left=(tokex[c]=x-density/2)+"px";
    toke[c].top=(tokey[c]=y-density)+"px";
    toke[c].visibility="visible";
    tokedx[c]=(c%2?1.5:-1.5)*Math.random();
    nicotine[c]=80;
    break;
  }
  for (c=0; c<smokeyness; c++) if (tokey[c]!==false) smoke_rising(c);
}


document.onmousedown=function(){set_scroll();if(ie_version)setTimeout('mousedown=true', 51);else mousedown=true;};
document.onmouseup=function(){mousedown=false};

function smoke_rising(i) {
  var cancer;
  tokey[i]-=4+i%3;
  tokex[i]+=tokedx[i]-0.5+Math.random();
  if (tokey[i]>sdown-density*2 && tokex[i]>sleft && tokex[i]<sleft+swide-density && (nicotine[i]+=2)<256) {
    cancer=nicotine[i].toString(16);
    cancer="#"+cancer+cancer+cancer;
    if (ie_version && ie_version<10) toke[i].filter="Glow(Color="+cancer+",Strength="+Math.floor(nicotine[i]/5)+")";
    else if (ie_version) toke[i].textShadow='#000000 0px 0px '+Math.floor(nicotine[i]/5)+'px';
    else toke[i].textShadow=cancer+' 0px 0px '+Math.floor(nicotine[i]/5)+'px';
    toke[i].top=tokey[i]+"px";
    toke[i].left=tokex[i]+"px";
  }
  else {
    toke[i].visibility="hidden";
    tokey[i]=false;
  }
}

document.onmousemove=mouse;
function mouse(e) {
  if (e) {
    y=e.pageY;
    x=e.pageX;
  }
  else {
    set_scroll();
    y=event.y+sdown;
    x=event.x+sleft;
  }
}

window.onresize=set_width;
function set_width() {
  var sw_min=999999;
  var sh_min=999999;
  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
    if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
  }
  if (typeof(self.innerWidth)=='number' && self.innerWidth) {
    if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
    if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
  }
  if (document.body.clientWidth) {
    if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
    if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
  }
  if (sw_min==999999 || sh_min==999999) {
    sw_min=800;
    sh_min=600;
  }
  swide=sw_min;
  shigh=sh_min;
}

window.onscroll=set_scroll;
function set_scroll() {
  if (typeof(self.pageYOffset)=='number') {
    sdown=self.pageYOffset;
    sleft=self.pageXOffset;
  }
  else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
    sdown=document.body.scrollTop;
    sleft=document.body.scrollLeft;
  }
  else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
    sleft=document.documentElement.scrollLeft;
    sdown=document.documentElement.scrollTop;
  }
  else {
    sdown=0;
    sleft=0;
  }
}
  }
}