const axios = require("axios");
import "../styles/index.scss";

function createNodeWithClass(element, className) {
  let node = document.createElement(element);
  node.className = className;
  return node;
}

function append(parent, el) {
  return parent.appendChild(el);
}

document.addEventListener("scroll", hideNavOnScroll);

function hideNavOnScroll() {
  let currentScrollPos = window.pageYOffset;
  if (currentScrollPos > 0) {
    document.getElementById("navbar").style.top = "-50px";
  } else {
    document.getElementById("navbar").style.top = "0";
  }
  currentScrollPos = 0;
}

const ul = document.getElementById("hotels");
const url =
  "http://fake-hotel-api.herokuapp.com/api/hotels?count=10&no_error=true";

function fetchData() {
  axios(url)
    .then(response => {
      let hotels = response.data;
      return hotels.map(hotel => {
        let li = createNodeWithClass("li", "grid-item"),
          divName = createNodeWithClass("div", "divName"),
          divCity = createNodeWithClass("div", "divCity"),
          divCountry = createNodeWithClass("div", "divCountry"),
          divDescription = createNodeWithClass("div", "divDescription"),
          divPrice = createNodeWithClass("div", "divPrice"),
          divRating = createNodeWithClass("div", "divRating"),
          divStars = createNodeWithClass("div", "divStars"),
          img = createNodeWithClass("img", "image");

        divName.innerHTML = `Name: ${hotel.name}`;
        divCity.innerHTML = `City: ${hotel.city}`;
        divCountry.innerHTML = `Country : ${hotel.country}`;
        divDescription.innerHTML = `Description: ${hotel.description}`;
        divPrice.innerHTML = `Price: ${hotel.price}`;
        divRating.innerHTML = `Rating: ${hotel.rating}`;
        divStars.innerHTML = `Stars: ${hotel.stars}`;
        img.src = `${hotel.images[0]}`;

        append(li, img);
        append(li, divName);
        append(li, divCity);
        append(li, divCountry);
        append(li, divDescription);
        append(li, divPrice);
        append(li, divRating);
        append(li, divStars);
        append(ul, li);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

fetchData();
