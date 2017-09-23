/***
Wrapper/Helper Class for datagrid based on jQuery Datatable Plugin
***/

var Datatable = function() {

    var tableOptions; // main options
    var dataTable; // datatable object
    var table; // actual table jquery object
    var tableContainer; // actual table container object
    var tableWrapper; // actual table wrapper jquery object
    var tableInitialized = false;
    var ajaxParams = {}; // set filter mode
    var the;

    var countSelectedRecords = function() {
        var selected = $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).size();
        var text = tableOptions.dataTable.language.metronicGroupActions;
        if (selected > 0) {
            $('.table-group-actions > span', tableWrapper).text(text.replace("_TOTAL_", selected));
        } else {
            $('.table-group-actions > span', tableWrapper).text("");
        }
    };

    return {
        //main function to initiate the module
        init: function(options) {
            if (!$().dataTable) {
                return;
            }
            the = this;

            // default settings
            options = $.extend(true, {
                src: "", // actual table  
                filterApplyAction: "filter",
                filterCancelAction: "filter_cancel",
                resetGroupActionInputOnSuccess: true,
                loadingMessage: 'Loading...',
                dataTable: {
                    "dom": "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r><'table-scrollable't><'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>", // datatable layout
                    "pageLength": 10, // default records per page
                    "language": { // language settings
                        // metronic spesific
                        "metronicGroupActions": "_TOTAL_ records selected:  ",
                        "metronicAjaxRequestGeneralError": "Could not complete request. Please check your internet connection",

                        // data tables spesific
                        "lengthMenu": "<span class='seperator'>|</span>View _MENU_ records",
                        "info": "<span class='seperator'>|</span>Found total _TOTAL_ records",
                        "infoEmpty": "No records found to show",
                        "emptyTable": "No data available in table",
                        "zeroRecords": "No matching records found",
                        "paginate": {
                            "previous": "Prev",
                            "next": "Next",
                            "last": "Last",
                            "first": "First",
                            "page": "Page",
                            "pageOf": "of"
                        }
                    },

                    "orderCellsTop": true,
                    "columnDefs": [{ // define columns sorting options(by default all columns are sortable extept the first checkbox column)
                        'orderable': false,
                        'targets': [0]
                    }],

                    "pagingType": "bootstrap_extended", // pagination type(bootstrap, bootstrap_full_number or bootstrap_extended)
                    "autoWidth": false, // disable fixed width and enable fluid table
                    "processing": false, // enable/disable display message box on record load
                    "serverSide": true, // enable/disable server side ajax loading
                    "treeTables": true, //是否为树形结构表
                    "ajax": { // define ajax settings
                        "url": "", // ajax URL
                        "type": "POST", // request type
                        "timeout": 20000,
                        "data": function(data) { // add request parameters before submit
                            $.each(ajaxParams, function(key, value) {
                                data[key] = value;
                            });
                            Metronic.blockUI({
                                message: tableOptions.loadingMessage,
                                target: tableContainer,
                                overlayColor: 'none',
                                cenrerY: true,
                                boxed: true
                            });
                        },
                        "dataSrc": function(res) { // Manipulate the data returned from the server
                            if (res.customActionMessage) {
                                Metronic.alert({
                                    type: (res.customActionStatus == 'OK' ? 'success' : 'danger'),
                                    icon: (res.customActionStatus == 'OK' ? 'check' : 'warning'),
                                    message: res.customActionMessage,
                                    container: tableWrapper,
                                    place: 'prepend'
                                });
                            }

                            if (res.customActionStatus) {
                                if (tableOptions.resetGroupActionInputOnSuccess) {
                                    $('.table-group-action-input', tableWrapper).val("");
                                }
                            }

                            if ($('.group-checkable', table).size() === 1) {
                                $('.group-checkable', table).attr("checked", false);
                                $.uniform.update($('.group-checkable', table));
                            }

                            if (tableOptions.onSuccess) {
                                tableOptions.onSuccess.call(undefined, the, res);
                            }

                            Metronic.unblockUI(tableContainer);

                            return res.data;
                        },
                        "error": function() { // handle general connection errors
                            if (tableOptions.onError) {
                                tableOptions.onError.call(undefined, the);
                            }

                            Metronic.alert({
                                type: 'danger',
                                icon: 'warning',
                                message: tableOptions.dataTable.language.metronicAjaxRequestGeneralError,
                                container: tableWrapper,
                                place: 'prepend'
                            });

                            Metronic.unblockUI(tableContainer);
                        }
                    },

                    "drawCallback": function(oSettings) { // run some code on table redraw
                        if (tableInitialized === false) { // check if table has been initialized
                            tableInitialized = true; // set table initialized
                            table.show(); // display table
                        }
                        Metronic.initUniform($('input[type="checkbox"]', table)); // reinitialize uniform checkboxes on each table reload
                        countSelectedRecords(); // reset selected records indicator

                        // callback for ajax data load
                        if (tableOptions.onDataLoad) {
                            tableOptions.onDataLoad.call(undefined, the);
                        }
                    }
                }
            }, options);

            tableOptions = options;

            // create table's jquery object
            table = $(options.src);
            tableContainer = table.parents(".table-container");

            // apply the special class that used to restyle the default datatable
            var tmp = $.fn.dataTableExt.oStdClasses;

            $.fn.dataTableExt.oStdClasses.sWrapper = $.fn.dataTableExt.oStdClasses.sWrapper + " dataTables_extended_wrapper";
            $.fn.dataTableExt.oStdClasses.sFilterInput = "form-control input-small input-sm input-inline";
            $.fn.dataTableExt.oStdClasses.sLengthSelect = "form-control input-xsmall input-sm input-inline";

            // initialize a datatable
            dataTable = table.DataTable(options.dataTable);

            // revert back to default
            $.fn.dataTableExt.oStdClasses.sWrapper = tmp.sWrapper;
            $.fn.dataTableExt.oStdClasses.sFilterInput = tmp.sFilterInput;
            $.fn.dataTableExt.oStdClasses.sLengthSelect = tmp.sLengthSelect;

            // get table wrapper
            tableWrapper = table.parents('.dataTables_wrapper');

            // build table group actions panel
            if ($('.table-actions-wrapper', tableContainer).size() === 1) {
                $('.table-group-actions', tableWrapper).html($('.table-actions-wrapper', tableContainer).html()); // place the panel inside the wrapper
                $('.table-actions-wrapper', tableContainer).remove(); // remove the template container
            }
            // handle group checkboxes check/uncheck
            $('.group-checkable', table).change(function() {
                var set = $('tbody > tr > td:nth-child(1) input[type="checkbox"]', table);
                var checked = $(this).is(":checked");
                $(set).each(function() {
                    $(this).attr("checked", checked);
                });
                $.uniform.update(set);
                countSelectedRecords();
            });

            // handle row's checkbox click
            table.on('change', 'tbody > tr > td:nth-child(1) input[type="checkbox"]', function() {
                countSelectedRecords();
            });

            // handle filter submit button click
            table.on('click', '.filter-submit', function(e) {
                e.preventDefault();
                the.submitFilter();
            });

            // handle filter cancel button click
            table.on('click', '.filter-cancel', function(e) {
                e.preventDefault();
                the.resetFilter();
            });
            table.find('.group-checkable').change(function () {
                var set = jQuery(this).attr("data-set");
                var checked = jQuery(this).is(":checked");
                jQuery(set).each(function () {
                	if (checked) {
      		    		console.log(12)
                        $(this).attr("checked", true);
                        $(this).parents('tr').find('.checker span').addClass('checked').end().addClass("active");
                  } else {
                        $(this).attr("checked", false);
                        $(this).parents('tr').find('.checker span').removeClass('checked').end().removeClass("active");
                  }
                });
                jQuery.uniform.update(set);
                
            });
            table.on('change', 'tbody tr .checkboxes', function () {
                $(this).parents('tr').toggleClass("active");
                var checked = jQuery(this).is(":checked");
                if (checked) {
                    $(this).attr("checked", true);
                    $(this).parents('tr').find('.checker span').addClass('checked').end().addClass("active");
              } else {
                    $(this).attr("checked", false);
                    $(this).parents('tr').find('.checker span').removeClass('checked').end().removeClass("active");
              }
            });
            
        },

        submitFilter: function() {
            the.setAjaxParam("action", tableOptions.filterApplyAction);

            // get all typeable inputs
            $('textarea.form-filter, select.form-filter, input.form-filter:not([type="radio"],[type="checkbox"])', table).each(function() {
                the.setAjaxParam($(this).attr("name"), $(this).val());
            });

            // get all checkboxes
            $('input.form-filter[type="checkbox"]:checked', table).each(function() {
                the.addAjaxParam($(this).attr("name"), $(this).val());
            });

            // get all radio buttons
            $('input.form-filter[type="radio"]:checked', table).each(function() {
                the.setAjaxParam($(this).attr("name"), $(this).val());
            });

            dataTable.ajax.reload();
        },

        resetFilter: function() {
            $('textarea.form-filter, select.form-filter, input.form-filter', table).each(function() {
                $(this).val("");
            });
            $('input.form-filter[type="checkbox"]', table).each(function() {
                $(this).attr("checked", false);
            });
            the.clearAjaxParams();
            the.addAjaxParam("action", tableOptions.filterCancelAction);
            dataTable.ajax.reload();
        },

        getSelectedRowsCount: function() {
            return $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).size();
        },

        getSelectedRows: function() {
            var rows = [];
            $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).each(function() {
                rows.push($(this).val());
            });

            return rows;
        },

        setAjaxParam: function(name, value) {
            ajaxParams[name] = value;
        },

        addAjaxParam: function(name, value) {
            if (!ajaxParams[name]) {
                ajaxParams[name] = [];
            }

            skip = false;
            for (var i = 0; i < (ajaxParams[name]).length; i++) { // check for duplicates
                if (ajaxParams[name][i] === value) {
                    skip = true;
                }
            }

            if (skip === false) {
                ajaxParams[name].push(value);
            }
        },

        clearAjaxParams: function(name, value) {
            ajaxParams = {};
        },

        getDataTable: function() {
            return dataTable;
        },

        getTableWrapper: function() {
            return tableWrapper;
        },

        gettableContainer: function() {
            return tableContainer;
        },

        getTable: function() {
            return table;
        }

    };
};
;(function($){  //开始写上; 为防止代码压缩出错
    //为jquery扩展方法，也就是插件的主体
    $.fn.extend({
        //方法名
    "SimpDataTable" : function(option){
    	var table  = this;
    	 var defa = {
         	content : $(".all-content"),
         	tabContent: $(".page-breadcrumb")
         };
         var option = $.extend({},defa,opts);
    	table.Datatable({
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "info": true,
            "autoWidth": false,
            "pageLength": 10,
            "serverSide": true,   
            "bPaginate" : true,// 分页按钮  
            "bFilter" : false,// 搜索栏  
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sProcessing": "处理中...",
      		"sLengthMenu": "每页 _MENU_ 项",
      		"sZeroRecords": "没有匹配结果",
      		"sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
      		"sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
            "renderer": "bootstrap", //渲染样式：Bootstrap和jquery-ui
            "ajax": {
                "url": "user!findUserPager.action",
                "type":"POST"
            },
            "order": [
    	          [1, "asc"]
    	      ], // 设置第一列由ASC的默认排序
            "columns": [
                 {
                     "sClass": "text-center",//添加类
                     "data": "userId",
                     "bSortable": false,
                     "render": function (data, type, full, meta) {
                         return '<div class="checker"><span><input type="checkbox" class="checkboxes" value="1"></span></div>';
                     }
                 },
                 { "data": "userId","bSortable": false, "bVisible": false },
                 { "data": "orgName" },
                 { "data": "userName" },
                 { "data": "nickName" },
                 { "data": "phoneNum","bSortable": false },
                 { "data": "email","bSortable": false },
                 { "data": "roleName" ,"bSortable": false},
                 { "data": "createTime" ,"bSortable": false},
                 { "data": "-" ,"bSortable": false,   "sClass": "text-center", "render": function (data, type, full, meta) {
                         return '<i class="fa fa-trash-o mt-5 "></i>';
                  }}                 
            ]
            });
			table.find('.group-checkable').change(function () {
		        var set = jQuery(this).attr("data-set");
		        var checked = jQuery(this).is(":checked");
		        jQuery(set).each(function () {
		        	if (checked) {
		                $(this).attr("checked", true);
		                $(this).parents('tr').find('.checker span').addClass('checked').end().addClass("active");
		          } else {
		                $(this).attr("checked", false);
		                $(this).parents('tr').find('.checker span').removeClass('checked').end().removeClass("active");
		          }
		        });
		        jQuery.uniform.update(set);
		        
		    });
			/*Metronic.init();*/
		    table.on('change', 'tbody tr .checkboxes', function () {
		        $(this).parents('tr').toggleClass("active");
		        var checked = jQuery(this).is(":checked");
		        if (checked) {
		            $(this).attr("checked", true);
		            $(this).parents('tr').find('.checker span').addClass('checked').end().addClass("active");
		      } else {
		            $(this).attr("checked", false);
		            $(this).parents('tr').find('.checker span').removeClass('checked').end().removeClass("active");
		      }
    	});
    }});
});


