document.addEventListener("DOMContentLoaded", () => {
    fetch("https://striveschool-api.herokuapp.com/books")
        .then(response => response.json())
        .then(data => displayBooks(data))
        .catch(error => console.error("Errore nel recupero dei dati:", error));

    loadCart();
});

function displayBooks(books) {
    const container = document.getElementById("book-container");
    books.forEach(book => {
        const col = document.createElement("div");
        col.className = "col-md-3 mb-4 d-flex";
        col.innerHTML = `
            <div class="card h-100 w-100 d-flex flex-column">
                <img src="${book.img}" class="card-img-top" alt="${book.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">Prezzo: €${book.price.toFixed(2)}</p>
                    <div class="btn-container">
                        <button class="btn btn-danger" onclick="removeCard(this)">Discard</button>
                        <button class="btn btn-success" onclick="addToCart('${book.title}', ${book.price})">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function removeCard(button) {
    button.closest(".col-md-3").remove();
}

function addToCart(title, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ title, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function loadCart() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `${item.title} - €${item.price.toFixed(2)} <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Discard</button>`;
        cartList.appendChild(li);
    });
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}