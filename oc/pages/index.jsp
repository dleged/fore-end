<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>OC</title>
        <link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="../css/commom.css"/>
        <link rel="stylesheet" type="text/css" href="../css/index.css"/>
    </head>
    <body>
    	<div class="index-top">
    		<div class="top-logo">
    			<img src="../images/logo.png"/>
    		</div>
    		<div class="top-menu">
    			<ul>
    				<li class="li-list active">统一概览</li>
    				<li class="li-list">智能工作平台</li>
    				<li>|</li>
    				<li class="li-list">告警</li>
    				<li class="li-list">自动化</li>
    				<li class="li-list">分析</li>
    				<li class="li-list">租户</li>
    				<li class="li-list">系统</li>
    			</ul>
    		</div>
    		<div class="top-right">
    			<span class="top-search"></span>
    			<span class="top-line"></span>
    			<span class="top-user">admin</span>
    			<span class="top-help"></span>
    		</div>
    	</div>
    	
    	<div class="inmenu index-tmenu">
    		<ul>
    			<li onclick="topList1(1)">
    				<span>欢迎</span>
    			</li>
    			<li class="active" onclick="topList1(2)">
    				<span>统一运维</span>
    			</li>
    			<li class="index-li-select">
    				<span>统一资源展示</span>
    				<div class="inmenu-select">
    					<span onclick="topList1(3)">统一资源展示</span>
    					<span onclick="topList1(3)">统一资源展示</span>
    				</div>
    			</li>
    			<li class="index-li-select">
    				<span>统一告警</span>
    				<div class="inmenu-select">
    					<span onclick="topList1(4)">统一告警</span>
    					<span onclick="topList1(4)">统一告警</span>
    				</div>
    			</li>
    		</ul>
    		<div class="index-tmenu-add">
    			<span class="icon-add"></span>
    		</div>
    		<div class="index-tmenu-right">
    			<span>增加链接</span>
    			<span class="top-line"></span>
    			<span>管理链接</span>
    		</div>
    	</div>
    	<div class="inmenu index-left index-left-hide" style="display: none;">
    		<div class="index-left-title" id="left-slid">
    			<span class="left-logo icon-workbench"></span>
    			<span class="left-text">智能工作台</span>
    			<span class="left-btn"></span>
    		</div>
    		<div class="index-left-div">
    			<ul class="show">
    				<li class="active">
    					<span class="left-logo icon-overview"></span>
	    				<span class="left-text">总览</span>
	    				<span class="left-btn"></span>
    				</li>
    			</ul>
    		</div>
    		<div class="index-left-div">
    			<div class="index-left-title">
	    			<span class="left-logo icon-assets"></span>
	    			<span class="left-text">资产管理</span>
	    			<span class="left-btn icon-arrow"></span>
	    		</div>
	    		<ul>
	    			<li onclick="leftList1(1)">
	    				<span class="left-logo"></span>
		    			<span class="left-text">主机设备</span>
		    			<span class="left-btn"></span>
	    			</li>
	    			<li onclick="leftList1(2)">
	    				<span class="left-logo"></span>
		    			<span class="left-text">数通设备</span>
		    			<span class="left-btn"></span>
	    			</li>
	    			<li>
	    				<span class="left-logo"></span>
		    			<span class="left-text">存储设备</span>
		    			<span class="left-btn"></span>
	    			</li>
	    			<li>
	    				<span class="left-logo"></span>
		    			<span class="left-text">虚拟化</span>
		    			<span class="left-btn"></span>
	    			</li>
	    			<li>
	    				<span class="left-logo"></span>
		    			<span class="left-text">数据库</span>
		    			<span class="left-btn"></span>
	    			</li>
	    		</ul>
    		</div>
    		<div class="index-left-div">
    			<div class="index-left-title">
	    			<span class="left-logo icon-ability"></span>
	    			<span class="left-text">能力集合</span>
	    			<span class="left-btn icon-arrow"></span>
	    		</div>
	    		<ul>
	    			<li>
	    				<span class="left-logo"></span>
		    			<span class="left-text">告警能力</span>
		    			<span class="left-btn"></span>
	    			</li>
	    			<li>
	    				<span class="left-logo"></span>
		    			<span class="left-text">运维能力</span>
		    			<span class="left-btn"></span>
	    			</li>
	    			<li>
	    				<span class="left-logo"></span>
		    			<span class="left-text">设备评分体系</span>
		    			<span class="left-btn"></span>
	    			</li>
	    			<li>
	    				<span class="left-logo"></span>
		    			<span class="left-text">拓扑管理</span>
		    			<span class="left-btn"></span>
	    			</li>
	    		</ul>
    		</div>
    	</div>
    	<div class="inpage index-page1">
    		
    	</div>
    	<div class="inpage index-page2 take-back">
    		
    	</div>
 	</body>
 	<script src="../js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
 	<script type="text/javascript">
 		$(function(){
 			var doc = $(document);
 			doc.on("click",".li-list",function(){
 				$(this).addClass("active").siblings().removeClass("active");
 				var _index = $(this).index();
 				$(".inpage").hide();
 				$(".inpage").eq(_index).show();
 				$(".inmenu").hide();
 				$(".inmenu").eq(_index).show();
 			})
 			doc.on("click",".index-left-title",function(){
 				$(this).next("ul").slideToggle();
 				$(this).find(".icon-arrow").toggleClass("icon-arrow1");
 			});
 			doc.on("click",".index-left li",function(){
 				$(".index-left li").removeClass("active");
 				$(this).addClass("active");
 			});
 			$(".index-left").hover(function(){
 				$(".index-left").removeClass("index-left-hide");
 			},function(){
 				$(".index-left").addClass("index-left-hide");
 				if($(".index-left").hasClass("index-left-hide")){
 					$(".index-left-div ul").slideUp();
 					$(".index-left-title").find(".icon-arrow").removeClass("icon-arrow1");
 				}
 			});
 			doc.on("click",".index-tmenu ul li",function(){
 				$(this).addClass("active").siblings().removeClass("active");
 				if($(this).hasClass("index-li-select")){
 					$(this).children(".inmenu-select").addClass("active");
 				}
 			});
 			
 			doc.on("click",".inmenu-select span",function(event){
 				$(this).parent().removeClass("active");
 				event.stopPropagation();
 			})
 			
 		});
 		
 		
 		
 		topList1(1)
 		function topList1(type){
 			if(type == 1){
 				
 			}else if(type == 2){
 				
 			}else if(type == 3){
 				
 			}else if(type == 4){
 				$(".index-page1").load("./unifiedOverview/unifiedAlarm.jsp");
 			}
 		}
 		leftList1(2)
 		function leftList1(type){
 			if(type == 1){
 				$(".index-page2").load("./assetManage/propertyList.jsp");
 			}else if(type == 2){
 				$(".index-page2").load("./assetManage/assetDetails.jsp");
 			}else if(type == 3){
 				
 			}else if(type == 4){
 				
 			}
 		}
 		
 	</script>
</html>