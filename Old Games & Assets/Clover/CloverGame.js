var color = "#227eba";
var textColor = "#ffffff";
var startText = "Are you ready to collect your Black Friday discounts?";
var formText = "Oyuna başlamak için mail formu doldurun";
var promText = "Eposta iletişim izni";
var dashoardText = "Your Discount Rate";
var copyCouponCodeTextP1 = "Your Coupon Code is";
var copyCouponCodeTextP2 = "Click to copy and paste this code at the check-out page.";
var copiedText = "Your coupon code has been copied : ";
var placeHolderText = "Enter your email address";
var formSubmitButtonText = "Oyuna Başla";
var tryAgainButtonText="Try Again";
var noItemText = "You did not win promotions. Please try again.";

function createMailSubForm() {
    var div = document.createElement("div");
        div.id="vlmailform";
        div.style.width=window.innerWidth >= 600 ? "400px" : "90%";
        div.style.height="400px";
        div.style.backgroundColor="#27a522";
        div.style.borderRadius="10px";
        div.style.padding="10px ";
        div.style.position="fixed";
        div.style.transition="all 1s";
        div.style.position="fixed";
        div.style.transform= "translate(-50%, -50%)";
        div.style.top = "50%";
        div.style.left = "50%";
        div.style.zIndex="9999";
        div.style.display="flex";
        div.style.justifyContent="center";
        div.style.flexDirection="column";
    
    var header = document.createElement("div");
        header.innerHTML=formText;
        header.id="vlHeaderMailForm";
        //header.style.width="360px";
        header.style.padding="20px";
        header.style.border="0";
        header.style.fontSize="26px";
        header.style.textAlign="center";
        header.style.color="white";
        header.style.borderRadius="12px";
        header.style.marginBottom="10px";

    // var img = document.createElement("img");
    //     img.src = "https://img.visilabs.net/banner/uploaded_images/237_1228_20191121110247243.png";
    //     img.style.width="30px";

    // header.appendChild(img);

    div.appendChild(header);

    var input = document.createElement("input");
        input.setAttribute("type","text");
        input.setAttribute("placeholder","Email");
        input.style.backgroundColor="white";
        input.style.width="100%";
        input.style.padding="15px";
        input.style.border="0";
        input.style.maxWidth="-webkit-fill-available";
        input.style.fontSize="19px";
        input.style.fontWeight="bold";
        input.style.color="#27a522";
        input.style.borderRadius="10px";
        input.style.marginBottom="10px";

    div.appendChild(input);

    var row = document.createElement("div");
        row.style.color="white";
        row.style.marginBottom="15px";
        row.style.fontSize="16px";
        row.innerHTML="<input style='width:20px;height:20px;display:block;margin-right:7px;float:left' id='vlPromCheck' type='checkbox'>"+promText;

        div.appendChild(createPermitRow("email-permit",promText,"www.google.com"));

    var row2 = document.createElement("div");
        row2.style.color="white";
        row2.style.fontSize="16px";
        row2.innerHTML="<input style='width:20px;height:20px;display:block;margin-right:7px;float:left' id='vlRulesCheck' type='checkbox'>"+
        "I agree the <a href='https://www.otel.com/terms-conditions/' style='text-decoration: underline;'>Terms and Conditions</a> and <a href='https://www.otel.com/accounts/signup/privacy/' style='text-decoration: underline;'>Privacy Policy.</a>";

        div.appendChild(createPermitRow("email-permit","Kurallar ve gizlilik sözleşmesi","www.google.com"));

    var vlCloseButton = document.createElement("button");
        vlCloseButton.id="vlCloseBtnMailForm";
        vlCloseButton.innerHTML="&#10006;";
        vlCloseButton.style.position="absolute";
        vlCloseButton.style.right="0px";
        vlCloseButton.style.top="0px";
        vlCloseButton.style.border="1px";
        vlCloseButton.style.borderRadius="40px";
        vlCloseButton.style.color="#fff";
        vlCloseButton.style.padding="5px 10px";
        vlCloseButton.style.cursor="pointer";
        vlCloseButton.style.backgroundColor="transparent";
        vlCloseButton.style.fontSize="20px";

    div.appendChild(vlCloseButton);

    vlCloseButton.addEventListener("click",function () {
        document.querySelector("#vlmailform").remove();
        document.documentElement.style.overflow = 'auto';
        location.href = "/"
    });

    var submit = document.createElement("div");
        submit.id="vlFormSubmit";
        submit.style.backgroundColor="white";
        submit.style.color=color;
        submit.style.padding="7px 20px";
        submit.style.fontSize="20px";
        submit.style.margin="0 110px";
        submit.style.textAlign="center";
        submit.style.borderRadius="10px";
        submit.style.cursor="pointer";
        submit.style.fontWeight="bolder";
        submit.innerText=formSubmitButtonText;

    submit.addEventListener("click",function () {
        div.style.opacity="0";
        setTimeout(() => {
            div.remove();
            FirePopup();
        }, 1000);
    });

    div.appendChild(submit);
    document.body.appendChild(div);
}

