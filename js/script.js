$(document).ready(function() {
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
    var scroll_pos = 0;
    $(document).scroll(function() {
        scroll_pos = $(this).scrollTop();
        if (scroll_pos > 220) {
            $(".nav").css('background', 'rgba(67,67,67, 0.7)');
        } else {
            $(".nav").css('background', 'linear-gradient(#000000,#434343)');
        }
    });
});

function responsiveNav() {
    var x = document.getElementById("responsive-nav");
    if (x.className === "nav") {
        x.className += " responsive";
    } else {
        x.className = "nav";
    }
}
$(function() {
    $(".typed").typed({
        strings: ["cool websites.", "logos.", "free stuff for NGO's!"],
        typeSpeed: 30,
        loop: true,
        backDelay: 2000,
    });
});