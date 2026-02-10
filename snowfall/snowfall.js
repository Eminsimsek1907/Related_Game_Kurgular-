function initGame() {
var snow=document.createElement("div");
snow.id="vl-snow";
document.body.prepend(snow);
var style=document.createElement("style");
style.innerHTML=`
#vl-snow {           
    position: fixed;           
    top: 0;           
    left: 0;           
    right: 0;           
    bottom: 0;           
    pointer-events: none;           
    z-index: 1000;       
} `;
document.head.appendChild(style);
var script=document.createElement("script");
script.src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
script.onload=function(){
    particlesJS("vl-snow",
    {particles:{number:{value:200,density:{enable:!0,value_area:800}},
    color:{value:"#ffffff"},
    opacity:{value:.7,random:!1,anim:{enable:!1}},
        size:{value:5,random:!0,anim:{enable:!1}},
        line_linked:{enable:!1},
        move:{enable:!0,speed:2,direction:"bottom",random:!0,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!0,rotateX:300,rotateY:1200}}},
        interactivity:{events:{onhover:{enable:!1},onclick:{enable:!1},resize:!1}},retina_detect:!0})
    };
    
    document.head.append(script);
}
initGame();