$(function()
{

	$('.login_btn').eq(0).click(function(){
		$('.login_content').css('display','none')
		var ID = $('.text').eq(0).val();
		var password = $('.password').eq(0).val();
		//console.log(ID+":"+password);

		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			type:"POST",
			data:{
				status:"login",
				userID:ID,
				password:password
			},
			success:function(res){

				switch(res){
					case "0":$('.login_content').css('display','block') ;break;
					case "2":$('.login_content').css('display','block'); break;
					default:console.log(res);alert('登陆成功!');
						$.cookie('id',ID);
						window.location.href = 'index.html'
					break;
				}
			}

		})

	})
	$('.remove').click(function()
	{
		$(this).siblings('input').val('');
	})
})
	