//导航栏轮播图
new Swiper('#slide-list-Pic', {
    loop:true,
    autoplay: 5000,//可选选项，自动滑动
    effect:'fade',
    pagination: '#slide-list-Pic .swiper-pagination'
})
//导航栏立体魔方图
new Swiper('#slide-list-event .eventPic', {
    loop:true,
    autoplay: 3000,//可选选项，自动滑动
    effect:'cube',
})

//floot-1的轮播图
new Swiper('#floot-1 .floot-img-2', {
    loop:true,
    autoplay: 3000,//可选选项，自动滑动
    effect:'fade',
    nextButton: '#floot-1 .floot-img-2 .swiper-button-next',
    prevButton: '#floot-1 .floot-img-2 .swiper-button-prev'
})

//floot-2的轮播图
new Swiper('#floot-2 .floot-img-2', {
    loop:true,
    autoplay: 3000,//可选选项，自动滑动
    effect:'fade',
    nextButton: '#floot-2 .floot-img-2 .swiper-button-next',
    prevButton: '#floot-2 .floot-img-2 .swiper-button-prev'
})
