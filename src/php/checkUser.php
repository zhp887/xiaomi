<?php
	header("Content-Type:text/html;charset=utf-8");
	//1接收数据
	$username = $_GET["username"];
	//2、在数据库中查询
    //1)、建立连接，并选择数据库
    $conn = mysqli_connect("127.0.0.1","root","root");
    mysqli_select_db($conn,"xiaomi");
    //2)、执行SQL语句（查询）
    $sqlStr="select * from vip where username='$username'";
    
    $result=mysqli_query($conn,$sqlStr);
    
    //3)、关闭连接
    mysqli_close($conn);
	//3、响应结果
	//获得$result的行数
	$rows = mysqli_num_rows($result);
		
	if($rows>0){//如果用户名存在，返回0；
		echo "0";	
	}else {//如果用户名不存在，返回1.
		echo "1";
	}	
?>