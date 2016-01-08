// Hello.
//
// This is The Scripts used for ___________ Theme
//
//

function main() {

(function () {
   'use strict';

    /*====================================
     Modal
     ======================================*/

    function artistModal() {
        if (!input) {
            input = "Nothing Else Matters";
        }

        $.ajax({
            url: "https://api.spotify.com/v1/search?type=track&query=" + input,


            success: function (response) {
                var info = response.tracks.items[0].artists[0].href;

                var albumName = response.tracks.items[0].album.name;
                $(".js-albumName").empty();

                var albumId = response.tracks.items[0].album.id;

                $.ajax({
                    url: info,

                    success: function (response) {
                        var name = response.name;
                        $(".js-name").empty();

                        var popular = response.popularity;
                        $(".js-popular").empty();

                        var picture = response.images[0];

                        var genres = response.genres;
                        $(".js-genres").empty();
                        console.debug(genres);

                        for (var i = 0; i < genres.length; i++) {

                            if (i == genres.length - 1) {
                                $(".js-genres").append(genres[i] + ".");
                            }
                            else {
                                $(".js-genres").append(genres[i] + ", ");
                            }
                        }

                        $('.js-picture').prop('src', picture.url);
                        $(".js-name").append(name);
                        $(".js-popular").append(popular);
                        $(".js-albumName").append(albumName);

                    },
                    error: function () {
                        alert("error loadind info")
                    }

                });

                $(".full-album").prop("href", "https://open.spotify.com/album/" + albumId);


            },
            error: function () {
                alert("Error loading artist info")
            }

        });
    }


        $(".author").on("click", function(){
        $(".js-modal").modal();
        artistModal();
    });

    /*====================================
    Show Menu on Book
    ======================================*/
    $(window).bind('scroll', function() {
        var navHeight = $(window).height() - 100;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('on');
        } else {
            $('.navbar-default').removeClass('on');
        }
    });

    $('body').scrollspy({ 
        target: '.navbar-default',
        offset: 80
    })

  	$(document).ready(function() {


  	});

  	/*====================================
    Portfolio Isotope Filter
    ======================================*/
    $(window).load(function() {
        var $container = $('#lightbox');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.cat a').click(function() {
            $('.cat .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });



}());


}
main();