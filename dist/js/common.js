"use strict";function getGoods(t,n){$.get("php/getGoodsList.php?typeId="+t,function(t){showData(t,n)},"json")}function showData(t,n){var o="";t.forEach(function(t){o+='\n\t\t\t<div class="shopping_list">\n\t\t\t\t<a href="#"><img src="'.concat(t.goodsImg,'"></a>\n\t\t\t\t<h2>').concat(t.goodsName,"</h2>\n\t\t\t\t<h3>").concat(t.goodsPrice,"元起</h3>\n\t\t\t</div>\t\n        ")}),$(n).html(o)}function showWelcomeAndLogin(t){var n=getCookie("userName");if(null!=n){'\n        \t<a href="#" class="nav_a" id="userSpan"></a>\n\t\t\t<span>|</span>\n\t\t\t<a href="#">消息通知</a>\n\t\t\t<span>|</span>\n\t\t\t<a href="#">我的订单</a>\n\t\t\t<div class="nav_xlk">\n\t\t\t\t<ul>\n\t\t\t\t\t<li><a href="#">个人中心</a></li>\n\t\t\t\t\t<li><a href="#">评价晒单</a></li>\n\t\t\t\t\t<li><a href="#">我的喜欢</a></li>\n\t\t\t\t\t<li><a href="#">小米账户</a></li>\n\t\t\t\t\t<li><a href="#" id="btnLogout">退出登录</a></li>\n\t\t\t\t</ul>\n\t\t\t</div>\n        ',$("#nav_box").html('\n        \t<a href="#" class="nav_a" id="userSpan"></a>\n\t\t\t<span>|</span>\n\t\t\t<a href="#">消息通知</a>\n\t\t\t<span>|</span>\n\t\t\t<a href="#">我的订单</a>\n\t\t\t<div class="nav_xlk">\n\t\t\t\t<ul>\n\t\t\t\t\t<li><a href="#">个人中心</a></li>\n\t\t\t\t\t<li><a href="#">评价晒单</a></li>\n\t\t\t\t\t<li><a href="#">我的喜欢</a></li>\n\t\t\t\t\t<li><a href="#">小米账户</a></li>\n\t\t\t\t\t<li><a href="#" id="btnLogout">退出登录</a></li>\n\t\t\t\t</ul>\n\t\t\t</div>\n        '),$("#userSpan").html(n)}else{'\n        <a href="login.html">登录</a>\n\t\t<span>|</span>\n\t\t<a href="register.html">注册</a>\n\t\t<span>|</span>\n\t\t<a href="#">消息通知</a>\n        ',$("#nav_box").html('\n        <a href="login.html">登录</a>\n\t\t<span>|</span>\n\t\t<a href="register.html">注册</a>\n\t\t<span>|</span>\n\t\t<a href="#">消息通知</a>\n        ')}t()}function fn(){$(".nav_xlk").mouseenter(function(){$(this).stop().slideDown(200),$("#userSpan").css({"background-color":"#FFFFFF",color:"#424242"})}).mouseleave(function(){$(this).stop().slideUp(200),$("#userSpan").css({"background-color":"#333333",color:"#b0b0b0"})}),$("#userSpan").mouseenter(function(){$(".nav_xlk").stop().slideDown(200),$("#userSpan").css({"background-color":"#FFFFFF",color:"#424242"})}),$("#userSpan").mouseleave(function(){$(".nav_xlk").stop().slideUp(200),$("#userSpan").css({"background-color":"#333333",color:"#b0b0b0"})})}$(".car").mouseenter(function(){$(".car img").attr("src","images/car2.png"),$(".car .carList").stop().slideDown(200)}),$(".car").mouseleave(function(){$(".car img").attr("src","images/car1.png"),$(".car .carList").stop().slideUp(200)}),$(".logo-wrap .logo").mouseenter(function(){$(".logo .logoDouble").stop().animate({right:"-55px"},100)}),$(".logo-wrap .logo").mouseleave(function(){$(".logo .logoDouble").stop().animate({right:"0px"},100)}),$(".goodList").mouseenter(function(){$(this).stop().slideDown(200)}).mouseleave(function(){$(this).stop().slideUp(200)}),$(".logo_nav li").mouseenter(function(){var t=$(this).index();$(function(){0==t?getGoods("015",".xiaomi"):1==t?getGoods("015",".xiaomi"):2==t?getGoods("015",".xiaomi"):3==t?getGoods("015",".xiaomi"):4==t?getGoods("015",".xiaomi"):5==t?getGoods("015",".xiaomi"):6==t&&getGoods("015",".xiaomi")}),7!=t&&8!=t?$(".goodList").stop().slideDown(200):$(".goodList").stop().slideUp(200)}).mouseleave(function(){$(".goodList").stop().slideUp(200)}),$(function(){showWelcomeAndLogin(fn),$("#btnLogout").click(function(){removeCookie("userName"),showWelcomeAndLogin()})});