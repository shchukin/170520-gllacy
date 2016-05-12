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

