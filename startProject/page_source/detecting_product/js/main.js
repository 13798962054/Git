$(".first-title").click(function () {
    if ($(this).hasClass('active')) {
        //如果有就让它的兄弟元素隐藏
        $(this).next().hide();
        $(this).removeClass("active")

        //改变当前标题的箭头方向
        $(this).removeClass("first-title-arrow-down")
        $(this).addClass("first-title-arrow-right")
    } else {
        //恢复其他first-title的箭头样式
        $(".first-title").removeClass("first-title-arrow-down")
        $(".first-title").addClass("first-title-arrow-right")
        $(".first-content").hide()
        //移出所有的first-title的活动标记
        $(".first-title").removeClass("active")
        //改变当前标题的箭头方向
        $(this).removeClass("first-title-arrow-right")
        $(this).addClass("first-title-arrow-down")
        //添加类
        $(this).toggleClass('active');
        //显示它的下一个兄弟节点
        $(this).next().show();
    }
})

$(".second-title").click(function () {
    if ($(this).hasClass('active')) {
        //如果有就让它的兄弟元素隐藏
        $(this).next().hide();
        $(this).removeClass("active")
        //改变当前标题的箭头方向
        $(this).removeClass("second-title-arrow-down")
        $(this).addClass("second-title-arrow-right")
    } else {
        //恢复其他second-title的箭头样式
        $(".second-title").removeClass("second-title-arrow-down")
        $(".second-title").addClass("second-title-arrow-right")
        $(".second-content").hide()
        $(".second-title").removeClass("active")
        //改变当前标题的箭头方向
        $(this).removeClass("second-title-arrow-right")
        $(this).addClass("second-title-arrow-down")
        $(this).toggleClass('active');  //这个作用是 点击有这个类再次点击就没这个类
        $(this).next().show();  //这句作用是让它的.one元素下面的 其他元素移除这个类
    }
})

//影藏成功添加购物车的遮罩
function hideShoppingCartShade(){
    $("#shopping-cart-shade").hide()
}

function showShoppingCartShade(){
    $("#shopping-cart-shade").show()
}

//禁止该页面刷新
document.onkeydown = function(e) {
    e = window.event || e;
    var k = e.keyCode;
    //屏蔽ctrl+R，F5键，ctrl+F5键  F3键！验证
    if ((e.ctrlKey == true && k == 82) || (k == 116)
        || (e.ctrlKey == true && k == 116) || k == 114) {
        e.keyCode = 0;
        e.returnValue = false;
        e.cancelBubble = true;
        return false;

    }
}