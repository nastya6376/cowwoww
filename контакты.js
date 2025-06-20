document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Создаем объект FormData
            const formData = new FormData(contactForm);
            
            // В реальном приложении здесь будет fetch-запрос к серверу
            console.log('Данные формы:', Object.fromEntries(formData));
            
            // Показываем уведомление об успешной отправке
            showNotification('Сообщение успешно отправлено!', 'success');
            
            // Очищаем форму
            contactForm.reset();
        });
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
        
        // Анимация появления
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Автоматическое скрытие через 5 секунд
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
});

// Добавляем стили для уведомлений
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