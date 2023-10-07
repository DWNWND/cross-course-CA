import { fetchJackets, createTitle1, createTitle2, showLoadingIndicator, renderCategory, selectCategory } from "./global.js";
import { eventSaveLocally, getProductsFromCart, updateMainShoppingCart } from "./cartfunction.js";
import { displayCategories } from "./categoryDisplay.js";

const listSection = document.querySelector(".product-list");
const searchInput = document.querySelector("#searchbar");
// const productsInCart = getProductsFromCart();

//looping through filtered API results??????
// selectCategory();

//Filter from searchbar: update search when typing
searchInput.addEventListener("input", () => {
  displayProducts();
});

async function displayProducts() {
  //Filter from searchbar
  let query = searchInput.value;
  // console.log("Query: ", query);

  //loading indicator
  showLoadingIndicator(listSection);

  //loading the right Main shopping cart icon when loading the page
  updateMainShoppingCart();

  //fetching API
  const product = await fetchJackets();

  //Filter items - from using searchbar (WORKING)
  let productsFiltered = product.filter((allItems) => {
    if (query === "") {
      return allItems;
    } else if (allItems.title.toLowerCase().includes(query.toLowerCase())) {
      return allItems;
    }
  });

  //clearing loading indicator
  listSection.innerHTML = "";

  // looping through API results
  displayCategories(productsFiltered);

  //add items to cart
  const addToCartButton = document.querySelectorAll(".shopping-bag");
  addToCartButton.forEach((cartButtons) => {
    cartButtons.addEventListener("click", eventSaveLocally);
  });
}
displayProducts();
