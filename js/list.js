import { fetchJackets, createTitle1, createTitle2, showLoadingIndicator } from "./global.js";
import { eventSaveLocally, getProductsFromCart, updateMainShoppingCart } from "./cartfunction.js";
import { displayCategories } from "./categoryDisplay.js";

const listSection = document.querySelector(".product-list");
const productsInCart = getProductsFromCart();

async function displayProducts() {
  //loading indicator
  showLoadingIndicator(listSection);

  //loading the right Main shopping cart icon when loading the page
  updateMainShoppingCart();

  //fetching API
  const product = await fetchJackets();

  //clearing loading indicator
  listSection.innerHTML = "";

  console.log(product)
  //Filter categories
  const menProducts = product.filter((item) => {
    if (item.gender.toLowerCase().startsWith("m")) {
      return true;
    }
  });

  const womanProducts = product.filter((item) => {
    if (item.gender.toLowerCase().startsWith("f")) {
      return true;
    }
  });

  const onSaleProducts = product.filter((item) => {
    if (item.onSale) {
      return true;
    }
  });

  console.log(onSaleProducts)

    //Eventlistners for NAV
    const men = document.querySelector(".men");
    men.addEventListener("click", displayCategories(menProducts));
  
    const women = document.querySelector(".women");
    women.addEventListener("click", displayCategories(womanProducts));

    const onSale = document.querySelector(".sale");
    onSale.addEventListener("click", displayCategories(onSaleProducts));

  // //Display categories
  // displayCategories(menProducts);
  // displayCategories(womanProducts);

  //looping through API results

  // for (let i = 0; i < product.length; i++) {
  //   //setting the default and updating shopping cart icon on each product
  //   let cssClass = "shopping-bag_icon-empty";
  //   const isItemInCart = productsInCart.find(function (item) {
  //     return item.id === product[i].id;
  //   });
  //   if (isItemInCart) {
  //     cssClass = "shopping-bag_icon-added-product";
  //   }

  //   //generating the right titles
  //   const title1 = createTitle1(product[i]);
  //   const title2 = createTitle2(product[i]);

  //   //grenerating the products HTML
  //   const productContainer = document.createElement("div");
  //   productContainer.classList.add("product");

  //   productContainer.innerHTML += `
  //   <div class="shopping-bag ${cssClass}" alt="link to shopping-bag" data-img="${product[i].image}" data-id="${product[i].id}" data-title1="${title1}" data-title2="${title2}" data-description="${product[i].description}" data-price="${product[i].price}" data-sizes="${product[i].sizes}">
  //   </div>
  //   <div class="product-image-container">
  //     <a href="product.html?key=${product[i].id}" class="product-link">
  //       <img src="${product[i].image}" alt="${product[i].description}" class="jacket" />
  //     </a>
  //   </div>
  //   <div class="product-text block">
  //     <a href="product.html?key=${product[i].id}" class="black">${title2}</a>
  //     <p class="productprice">$${product[i].price}</p>
  //   </div>`;
  //   listSection.appendChild(productContainer);

  //   if (i === 8) {
  //     break;
  //   }
  // }

  //add items to cart
  const addToCartButton = document.querySelectorAll(".shopping-bag");
  addToCartButton.forEach((cartButtons) => {
    cartButtons.addEventListener("click", eventSaveLocally);
  });
}
displayProducts();
