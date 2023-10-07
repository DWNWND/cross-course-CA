import { fetchJackets, createTitle1, createTitle2, showLoadingIndicator, renderCategory, selectCategory } from "./global.js";
import { eventSaveLocally, getProductsFromCart, updateMainShoppingCart } from "./cartfunction.js";
import { renderProducts } from "./renderProducts.js";

const listSection = document.querySelector(".product-list");
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
  showLoadingIndicator(listSection);

  //loading the right Main shopping cart icon when loading the page
  updateMainShoppingCart();

  //fetching API
  const product = await fetchJackets();

  //Filter items - from using searchbar (WORKING IN LIST VIEW) - Also takes the categories into consideration
  let productsFiltered = product.filter((allItems) => {
    if (query === "") {
      h1.innerHTML = theTrueCategoryName;
      displayCategorizedProducts();
    } else if (allItems.title.toLowerCase().includes(query.toLowerCase())) {
      h1.innerHTML = "Search results";
      return allItems;
    }
  });

  //Checking what the filter fetches
  console.log(productsFiltered);

  //clearing loading indicator
  listSection.innerHTML = "";

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
  showLoadingIndicator(listSection);

  //loading the right Main shopping cart icon when loading the page
  updateMainShoppingCart();

  //fetching API
  const product = await fetchJackets();

  //Filter categories - using selectedCategory (WORKING)
  let productsCategoriesed = product.filter((allItems) => {
    if (allItems.gender.toLowerCase().includes(selectedCategory.toLowerCase())) {
      return allItems;
    }
  });

  // Checking products categorised
  // console.log(productsCategoriesed);

  //clearing loading indicator
  listSection.innerHTML = "";

  // looping through the results
  renderProducts(productsCategoriesed);

  //add items to cart
  const addToCartButton = document.querySelectorAll(".shopping-bag");
  addToCartButton.forEach((cartButtons) => {
    cartButtons.addEventListener("click", eventSaveLocally);
  });
}
displayCategorizedProducts();
