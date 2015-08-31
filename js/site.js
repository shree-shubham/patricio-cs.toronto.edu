(function() {

    $(document).ready(function() {
        $("#button-gift").hide();

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

        var giftShowed = false;
        function checkMenuItem(hash){
            var checked = $(hash+"-i");
            checked.addClass("green");
            if(hash == "#extracurricular-activities" && !giftShowed){
                giftShowed = true;
                $("#button-gift").show(400);
            }
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

        // Changes opacity of text blocks when they get closer to the be in the front page.
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

        /*********************
        / Gifts Management
        /*********************/
        $('#launchGiftA').click(function(){
            closeModal("#giftChoose");
            $("#button-gift").hide(400);
            updateFortune();
        });

        $('#launchGiftB').click(function(){
            closeModal("#giftChoose");
            $("#button-gift").hide(400);
            updateGiphy();
        });

        $("#giftBRefresh").click(function(){
            updateGiphy();
        });

        $("#giftARefresh").click(function(){
            updateFortune();
        });

        function closeModal(id){
            $(id).modal('hide');
        }

        function updateFortune(){
            updateModalContent("A",false);
            fortune.getQuote(function(quote) {
                updateModalContent("A",true);
                quote = "<h2>"+quote+"</h2>";
                $("#giftAContent").html(quote);
            });
        }

        function updateGiphy(){
            updateModalContent("B",false);
            invokeGiphy(function(response){
                if(response.status > 0){
                    updateModalContent("B",true);
                    var giphy = '<iframe src="//giphy.com/embed/'+response.data.id+'" width="480" height="245" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>';
                    $("#giftBContent").html(giphy);
                }else{
                    $("#giftBLoading").hide();
                    $("#giftBContent").html(response.error);
                    $("#giftBContent").show();
                    $("#giftBRefresh").show();
                }
            });
        }

        function invokeGiphy(callback){
            $.ajax({
              url: "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=lucky",
              dataType: "json",
            }).done(function(response) {
                callback({"status":1,"data":response.data});
            }).error(function(){
                callback({"status":-1,"error":"<h4>Well, this is embarrasing: there was an error connecting to Giphy. Get this kitty instead:</h4></br></br><img src=\"img/kitty.gif\" alt=\"kitty\"/>"});
            });
        }

        function updateModalContent(letter,show){
            if(!show){
                $("#gift"+letter+"Title").hide();
                $("#gift"+letter+"Content").hide();
                $("#gift"+letter+"Loading").show();
                $("#gift"+letter+"Refresh").hide();
            }else{
                $("#gift"+letter+"Title").show();
                $("#gift"+letter+"Content").show();
                $("#gift"+letter+"Loading").hide();
                $("#gift"+letter+"Refresh").show();
            }
        }
    });

})(window);
