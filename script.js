// =========================
// CARRITO
// =========================

let cart = JSON.parse(localStorage.getItem("snardCart")) || [];

function updateCart() {
    let quantity = 0;

    cart.forEach(function(item) {
        quantity += item.quantity;
    });

    document.getElementById("cart_quantity").textContent = quantity;
    localStorage.setItem("snardCart", JSON.stringify(cart));
}

document.querySelectorAll(".product .buttons").forEach(function(button) {

    button.addEventListener("click", function() {

        if (button.disabled) return;

        let product = button.closest(".product");
        let name = product.querySelector("h3").textContent;
        let priceText = product.querySelector(".information p").textContent;
        let price = parseFloat(priceText.replace("Precio: S/", ""));

        let found = cart.find(function(item) {
            return item.name === name;
        });

        if (found) {
            found.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();
        alert("Producto agregado al carrito.");
    });
});

document.querySelector(".shopping").addEventListener("click", function() {

    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let message = "CARRITO:\n\n";
    let total = 0;

    cart.forEach(function(item) {
        let subtotal = item.price * item.quantity;
        total += subtotal;

        message += item.name + " x" + item.quantity +
                   " - S/ " + subtotal.toFixed(2) + "\n";
    });

    message += "\nTotal: S/ " + total.toFixed(2);

    alert(message);
});

updateCart();


// =========================
// BÚSQUEDA
// =========================

let search = document.getElementById("search_product");
let searchButton = document.getElementById("btnSearch");

function searchProducts() {

    let text = search.value.toLowerCase();

    document.querySelectorAll(".product").forEach(function(product) {

        let name = product.querySelector("h3").textContent.toLowerCase();

        if (name.includes(text)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}

if (searchButton) {
    searchButton.addEventListener("click", searchProducts);
}


// =========================
// COMENTARIOS
// =========================

let commentBox = document.querySelector(".new_comments");

if (commentBox) {

    let nameInput = commentBox.querySelector("input");
    let textInput = commentBox.querySelector("textarea");
    let button = commentBox.querySelector("button");
    let list = document.querySelector(".list_comments");

    let comments = JSON.parse(localStorage.getItem("snardComments")) || [];

    function addComment(name, text) {

        let article = document.createElement("article");
        article.className = "comments";

        article.innerHTML = "<h3>" + name + "</h3><p>" + text + "</p>";

        list.appendChild(article);
    }

    comments.forEach(function(comment) {
        addComment(comment.name, comment.text);
    });

    button.addEventListener("click", function() {

        let name = nameInput.value.trim();
        let text = textInput.value.trim();

        if (name === "" || text === "") {
            alert("Completa tu nombre y comentario.");
            return;
        }

        comments.push({
            name: name,
            text: text
        });

        localStorage.setItem("snardComments", JSON.stringify(comments));

        addComment(name, text);

        nameInput.value = "";
        textInput.value = "";

        alert("Comentario publicado.");
    });
}


// =========================
// RECLAMACIONES
// =========================

let form = document.querySelector(".complaints_form form");

if (form) {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.getElementById("name").value;
        let documentNumber = document.getElementById("document").value;
        let email = document.getElementById("email").value;
        let type = document.getElementById("type").value;
        let product = document.getElementById("product").value;
        let description = document.getElementById("description").value;

        if (name === "" || documentNumber === "" ||
            email === "" || type === "" || description === "") {

            alert("Completa los campos obligatorios.");
            return;
        }

        let subject = "Reclamación SNARD - " + type;

        let body =
            "Nombre: " + name + "\n" +
            "Documento: " + documentNumber + "\n" +
            "Correo: " + email + "\n" +
            "Producto o servicio: " + product + "\n\n" +
            "Descripción:\n" + description;

        window.location.href =
            "mailto:gerardohuarcaya45@gmail.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);
    });
}
