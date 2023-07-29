        // Додавання товару у кошик
        function addToCart(productName, price) {
            const cartItems = document.getElementById("cart-items");
            const totalPriceElement = document.getElementById("total-price");

            // Перевіряємо, чи товар уже є у кошику
            const existingItem = findCartItemByName(productName);

            if (existingItem) {
                // Якщо товар вже є у кошику, збільшуємо його кількість
                existingItem.quantity++;
                updateCartItem(existingItem);
            } else {
                // Якщо товару немає у кошику, додаємо новий елемент
                const cartItem = {
                    name: productName,
                    price: price,
                    quantity: 1
                };

                const cartItemElement = createCartItemElement(cartItem);
                cartItems.appendChild(cartItemElement);
            }

            // Оновлюємо загальну суму
            const totalPrice = calculateTotalPrice();
            totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
        }

        // Пошук товару за його назвою в кошику
        function findCartItemByName(productName) {
            const cartItems = document.getElementById("cart-items");
            const cartItemsElements = cartItems.getElementsByClassName("cart-item");

            for (const itemElement of cartItemsElements) {
                const nameElement = itemElement.getElementsByTagName("span")[0];
                if (nameElement.innerText === productName) {
                    return itemElement;
                }
            }

            return null;
        }

        // Оновлення інформації про товар у кошику
        function updateCartItem(cartItem) {
            const itemElement = findCartItemByName(cartItem.name);

            if (itemElement) {
                const quantityElement = itemElement.getElementsByClassName("quantity")[0];
                const subtotalElement = itemElement.getElementsByClassName("subtotal")[0];

                quantityElement.value = cartItem.quantity;
                subtotalElement.innerText = `$${(cartItem.price * cartItem.quantity).toFixed(2)}`;
            }
        }

        // Перерахунок загальної суми кошика
        function calculateTotalPrice() {
            const cartItems = document.getElementById("cart-items");
            const cartItemsElements = cartItems.getElementsByClassName("cart-item");
            let totalPrice = 0;

            for (const itemElement of cartItemsElements) {
                const price = parseFloat(itemElement.getElementsByClassName("price")[0].innerText.slice(1));
                const quantity = parseInt(itemElement.getElementsByClassName("quantity")[0].value);
                totalPrice += price * quantity;
            }

            return totalPrice;
        }

        // Створення нового елементу товару у кошику
        function createCartItemElement(cartItem) {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
            <span>${cartItem.name}</span>
            <span class="price">$${cartItem.price.toFixed(2)}</span>
            <input class="quantity" type="number" value="${cartItem.quantity}" min="1" onchange="updateQuantity(this)">
            <span class="subtotal">$${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
            <button onclick="removeCartItem(this)">Видалити</button>
        `;

            return itemElement;
        }

        // Оновлення кількості товару у кошику
        function updateQuantity(inputElement) {
            const itemElement = inputElement.parentElement;
            const name = itemElement.getElementsByTagName("span")[0].innerText;
            const price = parseFloat(itemElement.getElementsByClassName("price")[0].innerText.slice(1));
            const quantity = parseInt(inputElement.value);

            const cartItem = {
                name: name,
                price: price,
                quantity: quantity
            };

            updateCartItem(cartItem);

            // Оновлюємо загальну суму
            const totalPriceElement = document.getElementById("total-price");
            const totalPrice = calculateTotalPrice();
            totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
        }

        // Видалення товару з кошика
        function removeCartItem(button) {
            const cartItem = button.parentElement;
            const price = parseFloat(cartItem.children[1].innerText.slice(1));

            cartItem.remove();

            // Оновлення загальної суми
            const totalPriceElement = document.getElementById("total-price");
            const totalPrice = parseFloat(totalPriceElement.innerText.slice(1)) - price;
            totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
        }

        // Очищення кошика
        function clearCart() {
            const cartItems = document.getElementById("cart-items");
            const totalPriceElement = document.getElementById("total-price");

            cartItems.innerHTML = "";
            totalPriceElement.innerText = "$0.00";
        }

        // Симуляція оформлення замовлення
        function checkout() {
            const cartItems = document.getElementById("cart-items");
            if (cartItems.children.length === 0) {
                alert("Кошик порожній. Додайте товари перед оформленням замовлення.");
            } else {
                const order = {
                    items: [],
                    total: parseFloat(document.getElementById("total-price").innerText.slice(1))
                };

                // Отримання інформації про товари у кошику
                const items = cartItems.getElementsByClassName("cart-item");
                for (const item of items) {
                    const name = item.getElementsByTagName("span")[0].innerText;
                    const price = parseFloat(item.getElementsByTagName("span")[1].innerText.slice(1));
                    order.items.push({ name, price });
                }

                // Відправлення замовлення на сервер (це тільки симуляція)
                alert("Замовлення оформлено!");
                console.log(order);

                // Скидання кошика після оформлення замовлення
                clearCart();
            }
        }

        // Переключення відображення інформації про товар
        function toggleProductDetails(button) {
            const product = button.parentElement;
            product.classList.toggle("active");
        }