import { fetchJackets, createTitle1, createTitle2, showLoadingIndicator } from "./global.js";
import { eventSaveLocally } from "./cartfunction.js";

const listSection = document.querySelector(".product-list");

async function displayProducts() {
  showLoadingIndicator(listSection);
  const product = await fetchJackets();

  listSection.innerHTML = ""; //clearing loading indicator

  for (let i = 0; i < product.length; i++) {
    const title1 = createTitle1(product[i]);
    const title2 = createTitle2(product[i]);

    const productContainer = document.createElement("div");
    productContainer.classList.add("product");

    productContainer.innerHTML += `
    <div class="shopping-bag shopping-bag_icon-empty" alt="link to shopping-bag" data-img="${product[i].image}" data-id="${product[i].id}" data-title1="${title1}" data-title2="${title2}" data-description="${product[i].description}" data-price="${product[i].price}" data-sizes="${product[i].sizes}">
    </div>
    <a href="product.html?key=${product[i].id}" class="product-link">
      <img src="${product[i].image}" alt="${product[i].description}" class="jacket" />
    </a>
    <div class="product-text block margin-left">
      <p class="productname">${title1}</p>
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
