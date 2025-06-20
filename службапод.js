// Обновленный скрипт для современного аккордеона
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = question.classList.contains('active');
        
        // Закрываем все открытые ответы
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('show');
        });
        
        // Открываем текущий, если он был закрыт
        if (!isOpen) {
            question.classList.add('active');
            answer.classList.add('show');
        }
    });
});