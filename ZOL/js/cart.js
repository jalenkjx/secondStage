function calc()
		{
			var num = 0;
			for(var i=0; i<$('.s_total').length; i++)
			{
				
				num+=parseInt($('.s_total').eq(i).children('em').html());
				//console.log(num);
			}
			$('.total_cart_price').html(num)
		}
$(function()
{
	
	sc_msg()
	
	//套装详细内容的显示与隐藏
function fn01()
{
	calc();
	$('.suit').mouseover(function()
		{
			//alert(1);
			$(this).next().css('display','block');

		});
	$('.suit').mouseout(function()
		{
			$(this).next().css('display','none');

		});
	//点击加减号  修改商品数量
	//console.log($('.text_amount').val());
	
	$('.minus').click(function()
	{
		var html1 = $(this).parent().parent().siblings('.s_price').children('em').html();		//alert(1);
		if($(this).siblings('input').val() != 1)
		{
			var num1 = $(this).siblings('input').val();
			num1--;
			$(this).siblings('input').val(num1);
			
			$(this).parent().parent().siblings('.s_total').children('em').html(html1*num1);
			calc();
		}
	})
	$('.plus').click(function()
	{
		
		var html1 = $(this).parent().parent().siblings('.s_price').children('em').html();
		//console.log(html1)
		var num2 = $(this).siblings('input').val();

		num2++;
		//console.log(num2)
		$(this).siblings('input').val(num2);
		$(this).parent().parent().siblings('.s_total').children('em').html(html1*num2);
		
		calc();
	})
	//删除按钮
	$('.deletebtn').click(function()
	{
		//alert(1);
		$(this).next().css('display','block');
	})
	$('.cancel').click(function()
	{
		$(this).parent().css('display','none');
	})
	//全选按钮
	// $('.allchecked').click(function()
	// {
	// 	if($(this).is(':checked'))
	// 	{
	// 		$('input[type=checked]').prop('checked','checked')
	// 	}
	// 	else
	// 	{
	// 		$('input[type = checked]').removeprop('checked');

	// 	}
	// })

}
	





	function sc_msg(){
			$.ajax({
				url:'date/list.json',
				type:'GET',
				success:function(res){
					var sc_str = $.cookie('goods');
					//console.log(sc_str);
					if(sc_str){
						var sc_obj = eval(sc_str);
						//console.log(sc_obj[0]);	
						var sc_num = 0 ;
						var html = '<tr><th class="th_1"><label><input type="checkbox" value="1" checked class="allchecked">全选</label></th><th class="th_2">所选商品</th><th class="th_3">单价（元）</th><th class="th_4">数量</th><th class="th_5">优惠</th><th class="th_6">小计（元）</th><th class="th_7">操作</th></tr>'; 
						for(var i in sc_obj){	
						//console.log(res[sc_obj[i].id].url);	

							html += '<tr><td colspan="7" class=" store_info clearfix"><div class="shopname"><input  type="checkbox"  checked="">店铺：<a href="javascript:;">小林数码(行货专卖)总入口</a></div><div class="contact"><a href="javascript:;"><img border="0" src="http://wpa.qq.com/pa?p=2:89386536:52"></a></div></td></tr><tr><td colspan="2" class="s_info"><input type="checkbox" checked><a href="detail.html" class="pic"><img width="80" height="60" src="'+res[sc_obj[i].id].url+'"></a><div class="infobox"><h3 class="tit"><a href="javascript:;">'+res[sc_obj[i].id].title+'</a></h3><p>颜色：黑色</p><div class="info_con"><span class="suit" style="cursor:pointer;">套装：官方标配</span><div class="info_help"><h5>官方标配：</h5><p>镜头 镜头包 保修卡 说明书</p></div></div></div></td><td class="s_price "><em>'+res[sc_obj[i].id].price+'</em></td><td class="s_amount "><div class="buy_num"><a class="minus" href="javascript:void(0)" >-</a><input type="text" class="text_amount" value="'+sc_obj[i].num+'"/><a class="plus" href="javascript:void(0)" >+</a></div></td><td class="s_agio"><div>−−</div></td><td class="s_total"><em>'+res[sc_obj[i].id].price+'</em></td><td class="s_del"><div class="s_delbox"><a href="javascript:;">移入收藏夹</a><a href="javascript:;" class="deletebtn">删除</a><div class="deletebox"><p>确认要删除该商品吗？</p><a href="javascript:;" class="yes">是的</a><a href="detail.html?id='+sc_obj[i].id+'"></a><a href="javascript:;" class="cancel">取消</a><i></i></div></div></td></tr>'

						}
						$('tbody').html(html);
						//点击错号 移除li
							$('.yes').click(function()
							{
								//alert(1);
								//console.log()
								var str = $(this).next().attr('href').split('=')[1];
								console.log(str);
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
										//console.log($.cookie('goods'));
										//alert(1);
										//console.log($(this).parent('li'))
										$(this).parent().parent().parent().parent().prev().remove();
										$(this).parent().parent().parent().parent().remove();

									}
								}
								
								
							})
							fn01();
					}
					else
					{
						$('.cart_state').css('display','none');
						$('.order_foot').css('display','none');
						$('.shopcar_tip').css('display','block');
						$('.total_price').css('display','none');
					}

				}
			})


		}

})