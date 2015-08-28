(function() {

    $(document).ready(function() {

        // Toggles menu header visibility.
        function toggleHeader(show) {
            if (show) {
                $("#info").removeClass("compacted");
                $("#resize-icon").addClass("glyphicon-resize-full");
                $("#resize-icon").removeClass("glyphicon-resize-small");
            } else {
                $("#info").addClass("compacted");
                $("#resize-icon").removeClass("glyphicon-resize-full");
                $("#resize-icon").addClass("glyphicon-resize-small");
            }
        }

        // Toggles menu header according to clicks on little resize button
        // of right-top corner of the screen.
        $('#resize').click(function(e) {
            e.preventDefault();
            toggleHeader($("#info").hasClass("compacted"));
        });

        function checkMenuItem(hash){
            var checked = $(hash+"-i");
            checked.addClass("green");
        }

        // Shows menu header when it is on top of page. Hides it otherwise.
        $('body').on('activate.bs.scrollspy', function() {
            var hash = $(this).find("li.active a").attr("href");
            toggleHeader((hash === "#highlights"));
            checkMenuItem(hash);
        });

        // Updates menu active element according to scrolled distance.
        $('body').scrollspy({
            target: '.menu'
        });

        function closeModal(id){
            $(id).modal('hide')
        }

        $('#launchGiftA').click(function(){
            closeModal("#giftChoose");
            fortune.getQuote(function(quote) {
                var title = "<h4>Your fortune is:</h4><br/>";
                $("#giftA .modal-content h2").html(title + quote);
            });
        });

        $('#launchGiftB').click(function(){
            closeModal("#giftChoose");
            invokeGiphy(function(response){
                if(response.status > 0){
                    var title = "<h4>This is a <a href=\"http://giphy.com/search/lucky\">#lucky</a> gif</h4><br/>"
                    var image = "<img alt=\"lucky giphy\" src=\"" + response.data.data.image_url + "\"/>";
                    $("#giftB .modal-content").html(title + image);
                }
            });
        });

        function invokeGiphy(callback){
            $.ajax({
              url: "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=lucky",
              dataType: "json",
            }).done(function(response) {
                callback({"status":1,"data":response});
            }).error(function(){
                callback({"status":-1,"error":"Well, this is embarrasing. There was an error connecting to Giphy. Get this kitty instead: "});
            });
        }

        function processGiphyResponse(){}

        function setNewElementOpacity(){
            var distance = 200; // 200px
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();
            var documentHeight = $(document).height();

            $('.popup').each(function(i) {
                var objectTop = $(this).position().top;
                var objectHeight = $(this).outerHeight();
                var objectBottom = objectTop + objectHeight;
                var windowBottom = scrollTop + windowHeight;
                var percentajeOnScreen = Math.abs(windowBottom - objectBottom);

                if (windowBottom - objectTop < distance) {
                    $(this).css("opacity", 0.3);
                } else {
                    $(this).css("opacity", 1);
                }
            });

            if (scrollTop + windowHeight == documentHeight) {
                //bottom
            }
        }

        // Changes opacity of popups when they are at less distance than
        // "distance" of the bottom of the screen.
        $(window).scroll(function() {
            setNewElementOpacity();
        });
    });

})(window);
