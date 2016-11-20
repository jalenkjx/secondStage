

$(function()
{

	//加载侧边栏
	$('.loadsidebar').load('public.html .side_toolbar_box',function()
	{
		sidefn();
		
		
		sc_msg();

		sc_car();
		
		
	})
	//加载顶部栏
	$('.loadtop').load('public.html .topbar',function()
	{
		topbar();
	})
	//加载头部
	$('.loadheader').load('public.html .header')
	//加载导航
	$('.loadnav').load('public.html .nav_box',function()
	{
		nav();
		$('.category_nav_container').mouseover(function()
		{
			$('.category_nav_menu').css('display','block');
		})
		$('.category_nav_container').mouseout(function()
		{
			$('.category_nav_menu').css('display','none');
		})


	})
	//加载页足
	$('.loadfooter').load('public.html .footer_service_relate')
	$('.loadfooter_nav').load('public.html .footer_nav_bar')
	

	//
	var id = $.cookie('buyid');

	$.ajax({
		url: 'date/list.json',
			type: 'GET',
			success:function(data)
			{
				var html = '';
				//'+data[id].url1+'
				//
				html = '<div class="big_pic"><div class="mask"></div><img src="'+data[id].url1+'" alt="" class="img01 "><img src="'+data[id].url2+'" alt="" class="img01 none" ><img src="'+data[id].url3+'" alt="" class="img01 none" ><img src="'+data[id].url4+'" alt="" class="img01 none" ><img src="'+data[id].url5+'" alt="" class="img01 none" ><div class="position"></div></div><div class="zoom1_big"><div class="zoom1_big_all"><img src="'+data[id].url1+'" alt="" class="img02"><img src="'+data[id].url2+'" alt="" class="img02 none"><img src="'+data[id].url3+'" alt="" class="img02 none"><img src="'+data[id].url4+'" alt="" class="img02 none"><img src="'+data[id].url5+'" alt="" class="img02 none"></div></div><div class="focus_list"><ul><li><a href="javascript:;"><img src="'+data[id].url1+'" alt=""></a><i class="border"></i></li><li><a href="javascript:;"><img src="'+data[id].url2+'" alt=""></a><i></i></li><li><a href="javascript:;"><img src="'+data[id].url3+'" alt=""></a><i></i></li><li><a href="javascript:;"><img src="'+data[id].url4+'" alt=""></a><i></i></li><li><a href="javascript:;"><img src="'+data[id].url5+'" alt=""></a><i></i></li></ul></div>'
				$('.ajax01').eq(0).html(html);
				zoom();
				switcher();
				var html1= '';
				html1 = '<h3 class="commodity_title">'+data[id].title+'</h3>'
				$('.ajax02').eq(0).html(html1);
				var html2 = '';
				html2 = '<em>'+data[id].price+'</em>'
				$('.price_panel').eq(0).children('dl').eq(0).children('dd').children('span').append(html2);
			}
	})

	//layer_box
	//加入购物车
	$('.store_buy').click(function()
	{
		$('.layer_box').css('display','block');
		//购物车数量增加;
		var first = $.cookie('goods')==null?true:false;//判断是否有cookie进行添加
		var same = false;//判断时候已经追加
		//是否是第一次添加
		if(first){
			//第一次添加,建立json结构。
			$.cookie('goods','[{id:'+id+',num:1}]');
			$.cookie('first','false');
		}else{
			var str = $.cookie('goods');
			var arr = eval(str);
			//遍历所有对象。如果id相同，让该商品数量递增 ;
			for(var attr in arr){
				if(arr[attr].id == id){		
					arr[attr].num = arr[attr].num + 1;  //让json结构中num自增。
					var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
					$.cookie('goods',cookieStr);
					same = true;
				}
			}
			//如果id不同，重新建立商品对象;
			
			if(!same){
				var obj  = {id:id,num:1};
				arr.push(obj);
				var cookieStr = JSON.stringify(arr);
				$.cookie('goods',cookieStr);
			}
		}
		sc_car();
		sc_msg();

	})
	//console.log($.cookie('goods'));








	$('.layer_foot').children('a').click(function()
	{
		$('.layer_box').css('display','none');
	})
	$('.layer_foot_btn').click(function()
	{
		window.location.href = 'cart.html';
	})


//--------------------放大镜

	function zoom()
	{
		$('.mask').eq(0).mousemove(function(event)
		{
			//console.log('bingo');
			var left = event.offsetX-100//$('.position').eq(0).width()/2;
			var top = event.offsetY-100//$('.position').eq(0).height()/2;
			//console.log(event.offsetX)   bingo!
			//console.log($('.position').eq(0).width())
			//console.log(left+' '+top)
			//边界检测
			left = left < 0 ? 0 : left;
			top = top < 0 ? 0 : top;
			left = left>$('.mask').eq(0).width()-$('.position').eq(0).width()?$('.mask').eq(0).width()-$('.position').eq(0).width():left;
			top = top>$('.mask').eq(0).height()-$('.position').eq(0).height()?$('.mask').eq(0).height()-$('.position').eq(0).height():top;
			//小灰块移动
			$('.position').eq(0).css({'left':left,'top':top});
			//console.log(left+' '+top);
			//比例计算
			var propLeft = left/($('.mask').eq(0).width()-$('.position').eq(0).width());
			var propTop = top/($('.mask').eq(0).height()-$('.position').eq(0).height());
			//放大后的图移动
			$('.zoom1_big_all').eq(0).css(
			{
				'left':-($('.zoom1_big_all').eq(0).width()-$('.zoom1_big').eq(0).width())*propLeft,
				'top':-($('.zoom1_big_all').eq(0).height()-$('.zoom1_big').eq(0).height())*propTop
			})
		})

		//显示隐藏
		$('.mask').eq(0).mouseover(function()
		{
			//小灰块和放大的框出现
			$('.position').eq(0).css('display','block');
			$('.zoom1_big').eq(0).css('display','block');
		})
		$('.mask').eq(0).mouseout(function()
		{
			//小灰块和放大的框隐藏
			$('.position').eq(0).css('display','none');
			$('.zoom1_big').eq(0).css('display','none');
		})
		//-------------------------------------------------放大镜end
	}

	
	

	function switcher()
	{
		//点击小图  切换大图
		var aListLi = $('.focus_list').children('ul').children('li');
		aListLi.click(function()
		{
			//alert(1);
			aListLi.eq($(this).index()).children('i').addClass('border');
			aListLi.eq($(this).index()).siblings().children('i').removeClass('border');
			$('.img01').eq($(this).index()).removeClass('none').siblings('img').addClass('none');;
			$('.img02').eq($(this).index()).removeClass('none').siblings('.img02').addClass('none')
		})
	}
	
	



	//颜色类别选择
	var colorLi = $('.options').eq(0).children('li');
	var suitLi = $('.options').eq(1).children('li');
	colorLi.click(function()
	{
		//alert('bingo')
		colorLi.eq($(this).index()).addClass('cur').siblings('li').removeClass('cur');
	})
	//套装选择
	suitLi.click(function()
	{
		suitLi.eq($(this).index()).addClass('cur').siblings('li').removeClass('cur');
		$('.suit_info').eq($(this).index()).removeClass('none').siblings('.suit_info').addClass('none');
	})

	//数量加减
	$('.increase').eq(0).click(function()
	{
		var n =$('.goods_num').eq(0).val();
		n++;
		if(n > 1)
		{
			$('.decrease').eq(0).removeClass('nodecrease')
		}
		else
		{
			$('.decrease').eq(0).addClass('nodecrease')
		}
		$('.goods_num').eq(0).val(n);


	});
	$('.decrease').eq(0).click(function()
	{
		var n = $('.goods_num').eq(0).val();
		if(n < 2)
		{
			$('.decrease').eq(0).addClass('nodecrease')
		}
		// else if (n = 2)
		// {
		// 	n--;
		// 	$('.goods_num').eq(0).val(n);
		// 	$('.decrease').eq(0).addClass('nodecrease')
		// }
		else
		{
			n--;
			$('.goods_num').eq(0).val(n);
		}
	})



	//*********************************************侧边栏开合菜单
	$('.fold').children('dt').click(function()
	{
		//alert($(this).index());
		//console.log($('.fold'))
		//console.log($(this))
		//console.log($(this).parent('.fold').index())
		$('.fold').eq($(this).parent().index()-1).children('dt').siblings('dd').toggle(400);
	})
	//-------------------------------------排行榜切换
	$('.ranking_list').eq(0).css('display','block').siblings('.ranking_list').css('display','none');
	$('.side_tab').children('li').mouseover(function(event)
	{
		/* Act on the event */
		$('.side_tab').children('li').eq($(this).index()).addClass('current').siblings('li').removeClass('current');
		$('.ranking_list').eq($(this).index()).css('display','block').siblings('.ranking_list').css('display','none');
	});


	//商品详情tab标签
		//点击时改变样式
	$('.tabbar').children('ul').children('li').click(function()
	{
		$('.sidebar').css('display','block')
		$('.tabbar').children('ul').children('li').eq($(this).index()).addClass('cur').siblings('li').removeClass('cur')
	})
		//点击商品详情
	$('.tabbar').children('ul').children('li').eq(0).click(function()
	{
		$('.parameter').css('display','none').siblings('div').css('display','block');
	})
		//参数
	$('.tabbar').children('ul').children('li').eq(1).click(function()
	{
		$('.parameter').css('display','block').siblings('div').css('display','none');
	})
		//购买评价
	$('.tabbar').children('ul').children('li').eq(2).click(function()
	{
		$('.comment').css('display','block').siblings('div').css('display','none');
	})
		//成交记录
	$('.tabbar').children('ul').children('li').eq(3).click(function()
	{
		$('.purchase_record').css('display','block').siblings('div').css('display','none');
	})
		//购买咨询
	$('.tabbar').children('ul').children('li').eq(4).click(function()
	{
		$('.message').css('display','block').siblings('div').css('display','none');
	})
		//二维码
	$('.tabbar').children('ul').children('li').eq(6).mouseover(function()
	{
		$('.code').css('display','block');
	})
	$('.tabbar').children('ul').children('li').eq(6).mouseout(function()
	{
		$('.code').css('display','none');
	})
	$('.tabbar').children('ul').children('li').eq(0).siblings('li').click(function()
	{
		$('.sidebar').css('display','none')
	})

	//吸顶菜单
	$(window).scroll(function(event)
	{
		/* Act on the event */
		//alert(1);
		if($(window).scrollTop()>1000)
		{
			$('.main').addClass('suck_top')
		}
		if($(window).scrollTop()<1000)
		{
			$('.main').removeClass('suck_top')
		}
	});
	



})