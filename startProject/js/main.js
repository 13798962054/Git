//页面初始化时，将导航栏下的移动条移动到相应标签下方
//改变（所有商品分类文字）
var ink_bar_index = 0;
var ink_bar_current = "25px"
var list = $("#top-menu ul li");
var href_str = document.location.href
href_str = href_str.substr(href_str.lastIndexOf("\/") + 1)
href_str = href_str.match(/(\S*).php/)[1]
// alert(href_str)
for( var i = 1 ; i < list.length + 1 ; i++ ){

    if( $("ul li:nth-child(" + i + ")").hasClass("active") ){
        $("ul li:nth-child(" + i + ")").removeClass("active")
    }
}

switch(href_str) {
    case "index":
        $("#top-menu ul li:nth-child(1)").addClass("active")
        ink_bar_current = "25px"
        $("#top-menu-title a").text("所有商品分类")
        ink_bar_index = 1
        break;
    case "detecting_service":
        $("#top-menu ul li:nth-child(2)").addClass("active")
        ink_bar_current = "150px"
        $("#top-menu-title a").text("服务")
        ink_bar_index = 2
        break;
    case "detecting_product":
        $("#top-menu ul li:nth-child(3)").addClass("active")
        ink_bar_current = "298px"
        $("#top-menu-title a").text("产品")
        ink_bar_index = 2
        break;
    case "science":
        // list[1].addClass("active")
        $("#top-menu ul li:nth-child(4)").addClass("active")
        ink_bar_current = "425px"
        $("#top-menu-title a").text("科普")
        ink_bar_index = 2
        break;
    case "cp_intro":
        // list[1].addClass("active")
        $("#top-menu ul li:nth-child(5)").addClass("active")
        ink_bar_current = "550px"
        $("#top-menu-title a").text("公司简介")
        ink_bar_index = 2
        break;
    default:
        break
}

$("#top-menu .ink-bar").animate({left: ink_bar_current}, 50);

$(function(){
    //鼠标移入移出导航条
    $("#top-menu ul li").mouseover(function(){
        var index = $(this).index()
        switch(index) {
            case 0:
                $("#top-menu .ink-bar").animate({left: "25px"}, 50);
                break;
            case 1:
                $("#top-menu .ink-bar").animate({left: "150px"}, 50);
                break;
            case 2:
                $("#top-menu .ink-bar").animate({left: "298px"}, 50, 'swing');
                break;
            case 3:
                $("#top-menu .ink-bar").animate({left: "425px"}, 50);
                break;
            case 4:
                $("#top-menu .ink-bar").animate({left: "550px"}, 50);
                break;

        }
    });

    $("#top-menu").mouseleave(function () {
        console.log(this)
        $("#top-menu .ink-bar").animate({left:ink_bar_current},200); /* 500是动画过渡时间 */
    })
    //首页->所有商品分类->list自适应
    $(window).resize(function () {
        var slide_list_stuffs_li_width = $(".slide-list-stuffs-li").outerWidth()
        console.log(slide_list_stuffs_li_width)
        $(".list-hover-content").css({left :slide_list_stuffs_li_width + 'px'})
    })
});
//首页->所有商品分类->list自适应
var slide_list_stuffs_li_width = $(".slide-list-stuffs-li").outerWidth()
console.log(slide_list_stuffs_li_width)
$(".list-hover-content").css({left :slide_list_stuffs_li_width + 'px'})


//禁止页面放大缩小
