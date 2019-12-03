window.onload = function () {
    // 1.拿到需要操作的元素
    let oToolbar = document.querySelector(".toolbar");
    let oNav = document.querySelector(".nav");
    let oMenu = document.querySelector("#myMenu");
    let oMenuUp = document.querySelector(".menu-up");
    let oMenuDown = document.querySelector(".menu-down");
    let oTips = document.querySelector(".tips");

    // 2.初始化fullpage
    new fullpage('#fullpage', {
        //options here
        verticalCentered: false,
        // sectionsColor: ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f', '#000'],
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage'],
        menu: '#myMenu',
        onLeave: function(origin, destination, direction){
            if(destination.isFirst){
                // 是第一屏
                oToolbar.style.display = "block";
                oNav.style.top = "42px";
                oMenu.style.display = "none";
            }else{
                // 不是第一屏
                oToolbar.style.display = "none";
                oNav.style.top = "0px";
                oMenu.style.display = "block";
            }
            if(destination.isLast){
                // 最后一屏
                oTips.style.display = "none";
            }else{
                // 不是最后一屏
                oTips.style.display = "block";
            }
        }
    });

    // 3.监听菜单的点击事件
    oMenuUp.onclick = function () {
        fullpage_api.moveSectionUp();
    }
    oMenuDown.onclick = function () {
        fullpage_api.moveSectionDown();
    }

    // 4.初始化第四屏动画
    initSection4Animation();
}
function initSection4Animation() {
    // 1.拿到需要操作的元素
    let oLis = document.querySelectorAll(".section-four>ul>li");
    let oImages = document.querySelectorAll(".section-four>ul>li>img");
    let oH3 = document.querySelectorAll(".section-four>ul>li>h3");

    // 2.给所有的li添加移入移出事件
    for(let i = 0; i < oLis.length; i++){
        let item = oLis[i];
        // 移入事件
        item.onmouseenter = function () {
            oLis[0].style.width = "20%";
            oLis[1].style.width = "20%";
            oLis[2].style.width = "20%";
            oLis[i].style.width = "60%";
            oImages[i].style.opacity = "1";
            oH3[i].style.opacity = "0";
            if(i === 0){
                oImages[0].style.left = "0";
            }else if(i === 2){
                oImages[2].style.right = "0";
            }
        }
        // 移出事件
        item.onmouseleave = function () {
            oLis[0].style.width = "33%";
            oLis[1].style.width = "34%";
            oLis[2].style.width = "33%";
            oImages[i].style.opacity = "0.6";
            oH3[i].style.opacity = "1";
            if(i === 0){
                oImages[0].style.left = "-180px";
            }else if(i === 2){
                oImages[2].style.right = "-180px";
            }
        }
    }
}
