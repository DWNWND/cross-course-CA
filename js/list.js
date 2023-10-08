import { fetchJackets, createTitle1, createTitle2, showLoadingIndicator, renderCategory, selectCategory } from "./global.js";
import { eventSaveLocally, getProductsFromCart, updateMainShoppingCart } from "./cartfunction.js";
import { renderProducts } from "./renderProducts.js";

const listSection = document.querySelector(".list-section");
const sortingSection = document.querySelector(".sorting");
const productList = document.querySelector(".product-list");
const searchInput = document.querySelector("#searchbar");

const categorySelector = document.querySelector(".category");
const selectedCategory = categorySelector.innerHTML;

const theTrueCategorySelector = document.querySelector(".true-category");
const theTrueCategoryName = theTrueCategorySelector.innerHTML;

const h1 = document.querySelector(".h1_list");

//checking which category we´re on
console.log("selected category: ", selectedCategory.toLowerCase());

// const productsInCart = getProductsFromCart();

//Filter from searchbar: update search whenever typing in searchfield
searchInput.addEventListener("input", () => {
  displaySearchedProducts();
});

async function displaySearchedProducts() {
  //Filter from searchbar
  let query = searchInput.value;

  //loading indicator
  showLoadingIndicator(productList);

  //loading the right Main shopping cart icon when loading the page
  updateMainShoppingCart();

  //fetching API
  const product = await fetchJackets();

  //Filter categories - using selectedCategory (WORKING)
  let productsCategoriesed = product.filter((allItems) => {
    if (allItems.gender.toLowerCase().includes(selectedCategory.toLowerCase())) {
      return allItems;
    }
    if (selectedCategory.toLowerCase().includes("on sale") && allItems.onSale) {
      return allItems;
    }
    if (selectedCategory.toLowerCase().includes("new in") && allItems.favorite) {
      return allItems;
    }
  });

  //Filter items - from using searchbar (WORKING IN LIST VIEW) - Also takes the categories into consideration
  let productsFiltered = product.filter((allItems) => {
    if (query === "") {
      h1.innerHTML = theTrueCategoryName;
      return productsCategoriesed;
    } else if (allItems.title.toLowerCase().includes(query.toLowerCase())) {
      h1.innerHTML = "Search results";
      return allItems;
    }
  });

  //Checking what the filter fetches
  console.log(productsFiltered);

  //clearing loading indicator
  productList.innerHTML = "";

  // looping through results
  renderProducts(productsFiltered);

  //add items to cart
  const addToCartButton = document.querySelectorAll(".shopping-bag");
  addToCartButton.forEach((cartButtons) => {
    cartButtons.addEventListener("click", eventSaveLocally);
  });
}

async function displayCategorizedProducts() {
  //loading indicator
  showLoadingIndicator(productList);

  //loading the right Main shopping cart icon when loading the page
  updateMainShoppingCart();

  //fetching API
  const product = await fetchJackets();

  //Filter categories - using selectedCategory (WORKING)
  let productsCategoriesed = product.filter((allItems) => {
    if (allItems.gender.toLowerCase().includes(selectedCategory.toLowerCase())) {
      return allItems;
    }
    if (selectedCategory.toLowerCase().includes("on sale") && allItems.onSale) {
      return allItems;
    }
    if (selectedCategory.toLowerCase().includes("new in") && allItems.favorite) {
      return allItems;
    }
  });

  // Checking products categorised
  // console.log(productsCategoriesed);

  //clearing loading indicator
  productList.innerHTML = "";

  // looping through the results
  renderProducts(productsCategoriesed);

  // sorting section
  sortingSection.innerHTML += `
  <div class="sorting-section">
  <h3 class="helvetica brown">Sort products by:</h3>
  <div class="sorting-selections">
  <select name="sort-price" id="sort-price" class="sorting-options helvetica brown">
    <option value="no-selection">Price</option>
  </select>
  <select name="sort-size" id="sort-size" class="sorting-options helvetica brown">
  <option value="no-selection">Size</option>
  <option value="XS">XS</option>
  <option value="S">S</option>
  <option value="M">M</option>
  <option value="L">L</option>
  <option value="XL">XL</option>
</select>
  <select name="sort-color" id="sort-color" class="sorting-options helvetica brown">
    <option value="no-selection">Color</option>
    <option value="Black">Black</option>
    <option value="Brown">Brown</option>
    <option value="Blue">Blue</option>
    <option value="Gray">Gray</option>
    <option value="Purple">Purple</option>
    <option value="Red">Red</option>
  </select>
  <select name="sort-material" id="sort-material" class="sorting-options helvetica brown">
    <option value="no-selection">Material</option>
    <option value="Polyester">Polyester</option>
    <option value="GoreTex">GoreTex</option>
    <option value="Whool">Whool</option>
  </select>
  </div>
</div>`;

  //add items to cart
  const addToCartButton = document.querySelectorAll(".shopping-bag");
  addToCartButton.forEach((cartButtons) => {
    cartButtons.addEventListener("click", eventSaveLocally);
  });
}
displayCategorizedProducts();
