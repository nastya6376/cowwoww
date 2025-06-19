document.addEventListener('DOMContentLoaded', function() {
    const orderItems = document.querySelectorAll('.order-item');
    const modal = document.getElementById('orderModal');
    const modalOrderId = document.getElementById('modal-order-id');
    const orderDetailsTableBody = document.querySelector('#order-details-table tbody');
    const closeBtn = document.querySelector('.close');

    // Обработчики событий
    orderItems.forEach(item => {
        const button = item.querySelector('.view-order-button');
        
        button.addEventListener('click', function() {
            const orderId = item.dataset.orderId;
            const orderDetails = JSON.parse(item.dataset.orderDetails);
            
            if (orderDetails && orderDetails.length > 0) {
                const total = showOrderDetails(orderId, orderDetails);
                updateOrderAmount(item, total);
            } else {
                alert('Нет данных о заказе');
            }
        });
    });

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => e.target === modal && closeModal());

function showOrderDetails(orderId, items) {
    modalOrderId.textContent = orderId;
    orderDetailsTableBody.innerHTML = '';
    
    let total = 0;
    
    items.forEach(item => {
        const sum = item.quantity * item.price;
        total += sum;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toLocaleString()} ₽</td>
            <td>${sum.toLocaleString()} ₽</td>
        `;
        orderDetailsTableBody.appendChild(row);
    });
    
    const totalRow = document.createElement('tr');
    totalRow.className = 'total-row';
    totalRow.innerHTML = `
        <td colspan="3" style="text-align: right;">Итого:</td>
        <td style="font-weight: bold;">${total.toLocaleString()} ₽</td>
    `;
    orderDetailsTableBody.appendChild(totalRow);
    
    modal.style.display = 'block';
    return total;
}

    // Обновляем сумму в списке заказов
    function updateOrderAmount(item, total) {
        item.querySelector('.order-amount').textContent = `${total.toLocaleString()} ₽`;
    }

    // Закрываем модальное окно
    function closeModal() {
        modal.style.display = 'none';
    }

    // Автоматически рассчитываем суммы при загрузке страницы
    orderItems.forEach(item => {
        const orderDetails = JSON.parse(item.dataset.orderDetails);
        if (orderDetails && orderDetails.length > 0) {
            const total = orderDetails.reduce((sum, item) => sum + (item.quantity * item.price), 0);
            updateOrderAmount(item, total);
        }
    });
});