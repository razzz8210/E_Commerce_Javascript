document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 }, 
    { id: 2, name: "Product 2", price: 19.99 }, 
    { id: 3, name: "Product 3", price: 59.99 }, 
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCardMessage = document.getElementById("empty-cart");
  const cardTotalMessage = document.getElementById("cart-total");
  const cartTotalPrice = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span> ${product.name} - $${product.price.toFixed(2)} </span>  <!-- Changed to 'price' -->
      <button data-id=${product.id}>Add to Cart</button>
    `;

    productList.appendChild(productDiv);
  });

 
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    renderCart();
    saveCart(); 
  }

 
  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCardMessage.classList.add("hidden");
      cardTotalMessage.classList.remove("hidden");

      cart.forEach((item) => {
        totalPrice += item.price; // Changed to 'price'
        const cartItem = document.createElement("div");
        cartItem.classList.add("product");
        cartItem.innerHTML = `
          <span> ${item.name} - $${item.price.toFixed(2)} </span>  <!-- Changed to 'price' -->
          <button data-id=${item.id}>Remove Item</button>
        `;

        cartItems.appendChild(cartItem);
        cartTotalPrice.textContent = `${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCardMessage.classList.remove("hidden");
      cartTotalPrice.textContent = `0.00`;
    }
  }

  
  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const cartId = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(cartId);
    }
  });

  function removeFromCart(cartId) {
    const index = cart.findIndex((item) => item.id === cartId);

    if (index > -1) {
      cart.splice(index, 1); 
    }
    renderCart();
    saveCart(); 
  }

  
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  
  checkoutBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    alert("Checkout Successfully");
    renderCart();
  });

 
  renderCart();
});
