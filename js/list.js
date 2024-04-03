import {
	fetchJackets,
	createTitle1,
	createTitle2,
	showLoadingIndicator,
} from './global.js';

const listSection = document.querySelector('.product-list');

async function displayProducts() {
	showLoadingIndicator(listSection);
	const product = await fetchJackets();

	listSection.innerHTML = ''; // Clearing loading indicator

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

		listSection.appendChild(productContainer);

		if (i === 9) {
			break;
		}
	}
}

displayProducts();
