document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // CARRITO DE PRODUCTOS
    // ==============================
    const cartQuantity = document.getElementById("cart_quantity");
    const productButtons = document.querySelectorAll(".product .buttons");
    const shopping = document.querySelector(".shopping");

    let cart = JSON.parse(localStorage.getItem("snardCart")) || [];

    function updateCartQuantity() {
        if (cartQuantity) {
            const total = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartQuantity.textContent = total;
        }
    }

    function saveCart() {
        localStorage.setItem("snardCart", JSON.stringify(cart));
        updateCartQuantity();
    }

    productButtons.forEach(function (button) {
        if (button.disabled) return;

        button.addEventListener("click", function () {
            const product = button.closest(".product");

            if (!product) return;

            const name = product.querySelector(".information h3").textContent.trim();
            const priceText = product.querySelector(".information p").textContent;
            const price = parseFloat(
                priceText.replace("Precio: S/", "").replace(",", ".")
            );

            const existingProduct = cart.find(function (item) {
                return item.name === name;
            });

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            saveCart();

            alert(name + " fue agregado al carrito.");
        });
    });

    if (shopping) {
        shopping.style.cursor = "pointer";

        shopping.addEventListener("click", function () {
            if (cart.length === 0) {
                alert("El carrito está vacío.");
                return;
            }

            let message = "PRODUCTOS EN EL CARRITO:\n\n";
            let total = 0;

            cart.forEach(function (item) {
                const subtotal = item.price * item.quantity;
                total += subtotal;

                message += item.name +
                    " x" + item.quantity +
                    " - S/ " + subtotal.toFixed(2) + "\n";
            });

            message += "\nTotal: S/ " + total.toFixed(2);

            alert(message);
        });
    }

    updateCartQuantity();


    // ==============================
    // BÚSQUEDA DE PRODUCTOS
    // ==============================
    const searchInput = document.getElementById("search_product");
    const searchButton = document.getElementById("btnSearch");
    const products = document.querySelectorAll(".product");

    function searchProducts() {
        if (!searchInput) return;

        const searchText = searchInput.value.toLowerCase().trim();

        products.forEach(function (product) {
            const name = product.querySelector(".information h3");

            if (!name) return;

            const productName = name.textContent.toLowerCase();

            if (productName.includes(searchText)) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener("click", searchProducts);
    }

    if (searchInput) {
        searchInput.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                searchProducts();
            }
        });
    }


    // ==============================
    // COMENTARIOS DEL BLOG
    // ==============================
    const commentsList = document.querySelector(".list_comments");
    const commentBox = document.querySelector(".new_comments");

    if (commentsList && commentBox) {
        const nameInput = commentBox.querySelector("input");
        const commentInput = commentBox.querySelector("textarea");
        const commentButton = commentBox.querySelector("button");

        let comments = JSON.parse(localStorage.getItem("snardComments")) || [];

        function showComments() {
            comments.forEach(function (comment) {
                addCommentToPage(comment.name, comment.text);
            });
        }

        function addCommentToPage(name, text) {
            const article = document.createElement("article");
            article.className = "comments";

            const title = document.createElement("h3");
            title.textContent = name;

            const paragraph = document.createElement("p");
            paragraph.textContent = text;

            article.appendChild(title);
            article.appendChild(paragraph);
            commentsList.appendChild(article);
        }

        commentButton.addEventListener("click", function () {
            const name = nameInput.value.trim();
            const text = commentInput.value.trim();

            if (name === "" || text === "") {
                alert("Completa tu nombre y tu comentario.");
                return;
            }

            const newComment = {
                name: name,
                text: text
            };

            comments.push(newComment);
            localStorage.setItem("snardComments", JSON.stringify(comments));

            addCommentToPage(name, text);

            nameInput.value = "";
            commentInput.value = "";

            alert("Tu comentario fue publicado correctamente.");
        });

        showComments();
    }


    // ==============================
    // LIBRO DE RECLAMACIONES
    // ==============================
    const complaintForm = document.querySelector(".complaints_form form");

    if (complaintForm) {
        complaintForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const documentNumber = document.getElementById("document").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const type = document.getElementById("type").value;
            const product = document.getElementById("product").value.trim();
            const description = document.getElementById("description").value.trim();

            if (!name || !documentNumber || !email || !type || !description) {
                alert("Completa todos los campos obligatorios.");
                return;
            }

            if (!email.includes("@")) {
                alert("Ingresa un correo electrónico válido.");
                return;
            }

            const subject = encodeURIComponent(
                "Reclamación SNARD - " + type
            );

            const body = encodeURIComponent(
                "LIBRO DE RECLAMACIONES SNARD\n\n" +
                "Nombre completo: " + name + "\n" +
                "Documento: " + documentNumber + "\n" +
                "Correo: " + email + "\n" +
                "Teléfono: " + (phone || "No indicado") + "\n" +
                "Tipo de solicitud: " + type + "\n" +
                "Producto o servicio: " + (product || "No indicado") + "\n\n" +
                "Descripción:\n" + description
            );

            window.location.href =
                "mailto:gerardohuarcaya45@gmail.com?subject=" +
                subject + "&body=" + body;

            alert(
                "Los datos fueron preparados correctamente. " +
                "Se abrirá tu aplicación de correo para completar el envío."
            );
        });
    }
});