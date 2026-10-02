// CARRITO

let cart = JSON.parse(localStorage.getItem("snardCart")) || [];

document.querySelectorAll(".buttons").forEach(function(button) {
    button.addEventListener("click", function() {
        if (button.disabled) return;

        let product = button.parentElement.parentElement;
        let name = product.querySelector("h3").textContent;
        let price = parseFloat(
            product.querySelector(".information p").textContent.replace("Precio: S/", "")
        );

        cart.push({ name: name, price: price });
        localStorage.setItem("snardCart", JSON.stringify(cart));

        document.getElementById("cart_quantity").textContent = cart.length;
        alert("Producto agregado al carrito.");
    });
});


// BÚSQUEDA

let searchButton = document.getElementById("btnSearch");

if (searchButton) {
    searchButton.addEventListener("click", function() {
        let text = document.getElementById("search_product").value.toLowerCase();

        document.querySelectorAll(".product").forEach(function(product) {
            let name = product.querySelector("h3").textContent.toLowerCase();

            if (name.includes(text)) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }
        });
    });
}


// COMENTARIOS

let commentButton = document.querySelector(".new_comments button");

if (commentButton) {
    commentButton.addEventListener("click", function() {
        let name = document.querySelector(".new_comments input").value;
        let text = document.querySelector(".new_comments textarea").value;

        if (name === "" || text === "") {
            alert("Completa tu nombre y comentario.");
            return;
        }

        let comment = document.createElement("article");
        comment.className = "comments";
        comment.innerHTML = "<h3>" + name + "</h3><p>" + text + "</p>";

        document.querySelector(".list_comments").appendChild(comment);

        alert("Comentario publicado.");
    });
}


// RECLAMACIONES

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

        let body = "Nombre: " + name +
            "\nDocumento: " + documentNumber +
            "\nCorreo: " + email +
            "\nProducto o servicio: " + product +
            "\nDescripción: " + description;

        window.location.href =
            "mailto:gerardohuarcaya45@gmail.com" +
            "?subject=" + encodeURIComponent("Reclamación SNARD - " + type) +
            "&body=" + encodeURIComponent(body);
    });
}
