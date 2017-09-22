;(function ($) {
	/*表格滚动*/
    var scrollTop = function (options) {
        var defaults = {
            speed: 30
        }
        var opts = $.extend(defaults, options);
        this.each(function () {
            var $timer;
            var scroll_top = 0;
            var obj = $(this);
            var $height = obj.find("ul").height();
            var $objHeight = $(this).height();
            if($height < $objHeight){return false};
            obj.find("ul").clone().appendTo(obj);
            obj.hover(function () {
                clearInterval($timer);
            }, function () {
                $timer = setInterval(function () {
                    scroll_top++;
                    if (scroll_top > $height) {
                        scroll_top = 0;
                    }
                    obj.find("ul").first().css("margin-top", -scroll_top);
                }, opts.speed);
            }).trigger("mouseleave");
        })
    }
    $.fn.scrollTop = scrollTop;
})(jQuery)