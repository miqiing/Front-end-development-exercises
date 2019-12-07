

//开始页面
var startPage=document.getElementById("start");
var startBtn=document.getElementById("startBtn");

// 游戏页面
var playingPage=document.getElementById("playing");
var scoreShow=document.getElementById("score");
var  progressBar=document.getElementById("progress");

//狼出现的坐标位置
var coordinate=[{l:"97px",t:"115px"},{l:"17px",t:"159px"},{l:"187px",t:"142px"},{l:"14px",t:"220px"},{l:"100px",t:"192px"},{l:"197px",t:"213px"},{l:"28px",t:"293px"},{l:"117px",t:"276px"},{l:"203px",t:"296px"}];
// 大狼图
var Bwolf=["h0.png","h1.png","h2.png","h3.png","h4.png","h5.png","h4.png","h3.png","h2.png","h1.png","h0.png"];
var hitBwolf=["h6.png","h7.png","h8.png","h9.png"];
// 小狼
var Lwolf=["x0.png","x1.png","x2.png","x3.png","x4.png","x5.png","x4.png","x3.png","x2.png","x1.png","x0.png"];
var hitLwolf=["x6.png","x7.png","x8.png","x9.png"];
var score=0;

var BwolfTimer; 
var LwolfTimer;
// 是否开始
var isStart=0;

// 点击开始
startBtn.onclick=function(){
	startPage.style.display="none";
	playingPage.style.display="block";
	progressBarChange();
	isStart=1;
	BwolfTimer=setInterval("createwolf(Bwolf,hitBwolf,10)",1500);
	LwolfTimer=setInterval("createwolf(Lwolf,hitLwolf,-10)",2000);

}

// 获得随机数
function getRandom(max,min){
	return parseInt(Math.random()*(max-min)+min);
}

// 进度条
var progressTimer;
function progressBarChange(){
	var len=parseInt(progressBar.offsetWidth);
	progressTimer=setInterval(function(){
		len-=.01;    
		if(len<=0){   //进度条走完的时候把游戏停掉
			clearInterval(progressTimer);
			clearInterval(BwolfTimer);
			clearInterval(LwolfTimer);
			len=0;
		}
		progressBar.style.width=len+"px";
	},10)
}

var pflag;
// 造狼
function createwolf(wolfarr,hitarr,cunstyle){
	var ptn=getRandom(9,0);
	if(pflag==ptn){//增加一层判断，避免出现一坑多狼的情况
		createwolf(wolfarr,hitarr,cunstyle);
		return;
	}
	pflag=ptn;
	var oimg=document.createElement("img");
	playingPage.appendChild(oimg);   	
	oimg.style.left=coordinate[ptn].l;
	oimg.style.top=coordinate[ptn].t;
	var atimer=new wolfcome(oimg,wolfarr).getTimer();
	var canclick=1;
	//狼被击打时
	oimg.onclick=function(){
		if(canclick){
			clearInterval(atimer);
			score+=cunstyle;
			scoreShow.innerHTML=score;
			hitwolf(oimg,hitarr);
			canclick=0;
		}

	}
}



// 击打狼
function hitwolf(obj,hitarr){
	var count=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		obj.src="img/"+hitarr[count];
		count++;
		if (count==hitarr.length) {
			clearInterval(obj.timer);
			playingPage.removeChild(obj);
		}
	},100);
}

// 狼出现
function wolfcome(obj,wolfarr){
	var count=0;
	obj.timer=setInterval(function(){
		obj.src="img/"+wolfarr[count];
		count++;
		if (count==wolfarr.length) {
			playingPage.removeChild(obj);
			clearInterval(obj.timer);

		}
	},100);
	this.getTimer=function(){
		return obj.timer;
	}
}

//窗口获得焦点时；
window.onfocus = reStart;
document.onfocusin =reStart;
// 窗口失去焦点时；
window.onblur = pauseGame;
document.onfocusout =pauseGame;

var titleInit = document.title, isShine =false;
//窗口失去焦点时让游戏挂起，
function  pauseGame(){
	if (isStart) {
		clearInterval(progressTimer);
		clearInterval(BwolfTimer);
		clearInterval(LwolfTimer);
		isShine = true;
	}
}

//窗口获得焦点时让游戏重新开始，
function reStart(){
	if (isStart) { //增加一层判断，严谨性（不加的话在火狐下一打开页面就会走这）。
		progressBarChange();
		// createwolf(Bwolf,hitBwolf,10);
  //       createwolf(Lwolf,hitLwolf,-10);
		BwolfTimer=setInterval("createwolf(Bwolf,hitBwolf,10)",1500);
		LwolfTimer=setInterval("createwolf(Lwolf,hitLwolf,-10)",2000);
		isShine =false;
	}
}

// 离开提醒
setInterval(function() {
	var title = document.title;
	if (isShine == true) {
		if (/游/.test(title) == false) {
			document.title = '【游戏已挂起】';    
		} else {
			document.title = '【　　　　　】';
		}
	} else {
		document.title = titleInit;
	}
}, 200);









