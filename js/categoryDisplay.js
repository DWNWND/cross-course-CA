import { createTitle1, createTitle2 } from "./global.js";
import { getProductsFromCart } from "./cartfunction.js";

const productsInCart = getProductsFromCart();
const listSection = document.querySelector(".product-list");

export function renderProducts(productItem) {
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
    listSection.appendChild(productContainer);

    if (i === 8) {
      break;
    }
  }
}

//THE ORIGINAL LOOP
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


//OLD FILTER TRIES
 //Filter categories
  // const menProducts = product.filter((item) => {
  //   if (item.gender.toLowerCase().startsWith("m")) {
  //     return true;
  //   }
  // });

  // const womanProducts = product.filter((item) => {
  //   if (item.gender.toLowerCase().startsWith("f")) {
  //     return true;
  //   }
  // });

  // const onSaleProducts = product.filter((item) => {
  //   if (item.onSale) {
  //     return true;
  //   }
  // });

  // console.log(onSaleProducts)

  //   //Eventlistners for NAV
  //   const men = document.querySelector(".men");
  //   men.addEventListener("click", displayCategories(menProducts));

  //   const women = document.querySelector(".women");
  //   women.addEventListener("click", displayCategories(womanProducts));

  //   const onSale = document.querySelector(".sale");
  //   onSale.addEventListener("click", displayCategories(onSaleProducts));

  // //Display categories
  // displayCategories(menProducts);
  // displayCategories(womanProducts);
