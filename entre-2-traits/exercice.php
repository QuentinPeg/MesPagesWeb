<!DOCTYPE html>
<!--[if lt IE 7]> <html lang="fr" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>    <html lang="fr" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>    <html lang="fr" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="fr" class="no-js"> <!--<![endif]-->
<head><meta charset="UTF-8" />
<link href="https://chamilo.org/chamilo-lms/" rel="help" />
<link href="https://chamilo.org/the-association/" rel="author" />
<link href="https://chamilo.org/the-association/" rel="copyright" />
<!-- Force latest IE rendering engine or ChromeFrame if installed -->
<!--[if IE]>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<![endif]--><link rel="shortcut icon" href="https://chamilo.iut2.univ-grenoble-alpes.fr/favicon.ico" type="image/x-icon" />
<link rel="apple-touch-icon" href="https://chamilo.iut2.univ-grenoble-alpes.fr/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="generator" content="Chamilo1" /><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>IUT2 Grenoble - Chamilo - IUT2 Grenoble - INFO 2A - R3.06 : Architecture des réseaux - Exercices</title><link href="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/bootstrap-daterangepicker/daterangepicker-bs3.css" rel="stylesheet" media="screen" type="text/css" />
<link href="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/fontawesome/css/font-awesome.min.css" rel="stylesheet" media="screen" type="text/css" />
<link href="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/jquery-ui/themes/smoothness/theme.css" rel="stylesheet" media="screen" type="text/css" />
<link href="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/jquery-ui/themes/smoothness/jquery-ui.min.css" rel="stylesheet" media="screen" type="text/css" />
<link href="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/mediaelement/build/mediaelementplayer.min.css" rel="stylesheet" media="screen" type="text/css" />
<link href="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/jqueryui-timepicker-addon/dist/jquery-ui-timepicker-addon.min.css" rel="stylesheet" media="screen" type="text/css" />
<link href="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" media="screen" type="text/css" />
<link href="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/jquery.scrollbar/jquery.scrollbar.css" rel="stylesheet" media="screen" type="text/css" />
<link href="https://chamilo.iut2.univ-grenoble-alpes.fr/main/inc/lib/javascript/bootstrap-select/css/bootstrap-select.min.css" rel="stylesheet" media="screen" type="text/css" />
<link href="https://chamilo.iut2.univ-grenoble-alpes.fr/main/inc/lib/javascript/chosen/chosen.css" rel="stylesheet" media="screen" type="text/css" />
<link href="https://chamilo.iut2.univ-grenoble-alpes.fr/main/inc/lib/javascript/tag/style.css" rel="stylesheet" media="screen" type="text/css" />
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/modernizr/modernizr.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/bootstrap/dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/moment/min/moment-with-locales.min.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/bootstrap-daterangepicker/daterangepicker.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/jquery-timeago/jquery.timeago.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/mediaelement/build/mediaelement-and-player.min.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/jqueryui-timepicker-addon/dist/jquery-ui-timepicker-addon.min.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/image-map-resizer/js/imageMapResizer.min.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/jquery.scrollbar/jquery.scrollbar.min.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/readmore-js/readmore.min.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/MathJax/MathJax.js?config=TeX-MML-AM_HTMLorMML"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/jqueryui-timepicker-addon/dist/i18n/jquery-ui-timepicker-fr.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/jquery-ui/ui/minified/i18n/datepicker-fr.min.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/main/inc/lib/javascript/chosen/chosen.jquery.min.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/main/inc/lib/javascript/bootstrap-select/js/bootstrap-select.min.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/main/inc/lib/javascript/bootstrap-select/js/i18n/defaults-fr_FR.min.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/main/inc/lib/javascript/chat/js/chat.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/main/inc/lib/javascript/fontresize.js"></script>
<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/main/inc/lib/javascript/tag/jquery.fcbkcomplete.js"></script>
<script>var _p = {
    "web": "https:\/\/chamilo.iut2.univ-grenoble-alpes.fr\/",
    "web_url": "https:\/\/chamilo.iut2.univ-grenoble-alpes.fr\/web\/",
    "web_relative": "\/",
    "web_course": "https:\/\/chamilo.iut2.univ-grenoble-alpes.fr\/courses\/",
    "web_main": "https:\/\/chamilo.iut2.univ-grenoble-alpes.fr\/main\/",
    "web_css": "https:\/\/chamilo.iut2.univ-grenoble-alpes.fr\/web\/css\/",
    "web_ajax": "https:\/\/chamilo.iut2.univ-grenoble-alpes.fr\/main\/inc\/ajax\/",
    "web_img": "https:\/\/chamilo.iut2.univ-grenoble-alpes.fr\/main\/img\/",
    "web_plugin": "https:\/\/chamilo.iut2.univ-grenoble-alpes.fr\/plugin\/",
    "web_lib": "https:\/\/chamilo.iut2.univ-grenoble-alpes.fr\/main\/inc\/lib\/",
    "web_upload": "https:\/\/chamilo.iut2.univ-grenoble-alpes.fr\/app\/upload\/",
    "web_self": "\/main\/exercise\/exercise.php",
    "self_basename": "exercise.php",
    "web_query_vars": "",
    "web_self_query_vars": "\/main\/exercise\/exercise.php",
    "web_cid_query": "cidReq=INFO3006&id_session=0&gidReq=1&gradebook=0&origin=",
    "web_rel_code": "\/main\/"
}</script>
<script>
    $(document).ready(
        function () {
            $("div[id*='number_of_question_'").each(
                function () {
                    let exerciseId = $(this).attr("id").replace(/number_of_question_/, "");
                    $.ajax({
                        type: "POST",
                        url: "https://chamilo.iut2.univ-grenoble-alpes.fr/main/inc/ajax/exercise.ajax.php",
                        data: {
                                "a" : "get_number_of_questions",
                                "exerciceId" : exerciseId 
                            },
                        success: function(data) {
                            $("#number_of_question_"+exerciseId).html(data);
                        }
                    });                      
                }
            );
            
            $(".completeAttempt").each(
                function () {
                    updateCompleteAttempt($(this).attr("id"));
                }
            );
            
            $(".incompleteAttempt").each(
                function () {
                    updateIncompleteAttempt($(this).attr("id"));
                }
            );
        }
    );
    
    function updateCompleteAttempt(tdId)
    {
        
        exerciseId = tdId.replace(/complete/, "");
        $.ajax({
            type: "POST",
            url: "https://chamilo.iut2.univ-grenoble-alpes.fr/main/inc/ajax/exercise.ajax.php",
            data: {
                "a" : "get_complete_attemps",
                "exerciceId" : exerciseId 
                },
            success: function(data) {
                    $("#"+tdId).html(data);
                }
        });
    }
    
    function updateIncompleteAttempt(tdId)
    {
        exerciseId = tdId.replace(/incomplete/, "");
        $.ajax({
            type: "POST",
            url: "https://chamilo.iut2.univ-grenoble-alpes.fr/main/inc/ajax/exercise.ajax.php",
            data: {
                "a" : "get_incomplete_attemps",
                "exerciceId" : exerciseId 
                },
            success: function(data) {
                    $("#"+tdId).html(data);
                }
        });    
    }
