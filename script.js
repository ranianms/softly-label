// function showPopupMessage(message) {
//     let popup = document.getElementById("global-popup");
//     if (!popup) {
//         popup = document.createElement("div");
//         popup.id = "global-popup";
//         popup.style.position = "fixed";
//         popup.style.top = "50%";
//         popup.style.left = "50%";
//         popup.style.transform = "translate(-50%, -50%)";
//         popup.style.background = "#2D2013";
//         popup.style.color = "#F5ECE1";
//         popup.style.padding = "12px 18px";
//         popup.style.borderRadius = "5px";
//         popup.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
//         popup.style.fontFamily = "Poppins, sans-serif";
//         popup.style.fontSize = "15px";
//         popup.style.zIndex = "9999";
//         popup.style.opacity = "0";
//         popup.style.transition = "opacity 0.6s ease";
//         document.body.appendChild(popup);
//     }
//     popup.textContent = message;
//     popup.style.opacity = "1";
//     setTimeout(() => {
//         popup.style.opacity = "0";
//     }, 2000);
// }

// // Softly Label's Jewelries Catalog
// const productCatalog = {
//     "eloise bangle": "Bracelets",
//     "herringbone bracelet": "Bracelets",
//     "meredith": "Bracelets",
//     "diana": "Earrings",
//     "ketupat": "Earrings",
//     "pearlina": "Earrings",
//     "celestia": "Necklaces",
//     "heart locket": "Necklaces",
//     "ines and solstice": "Rings",
//     "nerida": "Rings",
//     "thea": "Rings"
// };

// // Softly Label's data stock (NEW)
// const productStock = {
//     "eloise bangle": 5,
//     "herringbone bracelet": 0,
//     "meredith bracelet": 0,
//     "diana earring": 3,
//     "ketupat earring": 2,
//     "pearlina earring": 0,
//     "celestia necklace": 1,
//     "heart locket necklace": 0,
//     "ines and solstice": 0,
//     "nerida ring": 2,
//     "thea ring": 0
// };

// // Updates stock display (NEW)
// function updateProductCardStockDisplay() {
//     document.querySelectorAll('.product-card').forEach(card => {
//         const name = card.getAttribute('data-name')?.toLowerCase();
//         if (!name) return;
//         const stock = productStock[name] || 0;
//         const button = card.querySelector('.add-to-cart');
//         if (!button) return;
//         if (stock <= 0) {
//             button.textContent = 'Out of Stock';
//             button.disabled = true;
//             button.style.backgroundColor = '#A09889';
//             button.style.cursor = 'not-allowed';
//         } else {
//             button.textContent = 'Add to Cart';
//             button.disabled = false;
//             button.style.backgroundColor = '';
//             button.style.cursor = 'pointer';
//         }
//     });
// }

// document.addEventListener("DOMContentLoaded", () => {
//     updateProductCardStockDisplay();

//     // Softly Label's Account
//     const signupToggle = document.getElementById('signupToggle');
//     const loginToggle = document.getElementById('loginToggle');
//     const loginForm = document.getElementById('loginForm');
//     const signupForm = document.getElementById('signupForm');
//     const formTitle = document.getElementById('formTitle');

//     if (signupToggle && loginToggle && loginForm && signupForm && formTitle) {
//         signupToggle.addEventListener('click', () => {
//             loginForm.style.display = 'none';
//             signupForm.style.display = 'block';
//             formTitle.textContent = 'Create Account';
//         });
//         loginToggle.addEventListener('click', () => {
//             signupForm.style.display = 'none';
//             loginForm.style.display = 'block';
//             formTitle.textContent = 'Welcome';
//         });
//     }

//     // Softly Label's Search
//     const searchBtn = document.getElementById('search-btn');
//     const searchForm = document.getElementById('search-form');
//     const cancelBtn = document.getElementById('search-cancel');
//     const searchInput = document.getElementById('search-input');

//     if (searchBtn && searchForm && cancelBtn && searchInput) {
//         searchBtn.addEventListener('click', () => {
//             searchForm.style.display = 'flex';
//             searchInput.focus();
//         });
//         cancelBtn.addEventListener('click', () => {
//             searchForm.style.display = 'none';
//             searchInput.value = '';
//         });
//         searchForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             const query = searchInput.value.trim().toLowerCase();
//             if (!query) {
//                 showPopupMessage("Please enter a product.");
//                 return;
//             }
//             const matchedProduct = Object.keys(productCatalog)
//                 .find(p => p.toLowerCase() === query || p.toLowerCase().includes(query));
//             if (matchedProduct) {
//                 const section = productCatalog[matchedProduct];
//                 window.location.href = `sl-jewelries.html?product=${encodeURIComponent(matchedProduct)}&section=${encodeURIComponent(section)}`;
//             } else {
//                 showPopupMessage("Product could not be found.");
//             }
//             searchInput.value = '';
//             searchForm.style.display = 'none';
//         });
//     }

//     const params = new URLSearchParams(window.location.search);
//     const productName = params.get("product");
//     const sectionName = params.get("section");