//初始化基本表格
var initCiManage = function(_colModels) {
	var type = $("div[class='include-jsp'][style='display: block;'] input[name='thisdivtype']").attr('value');
	var table = $("#"+type.toLowerCase()+"Grid");
	table.dataTable($.extend({
			"ajax" : function(data, callback, settings) {//ajax配置为function,手动调用异步查询
				//手动控制遮罩
			//	$('#div-table-container').spinModal();
				//封装请求参数
				var param = load.getattrQueryCondition(data);
				$.ajax({
			            type: "POST",
			            url: "ci!findCIPager.action?type="+type+"&systime=" + new Date().getTime(),
			            data: param,
			            dataType: "json",
			            success: function(result) {
			            	//仅为测试延迟效果
			            	setTimeout(function(){
			            		//异常判断与处理
			            		if (result.errorCode) {
			            			$.dialog.alert("查询失败。错误码："+result.errorCode);
			            			return;
								}
			            		//封装返回数据
			            		var returnData = {};
				            	returnData.draw = data.draw;//自行返回draw参数,最好由后台返回
				            	returnData.recordsTotal = result.iTotalRecords;
				            	returnData.recordsFiltered = result.iTotalRecords;
				            	returnData.data = result.data;
				            	//关闭遮罩
				            //	$('#div-table-container').spinModal(false);
				            	//调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
				            	//此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
				            	callback(returnData);
				            	table.treeTable(result.data); //加载树形表
			            	},200);
			            },
			            error: function(XMLHttpRequest, indexStatus, errorThrown) {
			                  $.dialog.alert("查询失败");
			              //  $('#div-table-container').spinModal(false);
			            }
			        });
			},
			"order": [],//取消默认排序查询,否则复选框一列会出现小箭头
	        "columns": _colModels,
	   	    "fnDrawCallback": function(){
		            var oTable = table.dataTable();
		            $('#redirect').keyup(function(e){
		                if($(this).val() && $(this).val()>0){
		                    var redirectpage = $(this).val()-1;
		                }else{
		                    var redirectpage = 0;
		                }
		                oTable.fnPageChange( redirectpage );
		            });
		        }
		},{
			 "lengthChange": false,
		        "bStateSave": true,//状态保存
		        "searching": false,
		        "ordering": true,
		        "info": true,
		        "autoWidth": false,
		        "pageLength": 10,
		        "bLengthChange": true, //改变每页显示数据数量
		        "serverSide": true,   
		        "bPaginate" : true,// 分页按钮  
		      //  "bFilter" : false,// 搜索栏 
		        "treeTables" : true,
		        "renderer": "bootstrap" //渲染样式：Bootstrap和jquery-ui
		})).api();//此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象
       
}


