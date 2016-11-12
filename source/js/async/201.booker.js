/*  -----------------------------------------------------------------
 *  Hoteliers.js v3.2.0                                             *
 *  @author Hoteliers.com                                           *
 *  -----------------------------------------------------------------
 */

/*  Constructor of hoteliers_form
 *  @param id:                      the id of the hotel
 *  @param language:                the session language
 *  @param dyn_options:             any option that differ from default options, thus dynamic
 *  @param type:                    could be 'default', 'packages', 'rooms'
 *                                  depending on the type of form used
 *  @param enable_onSiteOverlay:    can be 'true' or 'false' (boolean)
 *                                  this will show a dialog after closing the booking engine to let the
 *                                  booker remind himself/herself of his/her booking
 *                                  !note: the feature should still be enabled in Hoteliers Extranet!
 *  @return                         new object
 */
function hoteliers_form(id,language,dyn_options) {
    var _ = this;
    _.type = 'default';
    _.params = {};
    _.params.ID = id;
    _.params.lang = language;

    // Static options
    _.options = {
        form_class: 'hoteliers-form__form',
        date_format: 'dd.mm.yy',
        default_days: 1,
        frame_width: 1020,
        frame_height: '100%',
        use_inline_iframe: false,
        packages: false,
        rooms: false,
        shownrofmonths: 2,
        hoteliers_submit: 'hf-checkform',
        hoteliers_arrival: 'hf-arrivaldate',
        hoteliers_departure: 'hf-departuredate',
        enable_onSiteOverlay: false,
    };

    jQuery.extend(_.options,dyn_options);

    // Init all other requisites
    _.init();
}

