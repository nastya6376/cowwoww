// Подписанные авторы
const subscribedAuthors = ["Фермер А", "Фермер В"];

function likePost(button) {
    const countElement = button.nextElementSibling.querySelector('.count');
    let currentCount = parseInt(countElement.textContent);
    countElement.textContent = currentCount + 1; // Увеличиваем счетчик лайков
}

function filterNews() {
    const selectedAuthor = document.getElementById("authorFilter").value;
    const newsList = document.getElementById("newsList");
    
    // Получаем все элементы списка новостей
    const newsItems = Array.from(newsList.querySelectorAll("li"));

    // Сначала очищаем список новостей
    newsList.innerHTML = "";

    // Фильтруем новости по выбранному автору
    newsItems.forEach(item => {
        if (selectedAuthor === "" || item.getAttribute('data-author') === selectedAuthor) {
            newsList.appendChild(item.cloneNode(true)); // Добавляем новость в список
        }
    });
}

function showSubscriptions() {
    const newsList = document.getElementById("newsList");
    
    // Сначала очищаем список новостей
    newsList.innerHTML = "";

    // Фильтруем новости по подписанным авторам
    subscribedAuthors.forEach(author => {
        const newsItems = Array.from(document.querySelectorAll("li[data-author='" + author + "']"));
        newsItems.forEach(item => {
            newsList.appendChild(item.cloneNode(true)); // Добавляем новость в список
        });
    });
}

function showAllNews() {
    const newsList = document.getElementById("newsList");
    
    // Очищаем текущий список новостей
    newsList.innerHTML = "";

    // Восстанавливаем все новости
    const allNewsItems = [
        `<li data-author='Фермер А'>
            <div><strong>Фермер А</strong><br>Мы собираем урожай!</div><div style='display:flex; align-items:center;'><button class='like-button' onclick='likePost(this)'><img src='like-icon.png' alt='Лайк' class='like-icon'></button><span class='like-count'>Лайков: <span class='count'>0</span></span></div></li>`,
        `<li data-author='Фермер Б'>
            <div><strong>Фермер Б</strong><br>Новые сорта помидоров!</div><div style='display:flex; align-items:center;'><button class='like-button' onclick='likePost(this)'><img src='like-icon.png' alt='Лайк' class='like-icon'></button><span class='like-count'>Лайков: <span class='count'>0</span></span></div></li>`,
        `<li data-author='Фермер В'>
            <div><strong>Фермер В</strong><br>Участие в ярмарке в этом месяце!</div><div style='display:flex; align-items:center;'><button class='like-button' onclick='likePost(this)'><img src='like-icon.png' alt='Лайк' class='like-icon'></button><span class='like-count'>Лайков: <span class='count'>0</span></span></div></li>`,
        `<li data-author='Фермер А'>
            <div><strong>Фермер А</strong><br>Запуск нового продукта - органические яйца!</div><div style='display:flex; align-items:center;'><but
ton class='like-button' onclick='likePost(this)'><img src='like-icon.png' alt='Лайк' class='like-icon'></button><span class='like-count'>Лайков: <span class='count'>0</span></span></div></li>`,
        `<li data-author='Фермер Б'>
            <div><strong>Фермер Б</strong><br>Специальные предложения на свежие фрукты!</div><div style='display:flex; align-items:center;'><button class='like-button' onclick='likePost(this)'><img src='like-icon.png' alt='Лайк' class='like-icon'></button><span class='like-count'>Лайков: <span class='count'>0</span></span></div></li>`,
        `<li data-author='Фермер Г'>
            <div><strong>Фермер Г</strong><br>Новые сорта картофеля!</div><div style='display:flex; align-items:center;'><button class='like-button' onclick='likePost(this)'><img src='like-icon.png' alt='Лайк' class='like-icon'></button><span class='like-count'>Лайков: <span class='count'>0</span></span></div></li>`,
        `<li data-author='Фермер Д'>
            <div><strong>Фермер Д</strong><br>Специальные предложения на свежие овощи!</div><div style='display:flex; align-items:center;'><button class='like-button' onclick='likePost(this)'><img src='like-icon.png' alt='Лайк' class='like-icon'></button><span class='like-count'>Лайков: <span class='count'>0</span></span></div></li>`
       ];

       // Восстанавливаем все новости
       allNewsItems.forEach(item => {
           newsList.insertAdjacentHTML('beforeend', item);
       });
   }

// Модальное окно
const modal = document.getElementById("modal");
const btn = document.getElementById("addAdButton");
const span = document.getElementById("closeModal");

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}

// Обработчики событий для кнопок
document.getElementById("showSubscriptionsButton").onclick = showSubscriptions;
document.getElementById("showAllNewsButton").onclick = showAllNews;

// Обработчик события для фильтра авторов
document.getElementById("authorFilter").onchange = filterNews;