</script>

<script type="text/javascript" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/qtip2/jquery.qtip.min.js"></script>

<link href="https://chamilo.iut2.univ-grenoble-alpes.fr/web/assets/qtip2/jquery.qtip.min.css" rel="stylesheet" media="screen" type="text/css" />


<script>

/* Global chat variables */
var ajax_url = 'https://chamilo.iut2.univ-grenoble-alpes.fr/main/inc/ajax/chat.ajax.php';
var online_button = '<img src="https://chamilo.iut2.univ-grenoble-alpes.fr/main/img/statusonline.png" alt="statusonline.png" title="statusonline.png"  />';
var offline_button = '<img src="https://chamilo.iut2.univ-grenoble-alpes.fr/main/img/statusoffline.png" alt="statusoffline.png" title="statusoffline.png"  />';
var connect_lang = 'Messagerie (connecté)';
var disconnect_lang = 'Messagerie (déconnecté)';
</script><script>    // External plugins not part of the default Ckeditor package.
    var plugins = [
        'asciimath',
        'asciisvg',
        'audio',
        'ckeditor_wiris',
        'dialogui',
        'glossary',
        'leaflet',
        'mapping',
        'maximize',
        'mathjax',
        'oembed',
        'toolbar',
        'toolbarswitch',
        'video',
        'wikilink',
        'wordcount',
        'youtube',
        'flash'
    ];

    plugins.forEach(function(plugin) {
        CKEDITOR.plugins.addExternal(plugin, 'https://chamilo.iut2.univ-grenoble-alpes.fr/main/inc/lib/javascript/ckeditor/plugins/' + plugin + '/');
    });

    /**
     * Function use to load templates in a div
     **/
    var showTemplates = function (ckeditorName) {
        var editorName = 'content';
        if (ckeditorName && ckeditorName.length > 0) {
            editorName = ckeditorName;
        }
        CKEDITOR.editorConfig(CKEDITOR.config);
        CKEDITOR.loadTemplates(CKEDITOR.config.templates_files, function (a) {
            var templatesConfig = CKEDITOR.getTemplates("default");
            var $templatesUL = $("<ul>");
            if (templatesConfig) {
                $.each(templatesConfig.templates, function () {
                    var template = this;
                    var $templateLi = $("<li>");
                    var templateHTML = "<img src=\"" + templatesConfig.imagesPath + template.image + "\" ><div>";
                    templateHTML += "<b>" + template.title + "</b>";

                    if (template.description) {
                        templateHTML += "<div class=description>" + template.description + "</div>";
                    }
                    templateHTML += "</div>";

                    $("<a>", {
                        href: "#",
                        html: templateHTML,
                        click: function (e) {
                            e.preventDefault();
                            if (CKEDITOR.instances[editorName]) {
                                CKEDITOR.instances[editorName].setData(template.html, function () {
                                    this.checkDirty();
                                });
                            }
                        }
                    }).appendTo($templateLi);
                    $templatesUL.append($templateLi);
                });
            }
            $templatesUL.appendTo("#frmModel");
        });
    };

