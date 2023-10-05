import { fetchJackets, createTitle1, createTitle2, showLoadingIndicator } from "./global.js";
import { eventSaveLocally, getProductsFromCart } from "./cartfunction.js";

const listSection = document.querySelector(".product-list");
const productsInCart = getProductsFromCart();

async function displayProducts() {
  showLoadingIndicator(listSection);
  const product = await fetchJackets();

  listSection.innerHTML = ""; //clearing loading indicator

  for (let i = 0; i < product.length; i++) {
    let cssClass = "shopping-bag_icon-empty";

    const isItemInCart = productsInCart.find(function (item) {
      return item.id === product[i].id;
    });

    if (isItemInCart) {
      cssClass = "shopping-bag_icon-added-product";
    }

    const title1 = createTitle1(product[i]);
    const title2 = createTitle2(product[i]);

    const productContainer = document.createElement("div");
    productContainer.classList.add("product");

    productContainer.innerHTML += `
    <div class="shopping-bag ${cssClass}" alt="link to shopping-bag" data-img="${product[i].image}" data-id="${product[i].id}" data-title1="${title1}" data-title2="${title2}" data-description="${product[i].description}" data-price="${product[i].price}" data-sizes="${product[i].sizes}">
    </div>
    <div class="product-image-container">
      <a href="product.html?key=${product[i].id}" class="product-link">
        <img src="${product[i].image}" alt="${product[i].description}" class="jacket" />
      </a>
    </div>
    <div class="product-text block">
      <a href="product.html?key=${product[i].id}" class="black">${title2}</a>
      <p class="productprice">$${product[i].price}</p>
    </div>`;
    listSection.appendChild(productContainer);

    if (i === 8) {
      break;
    }
  }
  //ADD ITEMS TO CART
  const addToCartButton = document.querySelectorAll(".shopping-bag");

  addToCartButton.forEach((cartButtons) => {
    cartButtons.addEventListener("click", eventSaveLocally);
  });
}
displayProducts();
