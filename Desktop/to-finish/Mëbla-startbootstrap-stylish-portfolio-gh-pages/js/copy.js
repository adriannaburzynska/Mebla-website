$(document).ready(function () {

   // Animate tooltip
   $(function () {
      $('[data-toggle="tooltip"]').tooltip();
   })
   // Copy to clipboard
   var clipboard = new ClipboardJS('.btn-none');

   clipboard.on("success", function (e) {
      $(e.trigger).attr('data-original-title', 'copied!').tooltip('show');
   });
   clipboard.on("error", function () {
      $(e.trigger).attr('data-original-title', 'something went wrong!').tooltip('show');
   });

   // Href=“#” Don't Scroll on click
   $('#phone, #mail').click(function (e) {
      e.preventDefault();
   });

});
