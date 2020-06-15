// 获取购物车的数据
function getShoppingCar(fun){
    //从cookie中获取用户名
    let userName = getCookie("userName");
    if (userName!=null) {
    	$.get("./php/getShoppingCart.php",{"vipName":userName},function(datas){
	        let htmlStr=`
	        	<h2 id="spH2"><span>小米发货商品（不含有品）满99元免运费,还需</span><em>20元</em>  <a href="#">去凑单 ></a></h2>
	            <table class="shoppingCart_table">
					<tr class="shopping_xhx1">
						<td>
							<input id="input" type="checkbox" name="checkbox"/>
							<label  for="input"></label >
							<span>全选</span>
						</td>
						<td>编号</td>
						<td>商品名称</td>
						<td>单价</td>
						<td>数量</td>
						<td>小计</td>
						<td>操作</td>
					</tr>
				</table>
	        `;                    
	        datas.forEach(goods => {
	            htmlStr +=`
	                <table class="shoppingCart_table">
						<tr class="shopping_xhx">
							<td>
								<input id="input${goods.goodsId}" type="checkbox" name="checkbox"/>
								<label  for="input${goods.goodsId}"></label >
							</td>
							 <td class="goodsId">${goods.goodsId}</td>
							<td>
								<a href="#"><img src="${goods.beiyong9}"/></a>
								<a href="#">${goods.beiyong2}  ${goods.beiyong5}</a>
							</td>
							<td>${goods.goodsPrice}</td>
							<td>
								<input type="button" class="reduceBtn" value="-" />
								<input type="text" class="wenBtn" value="${goods.goodsCount}" />
								<input type="button" class="addBtn" value="+" />
							</td>
							<td>${goods.goodsPrice*goods.goodsCount}</td>
							<td><a class="delBtn">×</a></td>
						</tr>
					</table>
	            `;
	        });
	        htmlStr += `
	                 <div class="shopping_jiesuan">
						<h3 class="float_left">
							<a href="#">继续购物 </a>
							<a>|</a>
							<a>共 <span id="shoppshu">0</span> 件商品，已选择<span>0</span>件</a>
						</h3>
						<h4 class="float_left">
							<span>合计</span>
							<em id="heji">0</em>
							<span>元</span>
						</h4>
						<input class="float_right" type="button" value="去结算" />
					</div>
					<div class="shangptj">
						<fieldset>
							<legend>买购物车中商品的人还买了</legend>
						</fieldset>
					</div>
	                `;
	        // 把产生html字符串放在html页面上
	        $("#box").html(htmlStr);
	        fun(); //给dom元素添加事件
	    },"json");
    }else{
    	let htmlStr = `
	    	<div class="shopping_kgwc">
				<h2 class="float_left"><img src="images/kgwc_03.jpg"></h2>
				<div class="shopping_kc float_right">
					<h2>您的购物车还是空的！</h2>
					<h3>登录后将显示您之前加入的商品</h3>
					<h4><a href="login.html">立即登录</a><a href="productList.html">马上购物</a></h4>
				</div>
			</div>
			<div class="shangptj">
				<fieldset>
					<legend>为您推荐</legend>
				</fieldset>
			</div>
    	`;
    	 $("#box").html(htmlStr);
    }
}
function showWelcomeAndLogin(ab){
    let userName = getCookie("userName");
    if(userName!=null){
    	let htmlStr = "";
        htmlStr +=`
        	<a href="#" class="nav_a" id="userSpan"></a>
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
        `;
        $("#nav_box").html(htmlStr);
        getShoppingCar(addEvent);
    }
    ab();
};	
//修改购物车中商品的数量()
// 参数:
// 商品编号，修改后的商品数量
function updateCount(goodsId,goodsCount,fun){
    //从cookie中获取用户名
    let userName = getCookie("userName");
    if (userName!=null) {
    	$.get("./php/updateGoodsCount.php",{
	        "vipName":userName,
	        "goodsId":goodsId,
	        "goodsCount":goodsCount
	    },function(data){
	        if(data=="0"){
	            alert("服务器出错：修改数量失败");
	        }else{
	            // 前端修改数量
	            fun();
	        }
	    });
    } 
} 

