//加载时默认显示商品介绍的内容
$("#good-info .info-content li").hide()
$("#good-info .info-content li:first-child").show()
$("#good-info .info-list li").click(function () {
    //标题改变
    $("#good-info .info-list li").removeClass("active")
    $(this).addClass("active")
    //内容改变
    $("#good-info .info-content li").hide()
    var index = $(this).index() + 1
    $("#good-info .info-content li:nth-child(" + index + ")").show()
})

function iframeResize(){
    var parentDocument = window.parent.document;
    //设置iframe高度
    parentDocument.getElementsByTagName('iframe')[0].style.height = document.body.scrollHeight + "px";
    //设置body的背景颜色为白色
    parentDocument.body.style.backgroundColor = "#fff";
}

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

function reduce() {
    var pcs = document.getElementById("pcsNum")
    num = pcs.value - 1
    pcs.value = num
    holdNumber(pcs)
}

function add() {
    var pcs = document.getElementById("pcsNum")
    num = parseInt(pcs.value) + 1
    pcs.value = num
}

function holdNumber(numberBox) {
    num = numberBox.value
    if( num <= 0 ){
        alert("商品数不能小于一件");
        numberBox.value = 1
    }
}

function  addToCart() {
    console.log(window.parent)
    window.parent.showShoppingCartShade()
}