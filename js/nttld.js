// Scripting privided/editing/partially written by Petros Kolyvas | krispii inc. | krispii.com
// With obvious help from StackOverflow and the jQuery documentation
// Copy freely, attribute kindly
// Something something MIT License.


$( document ).ready(function() {

  Snipcart.subscribe('cart.ready', function() {
    var count = Snipcart.api.items.count();
  });

  // $(window).scroll(function() {
  //   // Changing the multiplcation threshold here will have the elements fade
  //   // in sooner or later. The close you get to 1, the more you have to scroll before they
  //   // fade in.
  //   var showThreshold = $(this).scrollTop() + ($(this).innerHeight()*1.75);
  //   $(".image-box").each(function() {
  //     /* Check the location of each desired element */
  //     var objectBottom = $(this).offset().top + $(this).outerHeight();
  //     /* If the element's bottom is above the set threshold fade it in*/
  //     if (objectBottom < showThreshold) { //object comes into view (scrolling down)
  //       if ($(this).css("opacity")==0) {$(this).fadeTo(500,1);}
  //     } else { //object goes out of view (scrolling up)
  //       if ($(this).css("opacity")==1) {$(this).fadeTo(500,0);}
  //     }
  //   });
  // }).scroll(); //invoke scroll-handler on page-load

  // The button to autoscroll past the first image
  // This needs to be refactored for use programmatically (IE more than just the first one)
  $("#scroll-button").click(function() {
        $('body').animate({scrollTop:$('#first_row').offset().top},300);
  });

  // This controller should work for all "next panel" selections
  // Not in used in this version as it's not feature-complete aka "I couldn't get it to work" because time/skillz
  galleryArray = $('.gallery-full')
  index = 1;
  $(".next-button").click(function() {
        $('body').animate({scrollTop:$(galleryArray[index]).offset().top},300);
        index++;
  });

  // Sitemap//allproduct panel toggle
  $( ".show-products" ).click(function() {
      var target = $('#photo');
      if ($('.product').hasClass('center-in')) {
        $('.product').removeClass( 'center-in' );
        $('.product').fadeOut("slow");
      }
      else if ($('.info-page').hasClass('center-in')) {
        $('.info-page').removeClass( 'center-in' );
        $('.info-page').fadeOut("slow");
      }
      else {
      $('footer').toggleClass('sitemap');
      $('#sitemap').toggleClass('show-them');
      $('body').animate({scrollTop:target.offset().top},300);
      $(".gallery").toggleClass("hide");
      $(".product").hide();
      $(".info-page").hide();
    };
  });

  // Sitemap page toggle script
  $( ".sitemap-link").click(function(){
      var selectedPage = $(this).data("id");
      var target = $('#photo');
      $(".product").removeClass("left-in");
      $(".product").removeClass("right-in");
      $(".product").removeClass("left-in");
      $(".product").removeClass("center-in");
      if ($("#" + selectedPage).is(".left-product")) {
        // $("#sitemap").toggleClass( "show-them" );
        $("#" + selectedPage).addClass("left-in");
        $('body').animate({scrollTop:target.offset().top},300);
      }
      else if ($("#" + selectedPage).is(".right-product")) {
        // $("#sitemap").toggleClass( "show-them" );
        $("#" + selectedPage).addClass("right-in");
        $('body').animate({scrollTop:target.offset().top},300);
      }
      else if ($("#" + selectedPage).is(".center-product")) {
        // $("#sitemap").toggleClass( "show-them" );
        // $("#" + selectedPage).removeClass("hide");
        // $("#" + selectedPage).delay(300).addClass("center-in");
        $("#" + selectedPage).show("slow").delay(500).addClass("center-in");
        $('body').animate({scrollTop:target.offset().top},300);
      }
      else if ($("#" + selectedPage).is(".center-page")) {
        // $("#sitemap").toggleClass( "show-them" );
        // $("#" + selectedPage).removeClass("hide");
        // $("#" + selectedPage).delay(300).addClass("center-in");
        $("#" + selectedPage).show("slow").delay(500).addClass("center-in");
        $('body').animate({scrollTop:target.offset().top},300);
      };
  });

  $( ".page-link").click(function () {
    var selectedPage = $(this).data("id");
    var target = $('body');
    $(this).closest(".info-page").fadeOut("fast");
    $(".product").removeClass("left-in");
    $(".product").removeClass("right-in");
    $(".product").removeClass("left-in");
    $('.product').fadeOut("slow");
    $(".product").removeClass("center-in");
    $(".info-page").removeClass("center-in");
    $("#" + selectedPage).show("slow").delay(500).addClass("center-in");
    $('body').animate({scrollTop:target.offset().top},300);
  });

  // These control the panel sliding mechanisms
  // They will control only the clicked panel using local scope selection
  $( ".close-sitemap" ).click(function() {
    $(".gallery").removeClass("hide");
    $( this ).closest("#sitemap").toggleClass( "show-them" );
    $('footer').toggleClass('sitemap');
  });

  //Pin Sitemap
  $(".pin-sitemap").click(function() {
    if (isPinned = true ) {
      var isPinned = false;
      console.log("UnPinned");
    }
    else {
      var isPinned = true;
      console.log("Pinned");
    }
  });

  // Left panel open but will also align opened panel to top of viewport
  // to simplify control
  // Make sure to use viewport height for styles

  $( ".left" ).click(function() {
    var target = $(this.closest('.gallery'));
    $( this ).parent("div").find(".left-product").toggleClass( "left-in" );
    $('body').animate({scrollTop:target.offset().top},300);
  });

   $( ".right" ).click(function() {
    var target = $(this.closest('.gallery'));
    $( this ).parent("div").find(".right-product").toggleClass( "right-in" );
    $('body').animate({scrollTop:target.offset().top},300);
  });

  $( ".center" ).click(function() {
    var target = $('.main');
    $( this ).parent("div").find(".center-product").toggleClass( "center-in" );
    $('body').animate({scrollTop:target.offset().top},300);
  });

  // Product Panel close
  $( ".close-product" ).click(function() {
    $( this ).closest(".product").removeClass( "left-in" );
    $( this ).closest(".product").removeClass( "right-in" );
    $( this ).closest(".product").removeClass( "center-in" );
    $( this ).closest(".product").fadeOut("slow");
  });

  // Page close
  $( ".close-page" ).click(function() {
    $( this ).closest(".info-page").removeClass( "left-in" );
    $( this ).closest(".info-page").removeClass( "right-in" );
    $( this ).closest(".info-page").removeClass( "center-in" );
    $( this ).closest(".info-page").fadeOut("slow");
  });


  // This section manages SnipCart Functionality

  var count = Snipcart.api.items.count();
  var cart = Snipcart.api.cart.get();
  var isPinned;

  $('.snipcart-add-item').click(function() {
    $('.cart').css("display", "block");
    var count = Snipcart.api.items.count()+1;
    $('.badge').text(count);
  });

  $(document).click(function() {
     var count = Snipcart.api.items.count();
     if (count!=0) {
      $('.badge').text(count);
      $('.cart').css("display", "block");
      console.log(count);
    }
    else {
        $('.cart').css("display", "none");
    }
  });

});
