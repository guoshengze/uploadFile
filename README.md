# uploadFile
跨域上传文件（支持IE8+）

## 复制callback.html到与前端文件同域的服务器 ##
## 前端html页面引入，或js加载插件js ##
## 然后即可按如下创建 ##



    //@param 提交的接口地址 url - http://develop.embed.huya.com/index.php?m=OrganizationEnter&do=uploadFile
    //@param 接收回调的页面地址 callbackUrl - http://gsz.huya.com:3000/result.html
    //@param 成功回调函数   done - funciton(){}
    //@param 两个input的样式类  inputStyleClass - ['file_select','file_submit']

    $('#formWrap').createFileUpload({
	    url:'http://develop.embed.huya.com/index.php?m=OrganizationEnter&do=uploadFile',
	    callbackUrl:'http://gsz.huya.com:3000/callback.html',
	    done:function(e,res){
	      console.log('成功上传返回数据：')
	      console.log(res);
	      console.log('当前jq对象：');
	      console.log($(e));
	    },
	    inputStyleClass:['file_select','file_submit']
    });

