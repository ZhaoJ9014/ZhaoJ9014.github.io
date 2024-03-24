$(document).ready(function () {
    setMenuColor();
    var SidebarAnim = new TimelineLite({paused : true});
    SidebarAnim
        .to($(".social-icons, #main-nav"), 0.2, {left : 0})
        .to($("#main"), 0.2, {left : 250, right : "-=250"}, "-=0.2");

    $("a.mobilemenu").on("click", function () {
        if (SidebarAnim.isOpen) {
            SidebarAnim.reverse();
            SidebarAnim.isOpen = false;
        } else {
            SidebarAnim.play();
            SidebarAnim.isOpen = true;
        }
    });
    $(".social-icons, #main-nav a, #main").on("click", function () {
        SidebarAnim.reverse();
        SidebarAnim.isOpen = false;
        setMenuColor($(this).attr("href"));
    });

    $("ul.timeline").children().eq(0)
        .find(".text").slideDown()
        .addClass("open");
    $("ul.timeline").on("click", "li", function () {
        $this = $(this);
        $this.find(".text").slideDown();
        $this.addClass("open");
        $this.siblings('li.open').find(".text").slideUp();
        $this.siblings('li').removeClass("open");
    });

    $("#main-nav").perfectScrollbar({
        wheelPropagation : true,
        wheelSpeed       : 50
    });

    function setMenuColor(hash) {
        var loc = window.location.href;

        if (hash || loc.indexOf('#') > 0) {
            var hash = hash ? hash : loc.substring(loc.indexOf('#')),
                par = $('a[href="' + hash + '"]').parent(),
                sib = par.siblings();

            for (var i = 0; i < sib.length; ++i) {
                var elem = $(sib[i]);
                if (!elem.hasClass('external')) {
                    elem.removeClass();
                }
            }
            if (!par.hasClass('external')) {
                par.addClass('currentmenu');
            }
 		ga('send', 'pageview', {
		 'page': location.pathname + location.search  + location.hash
		});
        }
    }

});
