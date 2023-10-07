export const url = "https://api.noroff.dev/api/v1/rainy-days/";
const errorMessage = "Can't seem to reach server...";

//EXAMPLE ERROR MESSAGE TO INC
// function displayMessage(messageType, message, target) {
//   const element = document.querySelector(target);

//   element.innerHTML = `<div class="message ${messageType}">${message}</div>`;
// }
//with this in the async api call
// } catch (error) {
//   console.log(error);
//   displayMessage("error", error, ".team-container");
// }

//RENDER CATEGORIES -- REMOVE??
export function renderCategory(categoryToRender) {
  const listSection = document.querySelector(".product-list");
  listSection.innerHTML = "";

  categoryToRender.forEach(function (category) {
    listSection.innerHTML += `<div class="">
                                      <h4>${category}Rendered?</h4>
                                  </div>`;
  });
}

//SELECT CATEGORY - REMOVE??
export function selectCategory(categories) {
  const categorySelector = document.querySelector(".men");

  categorySelector.onkeyup = function (event) {
    console.log(event);
    console.log("clicked men");

    // const searchValue = event.target.value.trim().toLowerCase();

    // const filteredProducts = categories.filter(function (item) {
    //   if (item.gender.toLowerCase().startsWith(searchValue)) {
    //     return true;
    //   }
    // });
    // renderCategory(filteredProducts);
  };
}

// //API call ALL products
export async function fetchJackets() {
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (error) {
    const main = document.querySelector("main");
    main.innerHTML = `<div class="error-message montserrat bold red">${errorMessage}</div>`;
  }
}

//getting the product ID for API call - product spesific
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("key");

// console.log(queryString)

// API call by ID
export async function fetchJacketById() {
  try {
    const response = await fetch(url + id);
    const results = await response.json();
    return results;
  } catch (error) {
    const main = document.querySelector("main");
    main.innerHTML = `<div class="error-message montserrat bold brown">${errorMessage}</div>`;
  }
}

// Loading indicator
export function showLoadingIndicator(section) {
  section.innerHTML = `<div class="loader"></div>`;
}

//Title split
export function createTitle1(titleParam) {
  const title = titleParam.title;
  const titleArray = title.split(" ");
  const rainyDaysTitle = `${titleArray[0]} ${titleArray[1]}`;
  return rainyDaysTitle;
}
export function createTitle2(titleParam) {
  const title = titleParam.title;
  const titleArray = title.split(" ");
  if (!titleArray[4]) {
    titleArray[4] = "";
  } //if the fourth word is undefined, do not show.
  const jacketTitle = `${titleArray[2]} ${titleArray[3]} ${titleArray[4]}`;
  return jacketTitle;
}

//OLD FILTERIN TRIES
//getting the product GENDER for API call - product spesific
// const queryString = document.location.search;
// const params = new URLSearchParams(queryString);
// const gender = params.get("gender");
// console.log(gender)

// API call by GENDER
// export async function fetchJacketById() {
//   try {
//     const response = await fetch(url + id);
//     const results = await response.json();
//     return results;
//   } catch (error) {
//     const main = document.querySelector("main");
//     main.innerHTML = `<div class="error-message montserrat bold brown">${errorMessage}</div>`;
//   }
// }