function doneResizing() {
    var widhtWindow = $(window).width();
    if ((widhtWindow>=1024) && (widhtWindow>=768)) {
        $("#profileCollapse").addClass("in");
        $("#courseCollapse").addClass("in");
        $("#skillsCollapse").addClass("in");
        $("#sn-sidebar-collapse").addClass("in");
        $("#user_image_block").removeClass("text-muted");
    } else {
        $("#profileCollapse").removeClass("in");
        $("#courseCollapse").removeClass("in");
        $("#skillsCollapse").removeClass("in");
        $("#sn-avatar-one").removeClass("in");
        $("#user_image_block").addClass("text-muted");
    }
};

$(document).ready(function() {
    $("#open-view-list").click(function(){
        $("#student-list-work").fadeIn(300);
    });
    $("#closed-view-list").click(function(){
        $("#student-list-work").fadeOut(300);
    });
    check_brand();
    var id;
    $(window).resize(function() {
        clearTimeout(id);
        id = setTimeout(doneResizing, 200);
    });

    // Removes the yellow input in Chrome
    if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
        $(window).load(function(){
            $('input:-webkit-autofill').each(function(){
                var text = $(this).val();
                var name = $(this).attr('name');
                $(this).after(this.outerHTML).remove();
                $('input[name=' + name + ']').val(text);
            });
        });
    }

    $(".accordion_jquery").accordion({
        autoHeight: false,
        active: false, // all items closed by default
        collapsible: true,
        header: ".accordion-heading"
    });

    // Global popup
    $('body').on('click', 'a.ajax', function(e) {
        e.preventDefault();

        var contentUrl = this.href,
                loadModalContent = $.get(contentUrl),
                self = $(this);

        $.when(loadModalContent).done(function(modalContent) {
            var modalDialog = $('#global-modal').find('.modal-dialog'),
                    modalSize = self.data('size') || get_url_params(contentUrl, 'modal_size'),
                    modalWidth = self.data('width') || get_url_params(contentUrl, 'width'),
                    modalTitle = self.data('title') || ' ';

            modalDialog.removeClass('modal-lg modal-sm').css('width', '');

            if (modalSize) {
                switch (modalSize) {
                    case 'lg':
                        modalDialog.addClass('modal-lg');
                        break;
                    case 'sm':
                        modalDialog.addClass('modal-sm');
                        break;
                }
            } else if (modalWidth) {
                modalDialog.css('width', modalWidth + 'px');
            }

            $('#global-modal').find('.modal-title').text(modalTitle);
            $('#global-modal').find('.modal-body').html(modalContent);
            $('#global-modal').modal('show');
        });
    });

    $('a.expand-image').on('click', function(e) {
        e.preventDefault();
        var title = $(this).attr('title');
        var image = new Image();
        image.onload = function() {
            if (title) {
                $('#expand-image-modal').find('.modal-title').text(title);
            } else {
                $('#expand-image-modal').find('.modal-title').html('&nbsp;');
            }

            $('#expand-image-modal').find('.modal-body').html(image);
            $('#expand-image-modal').modal({
                show: true
            });
        };
        image.src = this.href;
    });

    // Global confirmation
    $('.popup-confirmation').on('click', function() {
        showConfirmationPopup(this);
        return false;
    });

    // old jquery.menu.js
    $('#navigation a').stop().animate({
        'marginLeft':'50px'
    },1000);

    $('#navigation div').hover(
        function () {
            $('a',$(this)).stop().animate({
                'marginLeft':'1px'
            },200);
        },
        function () {
            $('a',$(this)).stop().animate({
                'marginLeft':'50px'
            },200);
        }
    );

    /* Make responsive image maps */
    $('map').imageMapResize();

    jQuery.fn.filterByText = function(textbox) {
        return this.each(function() {
            var select = this;
            var options = [];
            $(select).find('option').each(function() {
                options.push({value: $(this).val(), text: $(this).text()});
            });
            $(select).data('options', options);

            $(textbox).bind('change keyup', function() {
                var options = $(select).empty().data('options');
                var search = $.trim($(this).val());
                var regex = new RegExp(search,"gi");

                $.each(options, function(i) {
                    var option = options[i];
                    if(option.text.match(regex) !== null) {
                        $(select).append(
                                $('<option>').text(option.text).val(option.value)
                        );
                    }
                });
            });
        });
    };
    $(".black-shadow").mouseenter(function() {
        $(this).addClass('hovered-course');
    }).mouseleave(function() {
         $(this).removeClass('hovered-course');
    });
});

