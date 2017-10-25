// Zoom Image

  var zoomAreaEl = document.querySelector('.zoom-area');
  var zoomWrapperEl = document.querySelector('.zoom-wrapper');
  var imageEl = zoomAreaEl.querySelector('.image');
  var imageRect = imageEl.getBoundingClientRect();
  var imageWidth = 2950;
  var imageScale = window.innerWidth / (imageWidth);
  zoomAreaEl.classList.add('active');
  var zoomAnimation = anime({
    targets: imageEl,
    scale: [2, imageScale],
    translateY: [-305, 90],
    translateX: [35, 0],
    translateZ: [0, 10],
    easing: 'linear',
    duration: 1000,
    autoplay: false
  });

  var zoomRect = zoomAreaEl.getBoundingClientRect();
  var zoomTop = zoomRect.top;

  function zoomImage() {
    var scrollZone = zoomRect.height + zoomTop - window.innerHeight ;
    var zoomAmount = (1 - scrollZone / (zoomRect.height - window.innerHeight )) * 100;
    if (zoomTop <= 0) {
      if (scrollZone > 0 && !zoomWrapperEl.classList.contains('fixed')) {
        zoomWrapperEl.classList.add('fixed');
        zoomWrapperEl.classList.remove('bottom');
      }
      if (scrollZone <= 0 && !zoomWrapperEl.classList.contains('bottom')) {
        zoomWrapperEl.classList.add('bottom');
        zoomWrapperEl.classList.remove('fixed');
        zoomAmount = 100;
      }
    } else {
      zoomAmount = 0;
      if (zoomWrapperEl.classList.contains('fixed')) zoomWrapperEl.classList.remove('fixed');
      if (zoomWrapperEl.classList.contains('bottom')) zoomWrapperEl.classList.remove('bottom');
    }
    zoomAnimation.seek(zoomAmount);
    // console.log(scrollZone, zoomAmount, zoomRect.height, zoomRect.top);
  }

  if (navigator.userAgent.match(/iPad/i) == null) {
    anime({
      update: function(){
        zoomImage();
      },
      duration: Infinity
    });
  }

  var scrollEvents = function() {
    helpers.lazyLoadMedia('.slot-lazy');
    trackEvents();
    zoomRect = zoomAreaEl.getBoundingClientRect()
    zoomTop = zoomRect.top
  }

  var initrizo = function() {
    if (slotIsLoaded) return;
    if (navigator.userAgent.match(/iPad/i) != null) { $wrapper.addClass('isiPad'); };
    if (helpers.isIE()) $wrapper.addClass('isIE isIE'+helpers.isIE());
    if (helpers.isTouch()) $wrapper.addClass('touch');
    helpers.lazyLoadMedia('.slot-lazy');
    $(window).on('scroll', scrollEvents);
    scrollEvents();
    slotIsLoaded = 1;
  }

  initrizo();
