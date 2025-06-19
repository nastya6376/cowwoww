document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');
    const registerButton = document.getElementById('registerButton');

    const registerBirthday = document.getElementById('registerBirthday');
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Форматирование даты
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    const maxDate = year + '-' + month + '-' + day;
    registerBirthday.setAttribute("max", maxDate);

    // Функции для работы с ошибками
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message');
        
        if (!errorMessage) {
            const errorElement = document.createElement('small');
            errorElement.className = 'error-message';
            errorElement.style.color = 'red';
            errorElement.textContent = message;
            formControl.appendChild(errorElement);
        } else {
            errorMessage.textContent = message;
        }
        
        input.classList.remove('valid');
        input.classList.add('error');
    }

    function showSuccess(input) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message');
        
        if (errorMessage) {
            errorMessage.remove();
        }
        
        input.classList.remove('error');
        input.classList.add('valid');
    }

    function clearValidation(input) {
        input.classList.remove('error', 'valid');
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Валидация полей
    function validateField(input, validationFn) {
        const value = input.value.trim();
        if (!value) {
            
            return false;
        }
        
        if (validationFn && !validationFn(value)) {
            return false;
        }
        
        showSuccess(input);
        return true;
    }

    // Специфические проверки
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) {
            
            return false;
        }
        return true;
    }

    function validatePhone(phone) {
        const re = /^\+7\d{10}$/;
        if (!re.test(phone)) {
            
            return false;
        }
        return true;
    }

    function validatePassword(password) {
        if (password.length < 8) {
            
            return false;
        }
        return true;
    }

    function validatePasswordMatch() {
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (password !== confirmPassword) {
            
            return false;
        }
        return true;
    }

    // Основная валидация формы
    function validateForm() {
        let isValid = true;

        // Проверка всех полей
        if (!validateField(document.getElementById('registerName'))) isValid = false;
        if (!validateField(document.getElementById('registerNickname'))) isValid = false;
        if (!validateField(document.getElementById('registerEmail'), validateEmail)) isValid = false;
        if (!validateField(document.getElementById('registerBirthday'))) isValid = false;
        if (!validateField(document.getElementById('registerPhone'), validatePhone)) isValid = false;
        if (!validateField(document.getElementById('registerPassword'), validatePassword)) isValid = false;
        if (!validateField(document.getElementById('registerConfirmPassword'))) isValid = false;
        if (!validatePasswordMatch()) isValid = false;
        
        // Проверка выпадающего списка
        const district = document.getElementById('registerDistrict');
        if (!district.value) {
            
            isValid = false;
        } else {
            showSuccess(district);
        }

        // Проверка радиокнопок
        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            const genderTitle = document.querySelector('.gender-title');
            const errorElement = document.createElement('small');
            errorElement.className = 'error-message';
            errorElement.style.color = 'red';
            
            genderTitle.parentElement.appendChild(errorElement);
            isValid = false;
        } else {
            const errorMessage = document.querySelector('.gender-title + .error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }

        return isValid;
    }

    // Обработчики событий
    const inputs = registerForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (input.name === 'registerPassword' || input.name === 'registerConfirmPassword') {
                validatePasswordMatch();
            }
            
            if (input.value.trim()) {
                if (input.name === 'registerEmail') validateEmail(input.value);
                else if (input.name === 'registerPhone') validatePhone(input.value);
                else if (input.name === 'registerPassword') validatePassword(input.value);
                else showSuccess(input);
            } else {
                clearValidation(input);
            }
        });

        input.addEventListener('change', function() {
            if (input.name === 'gender') {
                const errorMessage = document.querySelector('.gender-title + .error-message');
                if (errorMessage) errorMessage.remove();
            }
        });
    });

    // Отправка формы
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        registerMessage.textContent = '';
        registerMessage.style.color = '';

        if (!validateForm()) {
            registerMessage.textContent = 'Пожалуйста, исправьте ошибки в форме.';
            registerMessage.style.color = 'red';
            return;
        }

        // Сбор данных
        const userData = {
            name: document.getElementById('registerName').value,
            nickname: document.getElementById('registerNickname').value,
            email: document.getElementById('registerEmail').value,
            birthday: document.getElementById('registerBirthday').value,
            phone: document.getElementById('registerPhone').value,
            district: document.getElementById('registerDistrict').value,
            gender: document.querySelector('input[name="gender"]:checked').value
        };

        // Сохранение и перенаправление
        localStorage.setItem('userData', JSON.stringify(userData));
        registerMessage.textContent = 'Регистрация успешна! Перенаправляем...';
        registerMessage.style.color = 'green';

        setTimeout(() => {
            window.location.href = 'личныйкабинет.html';
        }, 2000);
    });
});