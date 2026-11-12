(function ($) {
  "use strict";

  var $window = $(window);
  var $header = $("#header");
  var $backToTop = $(".back-to-top");

  // Respect the visitor's "reduce motion" OS setting
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var scrollDuration = reduceMotion ? 0 : 700;

  // Preloader (if the #preloader div exists)
  $window.on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
  });

  /*
   * Dark mode toggle.
   * The initial theme is set by the inline script in <head> (saved choice, or the
   * visitor's system setting). Clicking the button flips it and remembers the choice.
   */
  var root = document.documentElement;
  var $themeToggle = $(".theme-toggle");
  var $themeColor = $('meta[name="theme-color"]');

  function savedTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var next = theme === "dark" ? "light" : "dark";
    $themeToggle.attr({
      "aria-label": "Switch to " + next + " mode",
      title: "Switch to " + next + " mode",
    });
    $themeColor.attr("content", theme === "dark" ? "#1d1b36" : "#413e66");
  }

  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

  $themeToggle.on("click", function () {
    var theme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.classList.add("theme-transition");
    applyTheme(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    window.setTimeout(function () {
      root.classList.remove("theme-transition");
    }, 350);
  });

  // Follow the system setting live, until the visitor makes their own choice
  if (window.matchMedia) {
    var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    var onSystemChange = function (e) {
      if (!savedTheme()) applyTheme(e.matches ? "dark" : "light");
    };
    if (darkQuery.addEventListener) darkQuery.addEventListener("change", onSystemChange);
    else if (darkQuery.addListener) darkQuery.addListener(onSystemChange);
  }

  // Initiate the wowjs animation library (skipped when reduced motion is requested)
  if (!reduceMotion && typeof WOW !== "undefined") {
    new WOW().init();
  }

  // Back to top button
  $backToTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, scrollDuration, "easeInOutExpo");
    return false;
  });

  // Smooth scroll for the navigation and links with .scrollto classes
  $(document).on("click", ".main-nav a, .mobile-nav a, .scrollto", function () {
    // On mobile, tapping a parent menu item opens its submenu (handled in mobile-nav.js)
    if ($(this).parent().hasClass("drop-down") && $(this).closest(".mobile-nav").length) {
      return;
    }

    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($header.length) {
          top_space = $header.outerHeight();

          if (!$header.hasClass("header-scrolled")) {
            top_space = top_space - 40;
          }
        }

        var hash = this.hash;
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: target.offset().top - top_space,
            },
            scrollDuration,
            "easeInOutExpo"
          )
          .promise()
          .done(function () {
            // Move keyboard focus to the section the user jumped to
            if (hash !== "#intro" && hash !== "#header") {
              target.attr("tabindex", "-1");
              try {
                target[0].focus({ preventScroll: true });
              } catch (err) {}
            }
          });

        if ($(this).parents(".main-nav, .mobile-nav").length) {
          $(".main-nav .active, .mobile-nav .active").removeClass("active");
          $(this).closest("li").addClass("active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $(".mobile-nav-toggle").attr({ "aria-expanded": "false", "aria-label": "Open menu" });
          $(".mobile-nav-overly").fadeOut();
        }
        return false;
      }
    }
  });

  /*
   * Scroll handling: one throttled handler (runs at most once per animation frame)
   * instead of three separate handlers firing on every scroll event.
   */
  var nav_sections = $("section");
  var main_nav = $(".main-nav, .mobile-nav");
  var main_nav_height = $header.outerHeight();
  var isScrolled = null;
  var activeId = null;
  var ticking = false;

  function onScroll() {
    ticking = false;
    var cur_pos = $window.scrollTop();
    var scrolled = cur_pos > 100;

    // Only touch the DOM when the state actually changes
    if (scrolled !== isScrolled) {
      isScrolled = scrolled;
      $header.toggleClass("header-scrolled", scrolled);
      $backToTop.stop(true, true)[scrolled ? "fadeIn" : "fadeOut"]("slow");
    }

    // Navigation active state on scroll
    var currentId = null;
    nav_sections.each(function () {
      var top = $(this).offset().top - main_nav_height,
        bottom = top + $(this).outerHeight();
      if (cur_pos >= top && cur_pos <= bottom) {
        currentId = this.id;
      }
    });

    if (currentId && currentId !== activeId) {
      activeId = currentId;
      main_nav.find("li").removeClass("active");
      main_nav
        .find('a[href="#' + currentId + '"]')
        .parent("li")
        .addClass("active");
    }
  }

  $window.on("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  });
  onScroll();

  // jQuery counterUp (only if the counters in the Why Us section are re-enabled)
  if ($.fn.counterUp) {
    $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 1000,
    });
  }

  // Portfolio isotope and filter
  $window.on("load", function () {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
    });

    // Re-layout once lazy-loaded images arrive, so tiles never overlap
    $(".portfolio-container img").on("load", function () {
      portfolioIsotope.isotope("layout");
    });

    $("#portfolio-flters li").on("click keydown", function (e) {
      if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      $("#portfolio-flters li")
        .removeClass("filter-active")
        .attr("aria-pressed", "false");
      $(this).addClass("filter-active").attr("aria-pressed", "true");

      portfolioIsotope.isotope({ filter: $(this).data("filter") });
    });
  });

  // Carousels (only if the Testimonials / Clients sections are re-enabled)
  if ($.fn.owlCarousel) {
    $(".testimonials-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1,
    });

    $(".clients-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      responsive: {
        0: { items: 2 },
        768: { items: 4 },
        900: { items: 6 },
      },
    });
  }
})(jQuery);
