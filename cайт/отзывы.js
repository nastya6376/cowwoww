document.addEventListener('DOMContentLoaded', function() {
  // Элементы DOM
  const addReviewBtn = document.getElementById('addReviewBtn');
  const addReviewModal = document.getElementById('addReviewModal');
  const closeBtn = document.querySelector('.close');
  const cancelBtn = document.querySelector('.cancel-btn');
  const submitReviewBtn = document.getElementById('submitReviewBtn');
  const reviewsContainer = document.getElementById('reviewsContainer');
  const emptyReviewsMessage = document.getElementById('emptyReviewsMessage');
  const ratingStars = document.querySelectorAll('#ratingStars i');
  const ratingInput = document.getElementById('rating');
  const productSelect = document.getElementById('productSelect');
  const reviewProductSelect = document.getElementById('reviewProduct');
  
  // Текущий пользователь
  const currentUser = {
    id: localStorage.getItem('userId') || 'user_' + Math.random().toString(36).substr(2, 9),
    name: localStorage.getItem('username') || 'Анонимный покупатель'
  };
  
  // Информация о продуктах
  const products = {
    strawberry: { name: 'Клубника', emoji: '🍓', class: 'strawberry' },
    blueberry: { name: 'Черника', emoji: '🫐', class: 'blueberry' },
    raspberry: { name: 'Малина', emoji: '🍇', class: 'raspberry' },
    milk: { name: 'Молоко', emoji: '🥛', class: 'milk' },
    mushrooms: { name: 'Лисички', emoji: '🍄', class: 'mushrooms' }
  };
  
  // Инициализация рейтинга
  ratingStars.forEach(star => {
    star.addEventListener('click', function() {
      const rating = parseInt(this.getAttribute('data-rating'));
      ratingInput.value = rating;
      
      ratingStars.forEach((s, index) => {
        if (index < rating) {
          s.classList.remove('far');
          s.classList.add('fas');
        } else {
          s.classList.remove('fas');
          s.classList.add('far');
        }
      });
    });
  });
  
  // Открытие модального окна
  addReviewBtn.addEventListener('click', () => {
    addReviewModal.style.display = 'block';
  });
  
  // Закрытие модального окна
  function closeModal() {
    addReviewModal.style.display = 'none';
    document.getElementById('reviewProduct').value = '';
    document.getElementById('reviewText').value = '';
    ratingInput.value = '0';
    
    ratingStars.forEach(star => {
      star.classList.remove('fas');
      star.classList.add('far');
    });
  }
  
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  
  // Закрытие при клике вне модального окна
  window.addEventListener('click', (event) => {
    if (event.target === addReviewModal) {
      closeModal();
    }
  });
  
  // Функция для отображения отзывов
  function displayReviews(filter = 'all') {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    let filteredReviews = reviews;
    
    if (filter !== 'all') {
      filteredReviews = reviews.filter(review => review.product === filter);
    }
    
    reviewsContainer.innerHTML = '';
    
    if (filteredReviews.length === 0) {
      emptyReviewsMessage.style.display = 'block';
      return;
    }
    
    emptyReviewsMessage.style.display = 'none';
    
    filteredReviews.forEach(review => {
      const product = products[review.product];
      
      const reviewElement = document.createElement('div');
      reviewElement.className = 'review';
      reviewElement.innerHTML = `
        <div class="review-header">
          <div>
            <span class="review-product-badge ${product.class}">
              ${product.emoji} ${product.name}
            </span>
            <span class="review-author">${review.author}</span>
          </div>
          <div class="review-date">${review.date}</div>
        </div>
        <div class="review-rating">
          ${getRatingStars(review.rating)}
        </div>
        <div class="review-text">${review.text}</div>
        ${review.userId === currentUser.id ? `
        <div class="review-footer">
          <div class="review-actions">
            <button onclick="deleteReview('${review.id}')">
              <i class="fas fa-trash"></i> Удалить
            </button>
          </div>
        </div>
        ` : ''}
      `;
      
      reviewsContainer.appendChild(reviewElement);
    });
  }
  
  // Функция для отображения звезд рейтинга
  function getRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<i class="fas fa-star" style="color: #feca57;"></i>';
      } else {
        stars += '<i class="far fa-star" style="color: #feca57;"></i>';
      }
    }
    return stars;
  }
  
  // Функция для добавления отзыва
  function addReview() {
    const product = document.getElementById('reviewProduct').value;
    const rating = parseInt(ratingInput.value);
    const text = document.getElementById('reviewText').value.trim();
    
    if (!product || !text || rating === 0) {
      alert('Пожалуйста, заполните все поля и поставьте оценку');
      return;
    }
    
    const today = new Date();
    const date = today.toLocaleDateString('ru-RU');
    
    const newReview = {
      id: 'review_' + Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      author: currentUser.name,
      product: product,
      rating: rating,
      date: date,
      text: text
    };
    
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    displayReviews(productSelect.value);
    closeModal();
    showNotification('Ваш отзыв успешно добавлен!', 'success');
  }
  
  // Функция для удаления отзыва
  function deleteReview(reviewId) {
    if (!confirm('Вы уверены, что хотите удалить этот отзыв?')) return;
    
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews = reviews.filter(review => review.id !== reviewId);
    
    localStorage.setItem('reviews', JSON.stringify(reviews));
    displayReviews(productSelect.value);
    
    showNotification('Отзыв успешно удален', 'success');
  }
  
  // Функция для показа уведомлений
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
  
  // Инициализация отзывов
  function initializeReviews() {
    if (!localStorage.getItem('reviews')) {
      const initialReviews = [
        {
          id: 'review_1',
          userId: currentUser.id,
          author: currentUser.name,
          product: 'strawberry',
          rating: 5,
          date: '25.05.2025',
          text: 'Клубника просто восхитительная! Сладкая, сочная, ароматная. Рекомендую всем!'
        },
        {
          id: 'review_2',
          userId: currentUser.id,
          author: currentUser.name,
          product: 'blueberry',
          rating: 4,
          date: '24.05.2025',
          text: 'Черника хорошая, но немного недозрелая. На следующий день стала слаще.'
        },
        {
          id: 'review_3',
          userId: 'user_123',
          author: 'Мария И.',
          product: 'mushrooms',
          rating: 5,
          date: '23.05.2025',
          text: 'Лисички свежие, ароматные. Отлично подошли для грибного супа!'
        },
        {
          id: 'review_4',
          userId: 'user_456',
          author: 'Алексей П.',
          product: 'milk',
          rating: 3,
          date: '22.05.2025',
          text: 'Молоко нормальное, но срок годности был всего 3 дня.'
        },
        {
          id: 'review_5',
          userId: 'user_789',
          author: 'Ольга С.',
          product: 'raspberry',
          rating: 2,
          date: '21.05.2025',
          text: 'Малина была переспелая, много помятых ягод.'
        }
      ];
      localStorage.setItem('reviews', JSON.stringify(initialReviews));
    }
  }
  
  // Обработчики событий
  submitReviewBtn.addEventListener('click', addReview);
  productSelect.addEventListener('change', function() {
    displayReviews(this.value);
  });
  
  // Инициализация при загрузке
  initializeReviews();
  displayReviews();
  
  // Стили для уведомлений
  const notificationStyles = document.createElement('style');
  notificationStyles.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: var(--border-radius);
      color: white;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: var(--box-shadow);
      z-index: 1000;
      opacity: 0;
      transform: translateY(-20px);
      transition: all 0.3s ease;
    }
    .notification.success {
      background-color: #4CAF50;
    }
    .notification.error {
      background-color: #f44336;
    }
    .notification i {
      font-size: 20px;
    }
  `;
  document.head.appendChild(notificationStyles);
});

// Глобальные функции
function deleteReview(reviewId) {
  const event = new Event('DOMContentLoaded');
  document.dispatchEvent(event);
  window.deleteReview(reviewId);
}