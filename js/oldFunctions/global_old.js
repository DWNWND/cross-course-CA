const url = 'https://api.noroff.dev/api/v1/rainy-days/';
const errorMessage = "Can't seem to reach server...";

// Getting the product ID for API call - product spesific
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('key');

// //API call ALL products
export async function fetchJackets() {
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch {
    const main = document.querySelector('main');
    main.innerHTML = `<div class="error-message montserrat bold red">${errorMessage}</div>`;
  }
}

// API call by ID
export async function fetchJacketById() {
  try {
    const response = await fetch(url + id);
    const results = await response.json();
    return results;
  } catch {
    const main = document.querySelector('main');
    main.innerHTML = `<div class="error-message montserrat bold brown">${errorMessage}</div>`;
  }
}

// Loading indicator
export function showLoadingIndicator(section) {
  section.innerHTML = '<div class="loader"></div>';
}

// Title split
export function createTitle1(titleParam) {
  const { title } = titleParam;
  const titleArray = title.split(' ');
  const rainyDaysTitle = `${titleArray[0]} ${titleArray[1]}`;
  return rainyDaysTitle;
}

export function createTitle2(titleParam) {
  const { title } = titleParam;
  const titleArray = title.split(' ');
  titleArray[4] ||= ''; // If the fourth word is undefined, do not show.

  const jacketTitle = `${titleArray[2]} ${titleArray[3]} ${titleArray[4]}`;
  return jacketTitle;
}
