window.onload = function () {
    // 1.初始化图片
    initImages();
    // 2.动态计算容器宽度
    let timerId = null;
    window.onresize = function(){
        clearTimeout(timerId);
        timerId = setTimeout(function () {
            // console.log("执行");
            initWidth();
            waterFall();
        }, 100);
        // initWidth();
        // console.log("执行");
    }
    initWidth();
    // 3.瀑布流布局
    waterFall();
    loadImages();
}
function loadImages() {
    let timerId = null;
    window.onscroll = function () {
        clearTimeout(timerId);
        timerId = setTimeout(function () {
            let oItems = document.querySelectorAll(".box");
            // 1.获取最后一张图片的位置
            let lastItem = oItems[oItems.length - 1];
            let lastHeight = lastItem.offsetTop + lastItem.offsetHeight * 0.5;
            // 2.获取网页滚动偏移位
            let scrollTop = getPageScroll().y;
            // 3.获取可视区域高度
            let screenHeight = getScreen().height;
            // 4.判断是否需要加载
            if(lastHeight <= (scrollTop + screenHeight)){
                initImages();
                waterFall();
            }
        }, 100);
    }
}
function waterFall() {
    let oItems = document.querySelectorAll(".box");
    let screenWidth = getScreen().width;
    let itemWidth = oItems[0].offsetWidth;
    let cols = Math.floor(screenWidth / itemWidth);

    // 1.定义数组保存第一行高度
    let rowHeight = [];
    for(let i = 0; i < oItems.length; i++){
        let item = oItems[i];
        if(i < cols){
            item.style.position = "";
            // 保存第一行高度
            rowHeight.push(item.offsetHeight);
        }else{
            // 找到第一行最短的高度
            let minHeight = Math.min.apply(this, rowHeight);
            // 找到第一行最短高度元素索引
            let minIndex = rowHeight.findIndex(function (value) {
                    return value === minHeight;
            });
            // 找到第一行最短元素
            let minItem = oItems[minIndex];
            // 获取第一行最短元素偏移位
            let offsetX = minItem.offsetLeft;
            // 设置下一个元素位置
            oItems[i].style.position = "absolute";
            oItems[i].style.left = offsetX + "px";
            oItems[i].style.top = minHeight + "px";
            // 修改第一行元素高度
            rowHeight[minIndex] += oItems[i].offsetHeight;
        }
    }
}

function initWidth() {
    // 1.计算容器宽度
    let oMainDiv = document.querySelector(".main");
    let oItems = document.querySelectorAll(".box");
    let screenWidth = getScreen().width;
    let itemWidth = oItems[0].offsetWidth;
    let cols = Math.floor(screenWidth / itemWidth);
    let mainWidth = cols * itemWidth;
    // 2.设置容器宽度
    oMainDiv.style.width = mainWidth + "px";
    oMainDiv.style.margin = "0 auto";
    oMainDiv.style.background = "pink";
}

function initImages() {
    let oMainDiv = document.querySelector(".main");
    for(let i = 1; i <= 40; i++){
        // 1.创建外层div
        let oBox = document.createElement("div");
        oBox.className = "box";
        oMainDiv.appendChild(oBox);
        // 2.创建内层div
        let oPic = document.createElement("div");
        oPic.className = "pic";
        oBox.appendChild(oPic);
        // 3.创建图片
        let oImg = document.createElement("img");
        let index = i < 10 ? "0" + i : i;
        oImg.src = `images/img${index}.jpg`;
        oPic.appendChild(oImg);
    }
}