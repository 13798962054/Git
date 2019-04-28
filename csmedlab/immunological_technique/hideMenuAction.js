/**
 * 影藏菜单中按钮的路径跳转
 */

var get_immunological_technique = false;
var get_gene_detection = false;
var get_pathological_diagnosis = false;
//首页
function home() {
    self.location = "../index.html"
}
//关于中南医学检验室
function about() {
    self.location = "../about.html"
}
//基因检测
function gene_detection() {
    // self.location="gene_detection.html"
    if(get_gene_detection){
        $("#gene_detection").css({"display":"none"})
        $("#open-gene-detection-button").css({"background-image":"url('../img/icon/arrow_down.png')"})
        allOlFalse()
    }else{
        allOlFalse()
        $("#gene_detection").css({"display":"block"})
        $("#open-gene-detection-button").css({"background-image":"url('../img/icon/arrow_up.png')"})
        get_gene_detection = true;
    }
}
//无产前基因检测
function gene_detection_1(){
    self.location="../gene_detection/gene_detection_1.html"
}
//乳腺癌基因检测
function gene_detection_2(){
    self.location="../gene_detection/gene_detection_2.html"
}
//天赋基因检测
function gene_detection_3(){
    self.location="../gene_detection/gene_detection_3.html"
}
//抑郁症基因检测
function gene_detection_4(){
    self.location="../gene_detection/gene_detection_4.html"
}
//结肠癌基因检测
function gene_detection_5(){
    self.location="../gene_detection/gene_detection_5.html"
}
//多肿瘤基因检测
function gene_detection_6(){
    self.location="../gene_detection/gene_detection_6.html"
}
//全基因组检测
function gene_detection_7(){
    self.location="../gene_detection/gene_detection_7.html"
}

//免疫技术

function immunological_technique() {
    // self.location="immunological_technique.html"
    if(get_immunological_technique){
        $("#immunological_technique").css({"display":"none"})
        $("#open-immunological-technique-button").css({"background-image":"url('../img/icon/arrow_down.png')"})
        allOlFalse()
    }else{
        allOlFalse()
        $("#open-immunological-technique-button").css({"background-image":"url('../img/icon/arrow_up.png')"})
        $("#immunological_technique").css({"display":"block"})
        get_immunological_technique = true;

    }
}
//免疫力检测
function immunological_technique_1(){
    location.href="immunological_technique_1.html"
}
//TORCH优生优育筛查
function immunological_technique_2(){
    location.href="immunological_technique_2.html"
}
//AMH
function immunological_technique_3(){
    location.href="immunological_technique_3.html"
}
//呼吸道传染病诊断
function immunological_technique_4(){
    location.href="immunological_technique_4.html"
}
//胃肠道及相关疾病诊断
function immunological_technique_5(){
    location.href="immunological_technique_5.html"
}
//真菌感染疾病诊断
function immunological_technique_6(){
    location.href="immunological_technique_6.html"
}
//虫媒传染病诊断
function immunological_technique_7(){
    location.href="immunological_technique_7.html"
}
//免疫效果诊断
function immunological_technique_8(){
    location.href="immunological_technique_8.html"
}
//封闭抗体检测与免疫治疗
function immunological_technique_9(){
    location.href="immunological_technique_9.html"
}



//病理诊断

function pathological_diagnosis() {
    // self.location="pathological_diagnosis.html"
    if(get_pathological_diagnosis){
        $("#pathological_diagnosis").css({"display":"none"})
        $("#open-pathological-diagnosis-button").css({"background-image":"url('../img/icon/arrow_down.png')"})
        allOlFalse()
    }else {
        allOlFalse()
        $("#open-pathological-diagnosis-button").css({"background-image":"url('../img/icon/arrow_up.png')"})
        $("#pathological_diagnosis").css({"display": "block"})
        get_pathological_diagnosis = true;
    }
}
//DNA倍体定量-宫颈病变早期筛查
function pathological_diagnosis_1() {
location.href = "../pathological_diagnosis/pathological_diagnosis_1.html"
}
//HPV L1检测-宫颈病变预后
function pathological_diagnosis_2() {
    location.href = "../pathological_diagnosis/pathological_diagnosis_2.html"
}
//染色体核型分析
function pathological_diagnosis_3() {
    location.href = "../pathological_diagnosis/pathological_diagnosis_3.html"
}
//最新动态
function news() {
    self.location = "../news.html"
}
//技术平台
function technology_platform() {
    self.location = "../technology_platform.html"
}
//技术支持
function technical_support() {
    self.location = "../technical_support.html"
}
//解决方案
function solution() {
    self.location = "../solution.html"
}
//联系我们
function contact_us() {
    self.location = "../contact_us.html"
}

function allOlFalse() {
    get_pathological_diagnosis = false;
    get_immunological_technique = false;
    get_gene_detection = false;
    $("ol").css({"display": "none"})

    $(".open-list-button").css({"background-image":"url('../img/icon/arrow_down.png')"})
}