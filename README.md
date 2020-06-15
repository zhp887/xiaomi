# xiaomi

1	进入git bash
2	在命令行，输入以下内容（把your Name 改成你自己的用户名）：git config  --global user.name  "Your Name" 
3	在命令行，输入以下内容（把email@example.com 改成你自己的邮箱）：git config  --global user.email  "email@example.com"
4 在git bash里输入： ssh-keygen -t rsa -C youremail@example.com你需要把邮件地址换成你⾃⼰的邮件地址，然后⼀路回车，使⽤默认值即可.
5 再克隆远程仓库到本地远程仓库地址：git clone git@github.com:tianwater/mytaobao.git
6 Git add ：假设在项目下有个index.html文件。在 git Bash，输入：git   add   index.html
7 Git commit(提交)：在git Bash里输入： git commit -m "这是新建的index.html"。其中"这是新建的index.html"只是说明或者说解释。
8 把本地版本库的代码放在远程库：git push -u git@github.com:tianwater/mytaobao.git master
