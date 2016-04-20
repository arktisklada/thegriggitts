$(function() {
  visitorFound = false;

  $form = $('#rsvp-form');
  $error = $('#error');

  $('.reset-form').on('click', function() {
    $('#success').addClass('hidden');
    enableForm();
    $form.find('input, select').val('');
    $form.find('select').prop('disabled', true);
    $form.find('.step-2').addClass('hidden');
    $('#submit').attr('value', 'Find My Invitation');
    $form.removeClass('hidden');
  });

  $form.on('submit', function(e) {
    e.preventDefault();
    hideErrorMessage();
    formData = $form.serialize();
    disableForm();

    if(!visitorFound) {
      $.get('http://localhost:4567', formData, function(data) {
        if(data == true) {
          $form.find('select').prop('disabled', false);
          $form.find('.step-2').removeClass('hidden');
          $('#submit').attr('value', 'Send My RSVP');
          visitorFound = true;
        } else {
          errorMessage = "We can't find your name on our list! Please check your spelling, and try again.  If you feel there's an error, please email us:<br>"
          showErrorMessage(errorMessage);
        }
      }).always(function() {
        enableForm();
      });
    } else {
      $.post('http://localhost:4567', formData, function(data) {
        if(data == true) {
          showSuccessMessage();
        } else {
          errorMessage = "There was an error. Please let Clayton know: "
          showErrorMessage(errorMessage);
        }
      }).always(function() {
        enableForm();
      });
    }
  });

  function disableForm() {
    $form.find('.step-1 input').each(function() {
      $(this).prop('disabled', true);
    });
  }

  function enableForm() {
    $form.find('.step-1 input').each(function() {
      $(this).prop('disabled', false);
    });
  }

  function showErrorMessage(message) {
    $error.html(message).removeClass('hidden');
  }

  function hideErrorMessage() {
    $error.addClass('hidden');
  }

  function showSuccessMessage() {
    hideErrorMessage();
    $form.addClass('hidden');
    $('#success').removeClass('hidden');
  }
});