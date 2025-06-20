let chatMessages = {
    'Тех Поддержка 1': [
        { text: 'Здравствуйте! Как мы можем помочь?', sender: 'support' },
        { text: 'У меня проблема с подключением.', sender: 'user' },
        { text: 'Пожалуйста, опишите вашу проблему подробнее.', sender: 'support' }
    ],
    'Тех Поддержка 2': [
        { text: 'Добрый день! Чем можем помочь?', sender: 'support' },
        { text: 'Не могу войти в систему.', sender: 'user' },
        { text: 'Попробуйте сбросить пароль.', sender: 'support' }
    ],
    'Фермер 1': [
        { text: 'Привет! Как у вас дела?', sender: 'support' },
        { text: 'Все хорошо, спасибо! Как урожай?', sender: 'user' },
        { text: 'Урожай отличный! Спасибо за вопрос.', sender: 'support' }
    ],
    'Фермер 2': [
        { text: 'Здравствуйте! Как идут дела на поле?', sender: 'support' },
        { text: 'Все отлично, урожай собираем!', sender: 'user' },
        { text: 'Это здорово! Удачи вам!', sender: 'support' }
    ]
};

let currentChatId = '';

function openChat(chatId) {
    const chatModal = document.getElementById('chat-modal');
    const overlay = document.getElementById('overlay');
    const chatContent = document.getElementById('chat-content');

    // Загружаем заголовок чата
    chatContent.innerHTML = `<h2>${chatId}</h2>`;
    
    // Отображаем предыдущие сообщения
    currentChatId = chatId; // Сохраняем текущий чат ID
    chatMessages[chatId].forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = message.sender;
        messageDiv.textContent = message.text;

        chatContent.appendChild(messageDiv);
    });

    // Показываем модальное окно и фон
    chatModal.style.display = 'block';
    overlay.style.display = 'block';
}

function closeChat() {
    const chatModal = document.getElementById('chat-modal');
    const overlay = document.getElementById('overlay');

    // Скрываем модальное окно и фон
    chatModal.style.display = 'none';
    overlay.style.display = 'none';
}

function sendMessage(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    
    if (messageText) {
        // Добавляем сообщение в текущий чат
        chatMessages[currentChatId].push({ sender: 'user', text: messageText });

        // Отображаем сообщение
        const chatContent = document.getElementById('chat-content');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message user`;
        messageDiv.textContent = messageText;

        chatContent.appendChild(messageDiv);
        
        // Очищаем поле ввода
        messageInput.value = '';
        
        // Пример ответа от техподдержки (можно заменить на реальный ответ)
        setTimeout(() => {
            const responseDiv = document.createElement('div');
            responseDiv.className = `message support`;
            responseDiv.textContent = "Спасибо за ваше сообщение!"; // Пример ответа от техподдержки
            
            chatMessages[currentChatId].push({ sender: 'support', text: responseDiv.textContent });
            chatContent.appendChild(responseDiv);
            
            // Прокручиваем вниз, чтобы видеть последнее сообщение
            chatContent.scrollTop = chatContent.scrollHeight;
        }, 1000);
        
        // Прокручиваем вниз, чтобы видеть последнее сообщение
        chatContent.scrollTop = chatContent.scrollHeight;
    }
}

function updateChatDisplay() {
    const chatContent = document.getElementById('chat-content');
    
    // Очищаем текущее содержимое
    chatContent.innerHTML = `<h2>${currentChatId}</h2>`; // Исправлено на обратные кавычки

    // Отображаем все сообщения
    chatMessages[currentChatId].forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = message.sender; // Исправлено здесь
        messageDiv.textContent = message.text;

        chatContent.appendChild(messageDiv);
    });
}
