$(function() {
  visitorFound = false;

  $form = $('#rsvp-form');
  $error = $('#error');
  $submit = $('#submit');
  $form.find('select').val('');

  $('.reset-form').on('click', function() {
    visitorFound = false;
    $('#success').addClass('hidden');
    $('#regrets').addClass('hidden');
    enableStep1();
    $form.find('input[type=text], select').val('');
    $form.find('input[type=radio]').prop('checked', false);
    $form.find('input').prop('readonly', false);
    $form.find('select').prop('disabled', true);
    $form.find('.step-2').addClass('hidden');
    $form.find('.step-3').addClass('hidden');
    $submit.removeClass("hidden").attr('value', 'Find My Invitation');
    $form.removeClass('hidden');
    clearErrors();
  });

  $('input[name="rsvp[attendance]"]').on('change', function() {
    $submit.removeClass("hidden");
    if($(this).val() == "Attending") {
      $form.find('.step-3').removeClass('hidden');
    } else {
      $form.find('.step-3').addClass('hidden');
    }
  });

  $form.on('submit', function(e) {
    e.preventDefault();
    hideErrorMessage();
    formData = $form.serialize();
    disableStep1();

    clearErrors();

    if(!visitorFound) {
      $.get('http://rsvp.thegriggitts.com:4567', formData, function(data) {
        if(data == true) {
          $form.find('.step-1 input').prop('readonly', true);
          $form.find('select').prop('disabled', false);
          $form.find('.step-2').removeClass('hidden');
          $submit.addClass("hidden").attr('value', 'Send My RSVP');
          visitorFound = true;
        } else {
          errorMessage = "We can't find your name on our list! Please check your spelling, and try again.  If you feel there's an error, please email us:<br>"
          showErrorMessage(errorMessage);
        }
      }).always(function() {
        enableStep1();
      });
    } else {
      var notAttending = $('input[name="rsvp[attendance]"]:checked').val() == "Sorry";
      if(notAttending || validateForm() == true) {
      $.post('http://rsvp.thegriggitts.com:4567', formData, function(data) {
        if(data == true) {
          if($('#rsvp_attendance_yes').prop('checked')) {
            showSuccessMessage();
          } else {
            showRegretsMessage();
          }
        } else {
          errorMessage = "There was an error. Please let Clayton know: "
          showErrorMessage(errorMessage);
        }
      }).always(function() {
        enableStep1();
      });
      }
    }

    return false;
  });

  function disableStep1() {
    $form.find('.step-1 input').each(function() {
      $(this).prop('disabled', true);
    });
  }

  function enableStep1() {
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

  function showRegretsMessage() {
    hideErrorMessage();
    $form.addClass('hidden');
    $('#regrets').removeClass('hidden');
  }

  function clearErrors() {
    $('.error-message').remove();
    $('.has-error').removeClass('has-error');
  }

  function validateForm() {
    valid = true;
    errorCode = '<div class="error-message">Please provide a response.</div>';

    ['first_name', 'last_name', 'email', 'meal_choice'].forEach(function(inputName) {
      $input = $("[name='rsvp[" + inputName + "]']");

      if($input.val() == "" || $input.val() == undefined) {
        $input.addClass('has-error').after(errorCode);
        valid = false;
      }
    });

    return valid;
  }
});