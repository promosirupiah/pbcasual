var responsiveDesign = {
    isResponsive: false,
    isDesktop: false,
    isTablet: false,
    isPhone: false,
    windowWidth: 0,
    responsive: (function ($) {
        "use strict";
        return function () {
            var html = $("html");
            this.windowWidth = $(window).width();
            var triggerEvent = false;

            var isRespVisible = $("#art-resp").is(":visible");
            if (isRespVisible && !this.isResponsive) {
                html.addClass("responsive").removeClass("desktop");
                this.isResponsive = true;
                this.isDesktop = false;
                triggerEvent = true;
            } else if (!isRespVisible && !this.isDesktop) {
                html.addClass("desktop").removeClass("responsive responsive-tablet responsive-phone");
                this.isResponsive = this.isTablet = this.isPhone = false;
                this.isDesktop = true;
                triggerEvent = true;
            }

            if (this.isResponsive) {
                if ($("#art-resp-t").is(":visible") && !this.isTablet) {
                    html.addClass("responsive-tablet").removeClass("responsive-phone");
                    this.isTablet = true;
                    this.isPhone = false;
                    triggerEvent = true;
                } else if ($("#art-resp-m").is(":visible") && !this.isPhone) {
                    html.addClass("responsive-phone").removeClass("responsive-tablet");
                    this.isTablet = false;
                    this.isPhone = true;
                    triggerEvent = true;
                }
            }

            if (triggerEvent) {
                $(window).trigger("responsive", this);
            }

            $(window).trigger("responsiveResize", this);
        };
    })(jQuery),
    initialize: (function ($) {
        "use strict";
        return function () {
            $("<div id=\"art-resp\"><div id=\"art-resp-m\"></div><div id=\"art-resp-t\"></div></div>").appendTo("body");
            var resizeTimeout;
            $(window).resize(function () {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function () { responsiveDesign.responsive(); }, 25);
            });
            $(window).trigger("resize");
        };
    })(jQuery)
};








jQuery(window).bind("responsive", (function ($) {
    "use strict";
    return function (event, responsiveDesign) {
        responsiveImages(responsiveDesign);
        responsiveVideos(responsiveDesign);
    
        if ($.browser.msie && $.browser.version <= 8) return;
    
        if (responsiveDesign.isResponsive) {
            $(window).on("responsiveResize.slider", function () {
                responsiveSlideshow(responsiveDesign);
            });
        } else {
            $(window).trigger("responsiveResize.slider");
            $(window).off("responsiveResize.slider");
        }
    };
})(jQuery));







jQuery(window).bind("responsiveResize", (function ($) {
    "use strict";
    return function (event, responsiveDesign) {
        responsiveAbsBg(responsiveDesign, $("nav.art-nav"), $("#art-hmenu-bg"));
    };
})(jQuery));




jQuery(function ($) {
    "use strict";
    $(".art-hmenu a")
        .click(function(e) {
            var link = $(this);
            if ($(".responsive").length === 0)
                return;

            var item = link.parent("li");
            
            if (item.hasClass("active")) {
                item.removeClass("active").children("a").removeClass("active");
            } else {
                item.addClass("active").children("a").addClass("active");
            }

            if (item.children("ul").length > 0) {
                e.preventDefault();
            }
        })
        .each(function() {
            var link = $(this);
            if (link.get(0).href === location.href) {
                link.addClass("active").parents("li").addClass("active");
                return false;
            }
        });
});

jQuery(function($) {
    $("<a href=\"#\" class=\"art-menu-btn\"><span></span><span></span><span></span></a>").insertBefore(".art-hmenu").click(function(e) {
        var menu = $(this).next();
        if (menu.is(":visible")) {
            menu.slideUp("fast", function() {
                $(this).removeClass("visible").css("display", "");
            });
        } else {
            menu.slideDown("fast", function() {
                $(this).addClass("visible").css("display", "");
            });
        }
        e.preventDefault();
    });
});

/*global jQuery, responsiveDesign*/



jQuery(window).bind("responsive", function (event, responsiveDesign) {
    "use strict";
    responsiveLayoutCell(responsiveDesign);
});



jQuery(window).bind("responsive", function (event, responsiveDesign) {
    "use strict";
    responsiveLayoutCell(responsiveDesign);
});




if (!jQuery.browser.msie || jQuery.browser.version > 8) {
    jQuery(responsiveDesign.initialize);
}
