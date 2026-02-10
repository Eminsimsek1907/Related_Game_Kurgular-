function initGame() {
	var campID = 316;
	var w_img = "https://img.euromsg.net/3EEFFBAD63444ABF9F3DAF0FC1C3D9DE/images/cark22/krc-cark-25022022.png";
	if (localStorage.getItem("OM.wheel-mar23") == null && jQuery('#vl-game-form').length == 0) {
		var style = '<style id="vl-wheel-first-step">#vl-game-form-overlay{transform: translate3d(0 , 0 , 3px);z-index: 1000000001!important;position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(236 210 219); opacity: 0.7;}\
			#vl-game-form{transform: translate3d(0 , 0 , 3px);position: fixed; top: 0; left: 0; bottom: 0; right: 0; margin: auto; height: 381px; width: 700px; background-image:url(https://img.euromsg.net/3EEFFBAD63444ABF9F3DAF0FC1C3D9DE/images/cark22/krc-cark25022022bg-700x381.jpg);z-index: 1000000002!important; box-shadow: 0px 0px 8px #fabc9b; border-radius: 5px;}\
			#vl-form-close{position: absolute; top: 4px; right: 4px; width: 20px; cursor: pointer; opacity: 0.7; z-index: 1000000002;}\
			#vl-form-close:hover{opacity: 1}\
			#vl-wheel-container{width:310px;height:100%;position:absolute;left:30px}\
			#vl-wheel-content{width:310px;right:30px;position:absolute;height:100%}\
			#wheel{position: absolute; top:38px;left:0;right:0;margin:auto;width:300px;-moz-border-radius:250px;-webkit-border-radius:250px;border-radius:250px;-webkit-transition:-webkit-transform .5s linear;-moz-transition:-moz-transform .5s linear;-opera-transition:-opera-transform .5s linear;-ms-transition:transform .5s linear}\
			#tick{z-index: 99;position: absolute;left: 0;right:3px; margin:auto; width:26px; height: 35px;top: 30px;}\
			#vl-text-bold{font-weight:900;font-size:40px;top:90px}\
			#vl-text-normal{font-weight:300;font-size:27px;top:155px}\
			.vl-text{text-align:center;position:absolute;left:0;right:0;margin:auto; color: black}\
			.vl-spin-button{background:black;color:white;position: absolute;cursor: pointer;right:0;left:0;margin:auto;bottom: 105px;width: 130px;height: 40px; border:none;border-radius:10px}\
			@media only screen and (max-width: 700px) {\
				#vl-game-form{width: 300px; height: 400px;background-image:url(https://img.euromsg.net/3EEFFBAD63444ABF9F3DAF0FC1C3D9DE/images/cark22/krc-cark25022022bg-300x400.jpg)}\
				#vl-form-close{top:3px;right:3px}\
				#vl-wheel-container{width:100%;height:240px;left:0;right:0;margin:auto;top:0}\
				#vl-wheel-content{width:100%;height:125px;left:0;right:0;margin:auto;top:275px}\
				#vl-text-bold{font-size:23px;top:0px}\
				#vl-text-normal{font-size:16px;top:33px}\
				#wheel{width: 235px; top: 26px; left: 0; right: 0; margin:auto;}\
				#tick{top:13px;}\
				.vl-spin-button{bottom: 25px;width: 120px;height: 35px;font-size:14px}\
			}\
			</style>';
		var html = '<div id="vl-game-form-overlay"></div><div id="vl-game-form">\
			<button id="vl-form-close" style="position: absolute; width:auto; right: 0px; top: 0px; border: 0px; color: #fff; padding: 5px 10px; cursor: pointer; font-size: 29px; transition: all 1s ease 0s; border-radius: 10px; background-color: rgba(0, 0, 0, 0); z-index: 999; transform: translate3d(0px, 0px, 3px);">✖</button>\
    			<div id="vl-wheel-container">\
    				<div id="tick"><img src="https://img.euromsg.net/3EEFFBAD63444ABF9F3DAF0FC1C3D9DE/images/cark-aralik/krc-cark-cengel.png" style="width:100%;transform: rotate(30deg);"/></div>\
    				<img id="wheel" src="'+ w_img + '" data-rotation="0"/>\
    			</div>\
    			<div id="vl-wheel-content">\
    				<div id="vl-text-bold" class="vl-text">ÇARKI ÇEVİR</div>\
    				<div id="vl-text-normal" class="vl-text">HEDİYELERİ YAKALA!</div>\
    				<button id="spin" class="vl-spin-button">BAŞLA</button>\
    			</div>\
        	</div>';
		jQuery('head').append(style);
		jQuery('body').append(html);
		try { VLSendImpressionFunc(campID, 4); } catch (e) { };
		jQuery('#vl-form-close').click(function () {
			jQuery('#vl-game-form-overlay, #vl-game-form').remove();
			location.href = "/"
		});
		jQuery('.vl-spin-button').click(function () {
			try { VLSendClickFunc(campID, 4); } catch (e) { };
		});
		function finalize(coupon, text, link) {
			var style = '<style>#vl-wheel-container{opacity:0.7}\
				#vl-result-title{font-size:30px;font-weight:600;top:35px}\
				#vl-result-text{font-size: 16px;font-weight:500;width: 95%;top: 85px;text-align: center;}\
				#vl-result-label{font-size:12px;width:75%;top:140px;}\
				#vl-wheelCouponCode{border: 3px dashed black;outline:none; background: transparent;position: absolute;top:185px;right: 0;left:0;margin:auto;font-weight:800;text-align: center;width: 165px;font-size: 20px;color:black;padding:8px;border-radius:10px}\
				#vl-wheelCopyButton{position:absolute;cursor:pointer;right:0;left:0;margin:auto;top:245px;width:165px;background-color:black;color:white;font-weight:500;border-radius:10px;text-align:center;padding:7px;font-size:14px}\
				#vl-label{font-size: 9px; bottom: 60px;}\
				#vl-label-2{font-size:9px;bottom:30px;width:95%}\
				@media only screen and (max-width: 500px) {\
					#vl-wheel-container{display:none}\
					#vl-wheel-content{height:100% !important; top: 0 !important}\
					#vl-result-title{font-size:23px;top: 30px;}\
					#vl-result-text{top: 75px;font-size: 13.5px;width:80%}\
					#vl-result-label{top:130px;font-size:12px}\
					#vl-wheelCouponCode{top:178px;height:45px;width:150px;font-size:18px}\
					#vl-wheelCopyButton{top:255px;width: 150px;font-size:12px;padding: 8px;}\
					#vl-label{font-size: 9px; bottom: 80px;}\
					#vl-label-2{font-size:9px;bottom:35px;width:70%}\
				}\
				</style>';
			jQuery('head').append(style);
			jQuery('#vl-text-bold, #vl-text-normal, #vl-icon').remove();
			jQuery('.vl-spin-button').remove();
			jQuery('#vl-wheel-content').append('<div id="vl-result-title" class="vl-text">TEBRİKLER!</div>');
			jQuery('#vl-wheel-content').append('<div id="vl-result-text" class="vl-text">' + text + '</div>');
			jQuery('#vl-wheel-content').append('<div id="vl-result-label" class="vl-text">7 Mart 08:00’a Kadar İndirim Kodunu Kullanabilirsin.');
			jQuery('#vl-wheel-content').append('<input type="text" value="' + coupon + '" id="vl-wheelCouponCode" readonly/>');
			jQuery('#vl-wheel-content').append('<div id="vl-wheelCopyButton">KODU KOPYALA VE SEÇİLİ ÜRÜNLERE GİT</div>');
			jQuery('#vl-wheel-content').append('<div id="vl-label" class="vl-text">*Bu fırsat farklı fırsatlar ile birleştirilemez.</div>');
			jQuery('#vl-wheel-content').append('<div id="vl-label-2" class="vl-text">*Kupon kodu x markalarda geçerlidir.</div>');
			document.getElementById('vl-wheelCopyButton').addEventListener("click", function () {
				var copyText = document.getElementById("vl-wheelCouponCode");
				copyText.select();
				document.execCommand("copy");
				window.location = link;
				createMsg("Kopyalandı")
			});
		}
		Array.prototype.randomize = function () {
			var i = this.length;
			if (i === 0) return false;
			while (--i) {
				var j = Math.floor(Math.random() * (i + 1));
				var tempi = this[i];
				var tempj = this[j];
				this[i] = tempj;
				this[j] = tempi;
			}
		};
		Array.prototype.toObject = function () {
			var o = {};
			for (var i = 0; i < this.length; i++) {
				o[this[i]] = '';
			}
			return o;
		};
		function bindEvent(el, eventName, eventHandler) {
			if (el.addEventListener) {
				el.addEventListener(eventName, eventHandler, false);
			} else if (el.attachEvent) {
				el.attachEvent('on' + eventName, eventHandler);
			}
		}
		function div(parent, className) {
			var r = document.createElement('div');
			r.className = className;
			parent.appendChild(r);
			return r;
		}
		var Wheel = (function () {
			var wheel = document.getElementById('wheel'),
				wheelValues = ["%10 İndirim", "%15 İndirim", "100TL İndirim", "125TL İndirim", "150TL İndirim", "200TL İndirim"],
				spinTimeout = false,
				spinModifier = function () {
					var rand = Math.random();
					return (rand * 10) + 35;
				},
				modifier = spinModifier(),
				slowdownSpeed = 0.15,
				prefix = (function () {
					if (document.body.style.MozTransform !== undefined) {
						return "MozTransform";
					} else if (document.body.style.WebkitTransform !== undefined) {
						return "WebkitTransform";
					} else if (document.body.style.OTransform !== undefined) {
						return "OTransform";
					} else {
						return "";
					}
				}()),
				degreeToRadian = function (deg) {
					return deg / (Math.PI * 180);
				};
			function Wheel() { }
			Wheel.prototype.rotate = function (degrees) {
				var val = "rotate(-" + degrees + "deg)";
				if (wheel.style[prefix] !== undefined) wheel.style[prefix] = val;
				var rad = degreeToRadian(degrees % 360),
					filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + rad + ", M12=-" + rad + ", M21=" + rad + ", M22=" + rad + ")";
				if (wheel.style.filter !== undefined) wheel.style.filter = filter;
				wheel.setAttribute("data-rotation", degrees);
			};
			Wheel.prototype.addEventListener = function (eventName, eventHandler) {
				wheel.addEventListener(eventName, eventHandler, false);
			}
			Wheel.prototype.spin = function (callback, amount) {
				document.getElementById("spin").style.display = "none";
				var _this = this;
				clearTimeout(spinTimeout);
				modifier -= slowdownSpeed;
				if (amount === undefined) {
					amount = parseInt(wheel.getAttribute('data-rotation'), 10);
				}
				this.rotate(amount);
				if (modifier > 0) {
					spinTimeout = setTimeout(function () {
						_this.spin(callback, amount + modifier);
					}, 20);
				} else {
					var dataRotation = parseInt(wheel.getAttribute('data-rotation'), 10);
					modifier = spinModifier();
					var divider = 360 / wheelValues.length;
					var offset = divider / 2; //half division
					var wheelValue = wheelValues[Math.floor(Math.ceil((dataRotation + offset) % 360) / divider)];
					return callback(wheelValue);
				}
			};
			return Wheel;
		})();
		var WheelGame = (function () {
			var wheel = new Wheel(),
				spinWheel = document.getElementById('spin')
			function WheelGame() {
				var spinTheWheel = function () {
					wheel.spin(function (valueSpun) {
						var coupon, text, link;
						if (valueSpun == "%10 İndirim") {
							coupon = "CA10";
							text = "Seçili Ürünlerde Sepette Ekstra %10 İndirim Kazandın!";
							link = "#";
						}
						else if (valueSpun == "%15 İndirim") {
							coupon = "CA15";
							text = "Seçili Ürünlerde Sepette Ekstra %15 İndirim Kazandın!";
							link = "#";
						}
						else if (valueSpun == "100TL İndirim") {
							coupon = "CA100";
							text = "Seçili Ürünlerde 600 TL ve Üzeri Alışverişte 100 TL İndirim Kazandın!";
							link = "#";
						}
						else if (valueSpun == "125TL İndirim") {
							coupon = "CA125";
							text = "Seçili Ürünlerde 800 TL ve Üzeri Alışverişte 125 TL İndirim Kazandın!";
							link = "#";
						}
						else if (valueSpun == "150TL İndirim") {
							coupon = "CA150";
							text = "Seçili Ürünlerde 1000 TL ve Üzeri Alışverişte 150 TL İndirim Kazandın!";
							link = "#";
						}
						else if (valueSpun == "200TL İndirim") {
							coupon = "CA200";
							text = "Seçili Ürünlerde 1200 TL ve Üzeri Alışverişte  200 TL İndirim Kazandın!";
							link = "#";
						}
						else {
							alert(valueSpun);
							return false;
						}
						setTimeout(function () {
							finalize(coupon, text, link);
						}, 1000);
						//localStorage.setItem("OM.wheel-mar22", "coupon+"+coupon+"+"+text+"+"+link);
					});
				};
				bindEvent(spinWheel, "click", spinTheWheel);
				bindEvent(wheel, "click", spinTheWheel);
			}
			return WheelGame;
		})();
		//function isPrivateMode(){return new Promise(function(e){var n,t,r=function(){e(!0)},o=function(){e(!1)};if(((n=/(?=.*(opera|chrome)).*/i.test(navigator.userAgent)&&navigator.storage&&navigator.storage.estimate)&&navigator.storage.estimate().then(function(e){return e.quota<1e9?r():o()}),!n)&&(!function(){var e="MozAppearance"in document.documentElement.style;if(e)if(null==indexedDB)r();else{var n=indexedDB.open("inPrivate");n.onsuccess=o,n.onerror=r}return e}()&&!function(){var e=navigator.userAgent.match(/Version\/([0-9\._]+).*Safari/);if(e){if(parseInt(e[1],10)<11)return function(){try{localStorage.length?o():(localStorage.setItem("inPrivate","0"),localStorage.removeItem("inPrivate"),o())}catch(e){navigator.cookieEnabled?r():o()}return!0}();try{window.openDatabase(null,null,null,null),o()}catch(e){r()}}return!!e}()&&((t=!window.indexedDB&&(window.PointerEvent||window.MSPointerEvent))&&r(),!t)))return o()})};
		//isPrivateMode().then(function(data){
		//if(!data){
		var Game = new WheelGame();
		//}
		//});
	}


	function createMsg(text, danger) {
		console.log("qq");
		randNum = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		const randId = randNum(1, 999999);
		var msg = document.createElement("div");
		msg.id = "vlMsg" + randId;
		msg.innerText = text;
		msg.style.zIndex = "1000000002";
		msg.style.padding = "20px 25px";
		msg.style.borderRadius = "15px";
		msg.style.position = "fixed";
		msg.style.verticalAlign = "middle";
		msg.style.textAlign = "center";
		msg.style.top = "-250px";
		msg.style.color = "white";
		msg.style.fontSize = "16px";
		msg.style.background = danger ? "#fb6a78" : "rgb(154 161 223)";
		msg.style.transform = "translate(-50%, -50%)";
		msg.style.boxShadow = "0px 0px 8px 0px "+(danger ? "#fb6a78" : "rgb(154 161 223)");
		msg.style.left = "50%";
		msg.style.transition = "all .2s linear 0s";
		document.body.appendChild(msg);
		setTimeout(() => {
			document.querySelector("#vlMsg" + randId).style.top = "5%"
		}, 200);
		setTimeout(() => {
			document.querySelector("#vlMsg" + randId).style.opacity = "0"
		}, 2700);
		setTimeout(() => {
			document.querySelector("#vlMsg" + randId).remove()
		}, 3000);
	}
}