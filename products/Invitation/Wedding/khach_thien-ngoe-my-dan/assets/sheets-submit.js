(function () {
  var SHEET_ID = 'khach_16';

  function setButtonText(text) {
    var label = document.querySelector('#BUTTON_TEXT4 .ladi-headline');
    if (label) label.textContent = text;
  }

  function showThankYouPopup() {
    var popup = document.getElementById('POPUP4');
    if (popup) {
      popup.style.display = 'block';
      popup.classList.remove('hide-visibility');
    }
    if (window.ladi && typeof window.ladi.showPopup === 'function') {
      try {
        window.ladi.showPopup('POPUP4');
      } catch (err) {}
    }
  }

  function initSheetSubmit() {
    var form = document.querySelector('#FORM2 form');
    var button = document.getElementById('BUTTON4');
    if (!form || !button || typeof sheetsAPI === 'undefined') return;

    var submitting = false;

    function submitToSheet(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      }
      if (submitting) return false;

      var nameField = form.querySelector('[name="name"]');
      var messageField = form.querySelector('[name="message"]');
      var attendanceField = form.querySelector('[name="form_item7"]');
      var name = nameField ? nameField.value.trim() : '';
      var message = messageField ? messageField.value.trim() : '';
      var attendance = attendanceField ? attendanceField.value.trim() : '';

      if (!name) {
        alert('Vui lòng nhập tên của quý khách.');
        return false;
      }

      submitting = true;
      button.style.pointerEvents = 'none';
      setButtonText('Đang gửi...');

      var now = new Date();
      var time = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN');

      sheetsAPI.post(SHEET_ID, {
        A: name,
        B: '',
        C: attendance,
        D: message,
        E: time
      }).then(function () {
        setButtonText('Đã gửi!');
        showThankYouPopup();
        form.reset();
        setTimeout(function () {
          submitting = false;
          button.style.pointerEvents = '';
          setButtonText('Gửi ngay');
        }, 3000);
      }).catch(function () {
        submitting = false;
        button.style.pointerEvents = '';
        setButtonText('Gửi ngay');
        alert('Gửi thất bại, vui lòng thử lại!');
      });

      return false;
    }

    form.addEventListener('submit', submitToSheet, true);
    button.addEventListener('click', submitToSheet, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSheetSubmit);
  } else {
    initSheetSubmit();
  }
})();
