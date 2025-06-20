document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Получаем данные пользователя из localStorage
        const userDataString = localStorage.getItem('userData');

        if (!userDataString) {
            loginMessage.textContent = 'Пользователь не найден. Пожалуйста, зарегистрируйтесь.';
            loginMessage.style.color = 'red';
            return;
        }

        const userData = JSON.parse(userDataString);
         // Проверяем, что поля email и password существуют в userData
         if (!userData || !userData.email || !userData.password) {
            loginMessage.textContent = 'Некорректные данные пользователя.';
            loginMessage.style.color = 'red';
            return;
        }

        // Проверяем соответствие email и пароля
        if (email === userData.email && password === userData.password) {
            loginMessage.textContent = 'Вход выполнен успешно!';
            loginMessage.style.color = 'green';

            // Перенаправляем в личный кабинет (или на другую страницу)
            window.location.href = 'личныйкабинет.html'; // Замените на нужный URL
        } else {
            loginMessage.textContent = 'Неверный email или пароль.';
            loginMessage.style.color = 'red';
        }
    });
});