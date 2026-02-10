(function () {
    var campID = 146;
    var campName = "Valentines - Jackpot";
    function jackpot() {
        var completed = 0,
            imgHeight = 456,
            posArr = [
                0,
                114,
                228,
                342,
            ];
        var a, b, c;
        var win = [];
        win[0] = 1;
        win[114] = 2;
        win[228] = 3;
        win[342] = 4;
        if (window.innerWidth < 700) {
            imgHeight = 356;
            posArr = [
                0,
                89,
                178,
                267,
            ];
            win[0] = 1;
            win[89] = 2;
            win[178] = 3;
            win[267] = 4;
        }
        var atempt = 0;
        var limit = 1;
        var status = 'lose';
        var random = Math.floor(Math.random() * imgHeight);
        function execute() {
            !function (t) { t._spritely = { animate: function (e) { var s = t(e.el), i = s.attr("id"); if ((e = t.extend(e, t._spritely.instances[i] || {})).play_frames && !t._spritely.instances[i].remaining_frames && (t._spritely.instances[i].remaining_frames = e.play_frames + 1), "sprite" == e.type && e.fps) { var n, r = function (s) { var r = e.width; e.height; if (!n) { n = [], total = 0; for (var a = 0; a < e.no_of_frames; a++)n[n.length] = 0 - total, total += r } 1 == e.rewind ? t._spritely.instances[i].current_frame <= 0 ? t._spritely.instances[i].current_frame = n.length - 1 : t._spritely.instances[i].current_frame = t._spritely.instances[i].current_frame - 1 : t._spritely.instances[i].current_frame >= n.length - 1 ? t._spritely.instances[i].current_frame = 0 : t._spritely.instances[i].current_frame = t._spritely.instances[i].current_frame + 1; var p = t._spritely.getBgY(s); if (s.css("background-position", n[t._spritely.instances[i].current_frame] + "px " + p), e.bounce && e.bounce[0] > 0 && e.bounce[1] > 0) { var o = e.bounce[0], c = e.bounce[1], l = e.bounce[2]; s.animate({ top: "+=" + o + "px", left: "-=" + c + "px" }, l).animate({ top: "-=" + o + "px", left: "+=" + c + "px" }, l) } }; if (t._spritely.instances[i].remaining_frames && t._spritely.instances[i].remaining_frames > 0) { if (t._spritely.instances[i].remaining_frames--, 0 == t._spritely.instances[i].remaining_frames) return t._spritely.instances[i].remaining_frames = -1, void delete t._spritely.instances[i].remaining_frames; r(s) } else -1 != t._spritely.instances[i].remaining_frames && r(s) } else if ("pan" == e.type && !t._spritely.instances[i]._stopped) { "up" == e.dir ? (t._spritely.instances[i].l = t._spritely.getBgX(s).replace("px", ""), t._spritely.instances[i].t = t._spritely.instances[i].t - (e.speed || 1) || 0) : "down" == e.dir ? (t._spritely.instances[i].l = t._spritely.getBgX(s).replace("px", ""), t._spritely.instances[i].t = t._spritely.instances[i].t + (e.speed || 1) || 0) : "left" == e.dir ? (t._spritely.instances[i].l = t._spritely.instances[i].l - (e.speed || 1) || 0, t._spritely.instances[i].t = t._spritely.getBgY(s).replace("px", "")) : (t._spritely.instances[i].l = t._spritely.instances[i].l + (e.speed || 1) || 0, t._spritely.instances[i].t = t._spritely.getBgY(s).replace("px", "")); var a = t._spritely.instances[i].l.toString(); -1 == a.indexOf("%") ? a += "px " : a += " "; var p = t._spritely.instances[i].t.toString(); -1 == p.indexOf("%") ? p += "px " : p += " ", t(s).css("background-position", a + p) } t._spritely.instances[i].options = e, window.setTimeout(function () { t._spritely.animate(e) }, parseInt(1e3 / e.fps)) }, randomIntBetween: function (t, e) { return parseInt(rand_no = Math.floor((e - (t - 1)) * Math.random()) + t) }, getBgY: function (e) { if (t.browser.msie) var s = t(e).css("background-position-y") || "0"; else s = (t(e).css("background-position") || " ").split(" ")[1]; return s }, getBgX: function (e) { if (t.browser.msie) var s = t(e).css("background-position-x") || "0"; else s = (t(e).css("background-position") || " ").split(" ")[0]; return s }, get_rel_pos: function (t, e) { var s = t; if (t < 0) for (; s < 0;)s += e; else for (; s > e;)s -= e; return s } }, t.fn.extend({ spritely: function (e) { e = t.extend({ type: "sprite", do_once: !1, width: null, height: null, fps: 12, no_of_frames: 2, stop_after: null }, e || {}); var s = t(this).attr("id"); t._spritely.instances || (t._spritely.instances = {}), t._spritely.instances[s] || (t._spritely.instances[s] = { current_frame: -1 }), t._spritely.instances[s].type = e.type, t._spritely.instances[s].depth = e.depth, e.el = this, e.width = e.width || t(this).width() || 100, e.height = e.height || t(this).height() || 100; return e.do_once ? t._spritely.animate(e) : window.setTimeout(function () { t._spritely.animate(e) }, (e.fps, parseInt(1e3 / e.fps))), this }, sprite: function (e) { e = t.extend({ type: "sprite", bounce: [0, 0, 1e3] }, e || {}); return t(this).spritely(e) }, pan: function (e) { e = t.extend({ type: "pan", dir: "left", continuous: !0, speed: 1 }, e || {}); return t(this).spritely(e) }, flyToTap: function (e) { return (e = t.extend({ el_to_move: null, type: "moveToTap", ms: 1e3, do_once: !0 }, e || {})).el_to_move && t(e.el_to_move).active(), t._spritely.activeSprite && (window.Touch ? t(this)[0].ontouchstart = function (e) { var s = t._spritely.activeSprite, i = e.touches[0], n = i.pageY - s.height() / 2, r = i.pageX - s.width() / 2; s.animate({ top: n + "px", left: r + "px" }, 1e3) } : t(this).click(function (e) { var s = t._spritely.activeSprite; t(s).stop(!0); var i = s.width(), n = s.height(), r = e.pageX - i / 2, a = e.pageY - n / 2; s.animate({ top: a + "px", left: r + "px" }, 1e3) })), this }, isDraggable: function (e) { if (!t(this).draggable) return this; e = t.extend({ type: "isDraggable", start: null, stop: null, drag: null }, e || {}); var s = t(this).attr("id"); return t._spritely.instances[s].isDraggableOptions = e, t(this).draggable({ start: function () { var e = t(this).attr("id"); t._spritely.instances[e].stop_random = !0, t(this).stop(!0), t._spritely.instances[e].isDraggableOptions.start && t._spritely.instances[e].isDraggableOptions.start(this) }, drag: e.drag, stop: function () { var e = t(this).attr("id"); t._spritely.instances[e].stop_random = !1, t._spritely.instances[e].isDraggableOptions.stop && t._spritely.instances[e].isDraggableOptions.stop(this) } }), this }, active: function () { return t._spritely.activeSprite = this, this }, activeOnClick: function () { var e = t(this); return window.Touch ? e[0].ontouchstart = function (s) { t._spritely.activeSprite = e } : e.click(function (s) { t._spritely.activeSprite = e }), this }, spRandom: function (e) { e = t.extend({ top: 50, left: 50, right: 290, bottom: 320, speed: 4e3, pause: 0 }, e || {}); var s = t(this).attr("id"); if (!t._spritely.instances[s].stop_random) { var i = t._spritely.randomIntBetween, n = i(e.top, e.bottom), r = i(e.left, e.right); t("#" + s).animate({ top: n + "px", left: r + "px" }, e.speed) } return window.setTimeout(function () { t("#" + s).spRandom(e) }, e.speed + e.pause), this }, makeAbsolute: function () { return this.each(function () { var e = t(this), s = e.position(); e.css({ position: "absolute", marginLeft: 0, marginTop: 0, top: s.top, left: s.left }).remove().appendTo("body") }) }, spSet: function (e, s) { var i = t(this).attr("id"); return t._spritely.instances[i][e] = s, this }, spGet: function (e, s) { var i = t(this).attr("id"); return t._spritely.instances[i][e] }, spStop: function (e) { return t(this).each(function () { var s = t(this).attr("id"); if (t._spritely.instances[s]._last_fps = t(this).spGet("fps"), t._spritely.instances[s]._stopped = !0, t._spritely.instances[s]._stopped_f1 = e, "sprite" == t._spritely.instances[s].type && t(this).spSet("fps", 0), e) { var i = t._spritely.getBgY(t(this)); t(this).css("background-position", "0 " + i) } }), this }, spStart: function () { return t(this).each(function () { var e = t(this).attr("id"), s = t._spritely.instances[e]._last_fps || 12; t._spritely.instances[e]._stopped = !1, "sprite" == t._spritely.instances[e].type && t(this).spSet("fps", s) }), this }, spToggle: function () { var e = t(this).attr("id"), s = t._spritely.instances[e]._stopped || !1, i = t._spritely.instances[e]._stopped_f1 || !1; return s ? t(this).spStart() : t(this).spStop(i), this }, fps: function (e) { return t(this).each(function () { t(this).spSet("fps", e) }), this }, spSpeed: function (e) { return t(this).each(function () { t(this).spSet("speed", e) }), this }, spRelSpeed: function (e) { return t(this).each(function () { var s = t(this).spGet("depth") / 100; t(this).spSet("speed", e * s) }), this }, spChangeDir: function (e) { return t(this).each(function () { t(this).spSet("dir", e) }), this }, spState: function (e) { return t(this).each(function () { var s = (e - 1) * t(this).height() + "px", i = t._spritely.getBgX(t(this)) + " -" + s; t(this).css("background-position", i) }), this }, lockTo: function (e, s) { return t(this).each(function () { var i = t(this).attr("id"); t._spritely.instances[i].locked_el = t(this), t._spritely.instances[i].lock_to = t(e), t._spritely.instances[i].lock_to_options = s, window.setInterval(function () { if (t._spritely.instances[i].lock_to) { var e = t._spritely.instances[i].locked_el, s = t._spritely.instances[i].lock_to, n = t._spritely.instances[i].lock_to_options, r = n.bg_img_width, a = (s.height(), t._spritely.getBgY(s)), p = t._spritely.getBgX(s), o = parseInt(p) + parseInt(n.left), c = parseInt(a) + parseInt(n.top); o = t._spritely.get_rel_pos(o, r), t(e).css({ top: c + "px", left: o + "px" }) } }, s.interval || 20) }), this } }) }(jQuery); try { document.execCommand("BackgroundImageCache", !1, !0) } catch (t) { };
            !function (t) { if (!document.defaultView || !document.defaultView.getComputedStyle) { var o = t.curCSS; t.curCSS = function (t, n, i) { if ("background-position" === n && (n = "backgroundPosition"), "backgroundPosition" !== n || !t.currentStyle || t.currentStyle[n]) return o.apply(this, arguments); var r = t.style; return !i && r && r[n] ? r[n] : o(t, "backgroundPositionX", i) + " " + o(t, "backgroundPositionY", i) } } var n = t.fn.animate; function i(t) { var o = (t = (t = (t = t.replace(/left|top/g, "0px")).replace(/right|bottom/g, "100%")).replace(/([0-9\.]+)(\s|\)|$)/g, "$1px$2")).match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/); return [parseFloat(o[1], 10), o[2], parseFloat(o[3], 10), o[4]] } t.fn.animate = function (t) { return "background-position" in t && (t.backgroundPosition = t["background-position"], delete t["background-position"]), "backgroundPosition" in t && (t.backgroundPosition = "(" + t.backgroundPosition), n.apply(this, arguments) }, t.fx.step.backgroundPosition = function (o) { if (!o.bgPosReady) { var n = t.curCSS(o.elem, "backgroundPosition"); n || (n = "0px 0px"), n = i(n), o.start = [n[0], n[2]]; var r = i(o.end); o.end = [r[0], r[2]], o.unit = [r[1], r[3]], o.bgPosReady = !0 } var e = []; e[0] = (o.end[0] - o.start[0]) * o.pos + o.start[0] + o.unit[0], e[1] = (o.end[1] - o.start[1]) * o.pos + o.start[1] + o.unit[1], o.elem.style.backgroundPosition = e[0] + " " + e[1] } }(jQuery);
            function Slot(t, e, s) { this.speed = 0, this.step = s, this.si = null, this.el = t, this.maxSpeed = e, this.pos = null, $(t).pan({ fps: 30, dir: "down" }), $(t).spStop() } function enableControl() { $("#vl-control").attr("disabled", !1) } function disableControl() { $("#vl-control").attr("disabled", !0) } function printResult() { var t; t = win[a.pos] === win[b.pos] && win[a.pos] === win[c.pos] ? "Kazandınız! Kupon Kodunuz: 67DSAG64" : "Kaybettiniz", $("#result").html(t) } Slot.prototype.start = function () { var t = this; $(t.el).addClass("motion"), $(t.el).spStart(), t.si = window.setInterval(function () { t.speed < t.maxSpeed && (t.speed += t.step, $(t.el).spSpeed(t.speed)) }, 100) }, Slot.prototype.stop = function () { var t = this; clearInterval(t.si), t.si = window.setInterval(function () { t.speed > 30 && (t.speed -= t.step, $(t.el).spSpeed(t.speed)), t.speed <= 30 && (t.finalPos(t.el), $(t.el).spSpeed(0), $(t.el).spStop(), clearInterval(t.si), $(t.el).removeClass("motion"), t.speed = 0) }, 100) }, Slot.prototype.finalPos = function () { var t, e, s, o, i, n, p, l = this.el, r = 2e9; for (t = $(l).attr("id"), e = (e = document.getElementById(t).style.backgroundPosition).split(" ")[1], e = parseInt(e, 10), i = 0; i < posArr.length; i++)for (n = 0; ; n++)if ((p = posArr[i] + imgHeight * n) > e) { p - e < r && (r = p - e, s = p, this.pos = posArr[i]); break } o = "0 " + (s += imgHeight) + "px", $(l).animate({ backgroundPosition: "(" + o + ")" }, { duration: 200, complete: function () { completed++ } }) }, Slot.prototype.reset = function () { var t = $(this.el).attr("id"); $._spritely.instances[t].t = 0, $(this.el).css("background-position", "0px 0px"), this.speed = 0, completed = 0, $("#result").html("") };
            function Slot(el, max, step) {
                this.speed = 0; //speed of the slot at any point of time
                this.step = step; //speed will increase at this rate
                this.si = null; //holds setInterval object for the given slot
                this.el = el; //dom element of the slot
                this.maxSpeed = max; //max speed this slot can have
                this.pos = null; //final position of the slot	
                $(el).pan({
                    fps: 60,
                    dir: 'down'
                });
                $(el).spStop();
            }
            Slot.prototype.start = function () {
                var _this = this;
                $(_this.el).addClass('motion');
                $(_this.el).spStart();
                _this.si = window.setInterval(function () {
                    if (_this.speed < _this.maxSpeed) {
                        _this.speed += _this.step;
                        $(_this.el).spSpeed(_this.speed);
                    }
                }, 100);
            };
            Slot.prototype.stop = function () {
                var _this = this,
                    limit = 30;
                clearInterval(_this.si);
                _this.si = window.setInterval(function () {
                    if (_this.speed > limit) {
                        _this.speed -= _this.step;
                        $(_this.el).spSpeed(_this.speed);
                    }
                    if (_this.speed <= limit) {
                        _this.finalPos(_this.el);
                        $(_this.el).spSpeed(0);
                        $(_this.el).spStop();
                        clearInterval(_this.si);
                        $(_this.el).removeClass('motion');
                        _this.speed = 0;
                    }
                }, 100);
            };
            Slot.prototype.finalPos = function () {
                var el = this.el,
                    el_id,
                    pos,
                    posMin = 2000000000,
                    best,
                    bgPos,
                    i,
                    j,
                    k;

                el_id = $(el).attr('id');
                //pos = $(el).css('background-position'); //for some unknown reason, this does not work in IE
                pos = document.getElementById(el_id).style.backgroundPosition;
                pos = pos.split(' ')[1];
                pos = parseInt(pos, 10);
                if (atempt === limit) pos = random;
                for (i = 0; i < posArr.length; i++) {
                    for (j = 0; ; j++) {
                        k = posArr[i] + (imgHeight * j);
                        if (k > pos) {
                            if ((k - pos) < posMin) {
                                posMin = k - pos;
                                best = k;
                                this.pos = posArr[i]; //update the final position of the slot
                            }
                            break;
                        }
                    }
                }
                best += imgHeight;
                bgPos = "0 " + best + "px";
                $(el).animate({
                    backgroundPosition: "(" + bgPos + ")"
                }, {
                    duration: 200,
                    complete: function () {
                        completed++;
                    }
                });
            };
            Slot.prototype.reset = function () {
                var el_id = $(this.el).attr('id');
                $._spritely.instances[el_id].t = 0;
                $(this.el).css('background-position', '0px 0px');
                this.speed = 0;
                completed = 0;
            };
            function enableControl() {
                $('#vl-control').attr("disabled", false);
            }
            function disableControl() {
                $('#vl-control').attr("disabled", true);
            }
            function printResult() {
                var res;
                if (win[a.pos] === win[b.pos] && win[a.pos] === win[c.pos]) {
                    status = 'win';
                    var pos = win[a.pos];
                    var type;
                    var coupon;
                    if (pos === 1) {
                        type = "2MELUVME";
                        jQuery('#vl-container').addClass("vl-success-1");
                        jQuery('#vl-container').append('<input type="text" value="2MELUVME" id="vl-couponCode" readonly/><div id="vl-copy-button"/>');
                    }
                    else if (pos === 2) {
                        type = "BEMYVALENTINE";
                        jQuery('#vl-container').addClass("vl-success-3");
                        jQuery('#vl-container').append('<input type="text" value="BEMYVALENTINE" id="vl-couponCode" readonly/><div id="vl-copy-button"/>');
                    }
                    else if (pos === 4) {
                        type = "FROMME2ME";
                        jQuery('#vl-container').addClass("vl-success-2");
                        jQuery('#vl-container').append('<input type="text" value="FROMME2ME" id="vl-couponCode" readonly/><div id="vl-copy-button"/>');
                    }
                    else if (pos === 3) {
                        type = "SELFLOVE";
                        jQuery('#vl-container').addClass("vl-success-4");
                        jQuery('#vl-container').append('<input type="text" value="SELFLOVE" id="vl-couponCode" readonly/><div id="vl-copy-button"/>');
                    }
                    console.log(type);
                    jQuery('.vl-slot-container, #vl-button').remove();
                    document.getElementById('vl-copy-button').addEventListener("click", function () {
                        var copyText = document.getElementById("vl-couponCode");
                        copyText.select();
                        document.execCommand("copy");
                        // alert("Kupon kodunuz kopyalanmıştır: " + copyText.value);
                        createMsg("Kupon kodunuz kopyalanmıştır: " + copyText.value);
                        setTimeout(() => {
                            jQuery('#vl-container, #vl-overlay').remove();
                            location.href = "/"
                        }, 2000);
                    });
                    localStorage.setItem("OM.vjp", "coupon-" + type);
                    couponForm(type);
                } else {
                    status = 'lose';
                }
            }
            var style = '<style>#vl-overlay{z-index: 1002!important;position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; opacity:.95;background-color: rgb(66 40 95);}\
				#vl-container{box-shadow: 0px 0px 20px 0px #a284ba;border-radius:10px;z-index: 1003!important;position: fixed;margin: auto;width: 700px; height: 381px;left: 0;right: 0;top: 0;bottom: 0;background-repeat: no-repeat; border: none !important;background-size: contain; background-image: url(https://img.euromsg.net/4D6D2D6846044C77B6539E65BC22E6BA/images/valentines-jackpot/vday-oyun-desktop.png);}\
				#vl-form-close{cursor: pointer; z-index: 1000000002;}\
				.vl-slot-container{position: absolute;top: 153px;left: 361px;}\
				.vl-slot{border-radius: 5px;margin-right: 8px;width:70px;height:114px;float:left;background:url(https://img.euromsg.net/4D6D2D6846044C77B6539E65BC22E6BA/images/vjp_items_desktop.png) repeat-y;background-position: 0px 0px;    background-size: cover;background-color: white;}\
				.motion .vl-slot-frame::after{content:""; filter: blur(3px);-webkit-filter: blur(3px); width: 100%; height: 100%; z-index: 0;background: inherit;position: absolute; top: 0; right: 0;}\
				button{display:block;width:138px;height:33px;margin:auto;font-size:16px;cursor:pointer;font-family: Helvetica,Arial,sans-serif;}\
				#vl-result{font-size:18px;font-weight:700;height:22px;position: absolute;bottom: 95px;width: 100%;text-align: center;}\
				.vl-button{position: absolute;width: 180px;height: 45px; right: 120px; bottom: 20px;cursor:pointer}\
				#vl-copy-button{position: absolute;width: 180px;height: 45px; right: 120px; bottom: 20px;cursor:pointer}\
				.vl-button.vl-passive{display: none;}\
				#vl-control{opacity: 0}\
				.vl-jack{position: absolute;bottom: 240px;}\
				#vl-couponCode{opacity: 0;position: absolute;left: 0;right: 0;margin: auto;bottom: 200px;width: 300px;height: 65px;}\
				.vl-last{margin-right: 0 !important}\
				.vl-success-1{background-image: url(https://img.euromsg.net/4D6D2D6846044C77B6539E65BC22E6BA/images/valentines-jackpot/vday-oyun-kupon-1.png) !important}\
				.vl-success-2{background-image: url(https://img.euromsg.net/4D6D2D6846044C77B6539E65BC22E6BA/images/valentines-jackpot/vday-oyun-kupon-2.png) !important}\
				.vl-success-3{background-image: url(https://img.euromsg.net/4D6D2D6846044C77B6539E65BC22E6BA/images/valentines-jackpot/vday-oyun-kupon-3.png) !important}\
				.vl-success-4{background-image: url(https://img.euromsg.net/4D6D2D6846044C77B6539E65BC22E6BA/images/valentines-jackpot/vday-oyun-kupon-4.png) !important}\
	            @media only screen and (max-width: 700px){\
	                #vl-container{width: 320px; height: 544px;background-image: url(https://img.euromsg.net/4D6D2D6846044C77B6539E65BC22E6BA/images/valentines-jackpot/vday-oyun-mobil.png)}\
	                .vl-title {margin: 40px 0; padding: 0 25px;}\
	                .vl-slot-container{top: 280px;left: 64px;}\
	                .vl-button{width: 175px; height: 40x; bottom: 33px; left: 0; right: 0; margin: auto}\
	                .vl-slot{margin-right: 5px;width:56px;height:89px;background:url(https://img.euromsg.net/4D6D2D6846044C77B6539E65BC22E6BA/images/vjp_items_mobile.png) repeat-y;background-color: white;}\
	                .vl-button.vl-passive{display:none;}\
	                #vl-couponCode{bottom:160px; height: 35px; width: 140px;}\
	                #vl-copy-button{bottom: 33px; width: 175px; height:45px;}\
	                .vl-jack{width: 50px;bottom: 155px;}\
	                .vl-success-1{background-image: url(https://img.euromsg.net/4D6D2D6846044C77B6539E65BC22E6BA/images/valentines-jackpot/vday-oyun-kupon-1m.png) !important}\
					.vl-success-2{background-image: url(https://img.euromsg.net/4D6D2D6846044C77B6539E65BC22E6BA/images/valentines-jackpot/vday-oyun-kupon-2m.png) !important}\
					.vl-success-3{background-image: url(https://img.euromsg.net/4D6D2D6846044C77B6539E65BC22E6BA/images/valentines-jackpot/vday-oyun-kupon-3m.png) !important}\
					.vl-success-4{background-image: url(https://img.euromsg.net/4D6D2D6846044C77B6539E65BC22E6BA/images/valentines-jackpot/vday-oyun-kupon-4m.png) !important}\
	            }</style>';
            var html = '<div id="vl-overlay"/><div id="vl-container">\
            <button id="vl-form-close" style="position: absolute; width:auto; right: 0px; top: 0px; border: 0px; color: #a284ba; padding: 5px 10px; cursor: pointer; font-size: 29px; transition: all 1s ease 0s; border-radius: 10px; background-color: rgba(0, 0, 0, 0); z-index: 999; transform: translate3d(0px, 0px, 3px);">✖</button>\
				<div class="vl-slot-container">\
					<div class="vl-slot-wrapper">\
						<div id="slot1" class="vl-slot"></div>\
						<div id="slot2" class="vl-slot"></div>\
						<div id="slot3" class="vl-slot vl-last"></div>\
					</div>\
				</div>\
				<button id="vl-control" class="vl-button">Başla</button>\
			</div></div>';
            jQuery('head').append(style);
            jQuery('body').append(html);
            jQuery('#vl-form-close, #vl-overlay').click(function () {
                jQuery('#vl-container, #vl-overlay').remove();
                location.href = "/"
            });
            a = new Slot('#slot1', 30, 1);
            b = new Slot('#slot2', 45, 2);
            c = new Slot('#slot3', 70, 3);
            $('#vl-control').click(function () {
                var x;
                if (this.innerHTML == "Başla") {
                    a.start();
                    b.start();
                    c.start();
                    this.innerHTML = "Durdur";

                    disableControl(); //disable control until the slots reach max speed

                    //check every 100ms if slots have reached max speed 
                    //if so, enable the control
                    x = window.setInterval(function () {
                        if (a.speed >= a.maxSpeed && b.speed >= b.maxSpeed && c.speed >= c.maxSpeed) {
                            enableControl();
                            window.clearInterval(x);
                        }
                    }, 100);
                    atempt++;
                    jQuery('#vl-button').addClass("vl-passive");
                    setTimeout(function () {
                        $('#vl-control').click();
                    }, 3000);
                    try { VLSendClickFunc(campID, 4); } catch (e) { };
                } else if (this.innerHTML == "Durdur") {
                    a.stop();
                    b.stop();
                    c.stop();
                    this.innerHTML = "Yenile";

                    disableControl(); //disable control until the slots stop

                    //check every 100ms if slots have stopped
                    //if so, enable the control
                    x = window.setInterval(function () {
                        if (a.speed === 0 && b.speed === 0 && c.speed === 0 && completed === 3) {
                            window.clearInterval(x);
                            setTimeout(printResult, 500);
                            if (status === 'lose') enableControl();
                        }
                    }, 100);
                } else { //reset
                    a.reset();
                    b.reset();
                    c.reset();
                    this.innerHTML = "Başla";
                }
            });
        }
        execute();
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
		msg.style.background = danger ? "#fb6a78" : "#a081b9";
		msg.style.transform = "translate(-50%, -50%)";
		msg.style.boxShadow = "0px 0px 2px 0px "+(danger ? "#fb6a78" : "#a081b9");
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

    function exec() {

        // if (localStorage.getItem("OM.vjp") == undefined) {
            var j = document.createElement("script");
            j.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
            j.onload = jackpot;
            document.head.appendChild(j);
        // }
    }
    exec();
})();