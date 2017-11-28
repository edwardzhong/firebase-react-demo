export function dialog(txt,cancelFn,confirmFn){
	var tpl=`<div class="dialog-wrap">
			<div class="dialog">
				<div class="txt-wrap">
					<p>${txt}</p>
				</div>
				<div class="btn-wrap">
					<button class="cancel">取消</button>
					<button class="confirm">确定</button>
				</div>
			</div>
		</div>`;
	var $elem=$(tpl);
	$(document.body).append($elem);
	$elem.find('.cancel').on('click',function(){
		cancelFn.call($elem);
	});
	$elem.find('.confirm').on('click',function(){
		confirmFn.call($elem);
	});
}

export function showCommonDialog(txt,fn){
	dialog(txt,function(){
		this.remove();
	},fn);
}

export function showError(txt){
	showMsg('error',txt);
}

export function showSucc(txt){
	showMsg('succ',txt);
}

export function showMsg(cls,txt){
	var $elem=$('#msg');
	$elem.html(txt)[0].className='msg show '+cls;
	setTimeout(function() {
		$elem.html('').removeClass('show');
	}, 1500);
}

export function showLoading(){
	$('#loading').show();
}

export function hideLoading(){
	$('#loading').hide();
}