//导航栏轮播图
new Swiper('#detecting-service-home-swiper', {
    loop:true,
    autoplay: 5000,//可选选项，自动滑动
    effect:'fade',
    pagination: '#detecting-service-home-swiper .swiper-pagination',
    paginationClickable: true,
    mousewheelControl : true,

})

//导航栏轮播图
new Swiper('#detecting-service-home-info .content .content-1', {
    slidesPerView : 3,
    spaceBetween : 117,
    autoplay: 3000,

})

$("#detecting-service-home-info .title li").click(function () {
    if( $(this).text() == "核心技术" ){
        $(".content-1").hide()
        $(".content-2").show()
    }else{
        $(".content-2").hide()
        $(".content-1").show()
    }
    $("#detecting-service-home-info .title li").removeClass("detecting-service-home-info-title-active")
    $(this).addClass("detecting-service-home-info-title-active")
})
