( function ( $ ) {

    var WidgetLAEPostsSliderHandler = function ( $scope, $ ) {

        var slider_elem = $scope.find( '.lae-posts-slider' ).eq( 0 );

        if (slider_elem.length > 0) {

            var rtl = slider_elem.attr( 'dir' ) === 'rtl';

            var settings = slider_elem.data( 'settings' );

            var sliderId = settings['slider_id'];

            var arrows = settings['arrows'];

            var dots = settings['dots'];

            var autoplay = settings['autoplay'];

            var autoplay_speed = parseInt( settings['autoplay_speed'] ) || 3000;

            var animation_speed = parseInt( settings['animation_speed'] ) || 300;

            var fade = settings['fade'];

            var pause_on_hover = settings['pause_on_hover'];

            var centerMode = settings['center_mode'];

            var centerPadding = settings['center_padding'] + '%';

            var thumbnail_nav = settings['thumbnail_nav'];

            if (thumbnail_nav) {

                var thumb_slider = slider_elem.parent().find( '.lae-thumbnail-slider' );

                slider_elem.slick( {
                    arrows: arrows,
                    dots: false, // disable dots for thumbnail sliders
                    infinite: true,
                    autoplay: autoplay,
                    autoplaySpeed: autoplay_speed,
                    speed: animation_speed,
                    fade: false,
                    pauseOnHover: pause_on_hover,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rtl: rtl,
                    asNavFor: '#lae-thumbnail-slider-' + sliderId,
                    centerMode: centerMode,
                    centerPadding: centerPadding
                } );

                thumb_slider.slick( {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    asNavFor: '#lae-posts-slider-' + sliderId,
                    dots: false,
                    arrows: false,
                    focusOnSelect: true
                } );

            } else {

                slider_elem.slick( {
                    arrows: arrows,
                    dots: dots,
                    infinite: true,
                    autoplay: autoplay,
                    autoplaySpeed: autoplay_speed,
                    speed: animation_speed,
                    fade: false,
                    pauseOnHover: pause_on_hover,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rtl: rtl,
                    centerMode: centerMode,
                    centerPadding: centerPadding
                } );
            }


        }

    };

    // Make sure you run this code under Elementor..
    $( window ).on( 'elementor/frontend/init', function () {

        elementorFrontend.hooks.addAction( 'frontend/element_ready/lae-posts-slider.default', WidgetLAEPostsSliderHandler );

    } );

} )( jQuery );