$(window).resize(function() {
    check_brand();
});

$(document).scroll(function() {
    var valor = $('body').outerHeight() - 700;
    if ($(this).scrollTop() > 100) {
        $('.bottom_actions').addClass('bottom_actions_fixed');
    } else {
        $('.bottom_actions').removeClass('bottom_actions_fixed');
    }

    if ($(this).scrollTop() > valor) {
        $('.bottom_actions').removeClass('bottom_actions_fixed');
    } else {
        $('.bottom_actions').addClass('bottom_actions_fixed');
    }

    //Exercise warning fixed at the top
    var fixed =  $("#exercise_clock_warning");
    if (fixed.length) {
        if (!fixed.attr('data-top')) {
            // If already fixed, then do nothing
            if (fixed.hasClass('subnav-fixed')) return;
            // Remember top position
            var offset = fixed.offset();
            fixed.attr('data-top', offset.top);
            fixed.css('width', '100%');
        }

        if (fixed.attr('data-top') - fixed.outerHeight() <= $(this).scrollTop()) {
            fixed.addClass('navbar-fixed-top');
            fixed.css('width', '100%');
        } else {
            fixed.removeClass('navbar-fixed-top');
            fixed.css('width', '100%');
        }
    }

    // Admin -> Settings toolbar.
    if ($('body').width() > 959) {
        if ($('.new_actions').length) {
            if (!$('.new_actions').attr('data-top')) {
                // If already fixed, then do nothing
                if ($('.new_actions').hasClass('new_actions-fixed')) return;
                // Remember top position
                var offset = $('.new_actions').offset();

                var more_top = 0;
                if ($('.subnav').hasClass('new_actions-fixed')) {
                    more_top = 50;
                }
                $('.new_actions').attr('data-top', offset.top + more_top);
            }
            // Check if the height is enough before fixing the icons menu (or otherwise removing it)
            // Added a 30px offset otherwise sometimes the menu plays ping-pong when scrolling to
            // the bottom of the page on short pages.
            if ($('.new_actions').attr('data-top') - $('.new_actions').outerHeight() <= $(this).scrollTop() + 30) {
                $('.new_actions').addClass('new_actions-fixed');
            } else {
                $('.new_actions').removeClass('new_actions-fixed');
            }
        }
    }
});

function get_url_params(q, attribute) {
    var vars;
    var hash;
    if (q != undefined) {
        q = q.split('&');
        for(var i = 0; i < q.length; i++){
            hash = q[i].split('=');
            if (hash[0] == attribute) {
                return hash[1];
            }
        }
    }
}

