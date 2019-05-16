<?php
$z[0]=Array("field","",361,380);
$z[0][4]['name']="title";
$z[1]=Array("global","",381,407);
$z[1][4]['name']="cfg_webname";
$z[2]=Array("field","",448,477);
$z[2][4]['name']="keywords";
$z[3]=Array("field","",517,575);
$z[3][4]['name']="description";
$z[3][4]['function']="html2text(@me)";
$z[4]=Array("include","",738,773);
$z[4][4]['filename']="head.htm";
$z[5]=Array("channel","\r\n        <li><a href=\"[field:typeurl/]\" class=\"innav_a\">\r\n          <h3>[field:typename/]</h3>\r\n          <h4>The enterprise news</h4>\r\n          </a></li>\r\n        ",1011,1218);
$z[5][4]['type']="son";
$z[6]=Array("list","\r\n            <li class=\"clearfix\"><a href=\"[field:arcurl/]\">[field:title/]</a><font>[field:pubdate function=\"MyDate('Y-m-d',@me)\"/]</font></li>\r\n            ",1358,1553);
$z[6][4]['pagesize']="10";
$z[7]=Array("pagelist","",1600,1653);
$z[7][4]['listitem']="index,end,pre,next,pageno";
$z[8]=Array("include","",1757,1794);
$z[8][4]['filename']="footer.htm";

?>