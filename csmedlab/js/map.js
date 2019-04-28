/**
 * 高德地图
 */

//加载地图
window.onload = function() {
  map.plugin(["AMap.ToolBar"], function() {
    map.addControl(new AMap.ToolBar());
  });
  if(location.href.indexOf('&guide=1')!==-1){
    map.setStatus({scrollWheel:false})
  }
}

//选择坐标
var marker, map = new AMap.Map("map-container", {
  resizeEnable: true,
  center: [114.103,22.5652],
  zoom: 17
});

//添加坐标标记
marker = new AMap.Marker({
  icon: "img/icon/mark_b.png",
  position: [114.103,22.5652]
});
marker.setMap(map);
marker.setTitle("深圳市中南检验实验室")
