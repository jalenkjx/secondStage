var index1 = 0;
$(function()
{
//顶部栏事件


		


//轮播图
	//自动轮播
	var index = 0;
	var timer = setInterval(fnBanner,2000);
	var vBannerLi = $('.banner_box').children().eq(0).find('li');
	//console.log(vBannerLi.length); ------bingo!
	//console.log(vBannerLi.eq(0).width())--bingo!
	var vBannerUlWidth = vBannerLi.length*vBannerLi.eq(0).width();
	//console.log(vBannerUlWidth)---bingo
	var oBannerUl = $('.banner_box').children().eq(0);
	oBannerUl.css('width',vBannerUlWidth)
	//console.log($('.banner_box').children().eq(0).width());-bingo!
	function fnBanner()
	{
		$('.banner_switch').children().eq(index).removeClass('B_active');

		if(index == vBannerLi.length-1)index = 0;
		else index++;
		//console.log(index);//----bingo!
		$('.banner_switch').children().eq(index).addClass('B_active');
		oBannerUl.stop().animate(
		{
			'left':-index*vBannerLi.eq(0).width()
		})


	}
	//按钮控制轮播图翻页
	$('.banner_next_btn').click(function()
		{
			//alert(1);     bingo!
			clearInterval(timer);
			fnBanner()
			timer = setInterval(fnBanner,2000);
		});
	$('.banner_prev_btn').click(function()
	{
		clearInterval(timer);
		$('.banner_switch').children().eq(index).removeClass('B_active');

		if(index==0)index = vBannerLi.length-1;
		else index--;
		$('.banner_switch').children().eq(index).addClass('B_active');
		oBannerUl.stop().animate(
		{
			'left':-index*vBannerLi.eq(0).width()
		})
		timer = setInterval(fnBanner,2000);
	})

	//按钮的显隐
	//console.log($('.banner_box').children('a').length);
	$('.banner_box').mouseover(function()
	{
		$('.banner_box').children('a').stop().show();
	})
	$('.banner_box').mouseout(function()
	{
		$('.banner_box').children('a').stop().hide();
	})

	//banner switch
	$('.banner_switch').children().mouseover(function()
	{
		//alert(1); -----bingo!
		$('.banner_switch').children().eq($(this).index()).addClass('B_active');
		clearInterval(timer);
		index = $(this).index();
		oBannerUl.stop().animate(
		{
			'left':-index*vBannerLi.eq(0).width()
		});

	})
	$('.banner_switch').children().mouseout(function()
	{
		//alert(1); -----bingo!
		$('.banner_switch').children().eq($(this).index()).removeClass('B_active');
		timer = setInterval(fnBanner,2000)
	})

	//楼层ajax动态加载
	$.ajax(
	{
		url:"date/floor.json ",
		type:"get",
		success:function(res)
		{
			//console.log(res);
			var html="";
			for(var i=0; i<res.length; i++)//'+res[i].mfa.url+'
			{
				html+='<div class="main_figure"><a href="javascript:;"><img src="'+res[i].mfa.url+'" alt=""></a></div><ul class="figure_list clearfix"><li class="item1 wide"><div class="focus_box clearfix f1"><ul><li><a href="javascript:;"><img src="'+res[i].banner.url1+'" alt="" style="width:419px;height:208px;"></a></li><li><a href="javascript:;"><img src="'+res[i].banner.url2+'" alt="" style="width:419px;height:208px;"></a></li><li><a href="javascript:;"><img src="'+res[i].banner.url3+'" alt="" style="width:419px;height:208px;"></a></li></ul><a href="javascript:;" class="prev_btn"><span><i></i></span></a><a href="javascript:;" class="next_btn"><span><i></i></span></a><div class="switch"><span class="B_active">1</span><span>2</span><span>3</span></div></div><!--end of f1--></li><li class="item tall"><div class="title1"><a href="javascript:;">'+res[i].li.a.a+'</a></div><p>'+res[i].li.a.p+'</p><a href="javascript:;" class="pic"><img style="width:160px; height:120px;" src="'+res[i].li.a.url+'" alt=""></a></li><li class="item tall"><div class="title1"><a href="javascript:;">'+res[i].li.b.a+'</a></div><p>'+res[i].li.b.p+'</p><a href="javascript:;" class="pic"><img style="width:160px; height:120px;" src="'+res[i].li.b.url+'" alt=""></a></li><li class="item"><div class="title1"><a href="javascript:;">'+res[i].li.c.a+'</a></div><p>'+res[i].li.c.p+'</p><a href="javascript:;" class="pic"><img style="width:160px; height:120px;" src="'+res[i].li.c.url+'" alt=""></a></li><li class="item"><div class="title1"><a href="javascript:;">'+res[i].li.d.a+'</a></div><p>'+res[i].li.d.p+'</p><a href="javascript:;" class="pic"><img style="width:160px; height:120px;" src="'+res[i].li.d.url+'" alt=""></a></li><li class="item"><div class="title1"><a href="javascript:;">'+res[i].li.e.a+'</a></div><p>'+res[i].li.e.p+'</p><a href="javascript:;" class="pic"><img style="width:160px; height:120px;" src="'+res[i].li.e.url+'" alt=""></a></li><li class="item"><div class="title1"><a href="javascript:;">'+res[i].li.f.a+'</a></div><p>'+res[i].li.f.p+'</p><a href="javascript:;" class="pic"><img style="width:160px; height:120px;" src="'+res[i].li.f.url+'" alt=""></a></li></ul><!-- end ul -->'
				$('.ajax').eq(i).html(html);
				html = "";
			}
			smallbanner();
			//小轮播图的prev按钮
			$('.prev_btn').click(function()
			{
				//console.log(index1)

				clearInterval(timer1);
				$('.switch').children().removeClass('B_active');
				if(index1 == 0)
				{
					index1=2;
				}
				else
				{
					index1--;
				}
				$('.switch').children().eq(0+index1).addClass('B_active');
				$('.switch').children().eq(3+index1).addClass('B_active');
				$('.switch').children().eq(6+index1).addClass('B_active');
				$('.switch').children().eq(9+index1).addClass('B_active');
				o1fUl.stop().animate(
				{
					'left':-index1 * a1fLi.eq(0).width()
				})
				timer1 = setInterval(fn1f,2000)
			})	
			$('.next_btn').click(function()
			{
				//alert(1);
				clearInterval(timer1)
				fn1f();
				timer1 = setInterval(fn1f,2000)
			})		
		}
	})

//小banner图


	function smallbanner()
	{
		//alert(1);
		
		 timer1 = setInterval(fn1f,2000)
		 a1fLi = $('.f1').children('ul').children();
		 o1fUl = $('.f1').children('ul')
		//var o1fUlWidth = a1fLi.length * a1fLi.eq(0).width();
		//console.log(o1fUlWidth);
		o1fUl.css('width','1257px')
		//o1fUl.css('width',o1fUlWidth);

		
	}


//

	$('.Y_list').children().mouseover(function()
	{
		$(this).children('.hover_show').css('display','block')
	})
	$('.Y_list').children().mouseout(function()
	{
		$(this).children('.hover_show').css('display','none')
	})






	//吸顶菜单
	$(window).scroll(function(event)
	{
		/* Act on the event */
		if($(window).scrollTop()>650)
		{
			$('.search_layer').css('display','block');
		}
		else
		{
			$('.search_layer').css('display','none');
		}
	});


	//加载侧边栏
	$('.sidebar').load('public.html .side_toolbar_box',function()
	{
		sidefn();
	})
	//加载顶部栏
	$('.top_bar').load('public.html .topbar',function()
	{
		topbar();
	})
	//加载头部
	$('.loadheader').load('public.html .header')
	//加载导航
	$('.loadnav').load('public.html .nav_box',function()
	{
		nav();
	})
	//加载页足
	$('.loadfooter').load('public.html .footer')
	

})//end of ------------------------------------------------------$()



		function fn1f()
		{
			//if(index1 == a1fLi.length-1) 
			$('.switch').children().removeClass('B_active');
			if(index1 == 2)
			{
				index1 = 0;
			}
			else 
			{
				index1++;
			}
			$('.switch').children().eq(0+index1).addClass('B_active');
			$('.switch').children().eq(3+index1).addClass('B_active');
			$('.switch').children().eq(6+index1).addClass('B_active');
			$('.switch').children().eq(9+index1).addClass('B_active');
			o1fUl.stop().animate(
			{
				'left':-index1 * a1fLi.eq(0).width()
			})
			
		}

