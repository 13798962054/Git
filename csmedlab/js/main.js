/**
 * 主要功能实现
 */

//页面的自适应
function bodyScale(){
  var devicewidth=document.documentElement.clientWidth;
  var scale=devicewidth/375;

  var body_font_size = scale * 37.5;

  document.body.style.fontSize = body_font_size + "px";

  console.log(body_font_size);
}
document.onload=window.onload=window.onresize=function(){
  bodyScale();
}

bodyScale();

//首页的动画效果
var product_show_index = 0;
setInterval(function () {
  if(product_show_index <= 1) {
    product_show_index++;
  }else{
    product_show_index = 0;
  }
  var translateX = "translate(-" + product_show_index * 10 + "em)";
  $('#product .product-show').animate({},function () {
    $('#product .product-show').css({'transform':translateX});
  });
  console.log("a");
},3000)



//显示隐藏菜单
function showHideMenu() {
    $("#menu-hide").animate({},function () {
      $("#menu-hide").css({"transform":"translate(0)"});
    })
    $("#menu-hide-cover").animate({},function () {
      $("#menu-hide-cover").css({"transform":"translate(0)"});
    })


}
//隐藏隐藏菜单
function hideHideMenu() {
  $("#menu-hide").animate({},function () {
    $("#menu-hide").css({"transform":"translate(-6em)"});
  })
  $("#menu-hide-cover").animate({},function () {
    $("#menu-hide-cover").css({"transform":"translate(4em)"});
  })


}


//关闭用户选取功能
document.onselectstart=function () {
  return false;
}
//关闭右键
document.oncontextmenu=function () {
  return false;
}


/**
 * 页面模块的修改
 */

function redesignPage() {
  //暂时没有设计的页面暂时先影藏
  var menu_hide = document.getElementById('menu-hide');
  menu_hide.children[1].children[8].style.display = "none";
  menu_hide.children[1].children[9].style.display = "none";
  menu_hide.children[1].children[10].style.display = "none";
  menu_hide.children[1].children[11].style.display = "none";




}

redesignPage()

