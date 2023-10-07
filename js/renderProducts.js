import { createTitle1, createTitle2 } from "./global.js";
import { getProductsFromCart } from "./cartfunction.js";

const productsInCart = getProductsFromCart();
const productList = document.querySelector(".product-list");
const listSection = document.querySelector(".list-section");

export function renderProducts(productItem) {
  console.log(productItem);

  if (productItem.length === 0) {
    productList.innerHTML = "We do not have any items in this category";
  } else {
    for (let i = 0; i < productItem.length; i++) {
      //setting the default and updating shopping cart icon on each product
      let cssClass = "shopping-bag_icon-empty";
      const isItemInCart = productsInCart.find(function (item) {
        return item.id === productItem[i].id;
      });
      if (isItemInCart) {
        cssClass = "shopping-bag_icon-added-product";
      }

      //generating the right titles
      const title1 = createTitle1(productItem[i]);
      const title2 = createTitle2(productItem[i]);

      //grenerating the products HTML
      const productContainer = document.createElement("div");
      productContainer.classList.add("product");

      productContainer.innerHTML += `
      <div class="shopping-bag ${cssClass}" alt="link to shopping-bag" data-img="${productItem[i].image}" data-id="${productItem[i].id}" data-title1="${title1}" data-title2="${title2}" data-description="${productItem[i].description}" data-price="${productItem[i].price}" data-sizes="${productItem[i].sizes}">
      </div>
      <div class="product-image-container">
        <a href="/product.html?key=${productItem[i].id}" class="product-link">
          <img src="${productItem[i].image}" alt="${productItem[i].description}" class="jacket" />
        </a>
      </div>
      <div class="product-text block">
        <a href="/product.html?key=${productItem[i].id}" class="black">${title2}</a>
        <p class="productprice">$${productItem[i].price}</p>
      </div>`;

      productList.appendChild(productContainer);

      if (i === 8) {
        break;
      }
    }
    //generatin the load more button
    const loadMore = document.createElement("a");
    loadMore.classList.add("load-button", "black", "underline", "montserrat");
    loadMore.innerHTML += `Load more`;
    listSection.appendChild(loadMore);
  }
}
