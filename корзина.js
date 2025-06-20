        // Получаем модальное окно
        var modal = document.getElementById("deliveryModal");

        // Получаем кнопку, которая открывает модальное окно
        var btn = document.querySelector("button[onclick='openDeliveryModal()']");

        // Получаем элемент <span>, который закрывает модальное окно
        var span = document.getElementsByClassName("close")[0];

        // Когда пользователь кликает на кнопку, открываем модальное окно
        function openDeliveryModal() {
            modal.style.display = "block";
        }

        // Когда пользователь кликает на <span> (x), закрываем модальное окно
        function closeDeliveryModal() {
            modal.style.display = "none";
        }

        // Когда пользователь кликает вне модального окна, закрываем его. (Опционально)
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        function saveDeliveryAddress() {
            let district = document.getElementById('district').value;
            let street = document.getElementById('street').value;
            let house = document.getElementById('house').value;
            let entrance = document.getElementById('entrance').value;
            let apartment = document.getElementById('apartment').value;
            let intercom = document.getElementById('intercom').value;

            let addressString = `${district}, ${street}, ${house}, подъезд ${entrance}, кв. ${apartment}, домофон ${intercom}`;
            document.getElementById('deliveryAddressDisplay').textContent = "Адрес доставки: " + addressString;

            closeDeliveryModal();

            // Разблокируем кнопку оплаты
            document.getElementById('pay-button').disabled = false;
        }

        function updateTotal() {
            let item1Quantity = document.querySelector('.cart-item[data-item-id="1"] input').value;
            let item2Quantity = document.querySelector('.cart-item[data-item-id="2"] input').value;
            let item3Quantity = document.querySelector('.cart-item[data-item-id="3"] input').value;

            let item1Price = 200;
            let item2Price = 1000;
            let item3Price = 1200;

            let item1Total = item1Quantity * item1Price;
            let item2Total = item2Quantity * item2Price;
            let item3Total = item3Quantity * item3Price;

            document.querySelector('.cart-item[data-item-id="1"] #item1-total').textContent = item1Total;
            document.querySelector('.cart-item[data-item-id="2"] #item2-total').textContent = item2Total;
            document.querySelector('.cart-item[data-item-id="3"] #item3-total').textContent = item3Total;

            let total = item1Total + item2Total + item3Total;
            document.getElementById('total').textContent = total;
        }

        function processPayment() {
            let paymentMethod = document.getElementById('paymentMethod').value;
            let district = document.getElementById('district').value;
            let street = document.getElementById('street').value;
            let house = document.getElementById('house').value;
            let entrance = document.getElementById('entrance').value;
            let apartment = document.getElementById('apartment').value;
            let intercom = document.getElementById('intercom').value;
            let deliveryAddress = document.getElementById('deliveryAddressDisplay').textContent;


            // Скрываем элементы корзины, итоговую сумму, способ оплаты, адрес и кнопку
            document.getElementById('cart-items').style.display = 'none';
            document.querySelector('.total-price').style.display = 'none';
            document.querySelector('.payment-options').style.display = 'none';
            document.querySelector('.deliveryAddress').style.display = 'none';
            document.querySelector('#deliveryAddressDisplay').style.display = 'none';
            document.querySelector('button[onclick="openDeliveryModal()"]').style.display = 'none';
            document.getElementById('pay-button').style.display = 'none'; // Скрываем кнопку Оплатить

            // Показываем пустую корзину
            document.getElementById('cart-empty-container').style.display = 'block';

            //  Удаляем содержимое корзины (только визуально в данном примере)
            const cartItems = document.querySelectorAll('.cart-item');
            cartItems.forEach(item => {
                item.remove();
            });

            // Обновляем общую сумму в 0
            document.getElementById('total').textContent = "0";

            // Выводим сообщение (в реальном приложении это делается асинхронно)
            alert("Заказ оплачен и принят в обработку!\n" +
                  "Способ оплаты: " + paymentMethod + "\n" +
                  deliveryAddress);
}

        updateTotal();

