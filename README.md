jquery-scroll-slideshow
=======================

$.scrollSlideshow() is an extension to the jQuery Waypoints plugin that allows you to rotate through an array of images as the page is scrolled down/up, as seen on the Los Angeles Times piece, ["Concrete risks"](http://www.latimes.com/local/la-me-earthquake-concrete-20131013-dto,0,1555748.htmlstory)  

[Try it out here!](http://datadesk.github.io/jquery-scroll-slideshow/)

To use
------
- Include jQuery, jQuery waypoints and scroll-slideshow.js in your document.
- Create a div, for example, <div id="slideshow"></div> that will hold the images.
- Define an array that holds the images you want to rotate through. You can include as many images as you need. 
- Call .scrollSlideshow() on the HTML element that will serve as the slideshow holder, passing in the images array and the height of the images.

For example:
<pre>
    $("#slideshow").scrollSlideshow({
        images: images,
        height: 289
    });
</pre>



Caveats
-------
- All the images need to be the same height, and this height must be passed in as the 'height' parameter when calling .scrollSlideshow().

To-do
-----
- Allow the plugin to render HTML frames.
- Add the option for manually setting a height to the slideshow holder. 