function createPermitRow(inputId, desc, url) {
  var container = document.createElement("DIV");
  container.style.color = "white";
  container.style.fontSize = "13px";
  container.style.margin = "10px 0";
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
  input.style.accentColor = "green";

  var text = document.createElement("div");
  text.innerText = desc;
  text.style.fontSize = "15px";
  // text.style.fontFamily = fontName;
  text.style.textDecoration = "none";
  text.style.color = "white";

  text.addEventListener('click', () => {
      utils.linkClicked(url)
      console.log(url, desc);
  })

  container.appendChild(input);
  container.appendChild(text);

  return container;
}

initGame = () => {
  createMailSubForm();
}
const config = {
    desktopWidth: "700",
    mobileWidth: "320",
    cloverImg: "clover.png",
    cloverStalkImg: "cloverstalk.png",
    backgroundImg: "bg.jpeg",
    backgroundImgAspectRatio: "4/3",
    headerHTML: "Example'la Şans Yanında,<span>Bir Yonca Yaprağına Tıkla!</span>",
    cloverWidth: "150",
    cloverMobileWidth: "100",
    cloverList: [
        {
            title: "Example Yonca Kampanyası Özel 1500 TL Üzerine %15 İndirim",
            href: "https://www.example.com/en/",
            coupon: "Example1",
        },
        {
            title: "Example Yonca Kampanyası Özel Sepette Yüzde 10 İndirim",
            href: "https://www.example.com/en/",
            coupon: "Example2",
        },
        {
            title: "Example Yonca Kampanyası Özel 750 TL Üzerine 75TL İndirim",
            href: "https://www.example.com/en/",
            coupon: "Example3",
        },
        {
            title: "Example Yonca Kampanyası Özel Seçili Ürünlerde Geçerli Kargo Bedava",
            href: "https://www.example.com/en/",
            coupon: "Example4",
        },
    ],
    localStorageName: "OM.clover-24Kasim"
  };
 
  function FirePopup() {
    if (!document.querySelector(".vl-clover-popup-container")) {
        var style = document.createElement("style");
        const widthRatio = config.backgroundImgAspectRatio.split('/')[0];
        const heightRatio = config.backgroundImgAspectRatio.split('/')[1];
        const desktopHeight = config.desktopWidth / widthRatio * heightRatio;
        const mobileHeight = 420;
        style.innerHTML = `
        .vl-clover-popup-container{
          z-index: 10000;
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          left: 0;
        }
        .vl-clover-popup-overlay{
          z-index: 10000;
          width: 100%;
          height: 100%;
          background: black;
          opacity: 0.8;
          position: fixed;
          top: 0;
          left: 0;
        }
        .vl-clover-popup{
          position:absolute;
          z-index:100001;
          width:${config.desktopWidth}px;
          height: ${desktopHeight}px;
          background-image: url("${config.backgroundImg}");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 10px;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          -webkit-transform: translate(-50%,-50%);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          overflow: hidden;
          gap: 10rem;
        }
 
        .vl-clover-popup-close{
          position: absolute;
          right: 5px;
          top: 5px;
          cursor: pointer;
          z-index: 100002;
          width:25px;
          height:25px;      
        }
        .vl-clover-stalk {
          height: 55%;
          transform: rotate(-10deg);
        }
        .vl-clover-header {
          font-size: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 1rem;
          color: white !important;
          user-select: none;
          width: 70%;
          text-align: center;
          transition: all 0.5s ease-in-out;
        }
        .vl-clover-header span {
          font-weight: bold;
          font-size: 2.1rem;
          text-align: center;
        }
        .vl-clover-wrapper .vl-clover-coupon {
          width: ${config.cloverWidth}px;
          text-align: center;
          font-weight: bold;
          padding: 0 1rem;
          color: white;
        }
        .vl-clover-wrapper img {
          width: ${config.cloverWidth}px;
        }
        #vl-clovers-wrapper {
          position: absolute;
          top: 0px;
          left: -70px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
        }
        .vl-clover-wrapper {
          position: absolute;
          width: ${config.cloverWidth}px;
          cursor: pointer;
        }
        .vl-clover-wrapper:hover {
          transform: scale(1.1);
        }
        .vl-clover-coupon-text {
          display: none;
        }
        .vl-hidden {
          visibility: hidden;
          opacity: 0;
          transition: visibility 0s 0.5s, opacity 0.5s linear;
        }
        .vl-clover-wrapper .vl-clover-coupon span {
            display: block;
            color: white;
            font-size: 12px;
            margin: 0.5rem;
        }
        .vl-clover-message {
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: 16px!important;
            max-width: 40%;
        }
        @media only screen and (max-width: 768px) {
          .vl-clover-popup {
            width:${config.mobileWidth}px;
            height:${mobileHeight}px;
          }
          .vl-clover-popup-close{
            font-size: 15px;
            line-height: 15px;
          }
          .vl-clover-wrapper {
            width: ${config.cloverMobileWidth}px;
          }
          #vl-clovers-wrapper {
            top: -${config.cloverMobileWidth / 2 - 10}px;
          }
          .vl-clover-wrapper .vl-clover-coupon {
            width: ${Number(config.cloverMobileWidth)+20}px;
            font-size: 14px;
          }
          .vl-clover-wrapper img {
            width: ${config.cloverMobileWidth}px;
          }
          .vl-clover-header {
            font-size: 1rem;
            padding: 1.5rem;
            font-weight: bold;
          }
          .vl-clover-header span {
            font-size: 1rem;
          }
          .vl-clover-wrapper .vl-clover-coupon span {
            font-size: 10px;
            margin: 0.3rem;
            padding: 0.2rem;
          }
          .vl-clover-message {
            position: none;
          }
        }
    `;
        document.head.append(style);
        const clovers = document.createElement('div');
        clovers.id = "vl-clovers-wrapper";
        const sortRandom = (arr) => arr.sort(() => Math.random() - 0.5);
        config.cloverList = sortRandom(config.cloverList);
        for (let index = 0; index < config.cloverList.length; index++) {
            const clover = config.cloverList[index];
            const rotate = (360 / config.cloverList.length) * index;
            const cloverElement = document.createElement('div');
            cloverElement.className = "vl-clover-wrapper";
            if(window.innerWidth > 768){
                if (rotate >= 0 && rotate < 90) {
                } else if (rotate >= 90 && rotate < 180) {
                    cloverElement.style.marginLeft = `${Number(config.cloverWidth) * 2 - 30}px`;
                    cloverElement.style.marginTop = `-30px`;
                } else if (rotate >= 180 && rotate < 270) {
                    cloverElement.style.marginLeft = `${Number(config.cloverWidth) * 2}px`;
                    cloverElement.style.marginTop = `${Number(config.cloverWidth) * 2 - 60}px`;
                } else if (rotate >= 270 && rotate < 360) {
                    cloverElement.style.marginTop = `${Number(config.cloverWidth) * 2 - 30}px`;
                    cloverElement.style.marginLeft = `30px`;
                }
            }else {
                if (rotate >= 0 && rotate < 90) {
                    cloverElement.style.marginLeft = `60px`;
                } else if (rotate >= 90 && rotate < 180) {
                    cloverElement.style.marginLeft = `${Number(config.cloverMobileWidth)*2 + 40}px`;
                    cloverElement.style.marginTop = `-20px`;
                } else if (rotate >= 180 && rotate < 270) {
                    cloverElement.style.marginLeft = `${Number(config.cloverMobileWidth)*2 + 60}px`;
                    cloverElement.style.marginTop = `${Number(config.cloverMobileWidth)*2 - 40}px`;
                } else if (rotate >= 270 && rotate < 360) {
                    cloverElement.style.marginTop = `${Number(config.cloverMobileWidth)*2 - 30}px`;
                    cloverElement.style.marginLeft = `80px`;
                }
            }
            cloverElement.style.zIndex = `${index}+1`;
            const cloverImg = document.createElement('img');
            cloverImg.src = config.cloverImg;
            cloverImg.alt = "vl-clover-img";
            cloverImg.className = "vl-clover";
            cloverImg.style.transform = `rotate(${rotate}deg)`;
            const coupon = document.createElement('div');
            coupon.className = "vl-clover-coupon";
            cloverImg.addEventListener('click', function (e) {
                if (!document.querySelector('.vl-clover-wrapper.vl-selected-clover')) {
                    cloverImg.classList.add('vl-hidden');
                    setTimeout(() => {
                        cloverImg.parentElement.classList.add("vl-selected-clover");
                        cloverImg.remove();
                        coupon.innerText = clover.coupon;
                        const span = document.createElement("span");
                        span.innerText = "Tıkla, Kopyala ve Butiğe Git";
                        coupon.append(span);
                        localStorage.setItem(`${config.localStorageName}`,`coupon+${clover.coupon}+${clover.title}+${clover.href}`);
                        if (window.innerWidth > 768) {
                            document.querySelector('.vl-clover-header').style.fontSize = "1.7rem";
                        } else {
                            document.querySelector('.vl-clover-header').style.fontSize = "1rem";
                            document.querySelector('.vl-clover-popup').style.gap = "7rem";
                        }
                        document.querySelector('.vl-clover-header').innerHTML = `${clover.title}<br><span class="vl-clover-message">Seçili ürünlerde geçerlidir başka kampanya ile birleştirilemez.</span>`;
                        document.querySelector('.vl-clover-header').style.color = "black";
                        document.querySelector('.vl-clover-header').style.fontWeight = "bold";
                        coupon.addEventListener('click', function (event) {
                            copyCoupon(clover.coupon);
                            window.location.href = clover.href;
                            //<%VLSendClickFunc%>
                        });
                    }, 450);
                    document.querySelectorAll('.vl-clover-wrapper img').forEach(cloverImgElement => {
                        cloverImgElement.style.pointerEvents = 'none';
                    });
                }
            },{  });
            cloverElement.append(cloverImg, coupon);
            clovers.append(cloverElement);
        }
        var div = document.createElement("div");
        div.setAttribute("class", "vl-clover-popup-container");
        div.innerHTML = `
        <div class="vl-clover-popup-overlay"></div>
        <div class="vl-clover-popup">
          <button id="vlCloseBtnMailForm"  class="vl-clover-popup-close" style="width:auto;position: absolute; right: 0px; top: 0px; border: 1px; border-radius: 40px; color: rgb(255, 255, 255); padding: 5px 10px; cursor: pointer; background-color: transparent; font-size: 20px;">✖</button>
          <div class="vl-clover-header">${config.headerHTML}</div>
          <div class="vl-clover-content" style="position: relative; height: 100%; width: 100%; display: flex; justify-content: center;">
            <img class="vl-clover-stalk" src="${config.cloverStalkImg}" alt="vl-clover-stalk" />
          </div>
        </div>
    `;
        document.body.append(div);
        document.querySelector('.vl-clover-content').append(clovers);
        document
            .querySelector(".vl-clover-popup-overlay")
            .addEventListener("click", closePopup);
        document
            .querySelector(".vl-clover-popup-close")
            .addEventListener("click", closePopup);
 
        function closePopup() {
            document.querySelector(".vl-clover-popup-container").remove();
            location.href = "/"
        }
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
        //<%VLSendImpressionFunc%>
    }
  }