function check_brand() {
    if ($('.subnav').length) {
        if ($(window).width() >= 969) {
            $('.subnav .brand').hide();
        } else {
            $('.subnav .brand').show();
        }
    }
}

function showConfirmationPopup(obj, urlParam) {
    if (urlParam) {
        url = urlParam
    } else {
        url = obj.href;
    }

    var dialog  = $("#dialog");
    if ($("#dialog").length == 0) {
        dialog  = $('<div id="dialog" style="display:none">Veuillez confirmer votre choix </div>').appendTo('body');
    }

    var width_value = 350;
    var height_value = 150;
    var resizable_value = true;

    var new_param = get_url_params(url, 'width');
    if (new_param) {
        width_value = new_param;
    }

    var new_param = get_url_params(url, 'height')
    if (new_param) {
        height_value = new_param;
    }

    var new_param = get_url_params(url, 'resizable');
    if (new_param) {
        resizable_value = new_param;
    }

    // Show dialog
    dialog.dialog({
        modal       : true,
        width       : width_value,
        height      : height_value,
        resizable   : resizable_value,
        buttons: [
            {
                text: 'Oui',
                click: function() {
                    window.location = url;
                },
                icons:{
                    primary:'ui-icon-locked'
                }
            },
            {
                text: 'Non',
                click: function() { $(this).dialog("close"); },
                icons:{
                    primary:'ui-icon-locked'
                }
            }
        ]
    });
    // prevent the browser to follow the link
    return false;
}

function setCheckbox(value, table_id) {
    checkboxes = $("#"+table_id+" input:checkbox");
    $.each(checkboxes, function(index, checkbox) {
        checkbox.checked = value;
        if (value) {
            $(checkbox).parentsUntil("tr").parent().addClass("row_selected");
        } else {
            $(checkbox).parentsUntil("tr").parent().removeClass("row_selected");
        }
    });
    return false;
}

function action_click(element, table_id) {
    d = $("#"+table_id);
    if (!confirm('Veuillez confirmer votre choix')) {
        return false;
    } else {
        var action =$(element).attr("data-action");
        $('#'+table_id+' input[name="action"] ').attr("value", action);
        d.submit();
        return false;
    }
}

/**
 * Generic function to replace the deprecated jQuery toggle function
 * @param inId          : id of block to hide / unhide
 * @param inIdTxt       : id of the button
 * @param inTxtHide     : text one of the button
 * @param inTxtUnhide   : text two of the button
 * @todo : allow to detect if text is from a button or from a <a>
 */
function hideUnhide(inId, inIdTxt, inTxtHide, inTxtUnhide)
{
    if ($('#'+inId).css("display") == "none") {
        $('#'+inId).show(400);
        $('#'+inIdTxt).attr("value", inTxtUnhide);
    } else {
        $('#'+inId).hide(400);
        $('#'+inIdTxt).attr("value", inTxtHide);
    }
}

function expandColumnToogle(buttonSelector, col1Info, col2Info)
{
    $(buttonSelector).on('click', function (e) {
        e.preventDefault();

        col1Info = $.extend({
            selector: '',
            width: 4
        }, col1Info);
        col2Info = $.extend({
            selector: '',
            width: 8
        }, col2Info);

        if (!col1Info.selector || !col2Info.selector) {
            return;
        }

        var col1 = $(col1Info.selector),
            col2 = $(col2Info.selector);

        $('#expand').toggleClass('hide');
        $('#contract').toggleClass('hide');

        if (col2.is('.col-md-' + col2Info.width)) {
            col2.removeClass('col-md-' + col2Info.width).addClass('col-md-12');
            col1.removeClass('col-md-' + col1Info.width).addClass('hide');

            return;
        }

        col2.removeClass('col-md-12').addClass('col-md-' + col2Info.width);
        col1.removeClass('hide').addClass('col-md-' + col1Info.width);
    });
}
</script>
<link href="https://chamilo.iut2.univ-grenoble-alpes.fr/web/css/base.css" rel="stylesheet" media="screen" type="text/css" />
<link href="https://chamilo.iut2.univ-grenoble-alpes.fr/web/css/editor.css" rel="stylesheet" media="screen" type="text/css" />
<link href="https://chamilo.iut2.univ-grenoble-alpes.fr/web/css/themes/chamilo_iut2/default.css" rel="stylesheet" media="screen" type="text/css" />
<!-- Matomo -->
<script>
    var _paq = window._paq = window._paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
        var u="//piwik.grenet.fr/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '1']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
    })();
