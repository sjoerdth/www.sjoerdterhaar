
// Animate scroll to anchor on page
function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

var hc_scripts = {

    toggleMobileQuickbooker : function()
    {
        if(jQuery('.js-quickbooker').length > 0) {

            jQuery('.js-toggle-mobile-qb').click(function () {
                jQuery('.js-quickbooker').toggleClass('m-quickbooker--mobile-active');
            });

        }
    },

    setBooker : function() {
        var $booker = jQuery('.js-quickbooker');
        if ($booker.length <= 0) {
            return;
        }

        $booker.each(function() {
            var $this = jQuery(this),
                strIndex = $this.find('input[name="index"]').val(),
                intHotelId = $this.find('input[name="hotel"]').val(),
                strLanguage = $this.find('input[name="language"]').val(),
                hoteliersForm = new hoteliers_form(intHotelId,strLanguage,{
                    date_format: 'dd/mm/yy',
                    enable_onSiteOverlay: true,
                    hoteliers_arrival: 'hf-arrivaldate'+strIndex,
                    hoteliers_departure: 'hf-departuredate'+strIndex,
                    hoteliers_submit: 'hf-checkform'+strIndex,
                }),
                hoteliersFormOptions = hoteliersForm.get_options();
            jQuery('#'+hoteliersFormOptions.hoteliers_arrival).datepicker('option','onClose',function() {
                jQuery('#'+hoteliersFormOptions.hoteliers_departure).datepicker('show');
            });
        });
    },

    deactivateMobileBooker : function() {

        jQuery('.js-trigger').on('click', function () {

            if(jQuery('.m-quickbooker--mobile-active').length > 0) {
                jQuery('.m-quickbooker--mobile-active').removeClass('m-quickbooker--mobile-active');
            }

        });

    }

    //toggleNav : function()
    //{
    //    if(jQuery('.js-toggle-nav').length > 0) {
    //
    //        jQuery('.js-toggle-nav').click(function () {
    //            if(jQuery('.js-qb').hasClass('h-shown')) {
    //
    //                jQuery('.js-qb').addClass('exit');
    //                setTimeout(function(){
    //                    jQuery('.js-qb').removeClass('h-shown'),
    //                        jQuery('.js-qb').removeClass('exit')
    //                }, 250);
    //                jQuery('.js-nav').addClass('h-shown');
    //
    //            } else if(jQuery('.js-nav').hasClass('h-shown')) {
    //
    //                jQuery('.js-nav').addClass('exit');
    //                setTimeout(function(){
    //                    jQuery('.js-nav').removeClass('h-shown'),
    //                        jQuery('.js-nav').removeClass('exit')
    //                }, 250);
    //
    //            } else (
    //                jQuery('.js-nav').addClass('h-shown')
    //            )
    //        });
    //
    //    }
    //},

    //toggleQuickbooker : function()
    //{
    //    if(jQuery('.js-toggle-qb').length > 0) {
    //        jQuery('.js-toggle-qb').click(function () {
    //            if(jQuery('.js-nav').hasClass('h-shown')) {
    //                jQuery('.js-nav').addClass('exit');
    //                setTimeout(function(){
    //                    jQuery('.js-nav').removeClass('h-shown'),
    //                        jQuery('.js-nav').removeClass('exit')
    //                }, 250);
    //                jQuery('.js-qb').addClass('h-shown');
    //            } else if(jQuery('.js-qb').hasClass('h-shown')) {
    //                jQuery('.js-qb').addClass('exit');
    //                setTimeout(function(){
    //                    jQuery('.js-qb').removeClass('h-shown'),
    //                        jQuery('.js-qb').removeClass('exit')
    //                }, 250);
    //            } else (
    //                jQuery('.js-qb').addClass('h-shown')
    //            )
    //        });
    //    }
    //}

};
