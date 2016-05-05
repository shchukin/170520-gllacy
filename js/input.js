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