</script>
<!-- End Matomo Code -->
</head>
<body dir="ltr" class="section-mycourses">
<noscript>Votre navigateur n'autorise pas le JavaScript. Chamilo dépend hautement du JavaScript pour vous fournir une interface plus dynamique. Il est probable que la plupart des fonctionnalités soient accessibles, mais vous pourriez passer à côté des dernières améliorations en termes d'usabilité. Nous vous suggérons de modifier la configuration de votre navigateur (généralement dans le menu Édition -> Préférences) et de rafraîchir cette page.</noscript><div class="wrap"><div id="navigation" class="notification-panel">
</div><!-- Topbar --><div class="extra-header"></div>
<header id="header-section">
<section>
    <div class="container">
	<div class="row">
	    <div class="col-md-3">
	    	<div class="logo"><a href="https://chamilo.iut2.univ-grenoble-alpes.fr/index.php"  ><img title="Chamilo - IUT2 Grenoble" class="img-responsive" id="header-logo" src="https://chamilo.iut2.univ-grenoble-alpes.fr/web/css/themes/chamilo_iut2/images/header-logo.png" alt="IUT2 Grenoble"  /></a>
            </div>
	    </div>
            <div class="col-md-9">
                <div class="col-sm-4">                </div>
                <div class="col-sm-4">                </div>
                <div class="col-sm-4">                    <div class="section-notifications">
                        <ul id="notifications" class="nav nav-pills pull-right"><li><a href="https://chamilo.iut2.univ-grenoble-alpes.fr/whoisonline.php" target="_self" title="Utilisateurs en ligne" ><img src="https://chamilo.iut2.univ-grenoble-alpes.fr/main/img/icons/16/user.png" alt="Utilisateurs en ligne" title="Utilisateurs en ligne"  /> 47</a></li><li><a href="https://chamilo.iut2.univ-grenoble-alpes.fr/whoisonline.php?cidReq=INFO3006" target="_self"><img src="https://chamilo.iut2.univ-grenoble-alpes.fr/main/img/icons/16/course.png" alt="Utilisateurs en ligne Dans ce cours" title="Utilisateurs en ligne Dans ce cours"  /> 1 </a></li>
                        </ul>
                    </div><div class="resize_font"><div class="btn-group"><a title="Diminuer la taille des caractères" href="#" class="decrease_font btn btn-default"><em class="fa fa-font"></em></a><a title="Réinitialiser la taille des caractères" href="#" class="reset_font btn btn-default"><em class="fa fa-font"></em></a><a title="Augmenter la taille des caractères" href="#" class="increase_font btn btn-default"><em class="fa fa-font"></em></a></div></div>
                </div>
            </div>
        </div>
    </div>
