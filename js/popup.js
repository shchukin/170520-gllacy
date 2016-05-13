document.addEventListener("DOMContentLoaded", function(event) {

  /* Page lock */

  var $html = document.querySelector('html');

  function measureScrollbarWidth() {
    var scrollMeasureDiv = document.createElement('div');
    scrollMeasureDiv.classList.add('scrollbar-measure');
    document.body.appendChild(scrollMeasureDiv);
    scrollbarWidth = scrollMeasureDiv.offsetWidth - scrollMeasureDiv.clientWidth;
    scrollMeasureDiv.parentNode.removeChild(scrollMeasureDiv);
    return scrollbarWidth;
  }

  function lockPage() {
    $html.classList.add('html-lock');
    $html.style.paddingRight = measureScrollbarWidth() + 'px';
  }

  function unlockPage() {
    $html.classList.remove('html-lock');
    $html.style.paddingRight = 0;
  }


  /* Popup show / hide */

  function popupShow(popup){
    lockPage();
    popup.classList.add('popup_visible');

    /* feedback popup only */
    if ( popup.id === 'feedback' ) {
      var feedbackField = popup.querySelectorAll('#feedback-name, #feedback-email, #feedback-message');

      /* look for first empty field and give it a focus */
      for( var i = 0; i < feedbackField.length; i++ ) {
        if( ! feedbackField[i].value.length ) {
          feedbackField[i].focus();
          break;
        }
      }
    }
  }

  function popupHide(popup) {
    // in case of Esc
    if ( ! popup ) {
      popup = document.querySelector('.popup_visible');
    }
    if ( popup ) {
      popup.classList.remove('popup_visible');
      unlockPage();
    }
  }


  /* show popup by handler click */

  $popupHandler = document.querySelectorAll('[data-popup]');

  [].forEach.call($popupHandler, function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      popupShow( document.querySelector(this.dataset.popup) );
    });
  });


  /* hide popup by close click */

  $popupClose = document.querySelectorAll('.popup .cancel');

  [].forEach.call($popupClose, function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      popupHide( this.parentNode.parentNode );
    });
  });


  /* hide popup by overlay click */

  $popupOverlay = document.querySelectorAll('.popup__overlay');

  [].forEach.call($popupOverlay, function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      popupHide( this.parentNode );
    });
  });


  /* hide popup by Esc press */

  window.addEventListener('keydown', function (event) {
    if ( event.keyCode === 27) {
      popupHide();
    }
  });

});

