var index=0;
var word=document.getElementById("company_info_title").innerHTML = "公司简介";
var time;
function type(){
    document.getElementById("company_info_title").innerText = word.substring(0,index++);
    if(index > 4){
        clearInterval(time);
    }
}
time = setInterval(type, 500);