$(function(){    
    getShoppingCar(addEvent);
    showWelcomeAndLogin(fn);
    $("#btnLogout").click(function(){
        removeCookie("userName");
        showWelcomeAndLogin();
    });
});

//添加事件 
function addEvent(){
    $("table :checkbox:eq(0)").check($("table :checkbox:gt(0)"));
    $(":checkbox").click(function(){
        totalMoney();
    });
    $(".addBtn").click(function(){
        //一、修改后端的数量
        let goodsId = $(this).parent().parent().find(".goodsId").html();
        let count = $(this).prev().val();
        count++;
        updateCount(goodsId,count,()=>{            
            //二、修改前端的数量
            // 数量            
            $(this).prev().val(count);
            // 单价
            let price = $(this).parent().prev().html();
            // 计算金额
            let money = price*count;
            $(this).parent().next().html(money);
            // 总金额
            totalMoney();  
        });
    });    
    $(".wenBtn").blur(function(){
        //一、修改后端的数量
        let goodsId = $(this).parent().parent().find(".goodsId").html();
        let count = $(this).val();
        updateCount(goodsId,count,()=>{            
            //二、修改前端的数量
            // 数量            
            $(this).val(count);
            // 单价
            let price = $(this).parent().prev().html();
            // 计算金额
            let money = price*count;
            $(this).parent().next().html(money);
            // 总金额
            totalMoney();  
        });
    });    
    $(".reduceBtn").click(function(){
        //一、修改后端的数量
        let goodsId = $(this).parent().parent().find(".goodsId").html();
        let count = $(this).next().val();
        count--;
        if(count<1){
            count = 0;
        }
        updateCount(goodsId,count,()=>{  
          // 二、修改前端的数量
            // 数量 
            $(this).next().val(count);
            // 单价
            let price = $(this).parent().prev().html();
            // 计算金额
            let money = price*count;
            $(this).parent().next().html(money);

            // 同时改变当前行的复选框的状态
            if(count==0){
                $(this).parent().parent().find(":checkbox").prop("checked",false);
                // $(this).parent().parent().remove();
            }
            // 总金额
            totalMoney();
        })
    });
    $(".delBtn").click(function(){
    	let goodsId = $(this).parent().parent().find(".goodsId").html();
    	//后端删除商品数据
        if(confirm("亲，您真的要删除吗？")){
        	deleteGoods(goodsId);
            $(this).parent().parent().remove();
            totalMoney();
        }
    });
}
//后端删除商品数据
function deleteGoods(goodsId){
	let userName = getCookie("userName");
	$.get("php/deleteGoods.php",{
		"vipName":userName,
	    "goodsId":goodsId
	},function(data){
		if(data=="0"){
	        alert("服务器出错：删除失败");
	    }else{
	        // 前端修改数量
//	        fun();
	    }
	})
}
// 计算总金额
function totalMoney(){
    // 
    let money =0;
    let $tr = $(".shopping_xhx");
    $tr.each(function(){
        // 复选框是不是选中了
        if($(this).find(":checkbox").prop("checked")){
            money += parseFloat($(this).find("td").eq(5).html());
        }
    });
    $("#heji").html(money);    
}    

function fn(){
	$(".nav_xlk").mouseenter(function(){
		$(this).stop().slideDown(200);
	}).mouseleave(function(){
		$(this).stop().slideUp(200);
	});
	//dl
	$("#userSpan").mouseenter(function(){
		//   弹出下拉菜单
	     $(".nav_xlk").stop().slideDown(200);
	});
	//鼠标离开
	$("#userSpan").mouseleave(function(){
		$(".nav_xlk").stop().slideUp(200);
	});
}