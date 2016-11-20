//侧边栏
	function sidefn(){

		$('.operation_tabbox').eq(0).children('div').mouseover(function()
		{
			//alert(1);
			$(this).addClass('tab_hover');
		})
		$('.operation_tabbox').eq(0).children('div').mouseout(function()
		{
			//alert(1);
			$(this).removeClass('tab_hover');
		})
			//返回顶部样式
		$('.backtop').mouseover(function()
		{
			$(this).addClass('tab_hover')
		})
		$('.backtop').mouseout(function()
		{
			$(this).removeClass('tab_hover')
		})
		//点击购物车图标   侧边栏弹出
		$('.tab_cart').click(function()
		{
			$('.toolbar_plugins').toggle(200);
		})
		$('.plugins_close').click(function()
		{
			$('.toolbar_plugins').toggle(200);
		})
		
	}


	function topbar()
{
	//顶部栏   如果登录显示用户名
		//console.log($.cookie('id'))
	if($.cookie('id'))
	{
		$('.index_login').html('Hi~'+$.cookie('id')+'欢迎来到ZOL商城');
		$('.index_register').html('<a href="javascript:;" class="back">退出</a>')
	}
	$('.back').eq(0).click(function()
	{
		$.cookie('id',null);
		window.location.href='index.html'
	})

	//买家中心
	$('.tm_lib').mouseover(function()
	{
		$('.tm_buyer').css(
		{
			'display':'block'
		})
	})
	$('.tm_lib').mouseout(function()
	{
		$('.tm_buyer').css(
		{
			'display':'none'
		})
	})

	//微信二维码
	$('.tm_mobile').mouseover(function()
	{
		$('.tm_wechat').css(
		{
			'display':'block'
		})
	})
	$('.tm_mobile').mouseout(function()
	{
		$('.tm_wechat').css(
		{
			'display':'none'
		})
	})


	//联系客服电话
	
	$('.tm_lip').mouseover(function()
	{
		$('.tm_phonenum').css(
		{
			'display':'block'
		})
	})
	$('.tm_lip').mouseout(function()
	{
		$('.tm_phonenum').css(
		{
			'display':'none'
		})
	})

//顶部菜单事件----------------------------------------------------end

}


//导航事件
	//种类菜单   悬浮li上对应的div菜单block
	function nav()
	{
		$('.category_nav_menu').find('li').mouseover(function()
		{
			$('.menu_content').eq($(this).index()).css('display','block')
		})
		//鼠标移开菜单消失
		$('.category_nav_menu').find('li').mouseout(function()
		{
			$('.menu_content').eq($(this).index()).css('display','none')
		})
	}
	

//导航事件--------------------------------------------------------end


	function sc_msg(){
			$.ajax({
				url:'date/list.json',
				type:'GET',
				success:function(res){
					var sc_str = $.cookie('goods');
					if(sc_str){
						var sc_obj = eval(sc_str);
						var sc_num = 0 ;
						var html = ''; 
						for(var i in sc_obj){					
							html += '<li class="clearfix"><div class="list_pic"><img src="'+res[sc_obj[i].id].url+'" alt=""><i class="iconfont remove">&#xe610;<a href="detail.html?id='+sc_obj[i].id+'"></a></i></div><div class="goods_name">'+res[sc_obj[i].id].title+'</div><div class="goods_price">￥'+res[sc_obj[i].id].price+' <em style="float:left; font-size:14px;color:#333">商品数量：'+sc_obj[i].num+'</em></div><input type="button" value="结算" class="settlement_btn"></li>'

						}
						$('.cart_list').html(html);
						//点击错号 移除li
							$('input[value="结算"]').click(function()
							{
								window.location.href = 'cart.html'
							})
							$('.remove').click(function()
							{
								//alert(1);
								var str = $(this).children('a').attr('href').split('=')[1];
								//console.log(str);
								for(var i = 0; i<sc_obj.length; i++)
								{
									if(str==sc_obj[i].id)
									{
										sc_obj.splice(i,1)
										if(sc_obj.length==0)
										{
											$.cookie('goods',null)
										}
										else{
											$.cookie('goods',JSON.stringify(sc_obj))
										}
										console.log($.cookie('goods'));
										//alert(1);
										//console.log($(this).parent('li'))
										$($(this).parent().parent()).remove();
										sc_car();
									}
								}
								
								
							})
					}

				}
			})


		}




		function sc_car(){
			var sc_str = $.cookie('goods');
			if(sc_str){//如果购物车cookie不为空。
				var sc_obj = eval(sc_str);
				var sc_num = 0 ; 
				for(var i in sc_obj){
					sc_num = Number(sc_obj[i].num) + sc_num;
				}
			}
			else
			{
				sc_num = 0
			}
			$('.cart_num').html(sc_num);
		}

