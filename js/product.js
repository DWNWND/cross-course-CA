import { fetchJacketById, createTitle1, createTitle2, showLoadingIndicator } from "./global.js";
import { eventSaveLocallyProduct, updateMainShoppingCart, getProductsFromCart } from "./cartfunction.js";
export const productSection = document.querySelector(".product-section__flex");

//Searchbar in this does not work (only in list view)

async function displayProduct() {
  showLoadingIndicator(productSection);

  //loading the right Main shopping cart icon when loading the page
  updateMainShoppingCart();

  const product = await fetchJacketById();

  productSection.innerHTML = ""; //clearing loading indicator

  const title1 = createTitle1(product);
  const title2 = createTitle2(product);

  const titleContainer = document.querySelector("#title");
  titleContainer.textContent = title2;

  const productImagesContainer = document.createElement("div");
  productImagesContainer.classList.add("product-img-section");

  productImagesContainer.innerHTML += `
  <div class="big"><img src="${product.images[0].src}" /></div>
  <div class="thumbnail1 thumbnailsize in-focus"><img src="${product.images[0].src}" alt="${product.images.alt}" /></div>
  <div class="thumbnail2 thumbnailsize no-focus"><img src="${product.images[0].src}" alt="${product.images.alt}" /></div>
  <div class="thumbnail3 thumbnailsize no-focus"><img src="${product.images[0].src}" alt="${product.images.alt}" /></div>
  <div class="thumbnail4 thumbnailsize no-focus"><img src="${product.images[0].src}" alt="${product.images.alt}" /></div>`;

  const productDetailsContainer = document.createElement("div");
  productDetailsContainer.classList.add("product-detail-section");

  if (product.onSale) {
    productDetailsContainer.innerHTML += `
    <div class="product-text margin">
      <h1>${title1}</h1>
      <p class="bold">${title2}</p>
      <p class="productprice-productpage inline line-through">$${product.price}</p>
      <p class="productprice-productpage inline red bold">$${product.discountedPrice}</p>
    </div>
    <form action="#" method="#" class="size-color-selector-form">
      <div class="color-selection_container mobile">
        <select name="color" id="color" class="size-color_selector-btn helvetica brown" required>
          <option value="no-selection">Choose color</option> 
        </select>
      </div>
      <div class="size-selection_container mobile">
        <select name="size" id="size" class="size-color_selector-btn helvetica brown" required>
          <option value="no-selection">Choose size</option>
        </select>
      </div>
      <div class="product-colors margin desktop"></div>
      <div class="product-size margin desktop"></div>
      <div class="add-btn helvetica uppercase" data-id="${product.id}" data-title2="${title2}" data-title1="${title1}" data-img="${product.image}" data-price="${product.price}" data-discountedprice="${product.discountedPrice}" data-description="${product.description}" data-sizes="${product.sizes}" data-onsale="${product.onSale}">Add to bag</div>
    </form>`;
  } else {
    productDetailsContainer.innerHTML += `
  <div class="product-text margin">
    <h1>${title1}</h1>
    <p class="bold">${title2}</p>
    <p class="productprice-productpage">$${product.price}</p>
  </div>
  <form action="#" method="#" class="size-color-selector-form">
    <div class="color-selection_container mobile">
      <select name="color" id="color" class="size-color_selector-btn helvetica brown" required>
        <option value="no-selection">Choose color</option> 
      </select>
    </div>
    <div class="size-selection_container mobile">
      <select name="size" id="size" class="size-color_selector-btn helvetica brown" required>
        <option value="no-selection">Choose size</option>
      </select>
    </div>
    <div class="product-colors margin desktop"></div>
    <div class="product-size margin desktop"></div>
    <div class="add-btn helvetica uppercase" data-id="${product.id}" data-title2="${title2}" data-title1="${title1}" data-img="${product.image}" data-price="${product.price}" data-discountedprice="${product.discountedPrice}" data-description="${product.description}" data-sizes="${product.sizes}" data-onsale="${product.onSale}">Add to bag</div>
  </form>`;
  }

  productSection.appendChild(productImagesContainer);
  productSection.appendChild(productDetailsContainer);

  //To get the sizes and colors looped in:
  const productSizeSelector = document.getElementById("size");
  const productSizeSelectorDesktop = document.querySelector(".product-size");

  const productSizes = product.sizes;

  productSizes.forEach(function (sizes) {
    productSizeSelector.innerHTML += `
      <option value="${sizes}">${sizes}</option>`; //MOBILE
    productSizeSelectorDesktop.innerHTML += `
      <div class="sizebox">${sizes}</div>`; //DESKTOP
  });

  const productColorSelector = document.getElementById("color"); //getElementById or querySelector?? Be consise
  const productColorSelectorDesktop = document.querySelector(".product-colors");

  const productColors = product.baseColor;
  const colorArray = productColors.split(" "); //making the baseColor an array. ForEach work if baseColor is applied as an array.

  colorArray.forEach(function (colors) {
    productColorSelector.innerHTML += `
      <option value="${colors}">${colors}</option>`; //MOBILE
    productColorSelectorDesktop.innerHTML += `
      <div class="color_container">
        <div class="${colors} colorbox"></div>
        <p>${colors}</p>
      </div>`; //DESKTOP
  });

  //add items to cart
  const addToBagBtn = document.querySelector(".add-btn");
  addToBagBtn.addEventListener("click", eventSaveLocallyProduct);

  const productsCurrentlyInCart = getProductsFromCart();
  const productExists = productsCurrentlyInCart.find(function (item) {
    return item.id === product.id;
  });

  if (!productExists) {
    addToBagBtn.innerHTML = "add to bag";
    addToBagBtn.classList.add("add-btn");
    addToBagBtn.classList.remove("added-btn");
    updateMainShoppingCart();
  } else {
    updateMainShoppingCart();
    addToBagBtn.innerHTML = "added";
    addToBagBtn.classList.add("added-btn");
    addToBagBtn.classList.remove("add-btn");
  }
}
displayProduct();
