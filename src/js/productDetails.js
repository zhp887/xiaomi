function fun(){
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
		$li.eq(outOrd).css("background-color","#CCCCCC");
		$li.eq(ord).css("background-color","#333333");
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
}
// 获取文具类型的商品
function getDetails(){
    let goodsId = location.search.split("=")[1];
    $.get("./php/getGoodsInfo.php",{
        "goodsId":goodsId,
    },function(data){
        let htmlStr=`
            <h2 class="float_left"><span>${data.beiyong2}</span><em>|</em><a href="#">${data.beiyong3}</a><em></em><a href="#"></a></h2>
				<h3 class="float_right">
					<a href="#">概述</a>
					<span>|</span>
					<a href="#">设计与安装</a>
					<span>|</span>
					<a href="#">滤芯</a>
					<span>|</span>
					<a href="#">智能控制</a>
					<span>|</span>
					<a href="#">规格</a>
					<span>|</span>
					<a href="#">F码通道</a>
					<span>|</span>
					<a href="#">咨询客服</a>
					<span>|</span>
					<a href="#">用户评价</a>
        `;
        $("#box1").html(htmlStr);
    },"json");
}
// 获取商品
function getDetail(fun){
    let goodsId = location.search.split("=")[1];
    $.get("./php/getGoodsInfo.php",{
        "goodsId":goodsId,
    },function(data){
        let htmlStr=`
	        <div class="productDetails_lbt float_left">
				<div class="banner_a">
					<img src="${data.beiyong9}"/>
					<img src="${data.beiyong10}"/>
					<img src="${data.beiyong11}"/>
					<img src="${data.beiyong12}"/>
					<img src="${data.beiyong13}"/>
				</div>
				<ul class="banner_ul">
					<li class="first"></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
				<!--箭头-->
				<div class="leftBtn"> &lt; </div>
				<div class="rightBtn"> &gt; </div>
			</div>
			<div class="productDetails_list float_right">
				<h2>${data.beiyong2}</h2>
				<p>
					<span></span>
					<em>${data.beiyong4}</em>
				</p>
				<h3>小米自营</h3>
				<h4><span>${data.goodsPrice}元</span><em></em></h4>
				<div class="productDetails_dingwei">
					<h2 class="clear_fix">
						<img src="images/8_49.jpg"/>
						<span>北京</span>
						<span>北京市</span>
						<span>东城区</span>
						<span>安定门街道</span>
						<a href="#">修改</a>
					</h2>
					<h3>有现货</h3>
				</div>
				<div class="productDetails_tit clear_fix">
					<h2 class="productDetails_margin_top">选择颜色</h2>
					<div class="productDetails_txt1 productDetails_txt2 float_left">
						<h3>
							<span><img src="${data.beiyong9}"/></span>
							<em>${data.beiyong5}</em>
						</h3>
					</div>
					<div class="productDetails_txt1 float_left clear_margin_right">
						<h3>
							<span><img src="${data.beiyong9}"/></span>
							<em>${data.beiyong6}</em>
						</h3>
					</div>
					<div class="productDetails_txt1 float_left">
						<h3>
							<span><img src="${data.beiyong9}"/></span>
							<em>${data.beiyong7}</em>
						</h3>
					</div>
					<div class="productDetails_txt1 float_left clear_margin_right">
						<h3>
							<span><img src="${data.beiyong9}"/></span>
							<em>${data.beiyong8}</em>
						</h3>
					</div>
				</div>
				<div class="productDetails_jiesuan">
					<h3 class="clear_fix">
						<span class="float_left">${data.beiyong2}${data.beiyong5}</span>
						<a class="float_right">${data.goodsPrice}元<em></em></a>
					</h3>
					<h4>总计 ：${data.goodsPrice}元</h4>
				</div>
			</div>
        `;
        $("#box").html(htmlStr);
        fun();
    },"json");
}
function addShoppingCart(){
	let userName = getCookie("userName");
	let goodsId = location.search.split("=")[1];
	if (userName!=null) {
		$.post("php/addShoppingCart.php",{
			"vipName":userName,
			"goodsId":goodsId,
			"goodsCount":"1"
		},function(data){
			if(data=="1"){
            location.href = "shoppingCart.html";
        }else if(data=="0"){
            alert("加入购物车失败!");
        }
		});
	} else{
		alert("请登录!");
	}
}
$(function(){
    getDetail(fun);
    getDetails();
    $(".jiarugwc").click(function () {
        console.log("1");
		addShoppingCart();
    });
})
