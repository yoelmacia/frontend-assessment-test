const axios = require("axios");
import "../styles/index.scss";
function fetchData() {
  axios("http://fake-hotel-api.herokuapp.com/api/hotels")
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

fetchData();
