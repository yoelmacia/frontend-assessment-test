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
const urlReviews = "http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id=";

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
          img = createNodeWithClass("img", "image"),
          hr = createNodeWithClass("hr", "hr"),
          hrPrice = createNodeWithClass("hr", "hrPrice"),
          reviews = createNodeWithClass("button", "reviewsButton");

        divName.innerHTML = `${hotel.name}`;
        divStars.innerHTML = `${
          hotel.stars === 1
            ? `&starf;`
            : hotel.stars === 2
            ? `&starf;&starf;`
            : hotel.stars === 3
            ? `&starf;&starf;&starf;`
            : hotel.stars === 4
            ? `&starf;&starf;&starf;&starf;`
            : `&starf;&starf;&starf;&starf;&starf;`
        }`;
        divCity.innerHTML = `${hotel.city}`;
        divCountry.innerHTML = `Country : ${hotel.country}`;
        divDescription.innerHTML = `Description: ${hotel.description}`;
        divPrice.innerHTML = `${hotel.price}€`;
        axios(urlReviews + `${hotel.id}`)
          .then(response => {
            if (response.data.length === 0) {
              reviews.style.cssText =
                "pointer-events:none;background-color:#d7d7d7;border:1px solid black;color:black";
              reviews.innerHTML = `No Reviews`;
            } else {
              reviews.innerHTML = `Read Reviews (${response.data.length})`;
            }
          })
          .catch(error => {
            console.log(error);
          });
        divRating.innerHTML = `${hotel.rating}`;
        img.src = `${hotel.images[0]}`;
        img.onerror = function() {
          img.src =
            "https://www.altayyaronline.com/contentserver/commons/hotel/en/not-found.png";
        };

        append(li, img);
        append(li, divName);
        append(li, divStars);
        append(li, divCity);
        append(li, hr);
        append(li, divPrice);
        append(li, hrPrice);
        append(li, reviews);
        append(ul, li);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

fetchData();