hoteliers_form.prototype = {
    init: function() {
        var _ = this;
        _.set_attributes();
        _.set_datepickers();
        _.set_eventlisteners();
        _.onSiteOverlay.init(_);
    },

    /*  Function to reset the params object */
    /*  @return         void */
    reset: function() {
        for (var prop in this.params) {
            if (!(prop === 'ID' || prop === 'lang')) {
                delete this.params[prop];
            }
        }
    },

    /*  Function to retrieve the script type */
    /*  @return         script type */
    get_type: function() {
        return this.type;
    },

    /*  Function to return the current option settings */
    /*  @return         current option settings */
    get_options: function() {
        return this.options;
    },

    /*  Function to set the neccesary attributes if empty */
    /*  @return         void: attributes set */
    set_attributes: function(obj) {
        var _ = this;
        jQuery('.'+_.get_options().form_class).find('.hoteliers-form__grid-item,.js-hoteliers-form__grid-item,.js-grid-item').each(function() {
            var $this = jQuery(this),
                $inputAndButton = $this.find('input, button'),
                element = $this.attr('data-item');

            if (!$inputAndButton.attr('id')) {
                $inputAndButton.attr('id',element);
            }
            _.get_options()[element] = $inputAndButton.attr('id');

            $this.find('label').attr('for',$this.find('input').attr('id'));
        });
    },

    /*  Function to set the datepickers and their options */
    /*  @return         void: initialized datepicker objects */
    set_datepickers: function() {
        jQuery.datepicker.setDefaults(jQuery.datepicker.regional[this.params.lang]);

        var _ = this,
            today = new Date(),
            $arrival = jQuery('#'+_.get_options().hoteliers_arrival),
            $departure = jQuery('#'+_.get_options().hoteliers_departure);

        $arrival.datepicker({
            dateFormat: _.get_options().date_format,
            minDate: '0',
            numberOfMonths: ((portable_devices.isMobile() === true) ? 1 : _.get_options().shownrofmonths),
            onSelect: function(date) {
                var curr_date = $arrival.datepicker('getDate');
                curr_date.setDate(curr_date.getDate()+_.get_options().default_days);
                $departure.datepicker('option','minDate',curr_date);
            }
        });
        $departure.datepicker({
            dateFormat: _.get_options().date_format,
            minDate: '0',
            numberOfMonths: ((portable_devices.isMobile() === true) ? 1 : _.get_options().shownrofmonths),
        });

        $arrival.datepicker('setDate',today);
        today.setDate(today.getDate()+1);
        $departure.datepicker('setDate',today);
    },

    /*  Function to set all event listeners needed */
    /*  @return         void: initialized eventlisteners */
    set_eventlisteners: function() {
        var _ = this;

        jQuery('#'+_.get_options().hoteliers_submit).click(function(event) {
            event.preventDefault();

            // Execute
            _.hf_check_form(this);
        });

        _.onSiteOverlay.addCloseListener(window,'message',function(objEvent) {
            _.onSiteOverlay.iframeListener(objEvent,_);
        });

    },

    /*  On-site Overlay child object */
    onSiteOverlay: {
        /*  Function to set some params from parent to child object */
        /*  @return void */
        _setDataFromParent: function(objParent) {
            var _ = this;
            _.options = objParent.get_options();
            _.params = objParent.params;
            return _;
        },

        /*  Listen to 'close' event */
        /*  @return void */
        addCloseListener: function(objTarget,strEvent,fncCallback) {
            switch (true) {
                //IE
                case 'attachEvent' in objTarget:
                    objTarget.attachEvent('on'+strEvent,fncCallback);
                    break;
                case 'addEventListener' in objTarget:
                default:
                    objTarget.addEventListener(strEvent,fncCallback,false);
                    break;
            }
        },

        /*  Listen to events on-site overlay */
        /*  @return void */
        iframeListener: function(objEvent,objParent) {
            var _ = this._setDataFromParent(objParent);
            if (objEvent.data === 'hide_overlay' && _.options.$onSiteOverlay) {
                _.options.$onSiteOverlay.hide();
            }
        },

        /*  Function to initialize the On-site Overlay */
        /*  @return void */
        init: function(objParent) {
            var _ = this._setDataFromParent(objParent);

            // Check if feature is enabled in form options
            if (_.options.enable_onSiteOverlay !== true) {
                return;
            }

            // Avoid multiple loads
            if (window.onSiteOverlayAdded && window.onSiteOverlayAdded === true) {
                return;
            }
            window.onSiteOverlayAdded = true;

            // Load JavaScript to check if on-site overlay is enabled on Hoteliers side
            var strExtension = window.location.href.match(/^https?\:\/\/(.*?)\//i)[1].split('.').reverse()[0],
                objScript = document.createElement('script');
            objScript.setAttribute('src','//www.hoteliers.com/'+_.params.lang+'/on-site-overlay/1/'+_.params.ID);
            document.head.appendChild(objScript);
        },
    },

    /*  Function to check if the dates are correct */
    /*  @return         true of false */
    hf_check_dates: function() {
        var _ = this,
            arrival_date = jQuery('#'+_.get_options().hoteliers_arrival).datepicker('getDate'),
            departure_date = jQuery('#'+_.get_options().hoteliers_departure).datepicker('getDate');
        if (departure_date > arrival_date) {
            _.params.arrival = arrival_date.getDate()+'-'+(arrival_date.getMonth()+1)+'-'+arrival_date.getFullYear();
            _.params.departure = departure_date.getDate()+'-'+(departure_date.getMonth()+1)+'-'+departure_date.getFullYear();
            return true;
        }
        return false;
    },

    /* Function to check if a room id is present in the sibling object */
    /* @return          void: set roomID in object */
    hf_check_roomid: function() {
        var _ = this,
            room_id = jQuery('.'+_.get_options().form_class).find('.hf_room_id').val();
        if (typeof room_id !== 'undefined') {
            _.params.roomID = room_id;
            _.type = 'one_room';
        }
    },

    /* Function to check if a room id is present in the sibling object */
    /* @return          void: set roomID in object */
    hf_check_packageid: function() {
        var _ = this,
            package_id = jQuery('.'+_.get_options().form_class).find('.hf_package_id').val();
        if (typeof package_id !== 'undefined') {
            _.params.pID = package_id;
            _.type = 'one_package';
        }
    },


    /*  Function to check if an engine option is selected */
    /*  @return         void */
    hf_check_engineselect: function() {
        var _ = this,
            engine_select = jQuery('#hf_engine').val();
        if (engine_select === 'rooms' || _.get_options().rooms) {
            _.type = 'rooms';
        }
        if (engine_select === 'packages' || _.get_options().packages) {
            _.type = 'packages';
        }
    },

    /*  Function to check if an hotel option is selected */
    /*  @return         void */
    hf_check_hotelselect: function() {
        var _ = this,
            hotel_select = jQuery('#hf_hotel_hotelid').val();
        if (typeof hotel_select !== 'undefined') {
            _.params.ID = hotel_select;
        }
    },

    /*  Function to check if a corporate code was used */
    /*  @return         void */
    hf_check_password: function() {
        var _ = this,
            password = jQuery('#'+_.get_options().hoteliers_code).val();
        if (_.type === 'passwd' && password === '') {
            _.type = 'default';
        }
        if (typeof password !== 'undefined' && password !== '') {
            _.type = 'passwd';
            _.params.passwd = password;
        }
    },

    /*  Function to create the engine link */
    /*  @return         the created engine link */
    hf_create_enginelink: function() {
        var protocolHost = 'https://www.hoteliers.com/',
            engines = {
                default: protocolHost+'wlpEngine.php',
                packages: protocolHost+'wlpPEngine.php',
                passwd: protocolHost+'cwlpEngine.php',
                rooms: protocolHost+'wlpREngine.php',
                one_package: protocolHost+'wlp1PEngine.php',
                one_room: protocolHost+'wlp1REngine.php',
            };
        return engines[this.get_type()];
    },

    /*  Function to set the additional data */
    /*  @return         the parameters needed for the type */
    hf_create_params: function() {
        var _ = this,
            params = '?'+jQuery.param(_.params);
        return _.hf_get_analytics(params);
    },

    /*  Function to set the google analytics parameters */
    /*  @return         string of the ga params */
    hf_get_analytics: function(params) {
        if (typeof(_gaq) !== 'undefined') {
            _gaq.push(function() {
                if (typeof(_gat) !== 'undefined') {
                    params = _gat._getTrackerByName()._getLinkerUrl(params);
                }
            });
        }
        if (typeof(ga) !== 'undefined') {
            ga(function(tracker) {
                params += '&'+tracker.get('linkerParam');
            });
        }
        return params;
    },

    /*  Function to open a fancybox */
    /*  @return         void */
    hf_open_fancybox: function(engine_link) {
        var _ = this,
            booShowLightbox = null,
            objOptions = _.get_options(),
            $onSiteOverlay = null;

        try {
            $onSiteOverlay = objOptions.$onSiteOverlay || new htlrsOnSiteOverlay();
        } catch(e) {}

        jQuery.fancybox({
            type: 'iframe',
            width: objOptions.frame_width,
            height: objOptions.frame_height,
            href: engine_link,
            beforeClose: function() {
                if (_.options.enable_onSiteOverlay !== true) {
                    return true;
                }

                var objArrivalDate = jQuery('#'+objOptions.hoteliers_arrival).datepicker('getDate'),
                    strArrivalDate = [objArrivalDate.getFullYear(),objArrivalDate.getMonth()+1,objArrivalDate.getDate(),].join('-'),
                    objDepartureDate = jQuery('#'+objOptions.hoteliers_departure).datepicker('getDate'),
                    strDepartureDate = [objDepartureDate.getFullYear(),objDepartureDate.getMonth()+1,objDepartureDate.getDate(),].join('-');

                if ($onSiteOverlay !== null) {
                    _.options.$onSiteOverlay = $onSiteOverlay;
                    _.options.$onSiteOverlay
                        .initialize()
                        .setArrival(strArrivalDate)
                        .setDeparture(strDepartureDate)
                        .create();

                    // Show lightbox
                    booShowLightbox = confirm($onSiteOverlay.getConfirmMessage('leave'));
                }

                return (booShowLightbox !== null ? booShowLightbox : true);
            },
            afterClose: function() {
                if (booShowLightbox === true) {
                    _.options.$onSiteOverlay.show();
                }
            },
        });
    },

    /*  Function to open a inline iframe */
    /*  @return         void */
    hf_use_inline_iframe: function(engine_link) {
        var _ = this,
            iFrame = document.createElement('iframe');
        with (iFrame) {
            src = engine_link;
            width = _.get_options().frame_width;
            height = _.get_options().frame_height;
        }
        jQuery('#iframe_container').html(iFrame);
    },

    /*  Function to check if the form values are valid and execute */
    /*  @return         void: opens a new tab if a link has been created */
    hf_check_form: function(event) {
        var _ = this;
        if (_.hf_check_dates()) {
            _.hf_check_roomid(event);
            _.hf_check_packageid(event);
            _.hf_check_hotelselect();
            _.hf_check_engineselect();
            _.hf_check_password();

            var params = _.hf_create_params(),
                engine_link = _.hf_create_enginelink(),
                booIsMobile = portable_devices.isMobile(),
                booIsTablet = portable_devices.isTablet();

            if (engine_link != null) {
                if (booIsTablet || booIsMobile) {
                    window.open(engine_link+params,'_blank');
                } else {
                    if (_.get_options().use_inline_iframe) {
                        _.hf_use_inline_iframe(engine_link+params);
                    } else {
                        _.hf_open_fancybox(engine_link+params);
                    }
                }
            }
        }
        _.reset();
    }
};

var portable_devices = {
    // Returns true or false
    hasTouchscreen: function() {
        return ('ontouchstart' in document.documentElement);
    },
    isTablet: function() {
        return (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i) && screen.width >= 600);
    },
    isMobile: function() {
        return (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i) && screen.width <= 600);
    },
    isDesktop: function() {
        var _ = this;
        return (!_.isTablet() || !_.isMobile());
    }
}

