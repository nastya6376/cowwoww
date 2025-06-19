document.getElementById('logoutBtn').addEventListener('click', function() {
    alert('Вы вышли из аккаунта!');
});

document.getElementById('editProfileBtn').addEventListener('click', function() {
    const userName = prompt('Введите новое имя:', document.getElementById('userName').innerText);
    const userEmail = prompt('Введите новый email:', document.getElementById('userEmail').innerText);

    if (username) {
        document.getElementById('username').innerText = username;
    }
    
    if (email) {
        document.getElementById('email').innerText = email;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Получаем данные из localStorage
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
        // Если данные есть в localStorage
        const userData = JSON.parse(userDataString);

        // Вставляем данные в соответствующие элементы на странице
        document.getElementById('userName').textContent = userData.name;
        document.getElementById('userNickname').textContent = userData.nickname;
        document.getElementById('userEmail').textContent = userData.email;
        document.getElementById('userBirthday').textContent = userData.birthday;
        document.getElementById('userPhone').textContent = userData.phone;
        document.getElementById('userDistrict').textContent = userData.district;
        document.getElementById('userGender').textContent = userData.gender;
    } else {
        // Если данных нет в localStorage
        alert('Данные пользователя не найдены. Пожалуйста, зарегистрируйтесь.');
        window.location.href = 'anketa.html'; // Перенаправляем на страницу регистрации
    }
});

// Обработчики для кнопок (заглушки)
document.getElementById('myReviewsBtn').addEventListener('click', () => {
    alert('Переход на страницу "Мои отзывы"');
    window.location.href = 'отзывы.html';
});

document.getElementById('favoritesBtn').addEventListener('click', () => {
    alert('Переход на страницу "Избранное"');
    window.location.href = 'избранное.html';
});

document.getElementById('myOrdersBtn').addEventListener('click', () => {
    alert('Переход на страницу "Мои заказы"');
    window.location.href = 'заказы.html';
});

// Пример обработчика для кнопки "Выйти"
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('username');
  localStorage.removeItem('email');
    alert('Вы вышли из аккаунта');
    window.location.href = 'anketa.html'; //  Перенаправление на главную страницу
});
