function initGame() {
  var style = document.createElement("style");

  style.innerHTML = `
.container,
      .container-fluid,
      .container-xxl,
      .container-xl,
      .container-lg,
      .container-md,
      .container-sm {
          --bs-gutter-x: 1.5rem;
          --bs-gutter-y: 0;
          width: 100%;
          padding-right: calc(var(--bs-gutter-x) * 0.5);
          padding-left: calc(var(--bs-gutter-x) * 0.5);
          margin-right: auto;
          margin-left: auto;
      }
      
      @media (min-width: 576px) {
          .container-sm,
          .container {
              max-width: 540px;
          }
      }
      
      @media (min-width: 768px) {
          .container-md,
          .container-sm,
          .container {
              max-width: 720px;
          }
      }
      
      @media (min-width: 992px) {
          .container-lg,
          .container-md,
          .container-sm,
          .container {
              max-width: 960px;
          }
      }
      
      @media (min-width: 1200px) {
          .container-xl,
          .container-lg,
          .container-md,
          .container-sm,
          .container {
              max-width: 1140px;
          }
      }
      
      @media (min-width: 1400px) {
          .container-xxl,
          .container-xl,
          .container-lg,
          .container-md,
          .container-sm,
          .container {
              max-width: 1320px;
          }
      }
      
      .row {
          --bs-gutter-x: 1.5rem;
          --bs-gutter-y: 0;
          display: flex;
          flex-wrap: wrap;
          margin-top: calc(-1 * var(--bs-gutter-y));
          margin-right: calc(-0.5 * var(--bs-gutter-x));
          margin-left: calc(-0.5 * var(--bs-gutter-x));
      }
      
      .row>* {
          flex-shrink: 0;
          width: 100%;
          max-width: 100%;
          padding-right: calc(var(--bs-gutter-x) * 0.5);
          padding-left: calc(var(--bs-gutter-x) * 0.5);
          margin-top: var(--bs-gutter-y);
      }
      
      .col {
          flex: 1 0 0%;
      }
      
      .col-auto {
          flex: 0 0 auto;
          width: auto;
      }
      
      .col-1 {
          flex: 0 0 auto;
          width: 8.33333333%;
      }
      
      .col-2 {
          flex: 0 0 auto;
          width: 16.66666667%;
      }
      
      .col-3 {
          flex: 0 0 auto;
          width: 25%;
      }
      
      .col-4 {
          flex: 0 0 auto;
          width: 33.33333333%;
      }
      
      .col-5 {
          flex: 0 0 auto;
          width: 41.66666667%;
      }
      
      .col-6 {
          flex: 0 0 auto;
          width: 50%;
      }
      
      .col-7 {
          flex: 0 0 auto;
          width: 58.33333333%;
      }
      
      .col-8 {
          flex: 0 0 auto;
          width: 66.66666667%;
      }
      
      .col-9 {
          flex: 0 0 auto;
          width: 75%;
      }
      
      .col-10 {
          flex: 0 0 auto;
          width: 83.33333333%;
      }
      
      .col-11 {
          flex: 0 0 auto;
          width: 91.66666667%;
      }
      
      .col-12 {
          flex: 0 0 auto;
          width: 100%;
      }
      
      @media (min-width: 576px) {
          .col-sm {
              flex: 1 0 0%;
          }
          .col-sm-auto {
              flex: 0 0 auto;
              width: auto;
          }
          .col-sm-1 {
              flex: 0 0 auto;
              width: 8.33333333%;
          }
          .col-sm-2 {
              flex: 0 0 auto;
              width: 16.66666667%;
          }
          .col-sm-3 {
              flex: 0 0 auto;
              width: 25%;
          }
          .col-sm-4 {
              flex: 0 0 auto;
              width: 33.33333333%;
          }
          .col-sm-5 {
              flex: 0 0 auto;
              width: 41.66666667%;
          }
          .col-sm-6 {
              flex: 0 0 auto;
              width: 50%;
          }
          .col-sm-7 {
              flex: 0 0 auto;
              width: 58.33333333%;
          }
          .col-sm-8 {
              flex: 0 0 auto;
              width: 66.66666667%;
          }
          .col-sm-9 {
              flex: 0 0 auto;
              width: 75%;
          }
          .col-sm-10 {
              flex: 0 0 auto;
              width: 83.33333333%;
          }
          .col-sm-11 {
              flex: 0 0 auto;
              width: 91.66666667%;
          }
          .col-sm-12 {
              flex: 0 0 auto;
              width: 100%;
          }
      }
      
      @media (min-width: 768px) {
          .col-md {
              flex: 1 0 0%;
          }
          .col-md-auto {
              flex: 0 0 auto;
              width: auto;
          }
          .col-md-1 {
              flex: 0 0 auto;
              width: 8.33333333%;
          }
          .col-md-2 {
              flex: 0 0 auto;
              width: 16.66666667%;
          }
          .col-md-3 {
              flex: 0 0 auto;
              width: 25%;
          }
          .col-md-4 {
              flex: 0 0 auto;
              width: 33.33333333%;
          }
          .col-md-5 {
              flex: 0 0 auto;
              width: 41.66666667%;
          }
          .col-md-6 {
              flex: 0 0 auto;
              width: 50%;
          }
          .col-md-7 {
              flex: 0 0 auto;
              width: 58.33333333%;
          }
          .col-md-8 {
              flex: 0 0 auto;
              width: 66.66666667%;
          }
          .col-md-9 {
              flex: 0 0 auto;
              width: 75%;
          }
          .col-md-10 {
              flex: 0 0 auto;
              width: 83.33333333%;
          }
          .col-md-11 {
              flex: 0 0 auto;
              width: 91.66666667%;
          }
          .col-md-12 {
              flex: 0 0 auto;
              width: 100%;
          }
      }
      
      @media (min-width: 992px) {
          .col-lg {
              flex: 1 0 0%;
          }
          .col-lg-auto {
              flex: 0 0 auto;
              width: auto;
          }
          .col-lg-1 {
              flex: 0 0 auto;
              width: 8.33333333%;
          }
          .col-lg-2 {
              flex: 0 0 auto;
              width: 16.66666667%;
          }
          .col-lg-3 {
              flex: 0 0 auto;
              width: 25%;
          }
          .col-lg-4 {
              flex: 0 0 auto;
              width: 33.33333333%;
          }
          .col-lg-5 {
              flex: 0 0 auto;
              width: 41.66666667%;
          }
          .col-lg-6 {
              flex: 0 0 auto;
              width: 50%;
          }
          .col-lg-7 {
              flex: 0 0 auto;
              width: 58.33333333%;
          }
          .col-lg-8 {
              flex: 0 0 auto;
              width: 66.66666667%;
          }
          .col-lg-9 {
              flex: 0 0 auto;
              width: 75%;
          }
          .col-lg-10 {
              flex: 0 0 auto;
              width: 83.33333333%;
          }
          .col-lg-11 {
              flex: 0 0 auto;
              width: 91.66666667%;
          }
          .col-lg-12 {
              flex: 0 0 auto;
              width: 100%;
          }
      }
      
      @media (min-width: 1200px) {
          .col-xl {
              flex: 1 0 0%;
          }
          .col-xl-auto {
              flex: 0 0 auto;
              width: auto;
          }
          .col-xl-1 {
              flex: 0 0 auto;
              width: 8.33333333%;
          }
          .col-xl-2 {
              flex: 0 0 auto;
              width: 16.66666667%;
          }
          .col-xl-3 {
              flex: 0 0 auto;
              width: 25%;
          }
          .col-xl-4 {
              flex: 0 0 auto;
              width: 33.33333333%;
          }
          .col-xl-5 {
              flex: 0 0 auto;
              width: 41.66666667%;
          }
          .col-xl-6 {
              flex: 0 0 auto;
              width: 50%;
          }
          .col-xl-7 {
              flex: 0 0 auto;
              width: 58.33333333%;
          }
          .col-xl-8 {
              flex: 0 0 auto;
              width: 66.66666667%;
          }
          .col-xl-9 {
              flex: 0 0 auto;
              width: 75%;
          }
          .col-xl-10 {
              flex: 0 0 auto;
              width: 83.33333333%;
          }
          .col-xl-11 {
              flex: 0 0 auto;
              width: 91.66666667%;
          }
          .col-xl-12 {
              flex: 0 0 auto;
              width: 100%;
          }
      }
      
      @media (min-width: 1400px) {
          .col-xxl {
              flex: 1 0 0%;
          }
          .col-xxl-auto {
              flex: 0 0 auto;
              width: auto;
          }
          .col-xxl-1 {
              flex: 0 0 auto;
              width: 8.33333333%;
          }
          .col-xxl-2 {
              flex: 0 0 auto;
              width: 16.66666667%;
          }
          .col-xxl-3 {
              flex: 0 0 auto;
              width: 25%;
          }
          .col-xxl-4 {
              flex: 0 0 auto;
              width: 33.33333333%;
          }
          .col-xxl-5 {
              flex: 0 0 auto;
              width: 41.66666667%;
          }
          .col-xxl-6 {
              flex: 0 0 auto;
              width: 50%;
          }
          .col-xxl-7 {
              flex: 0 0 auto;
              width: 58.33333333%;
          }
          .col-xxl-8 {
              flex: 0 0 auto;
              width: 66.66666667%;
          }
          .col-xxl-9 {
              flex: 0 0 auto;
              width: 75%;
          }
          .col-xxl-10 {
              flex: 0 0 auto;
              width: 83.33333333%;
          }
          .col-xxl-11 {
              flex: 0 0 auto;
              width: 91.66666667%;
          }
          .col-xxl-12 {
              flex: 0 0 auto;
              width: 100%;
          }
      }
body {
background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  height: 100%;
  background-size: 100%;
  background-repeat: no-repeat;
  min-height: 100vh;
  overflow: hidden;
}
.mainArea {
  background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 100%;
  max-width: 500px;
  height: 100%;
  max-height: 500px;
  border-radius: 0.7em;
}
#main {
  position:relative;
  margin:auto;
  width:360px;
  height:460px;
  top: 50%;
          left: 50%;
          position: absolute;
          transform: translate(-50%, -50%);
}
#toys {
  position:absolute;
  top:210px;
  left:102px;
  width:231px;
  height:121px;
  background-image:url(https://image.ibb.co/i7YAJz/toysBG.png);
}
.toy {
  position:absolute;
  top:30px;
  left:30px;
  width:50px;
  height:50px;
  background-image:url(https://image.ibb.co/n8g2WK/toys.png);
  background-size:350px 350px;
  background-position:0 0;
}
#moveContainer {
  position:absolute;
  top:343px;
  left:102px;
  width:231px;
  height:36px;
  background:#434242;
  border:2px solid #898989;
  border-radius:20px;
}
#moveControl {
  position:absolute;
  top:-2px;
  left:-2px;
  width:36px;
  height:36px;
  background:#303030;
  border:2px solid #898989;
  border-radius:50%;
  cursor:pointer;
}
#claw {
  position:absolute;
  top:65px;
  left:30px;
  width:60px;
  height:260px;
}
#clawBar {
  position:absolute;
  top:20px;
  left:27px;
  width:6px;
  height:15px;
  background:#5b5b5b;
}
#clawALL {
  position:absolute;
  top:0;
  left:0;
  width:60px;
}
#clawBall {
  position:absolute;
  top:31px;
  left:24px;
  width:6px;
  height:6px;
  border:6px solid #5b5b5b;
  border-radius:50%;
}
#leftClaw {
  position:absolute;
  top:36px;
  left:5px;
  width:16px;
  height:25px;
  border-top:8px solid #5b5b5b;
  border-left:4px solid #5b5b5b;
  transform-origin: top right;
  transform: rotate(-30deg);
}
#rightClaw {
  position:absolute;
  top:36px;
  right:4px;
  width:16px;
  height:25px;
  border-top:8px solid #5b5b5b;
  border-right:4px solid #5b5b5b;
  transform-origin: top left;
  transform: rotate(30deg);
}
#clawOpen {
  transform: rotate(0deg);
}
@-webkit-keyframes fullsize {
  from {
    transform:scale(1) translate(0,0)
  }
  to {
    transform:scale(4) translate(30px,-30px)
  }
}

`;

  document.head.append(style);




  var container = document.createElement("DIV");
  container.className = "container";

  container.innerHTML = `

<div class="row">
<div class="col-lg-12 bg">
<div class="mainArea">
<div id="main">
<svg width="360px" height="460px" version="1.1" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 3600000 4600000" style="position:absolute;top:0;left:0;">
<defs>
<linearGradient id="id0" gradientUnits="userSpaceOnUse" x1="1.13348e+06" y1="4.24542e+06" x2="2.46652e+06" y2="320943">
<stop offset="0" stop-opacity="1" stop-color="#5B5B5B"/>
<stop offset="1" stop-opacity="1" stop-color="#403F3F"/>
</linearGradient>
<linearGradient id="id1" gradientUnits="userSpaceOnUse" x1="580669" y1="3.44318e+06" x2="654583" y2="4.26414e+06">
<stop offset="0" stop-opacity="1" stop-color="#4A4A4A"/>
<stop offset="1" stop-opacity="1" stop-color="#1F1B20"/>
</linearGradient>
</defs>
<path fill="url(#id0)" d="M320943 169111l2958114 0c103737,0 188600,84934 188600,188588l0 4039550 -3335314 0 0 -4039550c0,-103737 84863,-188588 188600,-188588zm695757 3140950l0 -1210579 -46607 0 0 1210579 -704934 0 0 -2704529 3069682 0 0 2704529 -2318141 0z"/>
<rect fill="#C5C6C6" x="265159" y="697705" width="3069682" height="56989"/>
<rect fill="url(#id1)" stroke="#898989" stroke-width="19996.2" x="265159" y="3441070" width="704934" height="825183" rx="105154" ry="105154"/>
<rect fill="#434242" x="332353" y="4397249" width="154655" height="111095"/>
<rect fill="#434242" x="3112993" y="4397249" width="154655" height="111095"/>
<path fill="#FDF38E" fill-rule="nonzero" d="M555866 430940l0 -30638 -30638 0 0 -45638 76276 0 0 121914 -152706 0c-30531,0 -45791,-15260 -45791,-45792l0 -106914c0,-30531 15260,-45791 45791,-45791l152706 0 -59 30425 59 15213 -137599 0c-10158,0 -15260,5102 -15260,15319l0 76583c0,10216 10204,15319 30638,15319l76583 0zm91382 45638l0 -198497 152553 0c30425,0 45638,15260 45638,45850l0 30532c0,30579 -15213,45839 -45638,45839l-15319 0 60957 45744 0 30532 -26268 0 -111025 -76276 -15260 0 0 76276 -45638 0zm45638 -121914l91643 0c10157,0 15272,-5162 15272,-15473 0,-10311 -5115,-15472 -15272,-15472l-91643 0 0 30945zm244242 121914l-45638 0 0 -152706c0,-30531 15213,-45791 45638,-45791l106914 0c30426,0 45638,15260 45638,45791l0 152706 -45638 0 0 -61264 -106914 0 0 61264zm91643 -152859l-76383 0c-10157,0 -15260,5102 -15260,15319l0 30638 106914 0 0 -30638c0,-10217 -5114,-15319 -15271,-15319zm305151 107115c0,30484 -15213,45744 -45638,45744l-152552 0 0 -198497 122020 0 30532 0c30425,0 45638,15319 45638,45909l0 30567c0,15060 -7984,23138 -23870,24131 15886,-1725 23870,10570 23870,36933l0 15213zm-152552 -76170l91642 0c10170,0 15272,-5162 15272,-15473 0,-10311 -5102,-15472 -15272,-15472l-91642 0 0 30945zm0 76276l91642 0c10170,0 15272,-5103 15272,-15319 0,-10217 -5102,-15319 -15272,-15319l-91642 0 0 30638zm397195 45638l-45626 0 0 -152706c0,-30531 15201,-45791 45626,-45791l106915 0c30425,0 45638,15260 45638,45791l0 152706 -45638 0 0 -61264 -106915 0 0 61264zm91655 -152859l-76383 0c-10157,0 -15272,5102 -15272,15319l0 30638 106915 0 0 -30638c0,-10217 -5103,-15319 -15260,-15319zm259915 152859l0 -198497 152552 0c30425,0 45638,15260 45638,45850l0 30532c0,30579 -15213,45839 -45638,45839l-106914 0 0 76276 -45638 0zm45638 -121914l91642 0c10169,0 15272,-5162 15272,-15473 0,-10311 -5103,-15472 -15272,-15472l-91642 0 0 30945zm198603 121914l0 -198497 152553 0c30425,0 45638,15260 45638,45850l0 30532c0,30579 -15213,45839 -45638,45839l-15319 0 60957 45744 0 30532 -26268 0 -111024 -76276 -15260 0 0 76276 -45639 0zm45639 -121914l91642 0c10169,0 15272,-5162 15272,-15473 0,-10311 -5103,-15472 -15272,-15472l-91642 0 0 30945zm396841 121914l-198285 0 0 -45638 76323 0 0 -107221 -76323 0 0 -45638 198285 0 0 45638 -76324 0 0 107221 76324 0 0 45638zm46004 -198497l198450 0 0 38185 -122115 114674 122115 0 0 45638 -198450 0 0 -37926 122115 -114933 -122115 0 0 -45638zm244242 198497l0 -198497 198296 0 0 45638 -152658 0 0 30945 122127 0 0 45638 -122127 0 0 30638 152658 0 0 45638 -198296 0zm244242 -61111l0 -114508c0,-15272 7618,-22878 22830,-22878 15201,0 22808,7606 22808,22878l0 114508 -45638 0zm23598 61111c-15732,0 -23598,-7819 -23598,-23445 0,-14799 7452,-22193 22346,-22193 15532,0 23292,7866 23292,23598 0,14693 -7347,22040 -22040,22040z"/>
<g id="b_drop" style="cursor:pointer;display:none;">
<path fill="#434242" stroke="#898989" stroke-width="19996.2" d="M2261188 4266252l883447 0c104623,0 190206,-85583 190206,-190206l0 -11c0,-104623 -85607,-190206 -190206,-190206l-883447 0c-104599,0 -190206,85607 -190206,190206l0 11c0,104600 85583,190206 190206,190206z"/>
<path fill="#FDF38E" fill-rule="nonzero" d="M2467481 4123114c0,26905 -13406,40346 -40205,40346l-134387 0 0 -174851 107481 0 26906 0c26799,0 40205,13441 40205,40335l0 94170zm-134387 141l80729 0c8941,0 13453,-4488 13453,-13488l0 -67465c0,-9000 -4512,-13488 -13453,-13488l-80729 0 0 94441zm174946 40205l0 -174851 134387 0c26799,0 40205,13441 40205,40382l0 26894c0,26941 -13406,40382 -40205,40382l-13500 0 53705 40300 0 26893 -23138 0 -97796 -67193 -13453 0 0 67193 -40205 0zm40205 -107398l80729 0c8941,0 13453,-4535 13453,-13630 0,-9083 -4512,-13618 -13453,-13618l-80729 0 0 27248zm349538 67052c0,26905 -13406,40346 -40205,40346l-94182 0c-26799,0 -40205,-13441 -40205,-40346l0 -94170c0,-26894 13406,-40335 40205,-40335l94182 0c26799,0 40205,13441 40205,40335l0 94170zm-134387 -80812l0 67465c0,9000 4500,13488 13453,13488l67276 0c8941,0 13453,-4488 13453,-13488l0 -67465c0,-9000 -4512,-13488 -13453,-13488l-67276 0c-8953,0 -13453,4488 -13453,13488zm174946 121158l0 -174851 134387 0c26799,0 40205,13441 40205,40382l0 26894c0,26941 -13406,40382 -40205,40382l-94182 0 0 67193 -40205 0zm40205 -107398l80729 0c8941,0 13453,-4535 13453,-13630 0,-9083 -4512,-13618 -13453,-13618l-80729 0 0 27248z"/>
</g>
</svg>
<div id="toys"></div>
<div id="claw">
<div style="position:absolute;top:0;left:10px;width:40px;height:20px;background:#5b5b5b;border-radius:5px;"></div>
<div id="clawBar"></div>
<div id="clawALL">
<div id="clawBall"></div>
<div id="leftClaw"></div>
<div id="rightClaw"></div>
</div>
</div>
<div id="moveContainer">
<div id="moveControl"></div>
</div>
<div style="position:absolute;top:331px;left:35px;width:52px;height:12px;background-color:#565656;border-bottom:2px solid #898989;"></div>
</div>
</div></div></div>

`;
  document.body.appendChild(container);


  var script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js";
  var script2 = document.createElement("script");
  script2.src = "https://cdn.jsdelivr.net/npm/jquery-hammerjs@2.0.0/jquery.hammer.min.js";
  var script3 = document.createElement("script");
  script3.src = "https://hammerjs.github.io/dist/hammer.js";
  document.head.append(script);
  document.head.append(script3);
  document.head.append(script2);
  script3.onload = runGame;

  function runGame() {

      var isDragging = false;
      var toyOffset;
      $(document).ready(function() {
          $("body").on("click", "#b_drop", function() {
              toyOffset = $(".toy").offset();
              $("#b_drop,#moveContainer").hide();
              openClaws();
              $("#clawBar").stop().animate({
                  "height": "+=180px"
              }, {
                  duration: 1000,
                  easing: "linear",
                  complete: function() {}
              });
              $("#clawALL").stop().animate({
                  "top": "+=180px"
              }, {
                  duration: 1000,
                  easing: "linear",
                  step: function() {
                      clawBallOffset = $("#clawBall").offset();
                      var horizontalOK = ((clawBallOffset.left - 31) < toyOffset.left) && ((clawBallOffset.left + 37) > toyOffset.left + 50);
                      if ((clawBallOffset.top + 10) > toyOffset.top && horizontalOK) {
                          // WIN (TAKE THE TOY)
                          $("#clawALL,#clawBar").stop();
                          closeClaws();
                          var bgPos = $(".toy").css("background-position");
                          var htmlToy = "<div class='toy' style='background-position:" + (bgPos) + ";top:35px;left:6px;'></div>";
                          $(".toy").remove();
                          $("#clawALL").append(htmlToy);
                          $("#clawBar").stop().animate({
                              "height": "15px"
                          }, {
                              duration: 1000,
                              easing: "linear",
                              complete: function() {}
                          });
                          $("#clawALL").stop().animate({
                              "top": "0px"
                          }, {
                              duration: 1000,
                              easing: "linear",
                              complete: function() {
                                  $("#claw").stop().animate({
                                      "left": "30px"
                                  }, {
                                      duration: 1000,
                                      easing: "linear",
                                      complete: function() {
                                          openClaws();
                                          $(".toy").stop().animate({
                                              "top": "+=260px"
                                          }, {
                                              duration: 1000,
                                              easing: "linear",
                                              complete: function() {
                                                  $(".toy").css({
                                                      "z-index": "100",
                                                      "animation": "fullsize 1s 1 linear",
                                                      "transform": "scale(4) translate(30px,-30px)"
                                                  });

                                                  setTimeout(function() {
                                                      $(".toy").stop().animate({
                                                          "opacity": "0"
                                                      }, {
                                                          duration: 500,
                                                          easing: "linear",
                                                          complete: function() {
                                                              $("#moveControl").css("left", "-2px");
                                                              $("#moveContainer").show();
                                                              $(".toy").remove();
                                                              firePopup();
                                                              placeToy();
                                                          }
                                                      });
                                                  }, 1500);
                                              }
                                          });
                                          setTimeout(function() {
                                              closeClaws();
                                          }, 300);
                                      }
                                  });
                              }
                          });
                      }
                  },
                  complete: function() {
                      // LOSE (NO TOY TAKEN)
                      closeClaws();
                      $("#clawBar").stop().animate({
                          "height": "-=180px"
                      }, {
                          duration: 1000,
                          easing: "linear",
                          complete: function() {}
                      });
                      $("#clawALL").stop().animate({
                          "top": "-=180px"
                      }, {
                          duration: 1000,
                          easing: "linear",
                          complete: function() {
                              $("#claw").stop().animate({
                                  "left": "30px"
                              }, {
                                  duration: 1000,
                                  easing: "linear",
                                  complete: function() {
                                      openClaws();
                                      setTimeout(function() {
                                          closeClaws();
                                          $("#moveControl").css("left", "-2px");
                                          $("#moveContainer").show();
                                          $(".toy").remove();
                                          placeToy();
                                      }, 300);
                                  }
                              });
                          }
                      });
                  }
              });
          });
          createCloseButton();
          var horizontal = document.getElementById("moveControl");
          var mc_horizontal = new Hammer(horizontal);
          mc_horizontal.add(new Hammer.Pan({
              direction: Hammer.DIRECTION_HORIZONTAL,
              threshold: 0
          }));
          mc_horizontal.on("pan", handle_horizontal);
          placeToy();
      });

      function openClaws() {
          $("#rightClaw,#leftClaw").css({
              "transform": "rotate(0deg)"
          });
      }

      function closeClaws() {
          $("#rightClaw").css({
              "transform": "rotate(30deg)"
          });
          $("#leftClaw").css({
              "transform": "rotate(-30deg)"
          });
      }

      function placeToy() {
          var col = Math.floor(Math.random() * 7);
          var row = Math.floor(Math.random() * 7);
          var toyTop = Math.floor(Math.random() * 70);
          var toyLeft = Math.floor(Math.random() * 160);
          var htmlToy = "<div class='toy' style='background-position:" + (col * 50) + "px " + (row * 50) + "px;top:" + (toyTop) + "px;left:" + (toyLeft) + "px;'></div>";
          $("#toys").append(htmlToy);
      }

      function handle_horizontal(ev) {
          var elem = ev.target;
          if (!isDragging) {
              isDragging = true;
              lastPosX = elem.offsetLeft;
          }
          var posX = ev.deltaX + lastPosX;
          if (posX < -2) posX = -2;
          if (posX > 193) posX = 193;
          elem.style.left = posX + "px";
          var clawPosX = posX * 165 / 193 + 105;
          $("#claw").css({
              "left": (clawPosX) + "px"
          });
          $("#b_drop").show();
          if (ev.isFinal) {
              isDragging = false;
          }
      }
  }

  function createCloseButton() {
      var closeButton = document.createElement("BUTTON");
      closeButton.id = "closeButton";
      closeButton.innerHTML = "&#10006;";
      closeButton.style.position = "absolute";
      closeButton.style.right = "0px";
      closeButton.style.top = "0px";
      closeButton.style.border = "0";
      closeButton.style.color = "#000";
      closeButton.style.padding = "5px 10px";
      closeButton.style.cursor = "pointer";
      closeButton.style.fontSize = "29px";
      closeButton.style.transition = "1s all";
      closeButton.style.borderRadius = "15px";
      closeButton.style.backgroundColor = 'rgba(0,0,0,0)';
      closeButton.style.zIndex = "999";
      closeButton.style.transform = "translate3d(0,0,3px)";

      // closeButton.addEventListener("click", function() {
      //     utils.close();
      //     document.querySelector("#" + generalData.id) ? document.querySelector("#" + generalData.id).remove() : null;
      //     document.querySelector("#" + componentsData.mailSubsScreen.id) ? document.querySelector("#" + componentsData.mailSubsScreen.id).remove() : null;
      //     document.querySelector("#" + componentsData.rulesScreen.id) ? document.querySelector("#" + componentsData.rulesScreen.id).remove() : null;
      //     document.querySelector("#" + generalData.closeButtonId) ? document.querySelector("#" + generalData.closeButtonId).remove() : null;
      //     document.documentElement.style.overflow = 'auto';
      //     utils.pauseSound();
      //     console.log('Oyun Kapatıldı');
      //     window.location.href = "index.html";
      // });

      document.querySelector(".mainArea").appendChild(closeButton);
  }


  function firePopup() {
      const config = {
          desktopWidth: "500px",
          mobileWidth: "300px",
          img: "clawmachinepopimg.jpeg",
          url: "https://www.example.com/"
      };

      function FirePopup() {
          document.querySelector(".container").remove();
          if (!document.querySelector(".vl-popup-container")) {
              var style = document.createElement("style");
              style.innerHTML = `
          .vl-popup-container {
              z-index: 100000;
              width: 100%;
              height: 100%;
              position: fixed;
              top: 0;
              left: 0;
          }
          
          .vl-popup-overlay {
              z-index: 10000;
              width: 100%;
              height: 100%;
              background: black;
              opacity: 0.8;
              position: fixed;
              top: 0;
              left: 0;
          }
          
          .vl-popup {
              position: absolute;
              z-index: 100001;
              width:${config.desktopWidth};
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              -webkit-transform: translate(-50%, -50%);
          }
          
          .vl-popup-image {
              width:${config.desktopWidth};
          }
          
          .vl-popup-close {
              position: absolute;
              right: 5px;
              top: 5px;
              cursor: pointer;
              z-index: 100002;
              width: 25px;
              height: 25px;
          }
          
          @media only screen and (max-width: 768px) {
              .vl-popup {
                  width:${config.mobileWidth};
              }
          
              .vl-popup-image {
                  width:${config.mobileWidth};
              }
          
              .vl-popup-close {
                  font-size: 15px;
                  line-height: 15px;
              }
          }
          `;
              document.head.append(style);

              const div = document.createElement("div");
              div.setAttribute("class", "vl-popup-container");
              div.innerHTML = `
          <div class="vl-popup-overlay"></div> 
          <div class="vl-popup">
            <img class="vl-popup-close" src="https://img.visilabs.net/banner/uploaded_images/323_1326_20210127153709279.png">
            <a href=${config.url}>
              <img src=${config.img} class="vl-popup-image" alt="vl-popup-image" />
            </a>
          </div>
          `;
              document.body.append(div);

              div.querySelector(".vl-popup-overlay").addEventListener("click", closePopup);
              div.querySelector(".vl-popup-close").addEventListener("click", closePopup);

              div.querySelector("a").addEventListener("click", clickPopup);

              function closePopup() {
                  div.remove();
                  initGame();
              }
              var coupon = "KZN3635";

              function copyCoupon(coupon) {
                  if (!navigator.clipboard) {
                      var elem = document.createElement("textarea");
                      document.body.appendChild(elem);
                      elem.value = coupon;
                      elem.select();
                      document.execCommand("copy");
                      document.body.removeChild(elem);
                  } else {
                      navigator.clipboard.writeText(coupon);
                  }
              }


              function clickPopup() {
                  copyCoupon(coupon);
                  alert("Kodunuz Kopyalandı.");
                  closePopup();

              }

          }
      }

      FirePopup();

  }
}
initGame();