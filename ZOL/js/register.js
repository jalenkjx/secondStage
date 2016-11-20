$(function()
{
	//load logo
	
	//alert(1);
	//"^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$"
	//$('.phonenum').val()
	var z=0
	$('.phonenum').eq(0).blur(function()
	{
		//alert(1);
		//手机号码验证
		if(/^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$/.test($('.phonenum').val()))
		{
			$('.rtips1').eq(0).css('display','block');
			$('.wtips1').eq(0).css('display','none');
			//alert(1);
			z++;
		}
		else
		{
			$('.wtips1').eq(0).css('display','block');
			$('.rtips1').eq(0).css('display','none');
		}
		
			
	})
	//用户名验证/^[a-zA-Z]\w{5,17}$/  
		//以字母开头，长度在6~18之间，只能包含字符、数字和下划线.
	var re = /^[a-zA-Z]\w{5,17}$/;
	$('.username').eq(0).blur(function()
	{
		if(re.test($('.username').val()))
		{
			$('.rtips2').eq(0).css('display','block');
			$('.wtips2').eq(0).css('display','none');
			z++;
		}
		else
		{
			$('.rtips2').eq(0).css('display','none');
			$('.wtips2').eq(0).css('display','block');
		}
	})
	//密码验证
	var re01 = /^[a-zA-Z0-9_]{6,16}$/;
	$('.password').eq(0).blur(function()
	{

		if(re01.test($('.password').eq(0).val()))
		{
			$('.rtips3').eq(0).css('display','block');
			$('.wtips3').eq(0).css('display','none');
			z++;
		}
		else
		{
			$('.rtips3').eq(0).css('display','none');
			$('.wtips3').eq(0).css('display','block');
		}
	})
	$('.password2').eq(0).blur(function()
	{
		if($('.password2').eq(0).val()=='')
		{
			$('.rtips4').eq(0).css('display','none');
			$('.wtips4').eq(0).css('display','block');
		}
		else
		{
			if($('.password2').eq(0).val()==$('.password').eq(0).val())
			{

				$('.rtips4').eq(0).css('display','block');
				$('.wtips4').eq(0).css('display','none');
				z++;
			}
			else
			{
				$('.rtips4').eq(0).css('display','none');
				$('.wtips4').eq(0).css('display','block');
			}
		}
		
	})

	if(z = 4)
	{
		$('input[type=button]').eq(0).click(function()
		{

			var ID = $('.username').eq(0).val();
			var password = $('.password').eq(0).val();

			//console.log(ID+":"+password);

			$.ajax(
			{
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				type:"POST",
				data:{
					status:"register",
					userID:ID,
					password:password
				},
				success:function(res){
					//console.log(typeof res)
					//console.log(res);
					switch(res){
						case "0":alert('此用户名已被注册');break;
						case "1":alert('恭喜，注册成功了！')
								window.location.href ='login.html';
								;break;
						case "2":alert('系统出错');break;

					}
				}
			})

		})
	}
})