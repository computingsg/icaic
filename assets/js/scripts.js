$(function () {

    //caches a jQuery object containing the header element

    // Change navbar styles when scroll up
    var header = $(".navbar.home");
    var header2 = $(".custom-navbar.home");
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        // var screenHeight = window.innerHeight;
        if (scroll >= 150) {
            header.addClass("sticky");
            header2.addClass("sticky");
        } else {
            header.removeClass("sticky");
            header2.removeClass("sticky");
        }

    });

    // to Fixed Nav Dropdown issue on Mobile
    var $win = $(window);
    var winWidth = $win.width();
    function getSize() {
        winWidth = $win.width();
        winHeight = $win.height();

        return {
            winWidth, winHeight
        }
    }
    // getSize();

    // $(window).resize(function () {


    // Toggle styles for navbar background when icon is clicked
    // var mobileToggler = $(".navbar-toggler");
    // mobileToggler.on("click", function () {
    //     var winSize = getSize();
    //     console.log("winWidth", $win.width());
    //     if (winSize['winWidth'] < 992) {
    //         $("#navbar-wrap").toggleClass("menu-opened");
    //         $("#hamburger").toggleClass("active");
    //         $("#navbar").toggleClass("expanded");
    //         $("#navbar").toggleClass("sticky");
    //     }
    // })
    //  Toggle Mobile menu when go to the link on the same page
    // target to .nav-link on top menu bar only
    // $(".sticky-top .nav-link").on("click", function () {
    //     toggleNavbar();
    // })
    // $(".dropdown-item").on("click", function () {
    //     toggleNavbar();
    // })

    function toggleNavbar() {
        $(".navbar-collapse").toggleClass("show");
        $(".navbar-toggler").toggleClass("collapsed");
        var isTogglerExpanded = $(".navbar-toggler").attr("aria-expanded");
        console.log(isTogglerExpanded, typeof isTogglerExpanded)
        if (isTogglerExpanded == "true") {
            $(".navbar-toggler").attr("aria-expanded", "false");
        } else {
            $(".navbar-toggler").attr("aria-expanded", "true");
        }
        $("#navbar-wrap").toggleClass("menu-opened");
        $("#hamburger").toggleClass("active");
        $("#navbar").toggleClass("expanded");
        $("#navbar").toggleClass("sticky");
    }

    // }
    // });

    // 

    //new mobile menu toggler 
    $(".mobile-menu-toggler").on('click', function () {

        $("#hamburger").toggleClass("active");
        $('.mobile-menu').toggleClass('expanded');
        $("#navbar").toggleClass("expanded");

        lockScroll();
    });

    $(".mobile-menu a").on('click', function () {
        $("#hamburger").toggleClass("active");
        $('.mobile-menu').toggleClass('expanded');
        $("#navbar").toggleClass("expanded");

        lockScroll();
    });
    function lockScroll() {
        document.body.classList.toggle('lock-scroll');
    }


    // initiate animate on scroll 
    AOS.init();

});

function startCountdown() {
    // =====================================================================
    // COUNTDOWN TARGET — edit this one line to change the deadline.
    // The '+08:00' suffix pins it to Singapore time; the countdown shown
    // is then correct for every visitor regardless of their timezone.
    // (Original code targeted 2026-09-20 and applied a buggy manual +8h
    // shift; replaced with the conference start date shown in the header.)
    // =====================================================================
    var targetDate = new Date('2026-12-06T00:00:00+08:00');

    function render() {
        var remainingTime = targetDate - new Date();

        var days = 0, hours = 0, minutes = 0, seconds = 0;
        if (remainingTime > 0) {
            days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        }

        if (document.getElementById('days')) document.getElementById('days').innerHTML = days;
        if (document.getElementById('hours')) document.getElementById('hours').innerHTML = hours;
        if (document.getElementById('minutes')) document.getElementById('minutes').innerHTML = minutes;
        if (document.getElementById('seconds')) document.getElementById('seconds').innerHTML = seconds;

        return remainingTime > 0;
    }

    // Render immediately so the counter never shows placeholder values
    // (the original waited 1s for the first setInterval tick).
    if (!render()) return; // already expired: shows 0 / 0 / 0 / 0

    var countdownInterval = setInterval(function () {
        if (!render()) clearInterval(countdownInterval);
    }, 1000); // Update every second
}

document.addEventListener('DOMContentLoaded', function (event) {
    if (document.getElementById('days')) {
        startCountdown();
    }
});
