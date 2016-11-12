jQuery( document ).ready(function() {

    // init custom dropdowns
    if ( jQuery( '.js-custom-dropdown' ).length > 0 ){

        jQuery(document).click(function(){
            // Remove all the active classes, menu is closed
            jQuery( '.js-custom-dropdown' ).removeClass('custom-dropdown--active');
            return;
        });

        jQuery( '.js-custom-dropdown' ).on( 'click', function () {
            return false;
        });

        // NAVIGATION
        jQuery( '.js-custom-dropdown-link' ).on( 'click', function () {

            var strActiveLevel  = jQuery(this).attr('data-level-parent');
            var strActiveGroup  = jQuery(this).attr('data-level-group');
            var strTopLevel     = jQuery(this).attr('data-level-top');

            // Check for a Top level click
            if(typeof strTopLevel != 'undefined' && strTopLevel == 'top' ) {
                // Check if top level is currently active
                if(jQuery( '.js-custom-dropdown[data-level-type="'+strActiveLevel+'"]').hasClass('custom-dropdown--active')) {
                    // Remove all the active classes, menu is closed
                    jQuery( '.js-custom-dropdown' ).removeClass('custom-dropdown--active');
                    return;
                }
            }

            // Check if Clicked Menu isn't already active yet
            if(! jQuery( '.js-custom-dropdown[data-level-type="'+strActiveLevel+'"]').hasClass('custom-dropdown--active')) {
                // Remove all active classes on group
                jQuery( '.js-custom-dropdown[data-level-group="'+strActiveGroup+'"]' ).removeClass( 'custom-dropdown--active' );
            }

            // Toggle Class on clicked item
            jQuery( '.js-custom-dropdown[data-level-type="'+strActiveLevel+'"]' ).toggleClass( 'custom-dropdown--active' );


        });

    }

    if ( jQuery( '.js-custom-dropdown' ).length > 0 ){
        $(".js-scroll-to").click(function() {

            var strScrollToTarget = jQuery(this).attr('rel');
            scrollToAnchor(strScrollToTarget);
        });
    }

    $(function() {
        $( '.js-dlmenu' ).dlmenu({
            animationClasses : { classin : 'dl-animate-in-2', classout : 'dl-animate-out-2' }
        });
    });



    $(window).on('breakpoint-change', function(e, breakpoint) {

        if(breakpoint === 'bp-small') {
            console.log('CSS Breakpoint screen-small');

            $(".js-nav--main").unstick();
        }

        if(breakpoint === 'bp-up-from-small') {
            console.log('CSS Breakpoint up-from-small');

            $(".js-nav--main").sticky(
                {
                    topSpacing: 0,
                    wrapperClassName: 'sticky-nav',
                    getWidthFrom: 'body',
                    zIndex: 5000
                }
            );
        }

    });

    //Toggle nav on palmsized devices
    //hc_scripts.toggleNav();

    //Toggle qb on palmsized devices
    //hc_scripts.toggleQuickbooker();

    //Toggle qb on mobile devices
    hc_scripts.toggleMobileQuickbooker();

    // Set Hoteliers Booker with Onsite Overlay
    hc_scripts.setBooker();

    // Deactivate
    hc_scripts.deactivateMobileBooker();

});