//     if (productName && sectionName) {
//         const section = document.getElementById(sectionName);
//         if (section) section.scrollIntoView({ behavior: "smooth" });
//         const cards = document.querySelectorAll(".product-card");
//         cards.forEach(card => {
//             const name = card.getAttribute("data-name")?.toLowerCase();
//             if (name && name.includes(productName.toLowerCase())) {
//                 card.style.border = "2px solid #A09889";
//                 card.scrollIntoView({ behavior: "smooth", block: "center"});
//                 card.animate([
//                     {transform: "scale(1.1)", opacity: 0.9},
//                     {transform: "scale(1)", opacity:1}
//                 ], { duration: 600, easing: "ease-out" });
//                 const cardTitle = card.querySelector('h3')?.textContent || "Product";
//                 showPopupMessage(`Found "${cardTitle}" in ${sectionName} collection.`);
//             }
//         });
//     }

//     // Softly Label's Cart (UPDATED)
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     document.querySelectorAll('.add-to-cart').forEach(button => {
//         button.addEventListener('click', () => {
//             const product = button.closest('.product-card');
//             if(!product) return;
//             const name = product.getAttribute('data-name');
//             const price = parseFloat(product.getAttribute('data-price'));
//             const img = product.getAttribute('data-img');
//             const stock = productStock[name.toLowerCase()] || 0;
//             if (stock <= 0) {
//                 showPopupMessage(`${name} is currently **Out of Stock**!`);
//                 return;
//             }
//             const existingItem = cart.find(item => item.name === name);
//             if (existingItem) {
//                 const nextQuantity = (existingItem.quantity || 1) + 1;
//                 if (nextQuantity > stock) {
//                     showPopupMessage(`Cannot add more. Only ${stock} left in stock!`);
//                     return;
//                 }
//                 existingItem.quantity = nextQuantity;
//             } else {
//                 cart.push({ name, price, img, quantity: 1});
//             }
//             localStorage.setItem('cart', JSON.stringify(cart));
//             showPopupMessage(`${name} has been added to your Shopping Cart!`);
//             updateCartDisplay();
//         });
//     });

//     const cartContainer = document.getElementById('cart-items-list');
//     const totalDisplay = document.getElementById('total-price');
//     const checkoutBtn = document.getElementById('checkout-btn');

//     function updateCartDisplay() {
//         if (!cartContainer) return;
//         cartContainer.innerHTML = '';
//         if (cart.length === 0) {
//             cartContainer.innerHTML = `<div class="empty-cart"><i class ="fas fa-shopping-cart"></i><p>Cart is currently empty.</p></div>`;
//             if (totalDisplay) totalDisplay.textContent = "0 BND";
//             if (checkoutBtn) checkoutBtn.disabled = true;
//             return;
//         }
//         let total = 0;
//         cart.forEach((item, index) => {
//             const itemTotal = item.price * (item.quantity || 1);
//             total += itemTotal;
//             const itemDiv = document.createElement('div');
//             itemDiv.classList.add('cart-item');
//             itemDiv.innerHTML = `<img src="${item.img}" alt="${item.name}"><div class="item-details"><h3>${item.name}</h3><p>${item.price.toFixed(2)} BND x ${item.quantity || 1}</p></div><button class="remove-btn" data-index="${index}">Remove</button>`;
//             cartContainer.appendChild(itemDiv);
//         });
//         if (totalDisplay) totalDisplay.textContent = `${total.toFixed(2)} BND`;
//         if (checkoutBtn) checkoutBtn.disabled = false;
//         document.querySelectorAll('.remove-btn').forEach(btn => {
//             btn.addEventListener('click', e => {
//                 const index = e.target.getAttribute('data-index');
//                 const itemName = cart[index]?.name || "Item";
//                 cart.splice(index, 1);
//                 showPopupMessage(`${itemName} has been removed from your cart.`);
//                 localStorage.setItem('cart', JSON.stringify(cart));
//                 updateCartDisplay();
//                 if (document.getElementById('order-items')) updateCheckoutSummary();
//             });
//         });
//     }

//     if (checkoutBtn) {
//         checkoutBtn.addEventListener('click', () => {
//             if (cart.length > 0) {
//                 window.location.href = 'sl-checkout.html';
//             } else {
//                 showPopupMessage("Your cart is empty!");
//             }
//         })
//     }
//     updateCartDisplay();

//     // Softly Label's Contact Form
//     const contactForm = document.querySelector(".contact-form");
//     if (contactForm) {
//         contactForm.addEventListener("submit", async function name(e) {
//             e.preventDefault();
//             const form = e.target;
//             try {
//                 const response = await fetch(form.action, { method: form.method, body: new FormData(form) });
//                 if (response.ok) {
//                     form.querySelector(".success-message").style.display = "block";
//                     form.querySelector(".error-message").style.display = "none";
//                     form.reset();
//                 } else {
//                     form.querySelector(".error-message").style.display = "block";
//                     form.querySelector(".success-message").style.display = "none";
//                 }
//             } catch (err) {
//                 form.querySelector(".error-message").style.display ="block";
//                 form.querySelector(".success-message").style.display = "none";
//             }
//         });
//     }

//     // Softly Label's FAQ Toggle
//     document.querySelectorAll('.faq-item').forEach(item => {
//         const question = item.querySelector('.faq-question');
//         if (!question) return;
//         question.addEventListener('click', () => {
//             item.classList.toggle('active');
//         });
//     });

//     // Softly Label's Checkout page
//     const deliveryCostsMap = {
//         "Bandar Area": 7.00,
//         "Tutong Area": 6.00,
//         "Belait Area": 5.00,
//         "Lumut Area": 2.00
//     };
//     const checkoutForm = document.querySelector('form.checkout-form');
//     const orderItemsContainer = document.getElementById('order-items');
//     const shippingOptions = document.querySelectorAll('input[name="delivery"]');
//     const shippingDisplay = document.getElementById('shipping-price');
//     const grandTotalDisplay = document.getElementById('total-price');
//     const purchaseBtn = document.querySelector('.purchase-btn');

//     function updateCheckoutSummary() {
//         if (!orderItemsContainer || !shippingDisplay || !grandTotalDisplay) return;
//         let cart = JSON.parse(localStorage.getItem('cart')) || [];
//         orderItemsContainer.innerHTML = '';
//         let subtotal = 0;
//         let shippingPrice = 0;
//         if (cart.length === 0) {
//             orderItemsContainer.innerHTML = '<p style="text-align: center; padding: 10px;">Your cart is empty.</p>';
//             if(purchaseBtn) purchaseBtn.setAttribute('disabled', true);
//         } else {
//             cart.forEach(item => {
//                 const itemTotal = item.price * (item.quantity || 1);
//                 subtotal += itemTotal;
//                 const itemDiv = document.createElement('div');
//                 itemDiv.classList.add('order-item');
//                 itemDiv.innerHTML = `<p class="item-name">${item.name} x ${item.quantity || 1}</p><p class="item-price">${itemTotal.toFixed(2)} BND</p>`;
//                 orderItemsContainer.appendChild(itemDiv);
//             });
//             if(purchaseBtn) purchaseBtn.removeAttribute('disabled');
//         }
//         if (subtotal >= 60) {
//             shippingPrice = 0;
//         } else {
//             let selectedDeliveryArea = null;
//             shippingOptions.forEach(option => {
//                 if (option.checked) selectedDeliveryArea = option.value;
//             });
//             shippingPrice = deliveryCostsMap[selectedDeliveryArea] || 0;
//         }
//         const grandTotal = subtotal + shippingPrice;
//         shippingDisplay.textContent = shippingPrice === 0 ? "FREE" : `${shippingPrice.toFixed(2)} BND`;
//         grandTotalDisplay.textContent = `BND$${grandTotal.toFixed(2)}`;
//     }

//     if (orderItemsContainer) updateCheckoutSummary();
//     shippingOptions.forEach(option => option.addEventListener('change', updateCheckoutSummary));

    // async function handlePurchase(e) {
//         e.preventDefault();

//         const cartNow = JSON.parse(localStorage.getItem('cart') || '[]');

//         // 1️⃣ Check if cart is empty first
//         if (!cartNow || cartNow.length === 0) {
//             showPopupMessage("Your cart is empty! Add items before purchasing.");
//             return;
//         }

//         // 2️⃣ Check form validity
//         if (checkoutForm && !checkoutForm.checkValidity()) {
//             checkoutForm.reportValidity();
//             return;
//         }

//         // 3️⃣ Collect form data and proceed with fetch...
//         const formData = {
//             firstName: checkoutForm.querySelector('input[placeholder="First Name"]').value,
//             lastName: checkoutForm.querySelector('input[placeholder="Last Name"]').value,
//             email: checkoutForm.querySelector('input[placeholder="Email Address"]').value,
//             phone: checkoutForm.querySelector('input[placeholder="Phone Number"]').value,
//             country: checkoutForm.querySelector('input[placeholder="Country/Region"]').value,
//             city: checkoutForm.querySelector('input[placeholder="City"]').value,
//             address: checkoutForm.querySelector('input[placeholder="Address"]').value,
//             zip: checkoutForm.querySelector('input[placeholder="ZIP/Postal Code"]').value,
//             delivery: checkoutForm.querySelector('input[name="delivery"]:checked').value,
//             paymentMethod: checkoutForm.querySelector('input[name="paymentMethod"]:checked')?.value || 'Not Selected',
//             cartItems: cartNow,
//             total: parseFloat(grandTotalDisplay.textContent.replace('BND$', '')) || 0
//         };

//         try {
//             const response = await fetch('http://localhost:5000/api/checkout', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData)
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 showPopupMessage("Purchase successful!");
//                 localStorage.removeItem('cart'); 
//                 updateCheckoutSummary(); 
//             } else {
//                 showPopupMessage("Error: " + result.message);
//             }
//         } catch (err) {
//             console.error(err);
//             showPopupMessage("Server error. Please try again later.");
//         }
//     }



//         if (checkoutForm) checkoutForm.addEventListener('submit', handlePurchase);
//         if (purchaseBtn) purchaseBtn.addEventListener('click', handlePurchase);
        
//         if (document.querySelector(".checkout-form")) {
//         loadOrderSummary();
//         updateShipping();
// }
// });




// -------------------------------------------

// function showPopupMessage(message) {
//     let popup = document.getElementById("global-popup");
//     if (!popup) {
//         popup = document.createElement("div");
//         popup.id = "global-popup";
//         popup.style.position = "fixed";
//         popup.style.top = "50%";
//         popup.style.left = "50%";
//         popup.style.transform = "translate(-50%, -50%)";
//         popup.style.background = "#2D2013";
//         popup.style.color = "#F5ECE1";
//         popup.style.padding = "12px 18px";
//         popup.style.borderRadius = "5px";
//         popup.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
//         popup.style.fontFamily = "Poppins, sans-serif";
//         popup.style.fontSize = "15px";
//         popup.style.zIndex = "9999";
//         popup.style.opacity = "0";
//         popup.style.transition = "opacity 0.6s ease";
//         document.body.appendChild(popup);
//     }
//     popup.textContent = message;
//     popup.style.opacity = "1";
//     setTimeout(() => {
//         popup.style.opacity = "0";
//     }, 2000);
// }

// // Softly Label's Jewelries Catalog
// const productCatalog = {
//     "eloise bangle": "Bracelets",
//     "herringbone bracelet": "Bracelets",
//     "meredith": "Bracelets",
//     "diana": "Earrings",
//     "ketupat": "Earrings",
//     "pearlina": "Earrings",
//     "celestia": "Necklaces",
//     "heart locket": "Necklaces",
//     "ines and solstice": "Rings",
//     "nerida": "Rings",
//     "thea": "Rings"
// };

// // Softly Label's data stock (NEW)
// const productStock = {
//     "eloise bangle": 5,
//     "herringbone bracelet": 0,
//     "meredith bracelet": 0,
//     "diana earring": 3,
//     "ketupat earring": 2,
//     "pearlina earring": 0,
//     "celestia necklace": 1,
//     "heart locket necklace": 0,
//     "ines and solstice": 0,
//     "nerida ring": 2,
//     "thea ring": 0
// };

// // Updates stock display (NEW)
// function updateProductCardStockDisplay() {
//     document.querySelectorAll('.product-card').forEach(card => {
//         const name = card.getAttribute('data-name')?.toLowerCase();
//         if (!name) return;
//         const stock = productStock[name] || 0;
//         const button = card.querySelector('.add-to-cart');
//         if (!button) return;
//         if (stock <= 0) {
//             button.textContent = 'Out of Stock';
//             button.disabled = true;
//             button.style.backgroundColor = '#A09889';
//             button.style.cursor = 'not-allowed';
//         } else {
//             button.textContent = 'Add to Cart';
//             button.disabled = false;
//             button.style.backgroundColor = '';
//             button.style.cursor = 'pointer';
//         }
//     });
// }

// document.addEventListener("DOMContentLoaded", () => {
//     updateProductCardStockDisplay();

//     // Softly Label's Account
//     const signupToggle = document.getElementById('signupToggle');
//     const loginToggle = document.getElementById('loginToggle');
//     const loginForm = document.getElementById('loginForm');
//     const signupForm = document.getElementById('signupForm');
//     const formTitle = document.getElementById('formTitle');

//     if (signupToggle && loginToggle && loginForm && signupForm && formTitle) {
//         signupToggle.addEventListener('click', () => {
//             loginForm.style.display = 'none';
//             signupForm.style.display = 'block';
//             formTitle.textContent = 'Create Account';
//         });
//         loginToggle.addEventListener('click', () => {
//             signupForm.style.display = 'none';
//             loginForm.style.display = 'block';
//             formTitle.textContent = 'Welcome';
//         });
//     }

//     // Softly Label's Search
//     const searchBtn = document.getElementById('search-btn');
//     const searchForm = document.getElementById('search-form');
//     const cancelBtn = document.getElementById('search-cancel');
//     const searchInput = document.getElementById('search-input');

//     if (searchBtn && searchForm && cancelBtn && searchInput) {
//         searchBtn.addEventListener('click', () => {
//             searchForm.style.display = 'flex';
//             searchInput.focus();
//         });
//         cancelBtn.addEventListener('click', () => {
//             searchForm.style.display = 'none';
//             searchInput.value = '';
//         });
//         searchForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             const query = searchInput.value.trim().toLowerCase();
//             if (!query) {
//                 showPopupMessage("Please enter a product.");
//                 return;
//             }
//             const matchedProduct = Object.keys(productCatalog)
//                 .find(p => p.toLowerCase() === query || p.toLowerCase().includes(query));
//             if (matchedProduct) {
//                 const section = productCatalog[matchedProduct];
//                 window.location.href = `sl-jewelries.html?product=${encodeURIComponent(matchedProduct)}&section=${encodeURIComponent(section)}`;
//             } else {
//                 showPopupMessage("Product could not be found.");
//             }
//             searchInput.value = '';
//             searchForm.style.display = 'none';
//         });
//     }

//     const params = new URLSearchParams(window.location.search);
//     const productName = params.get("product");
//     const sectionName = params.get("section");

//     if (productName && sectionName) {
//         const section = document.getElementById(sectionName);
//         if (section) section.scrollIntoView({ behavior: "smooth" });
//         const cards = document.querySelectorAll(".product-card");
//         cards.forEach(card => {
//             const name = card.getAttribute("data-name")?.toLowerCase();
//             if (name && name.includes(productName.toLowerCase())) {
//                 card.style.border = "2px solid #A09889";
//                 card.scrollIntoView({ behavior: "smooth", block: "center"});
//                 card.animate([
//                     {transform: "scale(1.1)", opacity: 0.9},
//                     {transform: "scale(1)", opacity:1}
//                 ], { duration: 600, easing: "ease-out" });
//                 const cardTitle = card.querySelector('h3')?.textContent || "Product";
//                 showPopupMessage(`Found "${cardTitle}" in ${sectionName} collection.`);
//             }
//         });
//     }

//     // Softly Label's Cart (UPDATED)
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     document.querySelectorAll('.add-to-cart').forEach(button => {
//         button.addEventListener('click', () => {
//             const product = button.closest('.product-card');
//             if(!product) return;
//             const name = product.getAttribute('data-name');
//             const price = parseFloat(product.getAttribute('data-price'));
//             const img = product.getAttribute('data-img');
//             const stock = productStock[name.toLowerCase()] || 0;
//             if (stock <= 0) {
//                 showPopupMessage(`${name} is currently **Out of Stock**!`);
//                 return;
//             }
//             const existingItem = cart.find(item => item.name === name);
//             if (existingItem) {
//                 const nextQuantity = (existingItem.quantity || 1) + 1;
//                 if (nextQuantity > stock) {
//                     showPopupMessage(`Cannot add more. Only ${stock} left in stock!`);
//                     return;
//                 }
//                 existingItem.quantity = nextQuantity;
//             } else {
//                 cart.push({ name, price, img, quantity: 1});
//             }
//             localStorage.setItem('cart', JSON.stringify(cart));
//             showPopupMessage(`${name} has been added to your Shopping Cart!`);
//             updateCartDisplay();
//         });
//     });

//     const cartContainer = document.getElementById('cart-items-list');
//     const totalDisplay = document.getElementById('total-price');
//     const checkoutBtn = document.getElementById('checkout-btn');

//     function updateCartDisplay() {
//         if (!cartContainer) return;
//         cartContainer.innerHTML = '';
//         if (cart.length === 0) {
//             cartContainer.innerHTML = `<div class="empty-cart"><i class ="fas fa-shopping-cart"></i><p>Cart is currently empty.</p></div>`;
//             if (totalDisplay) totalDisplay.textContent = "0 BND";
//             if (checkoutBtn) checkoutBtn.disabled = true;
//             return;
//         }
//         let total = 0;
//         cart.forEach((item, index) => {
//             const itemTotal = item.price * (item.quantity || 1);
//             total += itemTotal;
//             const itemDiv = document.createElement('div');
//             itemDiv.classList.add('cart-item');
//             itemDiv.innerHTML = `<img src="${item.img}" alt="${item.name}"><div class="item-details"><h3>${item.name}</h3><p>${item.price.toFixed(2)} BND x ${item.quantity || 1}</p></div><button class="remove-btn" data-index="${index}">Remove</button>`;
//             cartContainer.appendChild(itemDiv);
//         });
//         if (totalDisplay) totalDisplay.textContent = `${total.toFixed(2)} BND`;
//         if (checkoutBtn) checkoutBtn.disabled = false;
//         document.querySelectorAll('.remove-btn').forEach(btn => {
//             btn.addEventListener('click', e => {
//                 const index = e.target.getAttribute('data-index');
//                 const itemName = cart[index]?.name || "Item";
//                 cart.splice(index, 1);
//                 showPopupMessage(`${itemName} has been removed from your cart.`);
//                 localStorage.setItem('cart', JSON.stringify(cart));
//                 updateCartDisplay();
//                 if (document.getElementById('order-items')) updateCheckoutSummary();
//             });
//         });
//     }

//     if (checkoutBtn) {
//         checkoutBtn.addEventListener('click', () => {
//             if (cart.length > 0) {
//                 window.location.href = 'sl-checkout.html';
//             } else {
//                 showPopupMessage("Your cart is empty!");
//             }
//         })
//     }
//     updateCartDisplay();

//     // Softly Label's Contact Form
//     const contactForm = document.querySelector(".contact-form");
//     if (contactForm) {
//         contactForm.addEventListener("submit", async function name(e) {
//             e.preventDefault();
//             const form = e.target;
//             try {
//                 const response = await fetch(form.action, { method: form.method, body: new FormData(form) });
//                 if (response.ok) {
//                     form.querySelector(".success-message").style.display = "block";
//                     form.querySelector(".error-message").style.display = "none";
//                     form.reset();
//                 } else {
//                     form.querySelector(".error-message").style.display = "block";
//                     form.querySelector(".success-message").style.display = "none";
//                 }
//             } catch (err) {
//                 form.querySelector(".error-message").style.display ="block";
//                 form.querySelector(".success-message").style.display = "none";
//             }
//         });
//     }

//     // Softly Label's FAQ Toggle
//     document.querySelectorAll('.faq-item').forEach(item => {
//         const question = item.querySelector('.faq-question');
//         if (!question) return;
//         question.addEventListener('click', () => {
//             item.classList.toggle('active');
//         });
//     });

//     // Softly Label's Checkout page
//     const deliveryCostsMap = {
//         "Bandar Area": 7.00,
//         "Tutong Area": 6.00,
//         "Belait Area": 5.00,
//         "Lumut Area": 2.00
//     };
//     const checkoutForm = document.querySelector('form.checkout-form');
//     const orderItemsContainer = document.getElementById('order-items');
//     const shippingOptions = document.querySelectorAll('input[name="delivery"]');
//     const shippingDisplay = document.getElementById('shipping-price');
//     const grandTotalDisplay = document.getElementById('total-price');
//     const purchaseBtn = document.querySelector('.purchase-btn');

//     function updateCheckoutSummary() {
//         if (!orderItemsContainer || !shippingDisplay || !grandTotalDisplay) return;
//         let cart = JSON.parse(localStorage.getItem('cart')) || [];
//         orderItemsContainer.innerHTML = '';
//         let subtotal = 0;
//         let shippingPrice = 0;
//         if (cart.length === 0) {
//             orderItemsContainer.innerHTML = '<p style="text-align: center; padding: 10px;">Your cart is empty.</p>';
//             if(purchaseBtn) purchaseBtn.setAttribute('disabled', true);
//         } else {
//             cart.forEach(item => {
//                 const itemTotal = item.price * (item.quantity || 1);
//                 subtotal += itemTotal;
//                 const itemDiv = document.createElement('div');
//                 itemDiv.classList.add('order-item');
//                 itemDiv.innerHTML = `<p class="item-name">${item.name} x ${item.quantity || 1}</p><p class="item-price">${itemTotal.toFixed(2)} BND</p>`;
//                 orderItemsContainer.appendChild(itemDiv);
//             });
//             if(purchaseBtn) purchaseBtn.removeAttribute('disabled');
//         }
//         if (subtotal >= 60) {
//             shippingPrice = 0;
//         } else {
//             let selectedDeliveryArea = null;
//             shippingOptions.forEach(option => {
//                 if (option.checked) selectedDeliveryArea = option.value;
//             });
//             shippingPrice = deliveryCostsMap[selectedDeliveryArea] || 0;
//         }
//         const grandTotal = subtotal + shippingPrice;
//         shippingDisplay.textContent = shippingPrice === 0 ? "FREE" : `${shippingPrice.toFixed(2)} BND`;
//         grandTotalDisplay.textContent = `BND$${grandTotal.toFixed(2)}`;
//     }

//     if (orderItemsContainer) updateCheckoutSummary();
//     shippingOptions.forEach(option => option.addEventListener('change', updateCheckoutSummary));

//     async function handlePurchase(e) {
//         e.preventDefault();

//         const cartNow = JSON.parse(localStorage.getItem('cart') || '[]');

//         // 1️⃣ Check if cart is empty first
//         if (!cartNow || cartNow.length === 0) {
//             showPopupMessage("Your cart is empty! Add items before purchasing.");
//             return;
//         }

//         // 2️⃣ Check form validity
//         if (checkoutForm && !checkoutForm.checkValidity()) {
//             checkoutForm.reportValidity();
//             return;
//         }

//         // 3️⃣ Collect form data and proceed with fetch...
//         const formData = {
//             firstName: checkoutForm.querySelector('input[placeholder="First Name"]').value,
//             lastName: checkoutForm.querySelector('input[placeholder="Last Name"]').value,
//             email: checkoutForm.querySelector('input[placeholder="Email Address"]').value,
//             phone: checkoutForm.querySelector('input[placeholder="Phone Number"]').value,
//             country: checkoutForm.querySelector('input[placeholder="Country/Region"]').value,
//             city: checkoutForm.querySelector('input[placeholder="City"]').value,
//             address: checkoutForm.querySelector('input[placeholder="Address"]').value,
//             zip: checkoutForm.querySelector('input[placeholder="ZIP/Postal Code"]').value,
//             delivery: checkoutForm.querySelector('input[name="delivery"]:checked').value,
//             paymentMethod: checkoutForm.querySelector('input[name="paymentMethod"]:checked')?.value || 'Not Selected',
//             cartItems: cartNow,
//             total: parseFloat(grandTotalDisplay.textContent.replace('BND$', '')) || 0
//         };

//         try {
//             const response = await fetch('http://localhost:5000/api/checkout', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData)
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 showPopupMessage("Purchase successful!");
//                 localStorage.removeItem('cart'); // clear cart
//                 updateCheckoutSummary(); // refresh summary
//             } else {
//                 showPopupMessage("Error: " + result.message);
//             }
//         } catch (err) {
//             console.error(err);
//             showPopupMessage("Server error. Please try again later.");
//         }
//     }

//     if (checkoutForm) checkoutForm.addEventListener('submit', handlePurchase);
//     if (purchaseBtn) purchaseBtn.addEventListener('click', handlePurchase);

//     // Call updateCheckoutSummary on page load to disable Purchase if cart empty
//     updateCheckoutSummary();

// });

// ----------------------------------------



function showPopupMessage(message) {
    let popup = document.getElementById("global-popup");
    if (!popup) {
        popup = document.createElement("div");
        popup.id = "global-popup";
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.background = "#2D2013";
        popup.style.color = "#F5ECE1";
        popup.style.padding = "12px 18px";
        popup.style.borderRadius = "5px";
        popup.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
        popup.style.fontFamily = "Poppins, sans-serif";
        popup.style.fontSize = "15px";
        popup.style.zIndex = "9999";
        popup.style.opacity = "0";
        popup.style.transition = "opacity 0.6s ease";
        document.body.appendChild(popup);
    }
    popup.textContent = message;
    popup.style.opacity = "1";
    setTimeout(() => {
        popup.style.opacity = "0";
    }, 2000);
}

// Softly Label's Jewelries Catalog
const productCatalog = {
    "eloise bangle": "Bracelets",
    "herringbone bracelet": "Bracelets",
    "meredith": "Bracelets",
    "diana": "Earrings",
    "ketupat": "Earrings",
    "pearlina": "Earrings",
    "celestia": "Necklaces",
    "heart locket": "Necklaces",
    "ines and solstice": "Rings",
    "nerida": "Rings",
    "thea": "Rings"
};

// Softly Label's data stock (NEW)
const productStock = {
    "eloise bangle": 5,
    "herringbone bracelet": 0,
    "meredith bracelet": 0,
    "diana earring": 3,
    "ketupat earring": 2,
    "pearlina earring": 0,
    "celestia necklace": 1,
    "heart locket necklace": 0,
    "ines and solstice": 0,
    "nerida ring": 2,
    "thea ring": 0
};

// Updates stock display (NEW)
function updateProductCardStockDisplay() {
    document.querySelectorAll('.product-card').forEach(card => {
        const name = card.getAttribute('data-name')?.toLowerCase();
        if (!name) return;
        const stock = productStock[name] || 0;
        const button = card.querySelector('.add-to-cart');
        if (!button) return;
        if (stock <= 0) {
            button.textContent = 'Out of Stock';
            button.disabled = true;
            button.style.backgroundColor = '#A09889';
            button.style.cursor = 'not-allowed';
        } else {
            button.textContent = 'Add to Cart';
            button.disabled = false;
            button.style.backgroundColor = '';
            button.style.cursor = 'pointer';
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateProductCardStockDisplay();

    // Softly Label's Account
    const signupToggle = document.getElementById('signupToggle');
    const loginToggle = document.getElementById('loginToggle');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const formTitle = document.getElementById('formTitle');

    if (signupToggle && loginToggle && loginForm && signupForm && formTitle) {
        signupToggle.addEventListener('click', () => {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
            formTitle.textContent = 'Create Account';
        });
        loginToggle.addEventListener('click', () => {
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
            formTitle.textContent = 'Welcome';
        });
    }

    // Softly Label's Search
    const searchBtn = document.getElementById('search-btn');
    const searchForm = document.getElementById('search-form');
    const cancelBtn = document.getElementById('search-cancel');
    const searchInput = document.getElementById('search-input');

    if (searchBtn && searchForm && cancelBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchForm.style.display = 'flex';
            searchInput.focus();
        });
        cancelBtn.addEventListener('click', () => {
            searchForm.style.display = 'none';
            searchInput.value = '';
        });
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            if (!query) {
                showPopupMessage("Please enter a product.");
                return;
            }
            const matchedProduct = Object.keys(productCatalog)
                .find(p => p.toLowerCase() === query || p.toLowerCase().includes(query));
            if (matchedProduct) {
                const section = productCatalog[matchedProduct];
                window.location.href = `sl-jewelries.html?product=${encodeURIComponent(matchedProduct)}&section=${encodeURIComponent(section)}`;
            } else {
                showPopupMessage("Product could not be found.");
            }
            searchInput.value = '';
            searchForm.style.display = 'none';
        });
    }

    const params = new URLSearchParams(window.location.search);
    const productName = params.get("product");
    const sectionName = params.get("section");

    if (productName && sectionName) {
        const section = document.getElementById(sectionName);
        if (section) section.scrollIntoView({ behavior: "smooth" });
        const cards = document.querySelectorAll(".product-card");
        cards.forEach(card => {
            const name = card.getAttribute("data-name")?.toLowerCase();
            if (name && name.includes(productName.toLowerCase())) {
                card.style.border = "2px solid #A09889";
                card.scrollIntoView({ behavior: "smooth", block: "center"});
                card.animate([
                    {transform: "scale(1.1)", opacity: 0.9},
                    {transform: "scale(1)", opacity:1}
                ], { duration: 600, easing: "ease-out" });
                const cardTitle = card.querySelector('h3')?.textContent || "Product";
                showPopupMessage(`Found "${cardTitle}" in ${sectionName} collection.`);
            }
        });
    }

    // Softly Label's Cart (UPDATED)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product-card');
            if(!product) return;
            const name = product.getAttribute('data-name');
            const price = parseFloat(product.getAttribute('data-price'));
            const img = product.getAttribute('data-img');
            const stock = productStock[name.toLowerCase()] || 0;
            if (stock <= 0) {
                showPopupMessage(`${name} is currently **Out of Stock**!`);
                return;
            }
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                const nextQuantity = (existingItem.quantity || 1) + 1;
                if (nextQuantity > stock) {
                    showPopupMessage(`Cannot add more. Only ${stock} left in stock!`);
                    return;
                }
                existingItem.quantity = nextQuantity;
            } else {
                cart.push({ name, price, img, quantity: 1});
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            showPopupMessage(`${name} has been added to your Shopping Cart!`);
            updateCartDisplay();
        });
    });

    const cartContainer = document.getElementById('cart-items-list');
    const totalDisplay = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    function updateCartDisplay() {
        if (!cartContainer) return;
        cartContainer.innerHTML = '';
        if (cart.length === 0) {
            cartContainer.innerHTML = `<div class="empty-cart"><i class ="fas fa-shopping-cart"></i><p>Cart is currently empty.</p></div>`;
            if (totalDisplay) totalDisplay.textContent = "0 BND";
            if (checkoutBtn) checkoutBtn.disabled = true;
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * (item.quantity || 1);
            total += itemTotal;
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `<img src="${item.img}" alt="${item.name}"><div class="item-details"><h3>${item.name}</h3><p>${item.price.toFixed(2)} BND x ${item.quantity || 1}</p></div><button class="remove-btn" data-index="${index}">Remove</button>`;
            cartContainer.appendChild(itemDiv);
        });
        if (totalDisplay) totalDisplay.textContent = `${total.toFixed(2)} BND`;
        if (checkoutBtn) checkoutBtn.disabled = false;
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const index = e.target.getAttribute('data-index');
                const itemName = cart[index]?.name || "Item";
                cart.splice(index, 1);
                showPopupMessage(`${itemName} has been removed from your cart.`);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
                if (document.getElementById('order-items')) updateCheckoutSummary();
            });
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                window.location.href = 'sl-checkout.html';
            } else {
                showPopupMessage("Your cart is empty!");
            }
        })
    }
    updateCartDisplay();

    // Softly Label's Contact Form
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async function name(e) {
            e.preventDefault();
            const form = e.target;
            try {
                const response = await fetch(form.action, { method: form.method, body: new FormData(form) });
                if (response.ok) {
                    form.querySelector(".success-message").style.display = "block";
                    form.querySelector(".error-message").style.display = "none";
                    form.reset();
                } else {
                    form.querySelector(".error-message").style.display = "block";
                    form.querySelector(".success-message").style.display = "none";
                }
            } catch (err) {
                form.querySelector(".error-message").style.display ="block";
                form.querySelector(".success-message").style.display = "none";
            }
        });
    }

    // Softly Label's FAQ Toggle
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Softly Label's Checkout page
    const deliveryCostsMap = {
        "Bandar Area": 7.00,
        "Tutong Area": 6.00,
        "Belait Area": 5.00,
        "Lumut Area": 2.00
    };
    const checkoutForm = document.querySelector('form.checkout-form');
    const orderItemsContainer = document.getElementById('order-items');
    const shippingOptions = document.querySelectorAll('input[name="delivery"]');
    const shippingDisplay = document.getElementById('shipping-price');
    const grandTotalDisplay = document.getElementById('total-price');
    const purchaseBtn = document.querySelector('.purchase-btn');

    function updateCheckoutSummary() {
        if (!orderItemsContainer || !shippingDisplay || !grandTotalDisplay) return;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        orderItemsContainer.innerHTML = '';
        let subtotal = 0;
        let shippingPrice = 0;
        if (cart.length === 0) {
            orderItemsContainer.innerHTML = '<p style="text-align: center; padding: 10px;">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * (item.quantity || 1);
                subtotal += itemTotal;
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('order-item');
                itemDiv.innerHTML = `<p class="item-name">${item.name} x ${item.quantity || 1}</p><p class="item-price">${itemTotal.toFixed(2)} BND</p>`;
                orderItemsContainer.appendChild(itemDiv);
            });
            if(purchaseBtn) purchaseBtn.removeAttribute('disabled');
        }
        if (subtotal >= 60) {
            shippingPrice = 0;
        } else {
            let selectedDeliveryArea = null;
            shippingOptions.forEach(option => {
                if (option.checked) selectedDeliveryArea = option.value;
            });
            shippingPrice = deliveryCostsMap[selectedDeliveryArea] || 0;
        }
        const grandTotal = subtotal + shippingPrice;
        shippingDisplay.textContent = shippingPrice === 0 ? "FREE" : `${shippingPrice.toFixed(2)} BND`;
        grandTotalDisplay.textContent = `BND$${grandTotal.toFixed(2)}`;
    }

    if (orderItemsContainer) updateCheckoutSummary();
    shippingOptions.forEach(option => option.addEventListener('change', updateCheckoutSummary));

    async function handlePurchase(e) {
        e.preventDefault();

        // Load cart from localStorage 
        const cartNow = JSON.parse(localStorage.getItem('cart') || '[]');

        // Check empty cart FIRST before anything else
        if (!cartNow || cartNow.length === 0) {
            showPopupMessage("Your cart is empty! Add items before purchasing.");
            return;
        }

        // Validate form
        if (checkoutForm && !checkoutForm.checkValidity()) {
            checkoutForm.reportValidity();
            return;
        }

        // Collect form data
        const formData = {
            firstName: checkoutForm.querySelector('input[placeholder="First Name"]').value,
            lastName: checkoutForm.querySelector('input[placeholder="Last Name"]').value,
            email: checkoutForm.querySelector('input[placeholder="Email Address"]').value,
            phone: checkoutForm.querySelector('input[placeholder="Phone Number"]').value,
            country: checkoutForm.querySelector('input[placeholder="Country/Region"]').value,
            city: checkoutForm.querySelector('input[placeholder="City"]').value,
            address: checkoutForm.querySelector('input[placeholder="Address"]').value,
            zip: checkoutForm.querySelector('input[placeholder="ZIP/Postal Code"]').value,
            delivery: checkoutForm.querySelector('input[name="delivery"]:checked').value,
            paymentMethod: checkoutForm.querySelector('input[name="paymentMethod"]:checked')?.value || 'Not Selected',
            items: cartNow,
            total: parseFloat(grandTotalDisplay.textContent.replace('BND$', '')) || 0
        };

        // Send to backend
        try {
            const response = await fetch('http://localhost:5000/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                showPopupMessage("Purchase successful! Order ID: ");

                // Clear cart & refresh UI
                localStorage.removeItem('cart');
                updateCheckoutSummary();
            } else {
                showPopupMessage("Error: " + result.message);
            }
        } catch (err) {
            console.error(err);
            showPopupMessage("Server error. Please try again later.");
        }
    }

    // Apply listeners
    if (checkoutForm) checkoutForm.addEventListener('submit', handlePurchase);

    updateCheckoutSummary();

});