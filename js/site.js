(function() {

    $(document).ready(function() {
        $('body').scrollspy({
            target: '.menu'
        });

        $(window).scroll(function() {
            /* Check the location of each desired element */
            $('.popup').each(function(i) {
                var scrollTop = $(window).scrollTop();
                var topObject = $(this).position().top;
                var heightObject = $(this).outerHeight();
                var heightWindow = $(window).height();
                var bottomObject = topObject + heightObject;
                var bottomWindow = scrollTop + heightWindow;
                var percentajeOnScreen = Math.abs(bottomWindow - bottomObject);

                if (bottomWindow - topObject < 200) {
                    console.log("ahora " + (Math.abs(bottomWindow - topObject)));
                    $(this).css("opacity", 0.3);
                } else {
                    $(this).css("opacity", 1);
                }
            });
        });

        function toggleInfo(show) {
            isCompacted = true;
            if (show === undefined) {
                isCompacted = $("#info").hasClass("compacted");
            } else {
                isCompacted = show;
            }
            if (isCompacted) {
                $("#info").removeClass("compacted");
                $("#resize-icon").addClass("glyphicon-resize-full");
                $("#resize-icon").removeClass("glyphicon-resize-small");
            } else {
                $("#info").addClass("compacted");
                $("#resize-icon").removeClass("glyphicon-resize-full");
                $("#resize-icon").addClass("glyphicon-resize-small");
            }
        }

        $('body').on('activate.bs.scrollspy', function() {
            var hash = $(this).find("li.active a").attr("href");
            if (hash === "#home") {
                toggleInfo(true);
            } else {
                toggleInfo(false);
            }
        });
        
        $('#resize').click(function(e) {
            e.preventDefault();
            toggleInfo();
        });
    });

})(window);
