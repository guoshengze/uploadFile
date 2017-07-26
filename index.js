/**
 * @authors  guoshengze
 * @date    2017-07-24 17:11:59
 */

;(function($){

	if(window.uploadFileGlobalParam){
		return;
	}

	var uploadFileGlobalParam = {
			uploadFileCount:0,
			cbGroup:{}//{'id':{fn:'',dom:''}}
		};

	// 写入回调iframe
	$('body').append('<iframe name="uploadFileCommonCallbackIframe" id="uploadFileCommonCallbackIframe" style="display:none;"></iframe>');

	// 创建配置 
	// obj {}
	//@param 提交的接口地址     url - http://develop.embed.huya.com/index.php?m=OrganizationEnter&do=uploadFile
	//@param 接收回调的页面地址 callbackUrl - http://gsz.huya.com:3000/result.html
	//@param 成功回调函数       done - funciton(){}
	//@param 两个input的样式类  inputStyleClass - ['file_select','file_submit']
	$.fn.createFileUpload = function(obj){
		var cbName = 'createFileUploadCb' + ( ++uploadFileGlobalParam.uploadFileCount ),
			form;

		if(!obj){
			setError("请输入创建上传表单的配置对象信息");
			return;
		}

		if(!obj.url || !obj.callbackUrl || !obj.done){
			setError("缺乏必要的配置字段，请核证");
			return;
		}
		
		if(typeof obj.url !== 'string' || typeof obj.callbackUrl !== 'string' || typeof obj.done !== 'function'){
			setError("对象的属性格式有误，请核证");
			return;
		}

		// 保存当前创建上传对象信息
		uploadFileGlobalParam.cbGroup[cbName] = {
			fn:obj.done,
			dom:this,
			url:obj.url
		};
		// 拼接回调url
		obj.callbackUrl = encodeURIComponent(obj.callbackUrl + '?done=' + cbName);
		// 创建上传表单
		form = '<form  action="' + obj.url + '&callbackUrl=' + obj.callbackUrl + '" method="POST" class="upload_file_common_form" enctype="multipart/form-data" target="uploadFileCommonCallbackIframe">' +
                  '<input type="file" class="' + ( obj.inputStyleClass ? obj.inputStyleClass[0] : '' ) + '" name="file" />' +
                  '<input type="submit" class="' + ( obj.inputStyleClass ? obj.inputStyleClass[1] : '' ) + '" value="开始上传"/>' +
              	'</form>';
	    this.html(form);
	    // 返回当前jq对象
	    return this;
	};

	function setError(msg){
		throw new Error('上传文件创建有误：' + msg);
	}

	window.uploadFileGlobalParam = uploadFileGlobalParam;
})(jQuery);