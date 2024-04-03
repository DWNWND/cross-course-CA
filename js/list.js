import { fetchJackets, showLoadingIndicator } from './global.js';
import {
  eventSaveLocallyList,
  updateMainShoppingCart,
} from './cartfunction.js';
import { renderProducts } from './renderProducts.js';

const sortingSection = document.querySelector('.sorting');
const productList = document.querySelector('.product-list');
const searchInput = document.querySelector('#searchbar');

const categorySelector = document.querySelector('.category');
const selectedCategory = categorySelector.innerHTML;

const theTrueCategorySelector = document.querySelector('.true-category');
const theTrueCategoryName = theTrueCategorySelector.innerHTML;

const h1 = document.querySelector('.h1_list');

// Checking which category we´re on
console.log('selected category: ', theTrueCategoryName.toLowerCase());

// Const productsInCart = getProductsFromCart();

// Filter from searchbar: update search whenever typing in searchfield
searchInput.addEventListener('input', () => {
  displaySearchedProducts();
});

async function displaySearchedProducts() {
  // Filter from searchbar
  const query = searchInput.value;

  // Loading indicator
  showLoadingIndicator(productList);

  // Loading the right Main shopping cart icon when loading the page
  updateMainShoppingCart();

  // Fetching API
  const product = await fetchJackets();
  console.log(product.gender.toLowerCase());

  // Filter categories - using selectedCategory (WORKING)
  const productsCategoriesed = product.filter((allItems) => {
    if (
      allItems.gender.toLowerCase().includes(theTrueCategoryName.toLowerCase())
    ) {
      return allItems;
    }

    if (selectedCategory.toLowerCase().includes('on sale') && allItems.onSale) {
      return allItems;
    }

    if (
      selectedCategory.toLowerCase().includes('new in') &&
      allItems.favorite
    ) {
      return allItems;
    }

    return allItems;
  });

  // Filter items - from using searchbar (WORKING IN LIST VIEW) - Also takes the categories into consideration
  const productsFiltered = product.filter((allItems) => {
    if (query === '') {
      h1.innerHTML = theTrueCategoryName;
      return productsCategoriesed;
    }

    if (allItems.title.toLowerCase().includes(query.toLowerCase())) {
      h1.innerHTML = 'Search results';
      return allItems;
    }

    return allItems;
  });

  // Clearing loading indicator
  productList.innerHTML = '';

  // Looping through results
  renderProducts(productsFiltered);

  // Add items to cart
  const addToCartButton = document.querySelectorAll('.shopping-bag');
  addToCartButton.forEach((cartButtons) => {
    cartButtons.addEventListener('click', eventSaveLocallyList);
  });
}

async function displayCategorizedProducts() {
  // Loading indicator
  showLoadingIndicator(productList);

  // Loading the right Main shopping cart icon when loading the page
  updateMainShoppingCart();

  // Fetching API
  const product = await fetchJackets();

  // Filter categories - using selectedCategory (WORKING)
  const productsCategoriesed = product.filter((allItems) => {
    if (allItems.gender.toLowerCase() === theTrueCategoryName.toLowerCase()) {
      return allItems;
    }

    if (selectedCategory.toLowerCase().includes('on sale') && allItems.onSale) {
      return allItems;
    }

    if (
      selectedCategory.toLowerCase().includes('new in') &&
      allItems.favorite
    ) {
      return allItems;
    }

    return allItems;
  });

  // Let productsCategoriesed = product.filter((allItems) => {
  //   if (allItems.categories[0].name.toLowerCase().includes(theTrueCategoryName.toLowerCase())) {
  //     return allItems;
  //   }
  //   if (selectedCategory.toLowerCase().includes("on sale") && allItems.onSale) {
  //     return allItems;
  //   }
  //   if (selectedCategory.toLowerCase().includes("new in") && allItems.favorite) {
  //     return allItems;
  //   }
  // });
  // clearing loading indicator
  productList.innerHTML = '';

  // Looping through the results
  renderProducts(productsCategoriesed);

  // Sorting section
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

  // Add items to cart
  const addToCartButton = document.querySelectorAll('.shopping-bag');
  addToCartButton.forEach((cartButtons) => {
    cartButtons.addEventListener('click', eventSaveLocallyList);
  });
}

displayCategorizedProducts();
