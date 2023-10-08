//add loading indicator... and error handling... + add an remove item from list... and try to fix quantity and size selectors

import { getProductsFromCart, removeFromCart, emptyCartMessage, updateCartTotal } from "./cartfunction.js";

const summarySection = document.querySelector(".summary-section");
const totalPrice = document.querySelector(".total-price");
var productsInCart = getProductsFromCart();

emptyCartMessage();

//Searchbar in this does not work (only in list view)

function generateCart() {
  productsInCart.forEach(function (item) {
    const summaryProductContainer = document.createElement("div");
    summaryProductContainer.classList.add("summary-product-container");

    summarySection.appendChild(summaryProductContainer);

    console.log(item.onSale.toLowerCase().includes("true"));

    if (item.onSale.toLowerCase().includes("true")) {
      summaryProductContainer.innerHTML += `
      <div class="summary-product-img-container">
        <img src="${item.img}" class="summary-product-img" alt="Image of the selected product, Fleece layer from Scott 1.12 in Silver" />
      </div>
      <div class="summary-product-text helvetica">
        <a href="product.html" class="black">${item.title2}</a>
      </div>
      <div class="remove-item-from-cart helvetica brown" data-id="${item.id}">X</div>
      <div class="size-selector helvetica">
        <label for="size">Size:</label>
        <select name="size" id="size" class="size-selector-btns selector-btns black">
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
      </div>
      <div class="qty-selector helvetica">
        <label for="qty">Qty</label>
        <select name="qty" id="qty" class="selector-btns black">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      <p class="summary-product-price inline line-through helvetica brown">$ ${item.price}</p>
      <p class="summary-product-discounted-price inline red bold helvetica brown">$ ${item.discountedPrice}</p>
      `;
    } else {
      summaryProductContainer.innerHTML += `
      <div class="summary-product-img-container">
        <img src="${item.img}" class="summary-product-img" alt="Image of the selected product, Fleece layer from Scott 1.12 in Silver" />
      </div>
      <div class="summary-product-text helvetica">
        <a href="product.html" class="black">${item.title2}</a>
      </div>
      <div class="remove-item-from-cart helvetica brown" data-id="${item.id}">X</div>
      <div class="size-selector helvetica">
        <label for="size">Size:</label>
        <select name="size" id="size" class="size-selector-btns selector-btns black">
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
      </div>
      <div class="qty-selector helvetica">
        <label for="qty">Qty</label>
        <select name="qty" id="qty" class="selector-btns black">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      <p class="summary-product-price helvetica brown">$ ${item.price}</p>
      `;
    }
  });

  //REMOVE ITEMS FROM CART
  const removeItemFromCart = document.querySelectorAll(".remove-item-from-cart");

  removeItemFromCart.forEach((xButtons) => {
    xButtons.addEventListener("click", function (event) {
      removeFromCart();
      generateSum();
    });
  });
}
generateCart();

//generate sum
function generateSum() {
  const sum = updateCartTotal();
  totalPrice.innerHTML = `  
  <p>sum total</p>
  <p>$ ${sum}</p>`;
}
generateSum();

//DIDNT MANAGE TO MAKE THE SIZES CORRESPOND TO API CALL...
