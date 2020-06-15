//购物车
$(".car").mouseenter(function(){
//	替换图片 attr()修改某值的方法
     $(".car img").attr("src","images/car2.png");
//   弹出下拉菜单
     $(".car .carList").stop().slideDown(200);
});
//鼠标离开
$(".car").mouseleave(function(){
	$(".car img").attr("src","images/car1.png");
	$(".car .carList").stop().slideUp(200);
});

//logo
//鼠标经过,animate({属性},时间:毫秒)修改css属性值
$(".logo-wrap .logo").mouseenter(function(){
	$(".logo .logoDouble").stop().animate({right:"-55px"},100);
});
$(".logo-wrap .logo").mouseleave(function(){
	$(".logo .logoDouble").stop().animate({right:"0px"},100);
});

//鼠标经过商品列表
$(".goodList").mouseenter(function(){
	$(this).stop().slideDown(200);
}).mouseleave(function(){
	$(this).stop().slideUp(200);
});
//鼠标经过li
$(".logo_nav li").mouseenter(function(){
//	读取当前元素的下标
    let index = $(this).index();
    $(function(){
    	if (index == 0) {
    		getGoods("015",".xiaomi");
    	} else if (index == 1) {
    		getGoods("015",".xiaomi");
    	} else if (index == 2) {
    		getGoods("015",".xiaomi");
    	}else if (index == 3) {
    		getGoods("015",".xiaomi");
    	}else if (index == 4) {
    		getGoods("015",".xiaomi");
    	}else if (index == 5) {
    		getGoods("015",".xiaomi");
    	}else if (index == 6) {
    		getGoods("015",".xiaomi");
    	}
	});
	if(index !=7 && index !=8){
		$(".goodList").stop().slideDown(200);
	}else{
		$(".goodList").stop().slideUp(200);
	}
}).mouseleave(function(){
	$(".goodList").stop().slideUp(200);
});
// 从后端获取所有的商品
function getGoods(num,dom){
    $.get("php/getGoodsList.php?typeId="+num,function(data){
        showData(data,dom);
    },"json");
}	
//显示商品
function showData(data,dom){
    let htmlStr="";
    data.forEach(item => {
        htmlStr += `
			<div class="shopping_list">
				<a href="#"><img src="${item.goodsImg}"></a>
				<h2>${item.goodsName}</h2>
				<h3>${item.goodsPrice}元起</h3>
			</div>	
        `;
    });
    $(dom).html(htmlStr);  
}

// 获取cookie显示欢迎语或者登录按钮
function showWelcomeAndLogin(ab){
    let userName = getCookie("userName");
    if(userName!=null){
    	let htmlStr = "";
        htmlStr +=`
        	<a href="#" class="nav_a" id="userSpan"></a>
			<span>|</span>
			<a href="#">消息通知</a>
			<span>|</span>
			<a href="#">我的订单</a>
			<div class="nav_xlk">
				<ul>
					<li><a href="#">个人中心</a></li>
					<li><a href="#">评价晒单</a></li>
					<li><a href="#">我的喜欢</a></li>
					<li><a href="#">小米账户</a></li>
					<li><a href="#" id="btnLogout">退出登录</a></li>
				</ul>
			</div>
        `;
        $("#nav_box").html(htmlStr);
        $("#userSpan").html(userName);
    }else{
		let htmlStr = "";
        htmlStr +=`
        <a href="login.html">登录</a>
		<span>|</span>
		<a href="register.html">注册</a>
		<span>|</span>
		<a href="#">消息通知</a>
        `;
        $("#nav_box").html(htmlStr);
    }
    ab();
}	
$(function(){
    showWelcomeAndLogin(fn);
    $("#btnLogout").click(function(){
        removeCookie("userName");
        showWelcomeAndLogin();
    });
})
function fn(){
	$(".nav_xlk").mouseenter(function(){
		$(this).stop().slideDown(200);
		$("#userSpan").css({"background-color":"#FFFFFF","color":"#424242"});
	}).mouseleave(function(){
		$(this).stop().slideUp(200);
		$("#userSpan").css({"background-color":"#333333","color":"#b0b0b0"});
	});
	//dl
	$("#userSpan").mouseenter(function(){
		//   弹出下拉菜单
	     $(".nav_xlk").stop().slideDown(200);
	     $("#userSpan").css({"background-color":"#FFFFFF","color":"#424242"});
	});
	//鼠标离开
	$("#userSpan").mouseleave(function(){
		$(".nav_xlk").stop().slideUp(200);
		$("#userSpan").css({"background-color":"#333333","color":"#b0b0b0"});
	});
}