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
  "http://fake-hotel-api.herokuapp.com/api/hotels?count=10&no_error=true&min_stars=3";
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
          reviews = createNodeWithClass("button", "reviewsButton"),
          closeReviews = createNodeWithClass("button", "closeReviews"),
          modalReviews = createNodeWithClass("li", "modal-reviews");

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
              // If the client click the review button show the modal and hide the normal view
              reviews.addEventListener("click", function() {
                hotelReviews(hotel, response.data, modalReviews, closeReviews);

                modalReviews.style.cssText = "display:block;position:relative;";
                img.style.cssText = "display:none;";
                divName.style.cssText = "display:none;";
                divStars.style.cssText = "display:none;";
                divCity.style.cssText = "display:none;";
                hr.style.cssText = "display:none;";
                divPrice.style.cssText = "display:none;";
                hrPrice.style.cssText = "display:none;";
                reviews.style.cssText = "display:none;";

                // If the client click the x button close the modal and show the normal view
                closeReviews.addEventListener("click", function() {
                  modalReviews.style.cssText = "display:none;";
                  img.style.cssText = "display:block;";
                  divName.style.cssText = "display:block;";
                  divStars.style.cssText = "display:block;";
                  divCity.style.cssText = "display:block;";
                  hr.style.cssText = "display:block;";
                  divPrice.style.cssText = "display:block;";
                  hrPrice.style.cssText = "display:block;";
                  reviews.style.cssText = "display:block;";
                });
              });
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

        append(li, modalReviews);
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

let showMore = document.getElementById("showMore");
showMore.addEventListener("click", moreHotels);

function moreHotels() {
  fetchData();
}

function hotelReviews(hotel, reviews, modal, closeElement) {
  closeElement.innerHTML = `X`;
  append(modal, closeElement);

  if (hotel.id === reviews[0].hotel_id) {
    // elements of the modal
    let NumberOfreviews = createNodeWithClass("div", "numberReviews"),
      hrAfterNumber = createNodeWithClass("hr", "hrAfterNumber");

    NumberOfreviews.innerHTML = `Reviews ${reviews.length}`;
    append(modal, NumberOfreviews);
    checkReview = true;
    append(modal, hrAfterNumber);
    reviews.map(review => {
      let nameReviewer = createNodeWithClass("div", "nameReviewer"),
        comment = createNodeWithClass("div", "comment"),
        positive = createNodeWithClass("div", "positive"),
        hrComment = createNodeWithClass("hr", "hrComment");

      nameReviewer.innerHTML = `&#9787; ${review.name}`;
      comment.innerHTML = `&#9998; ${review.comment}`;
      positive.innerHTML = `Positive review: ${
        review.positive === true ? `&check;` : `&cross;`
      }`;
      append(modal, nameReviewer);
      append(modal, comment);
      append(modal, positive);
      append(modal, hrComment);
    });

    console.log(hotel, reviews, modal);
  }
}