</section><nav id="menubar" class="navbar navbar-default">
    <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#menuone" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="collapse navbar-collapse" id="menuone">
            <ul class="nav navbar-nav">                    <li class=""><a href="https://chamilo.iut2.univ-grenoble-alpes.fr/index.php" target="">Page d'accueil</a></li>                    <li class="active"><a href="https://chamilo.iut2.univ-grenoble-alpes.fr/user_portal.php" target="">Mes cours</a></li>                    <li class=""><a href="https://chamilo.iut2.univ-grenoble-alpes.fr/main/calendar/agenda_js.php?type=personal" target="">Agenda perso</a></li>                    <li class=""><a href="https://chamilo.iut2.univ-grenoble-alpes.fr/user_portal.php?tab_code=archive&tab_regex=Xi5BcmNoaXZl" target="_self">Mes archives</a></li>                    <li class=""><a href="https://chamilo.iut2.univ-grenoble-alpes.fr/user_portal.php?tab_code=archive&tab_regex=SVVUMiAt" target="_self">Mes ressources IUT2</a></li>                    <li class=""><a href="https://chamilo.iut2.univ-grenoble-alpes.fr/index.php?include=Emploi-du-temps_french.html" target="_self">Emploi du temps</a></li>                    <li class=""><a href="https://chamilo.iut2.univ-grenoble-alpes.fr/index.php?include=Messageries_french.html" target="_self">Messageries</a></li>                    <li class=""><a href="https://chamilo.iut2.univ-grenoble-alpes.fr/courses/PERSPROC/index.php?id_session=0" target="_self">Mode d'emploi</a></li>            </ul>           <ul class="nav navbar-nav navbar-right">                <li class="dropdown avatar-user">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                        <img class="img-circle" src="http://www.gravatar.com/avatar/48687aa9523f00092658ba155e8a2591?s=22&d=monsterid&r=g" alt="PEGUIN Quentin" />  <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li class="user-header">
                            <div class="text-center">
                            <img class="img-circle" src="http://www.gravatar.com/avatar/48687aa9523f00092658ba155e8a2591?s=50&d=monsterid&r=g" alt="PEGUIN Quentin" />
                            <p class="name"><a href="https://chamilo.iut2.univ-grenoble-alpes.fr/main/auth/profile.php">PEGUIN Quentin</a></p>
                            <p><i class="fa fa-envelope-o" aria-hidden="true"></i>Quentin.Peguin@etu.univ-grenoble-alpes.fr</p>
                            </div>
                        </li>
                        <li role="separator" class="divider"></li>
                        <li class="user-body">
                            <a title="Boîte de réception" href="https://chamilo.iut2.univ-grenoble-alpes.fr/main/messages/inbox.php">
                                <em class="fa fa-envelope" aria-hidden="true"></em>Boîte de réception
                            </a>                            <a title="Mes certificats" href="https://chamilo.iut2.univ-grenoble-alpes.fr/main/gradebook/my_certificates.php">
                                <em class="fa fa-graduation-cap" aria-hidden="true"></em>Mes certificats
                            </a>
                            <a id="logout_button" title="Quitter" href="https://chamilo.iut2.univ-grenoble-alpes.fr/index.php?logout=logout&logoutcas=logoutcas&uid=50487" >
                                <em class="fa fa-sign-out"></em>Quitter
                            </a>
                        </li>
                    </ul>
                </li>            </ul>        </div>
    </div>
</nav>
</header>
<section id="content-section">
    <div class="container">
        <ul class="breadcrumb"  >
            <li class="active"  >
                <a href="https://chamilo.iut2.univ-grenoble-alpes.fr/courses/INFO3006/index.php" target="_self">
                    <img src="https://chamilo.iut2.univ-grenoble-alpes.fr/main/img/home2.png" alt="INFO 2A - R3.06&nbsp;: Architecture des r&eacute;seaux id=3410" title="INFO 2A - R3.06&nbsp;: Architecture des r&eacute;seaux id=3410"  />
                    INFO 2A - R3.06&nbsp;: Architecture des r&eacute;seaux
                </a>
            </li>
            <li class="active"  >Exercices</li>
        </ul>
        <div class="row">
            <div class="col-md-12"></div>
        </div>    
    </div>
</section>
    
<footer>
    <div class="container">
        <div class="pre-footer">        </div>
        <div class="sub-footer">
            <div class="row">
                <div class="col-md-4">                    <div class="session-teachers">
                    </div>                    <div class="teachers">Enseignants : <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#99;&#104;&#97;&#109;&#105;&#108;&#111;&#46;&#105;&#117;&#116;&#50;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;" class="clickable_email_link">INFO Enseignant</a> | <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#70;&#114;&#97;&#110;&#99;&#111;&#105;&#115;&#46;&#80;&#111;&#114;&#116;&#101;&#116;&#64;&#117;&#110;&#105;&#118;&#45;&#103;&#114;&#101;&#110;&#111;&#98;&#108;&#101;&#45;&#97;&#108;&#112;&#101;&#115;&#46;&#102;&#114;" class="clickable_email_link">PORTET François</a> | <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#76;&#97;&#117;&#114;&#101;&#110;&#116;&#46;&#66;&#111;&#110;&#110;&#97;&#117;&#100;&#64;&#117;&#110;&#105;&#118;&#45;&#103;&#114;&#101;&#110;&#111;&#98;&#108;&#101;&#45;&#97;&#108;&#112;&#101;&#115;&#46;&#102;&#114;" class="clickable_email_link">BONNAUD Laurent</a> | <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#82;&#97;&#112;&#104;&#97;&#101;&#108;&#46;&#66;&#108;&#101;&#117;&#115;&#101;&#64;&#117;&#110;&#105;&#118;&#45;&#103;&#114;&#101;&#110;&#111;&#98;&#108;&#101;&#45;&#97;&#108;&#112;&#101;&#115;&#46;&#102;&#114;" class="clickable_email_link">BLEUSE Raphael</a>
                    </div>                </div>
                <div class="col-md-4">                </div>
                <div class="col-md-4 text-right">                    <div class="software-name">
	                <a href="https://chamilo.iut2.univ-grenoble-alpes.fr/" target="_blank">Créé avec Chamilo
                        </a>&copy;2024
                    </div>                </div>
            </div>
        </div>
        <div class="extra-footer">
        </div>
    </div>
