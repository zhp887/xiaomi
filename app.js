// 引入模块
let http = require("http");
let fs = require("fs");

//创建服务器对象
let app = http.createServer((req,res)=>{
    //  前端发送请求时，调用此函数
    // req：保存着前端发来的信息。
    // req.url:前端请求的地址，即：这个是前端在浏览器中写的内容（不包括域名和端口号的）     
    console.log(req.url);//如： /index.html  /5.1.html
    let str = req.url=="/"?"/index.html":req.url;
    // if(req.url!=='/favicon.ico'){ //favicon.ico是网站的图标，可以在网站的根目录放置这个文件
    let html = fs.readFileSync("./dist"+str);
    res.write(html);
    // }
    res.end();
});

app.listen(3001,"localhost",(err)=>{
    if(!err){
        console.log("恭喜您，服务器启动成功………………");
    }
});