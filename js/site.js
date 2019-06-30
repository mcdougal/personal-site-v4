var START_PAGE = '#bio';

function nav() {
    var selectedLinkId = START_PAGE;
    if (location.hash) {
        selectedLinkId = location.hash;
    }
    $('.nav .link').removeClass('selected');
    $('.nav a[href="'+selectedLinkId+'"]').addClass('selected');

    $('.page'+selectedLinkId+'-page .image').each(function() {
        if ($(this).attr('src') === undefined) {
            $(this).attr('src', $(this).attr('data-src'));
        }
    });

    $('.page.bio .text').removeClass('foldin');
    $('.page:not(.music) .tile').removeClass('foldin');
    $('.page.music .tile').removeClass('fadein');
    $('.page').removeClass('selected');

    if (navigator.userAgent.match(/mozilla/i) && !navigator.userAgent.match(/webkit/i)) {
        $(selectedLinkId+'-page').children().each(function(index, elem) {
            var $elem = $(elem);
            var $new = $elem.clone(true);
            $elem.before($new);
            $elem.remove();
        });
    }

    $(selectedLinkId+'-page.bio .text').addClass('foldin');
    $(selectedLinkId+'-page:not(.music) .tile').addClass('foldin');
    $(selectedLinkId+'-page.music .tile').addClass('fadein');
    $(selectedLinkId+'-page').addClass('selected');
}

function fillMusicPage() {
    var docHeight = $(window).outerHeight();
    var headerHeight = $('.head').outerHeight() + $('.nav').outerHeight();
    var musicPageHeight = docHeight - headerHeight;
    $('.page.music').css('min-height', musicPageHeight+'px');
}

$(document).ready(function() {
    $(window).hashchange(nav);
    nav();

    $(window).resize(fillMusicPage);
    fillMusicPage();

    $('.me').attr('src', $('.me').attr('data-src'));

    var playingAll = false;
    var justPaused = false;

    $('audio').bind('ended', function playAll() {
        if (justPaused) {
            playingAll = true;
        }
        if (playingAll) {
            $(this).parent('.tile').next().find('audio')[0].play();
        }
    });

    $('audio').bind('pause', function() {
        if (playingAll) {
            justPaused = true;
        }
        setTimeout(function() {
            justPaused = false;
        }, 500);
        playingAll = false;
    });


    $('.playall .title span').click(function() {
        playingAll = true;
        $('audio')[0].play();
    });
});
