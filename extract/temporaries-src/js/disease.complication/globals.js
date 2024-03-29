
var maxWidth=$("#svgDiv").width();  //画布的大小

var outerRadius = maxWidth / 2,
    innerRadius = outerRadius - 170, //控制外圆的大小
    bubbleRadius=innerRadius-50,   //控制里园的大小
    linkRadius=innerRadius-20,
    nodesTranslate=(outerRadius-innerRadius) + (innerRadius-bubbleRadius) - 30,
    chordsTranslate=(outerRadius - 30);

var houseButton=d3.select(document.getElementById("houseButton"));
var senateButton=d3.select(document.getElementById("senateButton"));

d3.select(document.getElementById("mainDiv"))
    .style("width",maxWidth+ "px")
    .style("height",maxWidth + "px");

d3.select(document.getElementById("bpg"))
    .style("width",maxWidth+ "px");

document.getElementById("svgDiv").innerHTML = '';
var svg = d3.select(document.getElementById("svgDiv"))
    .style("width", maxWidth+ "px")
    .style("height", maxWidth+ "px")
    .append("svg")
    .attr("id","svg")
    .style("width", maxWidth+ "px")
    .style("height", maxWidth+ "px");



var chordsSvg=svg.append("g")
    .attr("class","chords")
    .attr("transform", "translate(" + chordsTranslate + "," + chordsTranslate + ")");


var linksSvg=svg.append("g")
    .attr("class","links")
    .attr("transform", "translate(" + chordsTranslate + "," + chordsTranslate + ")")


var highlightSvg=svg.append("g")
    .attr("transform", "translate(" + chordsTranslate + "," + chordsTranslate + ")")
    .style("opacity",0);

var highlightLink=highlightSvg.append("path");

var nodesSvg=svg.append("g")
    .attr("class","nodes")
    .attr("transform", "translate(" + nodesTranslate + "," + nodesTranslate + ")");

//布局设置
var bubble = d3.layout.pack()  //初始化包图
    .sort(null)   //后面的数减去前面的数排序，正负都变，null顺序不变
    .size([bubbleRadius*2, bubbleRadius*2])  //设置范围
    .padding(1.5);  //设置间距 

var chord = d3.layout.chord()
    .padding(.05)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending);

var diagonal = d3.svg.diagonal.radial();
//.projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });


var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(innerRadius + 10);


var diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var toolTip = d3.select(document.getElementById("toolTip"));
var header = d3.select(document.getElementById("head"));
var header1 = d3.select(document.getElementById("header1"));
var header2 = d3.select(document.getElementById("header2"));
var headerChart = d3.select(document.getElementById("header-chart"));
var total = d3.select(document.getElementById("totalDiv"));
var scaleDiagram = d3.select(document.getElementById("scaleDiagram"));
var repColor="#F80018";   //红色
var demColor="#0543bc";  //蓝色
var otherColor="#FFa400";  //

var fills= d3.scale.ordinal().range(["#00AC6B","#20815D","#007046","#35D699","#60D6A9"]);

var office="house";

var linkGroup;

var cns=[],
    cands=[],
    pacs=[],
    pacsHouse=[],
    pacsSentate=[],
    contr=[],
    h_dems=[],
    h_reps=[],
    h_others=[],
    house=[];
s_dems=[],
    s_reps=[],
    s_others=[],
    senate=[],
    total_hDems=0,
    total_sDems=0,
    total_hReps=0,
    total_sReps=0,
    total_hOthers=0,
    total_sOthers=0,
    contributions=[],
    c_senate=[];
c_house=[];
pacs=[],
    pacsById={},
    chordsById={},
    nodesById={},
    chordCount=20,
    pText=null,
    pChords=null,
    nodes=[],
    renderLinks=[],
    colorByName={},
    totalContributions=0,
    delay=2;



var formatNumber = d3.format(",.0f"),
    formatCurrency = function(d) { return  formatNumber(d)};//"$" +

var buf_indexByName={},
    indexByName = {},
    nameByIndex = {},
    labels = [],
    chords = [];


function log(message) {
    // console.log(message);
}
//Events


