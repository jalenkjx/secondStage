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
	$('.loadfooter').load('public.html .footer')
	
	//alert('bingo');
	function getMsg(num){
		$.ajax({
			url: 'date/list.json',
			type: 'GET',
			success:function(data)
			{
				//console.log(data);
				//1.计算分页数量
	            var showNum=num;
	            var dataL=data.length;
	            var pageNum=Math.ceil(dataL/showNum);
	            $('#Pagination').pagination(pageNum,{
	                num_edge_entries: 1, //边缘页数
	                num_display_entries: 4, //主体页数
	                items_per_page: 1, //每页显示1项
	                prev_text: "上一页",
	                next_text: "下一页",
	                callback:function(index){
					var html="";
					for(var i = showNum*index; i < showNum*index+showNum;i++)
						{
							if(i<dataL)
							{
								html+='<li ><a href="detail.html" id="'+data[i].id+'" class="pic" ><img src="'+data[i].url+'" alt=""></a><div class="title"><a href="detail.html;">'+data[i].title+'</a></div><div class="price_bar clearfix"><span class="price">'+data[i].price+'</span></div><div class="volume"><span>销量数：<em>'+data[i].volume+'</em></span><span class="evaluation">评论数：<a href="detail.html">'+data[i].evaluation+'</a></span></div><div class="shop_info"><p class="shop_name"><a href="detail.html">'+data[i].shop_name+'</a></p><p class="total_volume">店铺总成交<em>'+data[i].total+'</em>笔</p></div></li>'
							}
							
						}
						$('.goods_list').eq(0).html(html);
						//$('.prev').eq(0).addClass('fff');
						//console.log($('.goods_list').find('a'))
						$('.goods_list').on('click','.pic',function()
						{

							//alert(1);
							$.cookie('buyid',$(this).attr('id'));
							//console.log(this.id);
							//window.location.href = 'detail.html';
						})
						//$('#Pagination').childern('a').attr('href','javascript:;');
					}
				})
				
			}
		})
	}
	getMsg(20);
	
		
	
	
})