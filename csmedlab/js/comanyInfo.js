//关于中南动画
var about_head_index = 0;
var time = setInterval(function () {
    $(".about_head_animation").animate({},function () {
        translateY = "translateY(-" + 3.5 * ++about_head_index + "em)"
        $(".about_head_animation").css({"transform": translateY})
        console.log(translateY);

    })
    if(about_head_index >= 37){
        clearInterval(time);
    }
},3000)
