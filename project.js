document.addEventListener("DOMContentLoaded", function () {
  const cartButton = document.getElementById("cartButton");
  const modal = document.getElementById("cartModal");
  const span = document.getElementsByClassName("close")[0];
  const cartItemsList = document.getElementById("cart-items-modal");
  const totalBillElement = document.getElementById("total-bill-modal");
  

  let totalBill = 0;
  const cartItems = [];

  cartButton.addEventListener("click", function () {
    modal.style.display = "block";
    renderCartItems();
  });

  span.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  function renderCartItems() {
    cartItemsList.innerHTML = "";
    totalBillElement.innerText = "$" + totalBill;
    totalBillElement.style.marginBottom = "20px";
    totalBillElement.style.textAlign = "center";


    cartItems.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.style.display = "flex";
      cartItem.style.marginBottom = "20px";
      
      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.name;
      img.style.maxWidth = "130px";
      img.style.flex = "1";
      cartItem.appendChild(img);

      const details = document.createElement("div");
      details.innerHTML = `
        <p><strong>Product Name:</strong> ${item.name}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Price:</strong> $${item.price}</p>
      `;
      details.style.flex = "2";
      details.style.padding = "0 20px";
      cartItem.appendChild(details);

      cartItemsList.appendChild(cartItem);
    });
      // Remove default ul styling
      cartItemsList.style.listStyleType = "none";
      cartItemsList.style.padding = "0";
      cartItemsList.style.margin = "0";
      cartItemsList.style.display = "flex";
      cartItemsList.style.flexWrap = "wrap";
      cartItemsList.style.gap = "20px";
      
  }


  const products = [
    {
      name: 'Black with Purple',
      description: 'Stylish black dress with purple accents KGL-00059. S, M, L, XL, XXL',
      price: 30,
      stock: 10,
      imageUrl: 'media/dress_files/2-16-scaled-2-300x450.jpg'
    },
    {
      name: 'sky blue ',
      description: 'Stylish black dress with purple accents KGL-00059. S, M, L, XL, XXL',
      price: 40,
      stock: 10,
      imageUrl: 'media/dress_files/26-scaled-6-300x450.jpg'
    },
    {
      name: 'Black 3pc',
      description: 'Stylish black dress with purple accents KGL-00059. S, M, L, XL, XXL',
      price: 50,
      stock: 10,
      imageUrl: 'media/dress_files/4a-scaled-920x1381-1.jpg'
    },
    {
      name: 'Green 2pc',
      description: 'Stylish black dress with purple accents KGL-00059. S, M, L, XL, XXL',
      price: 60,
      stock: 10,
      imageUrl: 'media/dress_files/49-2-scaled-1-300x450.jpg'
    },
    {
      name: 'Blue 3pc',
      description: 'Stylish black dress with purple accents KGL-00059. S, M, L, XL, XXL',
      price: 70,
      stock: 10,
      imageUrl: 'media/dress_files/38-1-scaled-1-300x450.jpg'
    },
    {
      name: 'Pink 3pc',
      description: 'Stylish black dress with purple accents KGL-00059. S, M, L, XL, XXL',
      price: 80,
      stock: 10,
      imageUrl: 'media/dress_files/5-1-scaled-10-300x450.jpg'
    },

  ];


  // const cartItems = [];
  let cartTotal = 0;

  function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsElement.innerHTML = '';
    cartTotalElement.textContent = cartTotal.toFixed(2);

    cartItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} : $ ${item.price.toFixed(2)}`;
      cartItemsElement.appendChild(listItem);
    });

    const cartIcon = document.getElementById('cart');
    cartIcon.innerHTML = `<i class="fa fa-shopping-cart"></i> ${cartItems.length} ($${cartTotal.toFixed(2)})`;
  }

  function generateProductListings(products) {
    const productsSection = document.getElementById('products');
    productsSection.innerHTML = ''; // Clear previous product listings
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product-item';
      productElement.innerHTML = `
              <div>
                  <img src="${product.imageUrl}" alt="${product.name}">
                  <h3>${product.name}</h3>
                  <p>${product.description}</p>
                  <p>Price: $${product.price.toFixed(2)}</p>
                  <p>Stock: ${product.stock}</p>
                  <button class="add-to-cart-btn" data-product="${product.name}">Add to Cart</button>
              </div>
          `;
      productsSection.appendChild(productElement);
    });

    // Attach click event listeners to the newly generated buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const productName = event.target.getAttribute('data-product');
        const selectedProduct = products.find(product => product.name === productName);
        addToCart(selectedProduct);
      });
    });
  }

  generateProductListings(products);

  function addToCart(product) {
    const productIndex = products.findIndex(p => p.name === product.name);
    if (product.stock > 0) {
      let cartProduct = cartItems.find(item => item.name === product.name);
      if (cartProduct) {
        cartProduct.quantity++; // Increment quantity if the product is already in the cart
      } else {
        cartProduct = { ...product, quantity: 1 }; // Set the initial quantity to 1 for new items
        cartItems.push(cartProduct);
      }
      cartTotal += product.price; // Update the cart total
      totalBill = cartItems.reduce((total, item) => total + item.quantity * item.price, 0); // Update the total bill based on the items in the cart
      products[productIndex].stock -= 1; // Decrease the product's stock
      updateCart();
      generateProductListings(products); // Update product listings
    } else {
      alert('Sorry! This product is out of stock.');
    }
  }
  


  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const productName = event.target.getAttribute('data-product');
      const selectedProduct = products.find(product => product.name === productName);
      addToCart(selectedProduct);
    });
  });
});