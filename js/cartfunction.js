export function getProductsFromCart() {
  const inCart = localStorage.getItem("inCart");

  if (!inCart) {
    return [];
  } else {
    return JSON.parse(inCart);
  }
}

function addToCart(product) {
  localStorage.setItem("inCart", JSON.stringify(product));
}

export function eventSaveLocally(event) {
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
    updateMainShoppingCart();
  } else {
    const updatedProductList = productsCurrentlyInCart.filter((item) => item.id !== id);
    addToCart(updatedProductList);
    updateMainShoppingCart();
  }
}

//UPDATE MAIN SHOPPING CART ICON
function updateMainShoppingCart() {
  const productsInCart = getProductsFromCart();
  const shoppingCartTopRight = document.querySelector(".shoppingbag");

  if (productsInCart.length > 1 || productsInCart.length === 1) {
    shoppingCartTopRight.innerHTML = ` <div alt="link to shopping-bag" class="shoppingbag_icon shopping-bag_icon-added-product"></div>`;
  } else {
    shoppingCartTopRight.innerHTML = ` <img src="images/icons/shopping-bag.png" alt="link to shopping-bag" class="shoppingbag_icon" />`;
  }
}

export function removeFromCart() {
  const productsCurrentlyInCart = getProductsFromCart();

  const id = event.target.dataset.id;
  const buttonClicked = event.target;
  const productClicked = buttonClicked.parentElement;

  const productExists = productsCurrentlyInCart.find(function (item) {
    return item.id === id;
  });

  if (productExists) {
    const updatedProductList = productsCurrentlyInCart.filter((item) => item.id !== id);
    addToCart(updatedProductList);
    productClicked.remove();
    emptyCartMessage();
  }
}

//EMPTY CART MESSAGE
export function emptyCartMessage() {
  const shoppingCartTopRight = document.querySelector(".shoppingbag");
  const checkoutSection = document.querySelector(".checkout-section");
  var productsInCart = getProductsFromCart();

  if (productsInCart.length === 0) {
    checkoutSection.style.display = "block";
    checkoutSection.innerHTML = `<div class="montserrat bold empty-cart">You don't have any items in your cart.</div>`;
    shoppingCartTopRight.innerHTML = ` <img src="images/icons/shopping-bag.png" alt="link to shopping-bag" class="shoppingbag_icon"/>`;
  }
}
