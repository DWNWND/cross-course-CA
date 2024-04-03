import {
	fetchJackets,
	createTitle1,
	createTitle2,
	showLoadingIndicator,
} from './global.js';

export const sliderSection = document.querySelector('.product-slider');
const adSection = document.querySelector('.ad-section');

async function displayProducts() {
	showLoadingIndicator(sliderSection);
	showLoadingIndicator(adSection);
	const product = await fetchJackets();

	const adContainer = document.createElement('div');

	sliderSection.innerHTML = '';
	adSection.innerHTML = ''; // Clearing the loading indicator

	for (let i = 0; i < product.length; i++) {
		const title1 = createTitle1(product[i]);
		const title2 = createTitle2(product[i]);

		const productContainer = document.createElement('div');
		productContainer.classList.add('product');

		productContainer.innerHTML += `
    <a href="checkout.html" class="shopping-bag">
      <img src="images/icons/shopping-bag.png" alt="link to shopping-bag" />
    </a>
    <a href="product.html?key=${product[i].id}" class="product-link">
      <img src="${product[i].image}" alt="${product[i].description}" class="jacket" />
    </a>
    <div class="product-text block margin-left">
      <p class="productname">${title1}</p>
      <a href="product.html?key=${product[i].id}" class="black">${title2}</a>
      <p class="productprice">$${product[i].price}</p>
    </div>`;
		productContainer.addEventListener('click', () => {
			window.location.href = `product.html?key=${product[i].id}`;
		});
		sliderSection.appendChild(productContainer);

		if (i === 6) {
			break;
		}
	}

	adContainer.addEventListener('click', () => {
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
}

displayProducts();
