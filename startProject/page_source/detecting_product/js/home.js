//导航栏轮播图
new Swiper('#detecting-product-home-swiper', {
    loop:true,
    autoplay: 5000,//可选选项，自动滑动
    effect:'fade',
    pagination: '#detecting-product-home-swiper .swiper-pagination',
    paginationClickable: true,
    mousewheelControl : true,

})




$("#info-title li").mouseover(function () {

    //影藏所有li的边框
    $("#info-title li").removeClass("info-title-active")
    //显示鼠标浮动下li的边框
    $(this).addClass("info-title-active")
    // 影藏content下的所有内容
    $("#info-content li").hide()
    var index = $(this).index() + 1
    //显示对应的内容
    $("#info-content li:nth-child(" + index + ")").show()
})

//
document.onkeydown = function(e) {
    e = window.event || e;
    var k = e.keyCode;
    //屏蔽ctrl+R，F5键，ctrl+F5键  F3键！验证
    if ((e.ctrlKey == true && k == 82) || (k == 116)
        || (e.ctrlKey == true && k == 116) || k == 114) {
        e.keyCode = 0;
        //刷新iframe页面，不刷新父页面
        window.location.reload()
        e.returnValue = false;
        e.cancelBubble = true;
        return false;

    }
}
