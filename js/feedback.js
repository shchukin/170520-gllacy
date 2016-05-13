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
