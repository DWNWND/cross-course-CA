export function getProductsFromCart() {
  const inCart = localStorage.getItem('inCart');

  if (!inCart) {
    return [];
  }

  return JSON.parse(inCart);
}

function addToCart(product) {
  localStorage.setItem('inCart', JSON.stringify(product));
}

// For indivitual products page
export function eventSaveLocallyProduct(event) {
  event.target.classList.toggle('add-btn');
  event.target.classList.toggle('added-btn');

  const { id } = event.target.dataset;
  const { title1 } = event.target.dataset;
  const { title2 } = event.target.dataset;
  const { img } = event.target.dataset;
  const { price } = event.target.dataset;
  const { description } = event.target.dataset;
  const discountedPrice = event.target.dataset.discountedprice;
  const onSale = event.target.dataset.onsale;

  // Const sizeArray = sizes.split(",");

  const productsCurrentlyInCart = getProductsFromCart();

  const productExists = productsCurrentlyInCart.find((item) => item.id === id);

  if (!productExists) {
    const item = {
      id,
      title1,
      title2,
      img,
      price,
      description,
      discountedPrice,
      onSale,
    };
    productsCurrentlyInCart.push(item);
    addToCart(productsCurrentlyInCart);
    event.target.innerHTML = 'added';
    event.target.classList.add('added-btn');
    event.target.classList.remove('add-btn');
    updateMainShoppingCart();
  } else if (productExists) {
    const updatedProductList = productsCurrentlyInCart.filter(
      (item) => item.id !== id,
    );
    addToCart(updatedProductList);
    updateMainShoppingCart();
    event.target.innerHTML = 'add to bag';
    event.target.classList.add('add-btn');
    event.target.classList.remove('added-btn');
  }

  // 	If (!productExists) {
  // 		event.target.innerHTML = 'added';
  // 		event.target.classList.add('added-btn');
  // 		event.target.classList.remove('add-btn');
  // 		updateMainShoppingCart();
  // 	} else {
  // 		updateMainShoppingCart();
  // 		event.target.innerHTML = 'add to bag';
  // 		event.target.classList.add('add-btn');
  // 		event.target.classList.remove('added-btn');
  // 	}
}

// For list views
export function eventSaveLocallyList(event) {
  event.target.classList.toggle('shopping-bag_icon-empty');
  event.target.classList.toggle('shopping-bag_icon-added-product');

  const { id } = event.target.dataset;
  const { title1 } = event.target.dataset;
  const { title2 } = event.target.dataset;
  const { img } = event.target.dataset;
  const { price } = event.target.dataset;
  const { description } = event.target.dataset;
  // Const sizes = event.target.dataset.sizes;
  const discountedPrice = event.target.dataset.discountedprice;
  const onSale = event.target.dataset.onsale;
  // Const sizeArray = sizes.split(",");

  const productsCurrentlyInCart = getProductsFromCart();

  const productExists = productsCurrentlyInCart.find((item) => item.id === id);

  if (!productExists) {
    const item = {
      id,
      title1,
      title2,
      img,
      price,
      description,
      discountedPrice,
      onSale,
    };
    productsCurrentlyInCart.push(item);
    addToCart(productsCurrentlyInCart);
    updateMainShoppingCart();
  } else if (productExists) {
    const updatedProductList = productsCurrentlyInCart.filter(
      (item) => item.id !== id,
    );
    addToCart(updatedProductList);
    updateMainShoppingCart();
  }
}

// UPDATE MAIN SHOPPING CART ICON
export function updateMainShoppingCart() {
  const productsInCart = getProductsFromCart();
  const shoppingCartTopRight = document.querySelector('.shoppingbag');

  if (productsInCart.length > 1 || productsInCart.length === 1) {
    shoppingCartTopRight.innerHTML =
      ' <div alt="link to shopping-bag" class="shoppingbag_icon shopping-bag_icon-added-product"></div>';
  } else {
    shoppingCartTopRight.innerHTML =
      ' <img src="/images/icons/shopping-bag.png" alt="link to shopping-bag" class="shoppingbag_icon" />';
  }
}

export function removeFromCart(event) {
  const productsCurrentlyInCart = getProductsFromCart();

  const { id } = event.target.dataset;
  const buttonClicked = event.target;
  const productClicked = buttonClicked.parentElement;

  const productExists = productsCurrentlyInCart.find((item) => item.id === id);

  if (productExists) {
    const updatedProductList = productsCurrentlyInCart.filter(
      (item) => item.id !== id,
    );
    addToCart(updatedProductList);
    productClicked.remove();
    emptyCartMessage();
  }
}

// EMPTY CART MESSAGE
export function emptyCartMessage() {
  const shoppingCartTopRight = document.querySelector('.shoppingbag');
  const checkoutSection = document.querySelector('.checkout-section');
  const productsInCart = getProductsFromCart();

  if (productsInCart.length === 0) {
    checkoutSection.style.display = 'block';
    checkoutSection.innerHTML =
      '<div class="montserrat bold empty-cart">You don\'t have any items in your cart.</div>';
    shoppingCartTopRight.innerHTML =
      ' <img src="images/icons/shopping-bag.png" alt="link to shopping-bag" class="shoppingbag_icon"/>';
  }
}

// Update total sum
export function updateCartTotal() {
  const productsCurrentlyInCart = getProductsFromCart();
  let sum = 0;
  if (productsCurrentlyInCart) {
    for (let i = 0; i < productsCurrentlyInCart.length; i++) {
      sum += parseInt(productsCurrentlyInCart[i].discountedPrice, 10);
    }
  }

  return sum;
}
