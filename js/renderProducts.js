import { createTitle1, createTitle2 } from "./global.js";
import { getProductsFromCart } from "./cartfunction.js";

const productsInCart = getProductsFromCart();
const productList = document.querySelector(".product-list");
const listSection = document.querySelector(".list-section");
const sortingSection = document.querySelector(".sorting");

export function renderProducts(productItem) {
  if (productItem.length === 0) {
    productList.innerHTML = "Sorry, we currently have no items in this category...";
    sortingSection.style.display = "none";
  } else {
    //generating the load more button
    const loadMore = document.createElement("a");
    loadMore.classList.add("load-button", "black", "underline", "montserrat");
    loadMore.innerHTML += `Load more`;
    listSection.appendChild(loadMore);

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

      if (productItem[i].on_sale) {
        productContainer.innerHTML += `
        <div class="shopping-bag ${cssClass}" alt="link to shopping-bag" data-img="${productItem[i].images[0].src}" data-id="${productItem[i].id}" data-title1="${title1}" data-title2="${title2}" data-description="${productItem[i].images[0].alt}" data-price="${productItem[i].prices.price}" data-onsale="${productItem[i].on_sale}" data-discountedprice="${productItem[i].prices.sale_price}">
        </div>
        <div class="product-image-container">
          <a href="/product.html?key=${productItem[i].id}" class="product-link">
            <img src="${productItem[i].images[0].src}" alt="${productItem[i].images[0].alt}" class="jacket" />
          </a>
        </div>
        <div class="product-text">
          <a href="/product.html?key=${productItem[i].id}" class="black">${title2}</a>
          ${productItem[i].price_html}
        </div>`;
      } else {
        productContainer.innerHTML += `
        <div class="shopping-bag ${cssClass}" alt="link to shopping-bag" data-img="${productItem[i].images[0].src}" data-id="${productItem[i].id}" data-title1="${title1}" data-title2="${title2}" data-description="${productItem[i].images[0].alt}" data-price="${productItem[i].prices.price}" data-discountedprice="${productItem[i].prices.sale_price}" data-onsale="${productItem[i].on_sale}">
        </div>
        <div class="product-image-container">
          <a href="/product.html?key=${productItem[i].id}" class="product-link">
            <img src="${productItem[i].images[0].src}" alt="${productItem[i].images[0].alt}" class="jacket" />
          </a>
        </div>
        <div class="product-text block">
          <a href="/product.html?key=${productItem[i].id}" class="black">${title2}</a>
          ${productItem[i].price_html}
        </div>`;
      }

      productList.appendChild(productContainer);

      if (i === 8) {
        break;
      }
    }
  }
}

/* <p class="productprice">$${productItem[i].prices.price}</p> */

/* <p class="productprice inline line-through">$${productItem[i].prices.price}</p>
<p class="productprice inline red bold">$${productItem[i].prices.sale_price}</p> */
