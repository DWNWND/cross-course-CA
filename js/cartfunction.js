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

export function eventSaveLocally() {
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
