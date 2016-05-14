/*
 * Browser
 */

document.addEventListener("DOMContentLoaded", function(event) {

  var $html = document.querySelector('html');

  function getBrowser() {
    if ( (navigator.userAgent.indexOf('WebKit')+1 ) && !(navigator.userAgent.indexOf('Edge')+1) ) {
      $html.classList.add('webkit');
    } else if ( navigator.userAgent.indexOf( 'Edge' ) + 1 ) {
      $html.classList.add('edge');
    } else if ( navigator.userAgent.indexOf( 'Firefox' ) + 1 ) {
      $html.classList.add('firefox');
    }
  }

  getBrowser();

});


/*
 * Input
 */

document.addEventListener("DOMContentLoaded", function(event) {
  var inputElements = document.querySelectorAll('.input__control');
  [].forEach.call(inputElements, function (item) {
    item.addEventListener('input', function () {
      if ( this.value.length ) {
        this.parentNode.classList.add('input_fill');
      } else  {
        this.parentNode.classList.remove('input_fill');
      }
    })
  })
});


/*
 * Feedback
 */

document.addEventListener("DOMContentLoaded", function(event) {

  var popup;

  var feedback = {};
  var feedbackLocal = {};

  popup = document.querySelector('.popup_feedback');

  feedback.form = document.querySelector('#feedback');
  feedback.name = feedback.form.querySelector('#feedback-name');
  feedback.email = feedback.form.querySelector('#feedback-email');
  feedback.message = feedback.form.querySelector('#feedback-message');

  feedbackLocal.name = localStorage.getItem('feedback-name');
  feedbackLocal.email = localStorage.getItem('feedback-email');


  if ( feedbackLocal.name ) {
    feedback.name.value = feedbackLocal.name;
  }
  if ( feedbackLocal.email ) {
    feedback.email.value = feedbackLocal.email;
  }

  feedback.form.addEventListener('submit', function(event) {
    event.preventDefault();

    /* look for empty field and inform user */
    if( !feedback.name.value || !feedback.email.value || !feedback.message.value ) {
      popup.classList.add('popup_error');
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    localStorage.setItem('feedback-name', feedback.name.value);
    localStorage.setItem('feedback-email', feedback.email.value);

    alert('Спасибо! Ваше сообщение отправлено.');

    feedback.form.submit();

  });

});


/*
 * Popup
 */


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




