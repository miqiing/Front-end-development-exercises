(function () {
    function getScreen() {
        let width, height;
        if(window.innerWidth){
            width = window.innerWidth;
            height = window.innerHeight;
        }else if(document.compatMode === "BackCompat"){
            width = document.body.clientWidth;
            height = document.body.clientHeight;
        }else{
            width = document.documentElement.clientWidth;
            height = document.documentElement.clientHeight;
        }
        return {
            width: width,
            height: height
        }
    }
    function getPageScroll() {
        let x, y;
        if(window.pageXOffset){
            x = window.pageXOffset;
            y = window.pageYOffset;
        }else if(document.compatMode === "BackCompat"){
            x = document.body.scrollLeft;
            y = document.body.scrollTop;
        }else{
            x = document.documentElement.scrollLeft;
            y = document.documentElement.scrollTop;
        }
        return {
            x: x,
            y: y
        }
    }
    function addEvent(ele, name, fn) {
        if(ele.attachEvent){
            ele.attachEvent("on"+name, fn);
        }else{
            ele.addEventListener(name, fn);
        }
    }
    function getStyleAttr(obj, name) {
        if(obj.currentStyle){
            return obj.currentStyle[name];
        }else{
            return getComputedStyle(obj)[name];
        }
    }
    window.getScreen = getScreen;
    window.getPageScroll = getPageScroll;
    window.addEvent = addEvent;
    window.getStyleAttr = getStyleAttr;
})();