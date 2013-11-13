( function( $ ) {

    $.fn.scrollSlideshow = function( options ) {
        var settings = $.extend({
            images: false,
            height: 0
        }, options);

        var $win = $(window),
            slideshowHolder = this,
            mainImage = $("<img src=''/>"),
            images = settings.images,
            winHeight = getWindowHeight(),
            topOffset = ( winHeight - settings.height )/ 2,
            slideshowFrames = [],
            nextSlideIndex = 0;

        slideshowHolder.append(mainImage);
        mainImage.attr("src", images[0]).css("position", "absolute");
        slideshowHolder.css("position", "relative");

        mainImage.css({top: topOffset + "px"});

        slideshowHolder.height(function(){
            return winHeight * 2 + "px";
        });

        calculateSlideshowBreakpoints();

        slideshowHolder.waypoint(function(direction){

            if (direction === "down") {

                $win.on("scroll", scrollEvent);
                $win.on("touchmove", scrollEvent);

                mainImage.addClass('sticky').css({
                    'position':'fixed',
                    'top': topOffset + 'px',
                });

            } else if (direction === "up") {

                $win.off("scroll", scrollEvent);
                $win.off("touchmove", scrollEvent);

                mainImage.removeClass('sticky').css({
                    'position':'absolute',
                    'top': topOffset + 'px',
                    'bottom': '',
                });

                mainImage.attr("src", images[0]);
                nextSlideIndex = 0;

            }

        }).waypoint(function(direction){

            if (direction === "up") {

                $win.on("scroll", scrollEvent);
                $win.on("touchmove", scrollEvent);

                mainImage.addClass('sticky').css({
                    'position':'fixed',
                    'top': topOffset + 'px',
                });

            }  else if (direction === "down") {

                $win.off("scroll", scrollEvent);
                $win.off("touchmove", scrollEvent);

                mainImage.removeClass('sticky').css({
                    'position':'absolute',
                    'top': '',
                    'bottom': topOffset + 'px',
                });

                mainImage.attr("src", images[images.length - 1]);
                nextSlideIndex = images.length - 1;

            }

        }, {
            offset: function(){
                return -($(this).height() - $win.height());
            }
        });


        function rotateImage() {
            mainImage.attr("src", images[nextSlideIndex]);

            if (nextSlideIndex < images.length - 1){
                nextSlideIndex++; 
            }
        }

        function unrotateImage(){
            if (nextSlideIndex !== 0){
                nextSlideIndex--;
            }
            mainImage.attr("src", images[nextSlideIndex]);
        }

        function calculateSlideshowBreakpoints() {
            slideshowFrames=[];

            for (i = 1; i <= images.length; i++){
                var slideshowFrame = ( slideshowHolder.height()/2 - topOffset * 2 ) / images.length * i;
                slideshowFrames.push(slideshowFrame);
            }

        }

        function scrollEvent(){
            var slideshowTop = slideshowHolder.offset().top,
                scrollTop = $win.scrollTop(),
                slideshowPosition = scrollTop - slideshowTop;

            if(slideshowPosition >= slideshowFrames[nextSlideIndex]) {
                rotateImage();
            }

            if (slideshowPosition <= slideshowFrames[nextSlideIndex]) {
                unrotateImage();
            }

        }

        $win.resize(function(){
            winHeight = getWindowHeight();
            slideshowHolder.height(function(){
                return winHeight * 2 + "px";
            });
            topOffset = ( winHeight - mainImage.height() )/ 2,
            mainImage.css({top: topOffset + "px"});

            calculateSlideshowBreakpoints();
        });

    };

    function getWindowHeight() {
        if( typeof( window.innerWidth ) == 'number' ) {
            //Non-IE
            return window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+
            return document.documentElement.clientHeight;
        }
    }

}( jQuery ));