</footer>

<div class="modal fade" id="expand-image-modal" tabindex="-1" role="dialog" aria-labelledby="expand-image-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Fermer"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="expand-image-modal-title">&nbsp;</h4>
            </div>
            <div class="modal-body">
            </div>
        </div>
    </div>
</div><div class="modal fade" id="global-modal" tabindex="-1" role="dialog" aria-labelledby="global-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Fermer">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="global-modal-title">&nbsp;</h4>
            </div>
            <div class="modal-body">
            </div>
        </div>
    </div>
</div><script>
    /* Makes row highlighting possible */
    $(document).ready( function() {
        // Date time settings.
        moment.locale('fr');
        $.datepicker.setDefaults($.datepicker.regional["fr"]);
        $.datepicker.regional["local"] = $.datepicker.regional["fr"];

        // Chosen select
        $(".chzn-select").chosen({
            disable_search_threshold: 10,
            no_results_text: 'Aucun\x20r\u00E9sultat\x20trouv\u00E9',
            placeholder_text_multiple: 'S\u00E9lectionnez\x20une\x20option',
            placeholder_text_single: 'S\u00E9lectionner\x20une\x20option',
            width: "100%"
        });

        // Bootstrap tabs.
        $('.tab-wrapper a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');

            //$('#tabs a:first').tab('show') // Select first tab
        });

        // Fixes bug when loading links inside a tab.
        $('.tab-wrapper .tab-pane a').unbind();

        /**
         * Advanced options
         * Usage
         * <a id="link" href="url">Advanced</a>
         * <div id="link_options">
         *     hidden content :)
         * </div>
         * */
        $(".advanced_options").on("click", function (event) {
            event.preventDefault();
            var id = $(this).attr('id') + '_options';
            var button = $(this);
            button.toggleClass('active');
            $("#" + id).toggle();
        });

        /**
         * <a class="advanced_options_open" href="http://" rel="div_id">Open</a>
         * <a class="advanced_options_close" href="http://" rel="div_id">Close</a>
         * <div id="div_id">Div content</div>
         * */
        $(".advanced_options_open").on("click", function (event) {
            event.preventDefault();
            var id = $(this).attr('rel');
            $("#" + id).show();
        });

        $(".advanced_options_close").on("click", function (event) {
            event.preventDefault();
            var id = $(this).attr('rel');
            $("#" + id).hide();
        });

        // Adv multi-select search input.
        $('.select_class_filter').each( function () {
            var inputId = $(this).attr('id');
            inputId = inputId.replace('-filter', '');
            $("#" + inputId).filterByText($("#" + inputId + "-filter"));
        });

        $(".jp-jplayer audio").addClass('skip');

        // Mediaelement
        if (1 == 1) {
            jQuery('video:not(.skip), audio:not(.skip)').mediaelementplayer(/* Options */);
        }

        // Table highlight.
        $("form .data_table input:checkbox").click(function () {
            if ($(this).is(":checked")) {
                $(this).parentsUntil("tr").parent().addClass("row_selected");
            } else {
                $(this).parentsUntil("tr").parent().removeClass("row_selected");
            }
        });

        /* For non HTML5 browsers */
        if ($("#formLogin".length > 1)) {
            $("input[name=login]").focus();
        }

        // Tool tip (in exercises)
        var tip_options = {
            placement: 'right'
        };
        $('.boot-tooltip').tooltip(tip_options);
        var more = 'En\x20savoir\x20plus';
        var close = 'Fermer';
        $('.list-teachers').readmore({
            speed: 75,
            moreLink: '<a href="#">' + more + '</a>',
            lessLink: '<a href="#">' + close + '</a>',
            collapsedHeight: 35,
            blockCSS: 'display: block; width: 100%;'
        });
    });
</script>

    </div>
</body>
</html>