let ord = 0;
let myTimer = null;
let $img = $(".banner_a>img");
let $li = $(".banner_ul>li");
let hrefs=[
	"https://www.baidu.com",
    "http://www.1000phone.com",
    "https://www.baidu.com",
    "http://www.1000phone.com",
    "https://www.baidu.com"];
function autoPlay(){
	myTimer = setInterval(function(){
		goImg(ord+1);
	},2000);
}
//跳转到指定的图片上
function goImg(transOrd){
	if (transOrd == ord) {
		return;
	}
	//数据处理
	//outOrd是淡出的图片序号，transOrd是要淡入的图片序号
	let outOrd = ord;
	ord = transOrd;
	
	//边界处理
	if (ord > $img.length - 1) {
		ord = 0;
	}else if (ord < 0) {
		ord = $img.length -1;
	}
	//让一张图片淡出，一张图片淡入
	$img.eq(outOrd).animate({"opacity":0},1000);
	$img.eq(ord).animate({"opacity":1},1000);
	$li.eq(outOrd).css("background-color","#333333");
	$li.eq(ord).css("background-color","#FFFFFF");
}
function stopPlay(){
	window.clearInterval(myTimer);
	myTimer = null;
}
$(function(){
	//自动播放
	autoPlay();
	//点击圆点跳转到对应的图片上
	$(".banner_ul>li").click(function(){
		stopPlay();
		goImg($(this).index());
	});
	//鼠标放入暂停
	$(".banner_a").mouseover(function(){
		stopPlay();
	});
	//鼠标离开继续播放
	$(".banner_a").mouseout(function(){
		autoPlay();
	});
    //左箭头
    $(".leftBtn").click(function(){
        stopPlay();
        goImg(ord-1);
    });
    //右箭头
    $(".rightBtn").click(function(){
        stopPlay();
        goImg(ord+1);
    });	
    // 6、超链
    $(".banner_a").click(function(){
        window.open(hrefs[ord]);
    });
});