// responsive nav and body blur function when nav is active
var bodyBlur = document.getElementById("bodyBlur");
var myNav = document.getElementById("mySidenav");

function openNav() {
    bodyBlur.style.display = "block";
    myNav.classList.add('mobile-only');
}

function closeNav() {
    myNav.classList.remove("mobile-only");
    bodyBlur.style.display = "none";
}

bodyBlur.addEventListener("click", function() {
    bodyBlur.style.display = "none";
    myNav.classList.remove("mobile-only");
});


//filter portofolio

filterSelection("all")

function filterSelection(c) {
    var x, i, info;
    info = document.getElementById("info");
    x = document.getElementsByClassName("filter");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        w3AddClass(x[i], "animated");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
        info.innerHTML = "Showing " + document.querySelectorAll('.show').length + " results";

    }
    if (document.querySelectorAll('.show').length < 2)
        info.innerHTML = "Showing " + document.querySelectorAll('.show').length + " result";
}

function w3AddClass(element, name) {

    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("sortItems");
var btns = btnContainer.getElementsByClassName("sortBtn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

//Scroll to top function

window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 620 || document.documentElement.scrollTop > 620) {
        document.getElementById("goToTopBtn").style.display = "block";
    } else {
        document.getElementById("goToTopBtn").style.display = "none";
    }
}




/* SMOOTH SCROLLING VANILLA JS 
 ********** credit https://github.com/sitepoint-editors/smooth-scrolling ***********
 */

initSmoothScrolling();

function initSmoothScrolling() {

    var duration = 700;

    var pageUrl = location.hash ?
        stripHash(location.href) :
        location.href;

    delegatedLinkHijacking();

    function delegatedLinkHijacking() {
        document.body.addEventListener('click', onClick, false);

        function onClick(e) {
            if (!isInPageLink(e.target))
                return;

            e.stopPropagation();
            e.preventDefault();

            jump(e.target.hash, {
                duration: duration,
                callback: function() {
                    setFocus(e.target.hash);
                }
            });
        }
    }

    function directLinkHijacking() {
        [].slice.call(document.querySelectorAll('a'))
            .filter(isInPageLink)
            .forEach(function(a) {
                a.addEventListener('click', onClick, false);
            });

        function onClick(e) {
            e.stopPropagation();
            e.preventDefault();

            jump(e.target.hash, {
                duration: duration
            });
        }

    }

    function isInPageLink(n) {
        return n.tagName.toLowerCase() === 'a' &&
            n.hash.length > 0 &&
            stripHash(n.href) === pageUrl;
    }

    function stripHash(url) {
        return url.slice(0, url.lastIndexOf('#'));
    }

    function setFocus(hash) {
        var element = document.getElementById(hash.substring(1));

        if (element) {
            if (!/^(?:a|select|input|button|textarea!)$/i.test(element.tagName)) {
                element.tabIndex = -1;
            }

            element.focus();
        }
    }
}

function jump(target, options) {
    var
        start = window.pageYOffset,
        opt = {
            duration: options.duration,
            offset: options.offset || 0,
            callback: options.callback,
            easing: options.easing || easeInOutQuad
        },
        distance = typeof target === 'string' ?
        opt.offset + document.querySelector(target).getBoundingClientRect().top :
        target,
        duration = typeof opt.duration === 'function' ?
        opt.duration(distance) :
        opt.duration,
        timeStart, timeElapsed;

    requestAnimationFrame(function(time) {
        timeStart = time;
        loop(time);
    });

    function loop(time) {
        timeElapsed = time - timeStart;

        window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

        if (timeElapsed < duration)
            requestAnimationFrame(loop)
        else
            end();
    }

    function end() {
        window.scrollTo(0, start + distance);

        if (typeof opt.callback === 'function')
            opt.callback();
    }


    function easeInOutQuad(t, b, c, d) {
        t /= d / 2
        if (t < 1) return c / 2 * t * t + b
        t--
        return -c / 2 * (t * (t - 2) - 1) + b
    }

}