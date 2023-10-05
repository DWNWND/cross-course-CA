import { fetchJackets, createTitle1, createTitle2, showLoadingIndicator } from "./global.js";
import { getProductsFromCart } from "./cartfunction.js";

export const sliderSection = document.querySelector(".product-slider");
const adSection = document.querySelector(".ad-section");

async function displayProducts() {
  showLoadingIndicator(sliderSection);
  showLoadingIndicator(adSection);
  const product = await fetchJackets();

  const adContainer = document.createElement("div");

  sliderSection.innerHTML = "";
  adSection.innerHTML = ""; //clearing the loading indicator

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
    sliderSection.appendChild(productContainer);

    if (i === 6) {
      break;
    }
  }

  adContainer.addEventListener("click", () => {
    window.location.href = `product.html?key=${product[3].id}`;
  });
  adContainer.innerHTML += `
  <h1>
    <a href="list.html" class="h1_homepage">New in from Rainy Days . . .</a>
  </h1>
  <div class="product-text inline helvetica">
    <p class="productname">${createTitle1(product[3])}</p>
    <a href="product.html" class="black bold">${createTitle2(product[3])}</a>
  </div>
  <div class="container helvetica white uppercase bold">
    <div class="new-in_1">
      <img src="../images/productphoto-1.jpg" alt="${product[3].description}" class="productphoto-ad new-in_1" />
    </div>
    <div class="new-in_2">
      <img src="../images/productphoto-2.jpg" alt="${product[3].description}" class="productphoto-ad new-in_2" />
    </div>
    <div class="product-name-info">
      <p class="bottom-left"> ${createTitle1(product[3])} - 2023 collection</p>
      <p class="bottom-right">$${product[3].price}</p>
    </div>
  </div>`;
  adSection.appendChild(adContainer);

  //move to its own js-file/or global after completing
  const addToCartButton = document.querySelectorAll(".shopping-bag");

  addToCartButton.forEach((cartButtons) => {
    cartButtons.addEventListener("click", eventSaveLocally);
  });

  function eventSaveLocally() {
    event.target.classList.toggle("shopping-bag_icon-empty");
    event.target.classList.toggle("shopping-bag_icon-added-product");

    const id = event.target.dataset.id;
    const title1 = event.target.dataset.title1;
    const title2 = event.target.dataset.title2;
    const img = event.target.dataset.img;
    const price = event.target.dataset.price;
    const description = event.target.dataset.description;
    const sizes = event.target.dataset.sizes;

    const sizeArray = sizes.split(",");

    const productsCurrentlyInCart = getProductsFromCart();

    const productExists = productsCurrentlyInCart.find(function (item) {
      return item.id === id;
    });

    if (!productExists) {
      const item = { id: id, title1: title1, title2: title2, img: img, price: price, description: description, sizes: sizeArray };
      productsCurrentlyInCart.push(item);
      addToCart(productsCurrentlyInCart);
    } else {
      const newProducts = productsCurrentlyInCart.filter((item) => item.id !== id);
      addToCart(newProducts);
    }
  }
}
displayProducts();

function addToCart(product) {
  localStorage.setItem("inCart", JSON.stringify(product));
}
