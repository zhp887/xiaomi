<?php
	header("Content-Type:text/html;charset=utf-8");
	//1、接受客户端的数据（用户输入的数据）
	$vipName   = $_REQUEST['vipName'];
	$goodsId   = $_REQUEST['goodsId'];
	$goodsCount = $_REQUEST['goodsCount'];
	
	//2、数据保存在数据库中
	//1）、建立连接（搭桥）
	$conn = mysqli_connect("127.0.0.1","root","root");
	
	//2）、选择数据库（找目的地）
	if(!mysqli_select_db($conn,"xiaomi")){
		die("数据库选择失败".mysqli_error());
	}
	
	//3）、传输数据（过桥）
	$sqlstr = "update shoppingCart set goodsCount='".$goodsCount."' where vipName='".$vipName."' and goodsId='".$goodsId."'";
	//echo($sqlstr);
	
	if(!mysqli_query($conn,$sqlstr)){
		die("执行更新SQL语句失败".mysqli_error());
		echo "0";
	}
	
	//4）、关闭连接（拆桥）
	mysqli_close($conn);
	
	//3、给客户端返回（响应）一个注册成功！
	echo 1; //1：表示修改成功,0：表示修改失败
?>