// JavaScript Document
$(document).ready(function(){
	 $('.search').hover(function(){
		$('.search_input',this).stop().animate({width:'160px'},1000);	
	},function(){
		$('.search_input',this).stop().animate({width:'0px'},1000);		
	})
	$('.intab_ul li').click(function(){
		var index=$(this).index();	
		$(this).addClass('select').siblings().removeClass('select');
		$('.intab_m .intab_main').eq(index).show().siblings().hide();
	})
	$('.indexb_l li').hover(function(){
		$('.photo_h2',this).stop().animate({'top':'0px'},300);
		$('.photo_h1',this).hide();
	},function(){
		$('.photo_h2',this).stop().animate({'top':'152px'},300);	
		$('.photo_h1',this).show();
	})
	$('.zhan a').click(function(){
		$('.zhan_div').show();
		$(this).parent().hide();	
	})
	$('.intab_main ul li:last').css('border','0px');
	$('.develop_ul li:last').css('border','0px');
	
	$('.service_list1 ul li').click(function(){
		var index=$(this).index();	
		$(this).addClass('select').siblings().removeClass('select');
		$('.service_list1 .tab .tab_m').eq(index).show().siblings().hide();
	})
	$('.service_list2 ul li').click(function(){
		var index=$(this).index();	
		$(this).addClass('select').siblings().removeClass('select');
		$('.service_list2 .tab .tab_m').eq(index).show().siblings().hide();
	})
	$('.service_list3 ul li').click(function(){
		var index=$(this).index();	
		$(this).addClass('select').siblings().removeClass('select');
		$('.service_list3 .tab .tab_m').eq(index).show().siblings().hide();
	})
	$('.service_list').click(function(){
		$(this).find('.tab').show();
		$(this).siblings().find('.tab').hide();	
		$(this).siblings().find('li').removeClass('select');
	})
	$('.pay_ul li').click(function(){
		var index=$(this).index();
		$(this).addClass('select').siblings().removeClass('select');	
		$('.pay_bo .paymain').eq(index).show().siblings().hide();
	})
	$('.footer_top ul:last').css('padding','0px');
	//tab切换
	$('.pro_top ul li').click(function(){
		$(this).addClass('select').siblings().removeClass('select');
		var index=$(this).index();
		$('.protb .protb_m').eq(index).show().siblings().hide();
	})
	$('.prodr_tit li').click(function(){
		$(this).addClass('select').siblings().removeClass('select');
		var index=$(this).index();
		$('.prodrm .prodrm_main').eq(index).show().siblings().hide();
	})
	//产品
	$('.pro ul li').hover(function(){
		$('.pro_div',this).stop().animate({'top':'0px'},500);	
		$('.pro_div h3',this).css('margin-top','151px');	
		$('span',this).fadeIn();
	},function(){
		$('.pro_div',this).stop().animate({'top':'151px'},500);	
		$('.pro_div h3',this).css('margin-top','0px');	
		$('span',this).fadeOut();	
	})
	$('.prodr_tit li:last').css('margin-right','0px');
	
	//右侧
	$('.wei').hover(function(){
		$('.wei_none',this).stop().fadeIn(400);	
	},function(){
		$('.wei_none',this).stop().fadeOut(400);	
	})
	$('.qq').hover(function(){
		$('.qq_none',this).stop().fadeIn(400);	
	},function(){
		$('.qq_none',this).stop().fadeOut(400);	
	})
});
