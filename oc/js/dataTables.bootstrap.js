/*! DataTables Bootstrap 2 integration
 * ©2011-2014 SpryMedia Ltd - datatables.net/license
 */
/* Set the defaults for DataTables initialisation */
$.extend(true, $.fn.dataTable.defaults, {
    "dom": "<'row'<'col-md-6 col-sm-6'l><'col-md-6 col-sm-6'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-5'i><'col-md-7 col-sm-7'p>>", // default layout with horizobtal scrollable datatable
    "language": {
        "lengthMenu": "每页 _MENU_ 条记录 ",
        "paginate": {
            "previous":"上一页",
            "next": "下一页",
        },
        "info": "显示 _START_ 到 _END_ 总共 _TOTAL_ 数据",
    }
});
/**
 * DataTables integration for Bootstrap 2. This requires Bootstrap 2 and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Bootstrap. See http://datatables.net/manual/styling/bootstrap
 * for further information.
 */
(function(window, document, $, DataTable, undefined){

$.extend( true, DataTable.defaults, {
/*	"dom":
		"<'row-fluid'<'span6'l><'span6'f>r>" +
		"<'row-fluid'<'span12't>>" +
		"<'row-fluid'<'span6'i><'span6'p>>",*/
	"dom":
		"<'row-fluid'<'span4'l><'span8'p>r>" +
		"<'row-fluid'<'span12't>>" +
		"<'row-fluid'<'span4'i><'span8'p>>",
	renderer: 'bootstrap'
} );


/* Default class modification */
$.extend( DataTable.ext.classes, {
	sWrapper: "dataTables_wrapper form-inline dt-bootstrap"
} );


/* Bootstrap paging button renderer */
DataTable.ext.renderer.pageButton.bootstrap = function ( settings, host, idx, buttons, page, pages ) {
	var api     = new DataTable.Api( settings );
	var classes = settings.oClasses;
	var lang    = settings.oLanguage.oPaginate;
	var btnDisplay, btnClass;

	var attach = function( container, buttons ) {
		var i, ien, node, button;
		var clickHandler = function ( e ) {
			e.preventDefault();
			if ( !$(e.currentTarget).hasClass('disabled') ) {
				api.page( e.data.action ).draw( false );
			}
		};

		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( $.isArray( button ) ) {
				attach( container, button );
			}
			else {
				btnDisplay = '';
				btnClass = '';

				switch ( button ) {
					case 'ellipsis':
						btnDisplay = '&hellip;';
						btnClass = 'disabled';
						break;

					case 'first':
						btnDisplay = lang.sFirst;
						btnClass = button + (page > 0 ?
							'' : ' disabled');
						break;

					case 'previous':
						btnDisplay = lang.sPrevious;
						btnClass = button + (page > 0 ?
							'' : ' disabled');
						break;

					case 'next':
						btnDisplay = lang.sNext;
						btnClass = button + (page < pages-1 ?
							'' : ' disabled');
						break;

					case 'last':
						btnDisplay = lang.sLast;
						btnClass = button + (page < pages-1 ?
							'' : ' disabled');
						break;

					default:
						btnDisplay = button + 1;
						btnClass = page === button ?
							'active' : '';
						break;
				}

				if ( btnDisplay ) {
					node = $('<li>', {
							'class': classes.sPageButton+' '+btnClass,
							'aria-controls': settings.sTableId,
							'tabindex': settings.iTabIndex,
							'id': idx === 0 && typeof button === 'string' ?
								settings.sTableId +'_'+ button :
								null
						} )
						.append( $('<a>', {
								'href': '#'
							} )
							.html( btnDisplay )
						)
						.appendTo( container );

					settings.oApi._fnBindAction(
						node, {action: button}, clickHandler
					);
				}
			}
		}
	};

	attach(
		$(host).empty().html('<div class="pagination"><ul/></div>').find('ul'),
		buttons
	);
	/*添加跳页功能*/
	var inputPageJump = $('<input>', {
		'type': "number",
		'min': 1,
		'max': pages
	}).on("keyup",function(event){
		if (event.keyCode == 13) {
			var curr = this.value.replace(/\s|\D/g, '') | 0;
			if (curr) {
				var pages = api.page.info().pages;
				curr = curr > pages ? pages : curr;
				curr--;
				api.page(curr).draw(false);
			}
		}
	});
	var btnPageJump = $('<button />', {
		'class': "btn",
		'aria-controls': settings.sTableId,
		'tabindex': settings.iTabIndex
	}).html(lang.sJump).on("click",function(){
		var curr = inputPageJump.val().replace(/\s|\D/g, '') | 0;
		if (curr) {
			var pages = api.page.info().pages;
			curr = curr > pages ? pages : curr;
			curr--;
			api.page(curr).draw(false);
		}
	});
	
	$(host).prepend($('<div />', {
		'class' : "page_jump input-append"
	}).append(inputPageJump).append(btnPageJump.html('跳转')));
};


/*
 * TableTools Bootstrap compatibility
 * Required TableTools 2.1+
 */
if ( DataTable.TableTools ) {
	// Set the classes that TableTools uses to something suitable for Bootstrap
	$.extend( true, DataTable.TableTools.classes, {
		"container": "DTTT btn-group",
		"buttons": {
			"normal": "btn",
			"disabled": "disabled"
		},
		"collection": {
			"container": "DTTT_dropdown dropdown-menu",
			"buttons": {
				"normal": "",
				"disabled": "disabled"
			}
		},
		"print": {
			"info": "DTTT_print_info modal"
		},
		"select": {
			"row": "active"
		}
	} );

	// Have the collection use a bootstrap compatible dropdown
	$.extend( true, DataTable.TableTools.DEFAULTS.oTags, {
		"collection": {
			"container": "ul",
			"button": "li",
			"liner": "a"
		}
	} );
}


})(window, document, jQuery, jQuery.fn.dataTable);