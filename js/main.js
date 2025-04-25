import { getFlagUrl, getWeather } from "./api.js";
import {
  displayWeather,
  elements,
  hideError,
  hideLoader,
  showLoader,
} from "./ui.js";
import cities from "./constants.js";

const body = document.body;

const savedTheme = localStorage.getItem("data-theme") || "light";

body.setAttribute("data-theme", savedTheme);

elements.themeBtn.addEventListener("click", () => {

  const currentTheme = body.getAttribute("data-theme");

  const newTheme = currentTheme === "light" ? "dark" : "light";

  body.setAttribute("data-theme", newTheme);

  localStorage.setItem("data-theme", newTheme);

});

document.addEventListener("DOMContentLoaded", () => {
  createOption(cities);
});

elements.form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = e.target[0].value.trim();

  if(!query) {

    return;
  }

  showLoader();

  try {
    const weatherData = await getWeather(query);

    const flagUrl = getFlagUrl(weatherData.sys.country);

    displayWeather(weatherData, flagUrl);

    hideError();
  } catch (error) {

    showError();
  }
  finally {
    hideLoader();
  }
});

const createOption = (cities) => {

  cities.forEach((city) => {

    const option = document.createElement("option");

    option.value = city;

    elements.citiesDataList.appendChild(option);
  });
};