// Данные избранных товаров
let favorites = [
    {
        name: 'Черника',
        description: '1 кг.',
        image: 'черника.jpg',
        price: '₽1200'
    },
    {
        name: 'Лисички',
        description: '1 кг.',
        image: 'лисички.jpg',
        price: '₽350'
    },
    {
        name: 'Творог',
        description: '400 гр.',
        image: 'творог.jpg',
        price: '₽200'
    },
    {
        name: 'Клубника',
        description: '1 кг.',
        image: 'клубника.jpg',
        price: '₽1000'
    },
    {
        name: 'Малина',
        description: '1 кг.',
        image: 'малина.jpg',
        price: '₽900'
    },
    {
        name: 'Молоко',
        description: '1 л.',
        image: 'молоко.jpg',
        price: '₽80'
    },
    {
        name: 'Огурцы короткоплодные',
        description: '1 кг.',
        image: 'огурцы.jpg',
        price: '₽210'
    }
];

// Функция для отображения избранных товаров
function displayFavorites() {
    const favoritesContainer = document.getElementById('favoritesContainer');
    const emptyFavoritesMessage = document.getElementById('emptyFavorites');

    favoritesContainer.innerHTML = '';

    if (favorites.length === 0) {
        emptyFavoritesMessage.style.display = 'block';
    } else {
        emptyFavoritesMessage.style.display = 'none';
        favorites.forEach((item, index) => {
            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('favorite-item');

            favoriteItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" onerror="this.src='placeholder.jpg'">
                <div class="item-content">
                    <div class="item-name">${item.name}</div>
                    <div class="item-description">${item.description}</div>
                    <div class="item-footer">
                        <div class="item-price">${item.price}</div>
                        <button class="remove-button" onclick="removeFavorite(${index})">
                            Удалить
                        </button>
                    </div>
                </div>
            `;

            favoritesContainer.appendChild(favoriteItem);
        });
    }
}

// Функция для удаления товара из избранного
function removeFavorite(index) {
    if (confirm('Вы уверены, что хотите удалить этот товар из избранного?')) {
        favorites.splice(index, 1);
        displayFavorites();
    }
}

// При загрузке страницы отображаем избранные товары
window.addEventListener('DOMContentLoaded', displayFavorites);