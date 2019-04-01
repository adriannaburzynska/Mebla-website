(function ($) {
   "use strict"; // Start of use strict

   // Smooth scrolling using jQuery easing
   $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
         var target = $(this.hash);
         target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
         if (target.length) {
            $('html, body').animate({
               scrollTop: target.offset().top
            }, 1000, "easeInOutExpo");
            return false;
         }
      }
   });

   // Closes sidebar menu when clicked
   $(".menu-toggle").click(function (e) {
      console.log('click');
      e.preventDefault();
      $("#sidebar-wrapper").toggleClass("active"); /*show menu*/
      $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times"); /*change icon to x*/
   });

   // Closes sidebar menu when a scroll trigger link on the menu or on the page is clicked 
   $('#sidebar-wrapper .js-scroll-trigger, a.js-scroll-trigger').click(function () {
      /*when menu is closed don't do anything*/
      if (!$("#sidebar-wrapper").hasClass("active")) {
         console.log("scroll trigger link")
         return;
      } else {
         console.log("scroll trigger link")
         $("#sidebar-wrapper").removeClass("active");
         $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
      }
   });

   // Closes sidebar menu when page is scrolled
   window.wasScrolled = false;
   $(window).bind('scroll', function () {

      /*first scroll with opened menu - close */
      if (!window.wasScrolled && $("#sidebar-wrapper").hasClass("active")) {
         $("#sidebar-wrapper").removeClass("active");
         $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
         console.log("first scroll with opened menu - close");
         return false;
      }
      /*first scroll with closed menu - keep */
      else if (!window.wasScrolled) {
         console.log("first scroll with closed menu - keep");
         return false;
      }
      /*scrolling with closed menu - keep closed*/
      if (window.wasScrolled && !$("#sidebar-wrapper").hasClass("active")) {
         $("#sidebar-wrapper").removeClass("active");
         console.log("scrolling with closed menu - keep closed");
      }
      window.wasScrolled = true;
   })

   // Scroll to top button appear
   $(document).scroll(function () {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
         $('.scroll-to-top').fadeIn();
      } else {
         $('.scroll-to-top').fadeOut();
      }
   });

   // Scroll reveal calls
   window.sr = ScrollReveal(); /*plugin*/

   sr.reveal('.sr-btn', {
      delay: 200,
      scale: 0
   });
   sr.reveal('.sr-up', {
      distance: '15px',
      origin: 'bottom',
      scale: 0.5
   });
   sr.reveal('.sr-contact-1', {
      delay: 200,
      scale: 0
   });
   sr.reveal('.sr-contact-2', {
      delay: 400,
      scale: 0
   });
   sr.reveal('.sr-contact-3', {
      delay: 600,
      scale: 0
   });

   // Function that generates delays for each element 
   function delayEach(array, timeInterval, timeIntervalEven) {
      var n = 0;
      var place = 0;
      for (let item of array) { /*loops through each item */
         console.log(item);
         place++;
         item.classList.add('sr-up'); /*animate each item*/
         window.sr = ScrollReveal(); /*plugin*/

         if (timeIntervalEven !== undefined) { /*generates delay values*/

            if (place % 2 !== 0) n -= timeInterval; /*values for odd*/
            else n += timeIntervalEven;

         } else n += timeInterval; /*increasing values*/

         // run this after the last icon is animated after reveal
         if ($(item).is("#last")) {
            sr.reveal(item, {
               delay: n,
               afterReveal: fakeAction
            });
         }
         sr.reveal(item, { /*for each item apply its delay value*/
            delay: n,
         });
      }
   }

   /*give each letter/ icon its delay value*/
   const titles = $('#title span');
   const subtitles = $('#subtitle span');
   const skills = $('#services img');
   delayEach(titles, 0);
   delayEach(subtitles, 80, 220);
   delayEach(skills, 200);

   // fake open the first list  
   function fakeAction() {
      $("#headingOne a").addClass("hovered"); // fake hover state

      setTimeout(function () { // fake hover off
         $('#headingOne a').removeClass('hovered');
      }, 300);

      $('#headingOne a').click(); // fake click event
   }

})(jQuery); // End of use strict

// enable collapse
$('.collapse').collapse();

// CSS3 animations
$('h5 a').click(function () {
   const $currentIcon = $(this).parent().parent().parent().parent().children(":first");
   const Bs = "visibility: visible; ";
   const services_animation = "animation: spin 5s linear infinite; ";
   const paused = "animation-play-state: paused; ";
   const running = "animation-play-state: running; ";

   // deanimate all the icons
   $('#services img').each(function () {
      $(this).attr('style', Bs + services_animation + paused); // pause the animation
   });

   // animate the current icon 
   $currentIcon.attr('style', Bs + running + services_animation);
});
