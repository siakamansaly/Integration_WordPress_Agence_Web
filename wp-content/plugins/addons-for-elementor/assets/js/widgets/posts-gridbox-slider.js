( function ( $ ) {


    var WidgetLAEPostsGridBoxSliderHandler = function ( $scope, $ ) {

        var slider_elem = $scope.find( '.lae-posts-gridbox-slider' ).eq( 0 );

        if (slider_elem.length > 0) {

            var rtl = slider_elem.attr( 'dir' ) === 'rtl';

            var settings = slider_elem.data( 'settings' );

            var arrows = settings['arrows'];

            var dots = settings['dots'];

            var autoplay = settings['autoplay'];

            var autoplay_speed = parseInt( settings['autoplay_speed'] ) || 3000;

            var animation_speed = parseInt( settings['animation_speed'] ) || 300;

            var fade = settings['fade'];

            var pause_on_hover = settings['pause_on_hover'];

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
            } );
        }
    };

    // Make sure you run this code under Elementor..
    $( window ).on( 'elementor/frontend/init', function () {

        elementorFrontend.hooks.addAction( 'frontend/element_ready/lae-posts-gridbox-slider.default', WidgetLAEPostsGridBoxSliderHandler );

    } );

} )( jQuery );