// Bản sao theo tài liệu cô: var, function, if/for, mảng và DOM/jQuery.
// Giữ tên hàm, cấu trúc trang và dữ liệu để đối chiếu bản nhóm nộp.
(function () {
  "use strict";

  /* =====================================================
     LOCAL STORAGE KEYS
     ===================================================== */
  var USERS_KEY = 'users';
  var CURRENT_USER_KEY = 'currentUser';

  /* =====================================================
     REGEX
     ===================================================== */

  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
  var NAME_REGEX = /^[\p{L}\s]{2,80}$/u;
  var PASSWORD_REGEX = /^.{6,}$/;

  /* =====================================================
     LOCAL STORAGE
     ===================================================== */

  function getUsers() {
    try {
      var data = localStorage.getItem(USERS_KEY);
      if (!data) {
        return [];
      }
      var users = JSON.parse(data);
      if (!Array.isArray(users)) {
        return [];
      }
      return users;
    } catch (error) {
      console.warn('Không thể đọc users từ LocalStorage.', error);
      return [];
    }
  }
  function saveUsers(users) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Không thể lưu users.', error);
      return false;
    }
  }
  function saveCurrentUser(user, remember) {
    try {
      var currentUser = JSON.stringify({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone
      });
      var storage = remember ? localStorage : sessionStorage;
      var otherStorage = remember ? sessionStorage : localStorage;
      storage.setItem(CURRENT_USER_KEY, currentUser);
      otherStorage.removeItem(CURRENT_USER_KEY);
      localStorage.removeItem('rememberLogin');
      return true;
    } catch (error) {
      console.error('Không thể lưu currentUser.', error);
      return false;
    }
  }

  /* =====================================================
     HELPER
     ===================================================== */

  function normalizeText(value) {
    return String(value || '').trim();
  }
  function normalizeEmail(value) {
    return normalizeText(value).toLowerCase();
  }
  function normalizePhone(value) {
    return normalizeText(value).replace(/\s+/g, '');
  }
  function isEmail(value) {
    return EMAIL_REGEX.test(value);
  }
  function isPhone(value) {
    return PHONE_REGEX.test(value);
  }
  function isValidAccount(value) {
    return isEmail(value) || isPhone(value);
  }

  /* =====================================================
     MESSAGE
     ===================================================== */

  function showMessage(element, message, type) {
    if (!element) {
      return;
    }
    element.textContent = message;
    element.className = 'account-message show ' + type;
  }
  function hideMessage(element) {
    if (!element) {
      return;
    }
    element.textContent = '';
    element.className = 'account-message';
  }

  /* =====================================================
     FIELD ERROR
     ===================================================== */

  function setFieldError(input, errorElement, message) {
    if (input) {
      input.classList.add('input-error');
      input.classList.remove('input-success');
    }
    if (errorElement) {
      errorElement.textContent = message;
    }
  }
  function clearFieldError(input, errorElement) {
    if (input) {
      input.classList.remove('input-error');
    }
    if (errorElement) {
      errorElement.textContent = '';
    }
  }
  function setFieldSuccess(input) {
    if (!input) {
      return;
    }
    input.classList.remove('input-error');
    input.classList.add('input-success');
  }

  /* =====================================================
     PASSWORD VISIBILITY
     ===================================================== */

  function setupPasswordToggles() {
    var buttons = document.querySelectorAll('.password-toggle');
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var targetId = button.dataset.target;
        var input = document.getElementById(targetId);
        if (!input) {
          return;
        }
        if (input.type === 'password') {
          input.type = 'text';
          button.textContent = 'Ẩn';
          button.setAttribute('aria-label', 'Ẩn mật khẩu');
        } else {
          input.type = 'password';
          button.textContent = 'Hiện';
          button.setAttribute('aria-label', 'Hiện mật khẩu');
        }
      });
    });
  }

  /* =====================================================
     LOGIN
     ===================================================== */

  function setupLogin() {
    var form = document.getElementById('loginForm');
    if (!form) {
      return;
    }
    var accountInput = document.getElementById('loginAccount');
    var passwordInput = document.getElementById('loginPassword');
    var rememberInput = document.getElementById('rememberLogin');
    var accountError = document.getElementById('loginAccountError');
    var passwordError = document.getElementById('loginPasswordError');
    var message = document.getElementById('loginMessage');
    var forgotButton = document.getElementById('forgotPasswordBtn');

    /* ---------------------------------------------
       SUBMIT
       --------------------------------------------- */

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      hideMessage(message);
      clearFieldError(accountInput, accountError);
      clearFieldError(passwordInput, passwordError);
      var account = normalizeText(accountInput.value);
      var password = passwordInput.value;
      var valid = true;

      /* Account */

      if (!account) {
        setFieldError(accountInput, accountError, 'Vui lòng nhập email hoặc số điện thoại.');
        valid = false;
      } else if (!isValidAccount(account)) {
        setFieldError(accountInput, accountError, 'Email hoặc số điện thoại không hợp lệ.');
        valid = false;
      }

      /* Password */

      if (!password) {
        setFieldError(passwordInput, passwordError, 'Vui lòng nhập mật khẩu.');
        valid = false;
      }
      if (!valid) {
        return;
      }

      /* -------------------------------------
         FIND USER
         ------------------------------------- */

      var users = getUsers();
      var normalizedAccount = isEmail(account) ? normalizeEmail(account) : normalizePhone(account);
      var user = null;
      // Duyệt mảng tài khoản và dừng khi tìm được email/SĐT, mật khẩu khớp.
      for (var i = 0; i < users.length; i++) {
        var item = users[i];
        if (!item) continue;
        var userEmail = normalizeEmail(item.email);
        var userPhone = normalizePhone(item.phone);
        if ((userEmail === normalizedAccount || userPhone === normalizedAccount) && item.password === password) {
          user = item;
          break;
        }
      }

      /* -------------------------------------
         LOGIN FAILED
         ------------------------------------- */

      if (!user) {
        showMessage(message, 'Email/số điện thoại hoặc mật khẩu không chính xác.', 'error');
        passwordInput.classList.add('input-error');
        return;
      }

      /* -------------------------------------
         LOGIN SUCCESS
         ------------------------------------- */

      var currentUserSaved = saveCurrentUser(user, Boolean(rememberInput && rememberInput.checked));
      if (!currentUserSaved) {
        showMessage(message, 'Không thể lưu trạng thái đăng nhập. Vui lòng thử lại.', 'error');
        return;
      }
      showMessage(message, 'Đăng nhập thành công! Đang chuyển đến trang chủ...', 'success');

      /*
       * Chuyển về trang chủ
       */
      setTimeout(function () {
        window.location.href = 'index.html';
      }, 700);
    });

    /* ---------------------------------------------
       FORGOT PASSWORD
       --------------------------------------------- */

    if (forgotButton) {
      forgotButton.addEventListener('click', function () {
        showMessage(message, 'Tính năng quên mật khẩu đang được mô phỏng và chưa kết nối hệ thống email/OTP.', 'info');
      });
    }

    /* ---------------------------------------------
       REAL-TIME CLEAR ERROR
       --------------------------------------------- */

    accountInput.addEventListener('input', function () {
      clearFieldError(accountInput, accountError);
    });
    passwordInput.addEventListener('input', function () {
      clearFieldError(passwordInput, passwordError);
    });
  }

  /* =====================================================
     REGISTER
     ===================================================== */

  function setupRegister() {
    var form = document.getElementById('registerForm');
    if (!form) {
      return;
    }
    var fullNameInput = document.getElementById('registerFullName');
    var emailInput = document.getElementById('registerEmail');
    var phoneInput = document.getElementById('registerPhone');
    var passwordInput = document.getElementById('registerPassword');
    var confirmPasswordInput = document.getElementById('registerConfirmPassword');
    var termsInput = document.getElementById('agreeTerms');
    var fullNameError = document.getElementById('registerFullNameError');
    var emailError = document.getElementById('registerEmailError');
    var phoneError = document.getElementById('registerPhoneError');
    var passwordError = document.getElementById('registerPasswordError');
    var confirmPasswordError = document.getElementById('registerConfirmPasswordError');
    var termsError = document.getElementById('termsError');
    var message = document.getElementById('registerMessage');
    var strength = document.getElementById('passwordStrength');

    /* ---------------------------------------------
       PASSWORD STRENGTH
       --------------------------------------------- */

    passwordInput.addEventListener('input', function () {
      updatePasswordStrength(passwordInput.value, strength);
    });

    /* ---------------------------------------------
       SUBMIT
       --------------------------------------------- */

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      hideMessage(message);
      clearFieldError(fullNameInput, fullNameError);
      clearFieldError(emailInput, emailError);
      clearFieldError(phoneInput, phoneError);
      clearFieldError(passwordInput, passwordError);
      clearFieldError(confirmPasswordInput, confirmPasswordError);
      if (termsError) {
        termsError.textContent = '';
      }
      var fullName = normalizeText(fullNameInput.value);
      var email = normalizeEmail(emailInput.value);
      var phone = normalizePhone(phoneInput.value);
      var password = passwordInput.value;
      var confirmPassword = confirmPasswordInput.value;
      var valid = true;

      /* -------------------------------------
         FULL NAME
         ------------------------------------- */

      if (!fullName) {
        setFieldError(fullNameInput, fullNameError, 'Vui lòng nhập họ và tên.');
        valid = false;
      } else if (!NAME_REGEX.test(fullName)) {
        setFieldError(fullNameInput, fullNameError, 'Họ tên chỉ được chứa chữ cái và khoảng trắng.');
        valid = false;
      } else {
        setFieldSuccess(fullNameInput);
      }

      /* -------------------------------------
         EMAIL
         ------------------------------------- */

      if (!email) {
        setFieldError(emailInput, emailError, 'Vui lòng nhập email.');
        valid = false;
      } else if (!isEmail(email)) {
        setFieldError(emailInput, emailError, 'Email không đúng định dạng.');
        valid = false;
      } else {
        setFieldSuccess(emailInput);
      }

      /* -------------------------------------
         PHONE
         ------------------------------------- */

      if (!phone) {
        setFieldError(phoneInput, phoneError, 'Vui lòng nhập số điện thoại.');
        valid = false;
      } else if (!isPhone(phone)) {
        setFieldError(phoneInput, phoneError, 'Số điện thoại không hợp lệ.');
        valid = false;
      } else {
        setFieldSuccess(phoneInput);
      }

      /* -------------------------------------
         PASSWORD
         ------------------------------------- */

      if (!password) {
        setFieldError(passwordInput, passwordError, 'Vui lòng nhập mật khẩu.');
        valid = false;
      } else if (!PASSWORD_REGEX.test(password)) {
        setFieldError(passwordInput, passwordError, 'Mật khẩu phải có ít nhất 6 ký tự.');
        valid = false;
      } else {
        setFieldSuccess(passwordInput);
      }

      /* -------------------------------------
         CONFIRM PASSWORD
         ------------------------------------- */

      if (!confirmPassword) {
        setFieldError(confirmPasswordInput, confirmPasswordError, 'Vui lòng xác nhận mật khẩu.');
        valid = false;
      } else if (confirmPassword !== password) {
        setFieldError(confirmPasswordInput, confirmPasswordError, 'Mật khẩu xác nhận không khớp.');
        valid = false;
      } else {
        setFieldSuccess(confirmPasswordInput);
      }

      /* -------------------------------------
         TERMS
         ------------------------------------- */

      if (!termsInput.checked) {
        if (termsError) {
          termsError.textContent = 'Bạn cần đồng ý với điều khoản sử dụng.';
        }
        valid = false;
      }
      if (!valid) {
        return;
      }

      /* -------------------------------------
         GET USERS
         ------------------------------------- */

      var users = getUsers();

      /* -------------------------------------
         DUPLICATE EMAIL
         ------------------------------------- */

      var emailExists = false;
      for (var i = 0; i < users.length; i++) {
        if (users[i] && normalizeEmail(users[i].email) === email) {
          emailExists = true;
          break;
        }
      }
      if (emailExists) {
        setFieldError(emailInput, emailError, 'Email này đã được đăng ký.');
        showMessage(message, 'Email đã tồn tại. Vui lòng sử dụng email khác.', 'error');
        return;
      }

      /* -------------------------------------
         DUPLICATE PHONE
         ------------------------------------- */

      var phoneExists = false;
      for (var j = 0; j < users.length; j++) {
        if (users[j] && normalizePhone(users[j].phone) === phone) {
          phoneExists = true;
          break;
        }
      }
      if (phoneExists) {
        setFieldError(phoneInput, phoneError, 'Số điện thoại này đã được đăng ký.');
        showMessage(message, 'Số điện thoại đã tồn tại. Vui lòng sử dụng số khác.', 'error');
        return;
      }

      /* -------------------------------------
         CREATE USER
         ------------------------------------- */

      var newUser = {
        fullName: fullName,
        email: email,
        phone: phone,
        password: password
      };
      users.push(newUser);

      /* -------------------------------------
         SAVE
         ------------------------------------- */

      var saved = saveUsers(users);
      if (!saved) {
        showMessage(message, 'Không thể lưu tài khoản. Vui lòng kiểm tra LocalStorage và thử lại.', 'error');
        return;
      }

      /* -------------------------------------
         SUCCESS
         ------------------------------------- */

      showMessage(message, 'Đăng ký tài khoản thành công! Đang chuyển đến trang đăng nhập...', 'success');

      /*
       * Không tự động lưu currentUser ở đây.
       *
       * Người dùng cần đăng nhập bằng tài khoản
       * vừa tạo để currentUser được tạo.
       */

      setTimeout(function () {
        window.location.href = 'login.html';
      }, 900);
    });
    fullNameInput.addEventListener('input', function () {
      clearFieldError(fullNameInput, fullNameError);
    });
    emailInput.addEventListener('input', function () {
      clearFieldError(emailInput, emailError);
    });
    phoneInput.addEventListener('input', function () {
      clearFieldError(phoneInput, phoneError);
    });
    passwordInput.addEventListener('input', function () {
      clearFieldError(passwordInput, passwordError);
    });
    confirmPasswordInput.addEventListener('input', function () {
      clearFieldError(confirmPasswordInput, confirmPasswordError);
    });
    var termsLink = document.getElementById('termsLink');
    if (termsLink) {
      termsLink.addEventListener('click', function (event) {
        event.preventDefault();
        showMessage(message, 'Điều khoản sử dụng đang được mô phỏng trong phạm vi bài tập.', 'info');
      });
    }
  }
  function updatePasswordStrength(password, strengthElement) {
    if (!strengthElement) {
      return;
    }
    strengthElement.className = 'password-strength';
    if (!password) {
      return;
    }
    var score = 0;

    /* Độ dài */

    if (password.length >= 6) {
      score++;
    }
    if (password.length >= 10) {
      score++;
    }

    /* Chữ thường + chữ hoa */

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      score++;
    }

    /* Số */

    if (/[0-9]/.test(password)) {
      score++;
    }

    /* Ký tự đặc biệt */

    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
    }
    if (score <= 2) {
      strengthElement.classList.add('weak');
    } else if (score <= 4) {
      strengthElement.classList.add('medium');
    } else {
      strengthElement.classList.add('strong');
    }
  }
  document.addEventListener('DOMContentLoaded', function () {
    setupPasswordToggles();
    setupLogin();
    setupRegister();
  });
})();
