$(function(){
			$(document).on("click",".top-condition span.background-li li",function(){
				$(this).addClass("active").siblings().removeClass("active");
			});
			
			$(document).on("click",".top-condition span.arrowdown",function(){
				$(this).parent().css("height","auto");
				$(this).prev().children().append("<li>业务名称1</li>");
			});
			
			renderData();
			
});
				

function renderData() {
	var table=$('#propertyListTable');	
	table.dataTable($.extend({
		"ajax" : function(data, callback, settings) {//ajax配置为function,手动调用异步查询
			//手动控制遮罩
			//	$('#div-table-container').spinModal();
			//封装请求参数
			//var param =getQueryCondition(data);
			$.ajax({
				type: "GET",
				url: "http://192.168.3.145:8061/mockjsdata/49/yun/getData",
				//data: param,
				dataType: "json",
				success: function(result) {
					//仅为测试延迟效果
//					setTimeout(function(){
						//异常判断与处理
						if (result.errorCode) {
							alert("查询失败。错误码："+result.responseResult.resutInfo);
							return;
						}
						var returnData = {};
						returnData.draw = result.responseResult.data.draw;//自行返回draw参数,最好由后台返回
						returnData.recordsTotal = result.responseResult.data.iTotalRecords;
						returnData.recordsFiltered = result.responseResult.data.iTotalRecords;
						returnData.data = result.responseResult.data.data;
						callback(returnData);
//					},200);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("查询失败");
				}
			});
		},
		"destroy":true,
		"order": [],//取消默认排序查询,否则复选框一列会出现小箭头
		"columns": [
			{ "data": "a","bSortable": false, "bVisible": true },
			{ "data": "b","bSortable": false, "bVisible": true },
			{ "data": "c","bSortable": false, "bVisible": true },
			{ "data": "d","bSortable": true },
			{ "data": "e","bSortable": true },
			{ "data": "f","bSortable": false },
			{ "data": "g","bSortable": false },
			{ "data": "h" ,"bSortable": true},
			{ "data": "i" ,"bSortable": true},
			{ "data": "j" ,"bSortable": true},
			{ "data": "k" ,"bSortable": true},
			{ "data": "a","orderable": false, // 禁用排序
		       "defaultContent": "",
		       "render": function (data, type, full, meta) {
						return data = '<a>登录</a><span style="color:#59bcfe;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>'
		              		+'<a>查看</a>';
		        }
		 	}
		],
	   	"fnDrawCallback": function(){
			var oTable = table.dataTable();
			/*var redirectpage =0;
			$('#redirect').keyup(function(e){
				if($(this).val() && $(this).val()>0){
					redirectpage = $(this).val()-1;
				}
				oTable.fnPageChange( redirectpage );
			});*/
		}
	},{
		"lengthChange": false,
		"bStateSave": true,//状态保存
		"searching": false,
		"ordering": true,
		"info": false,
		"autoWidth": false,
		"pageLength": 10,
		"bLengthChange": true, //改变每页显示数据数量
		"serverSide": true,   
		"bPaginate" : true,// 分页按钮  
		//  "bFilter" : false,// 搜索栏  
		"renderer": "bootstrap" //渲染样式：Bootstrap和jquery-ui
	})).api();//此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象	
}

function getQueryCondition(data){
	var param = {};
	//自行处理排序参数
	param.sord = "desc";
	param.sidx = "pageName";
	//自行处理查询参数
	param['cnName']=$("#cnName").val();
	param['enName']=$("#enName").val();
	if($("#netType").val()>-1){
		param['netType']=$("#netType").val();
	}
	if($("#eleType").val()>0){
		param['eleType']=$("#eleType").val();
	}
	//自行处理分页参数
	param.start = data.start;
	param.length = data.length;
	return param;
}