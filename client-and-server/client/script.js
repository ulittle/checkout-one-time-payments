// The max and min number of photos a customer can purchase


var basicPhotoButton = document.getElementById("basic-photo-button");
document
  // .getElementById("quantity-input") // <-- Original component
    .getElementById("amountInDollars")
    .addEventListener("change", function(evt) {
    // Ensure customers only buy between 1 and 10 photos
    // if (evt.target.value < MIN_PHOTOS) {
    //   evt.target.value = MIN_PHOTOS;
    // }
    // if (evt.target.value > MAX_PHOTOS) {
    //   evt.target.value = MAX_PHOTOS;
    // }

      console.log(" --> " +  $("#amountInDollars option:selected").text());


  });




/* Handle any errors returns from Checkout  */
var handleResult = function(result) {
  if (result.error) {
    var displayError = document.getElementById("error-message");
    displayError.textContent = result.error.message;
  }
};

// Create a Checkout Session with the selected quantity
var createCheckoutSession = function(stripe) {
  var inputEl = document.getElementById("amountInDollars");
  var quantity = parseInt(inputEl.value);

  return fetch("./create-checkout-session.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      quantity: quantity
    })
  }).then(function(result) {
    return result.json();
  });
};

// Handle any errors returned from Checkout
var handleResult = function(result) {
  if (result.error) {
    var displayError = document.getElementById("error-message");
    displayError.textContent = result.error.message;
  }
};

/* Get your Stripe public key to initialize Stripe.js */
fetch("http://localhost:8888/portal_semantic/stripe/client-and-server/server/php/config")
  .then(function(result) {
    return result.json();
    alert("TEST !")
  })
  .then(function(json) {
    window.config = json;
    var stripe = Stripe(config.publicKey);

    // Setup event handler to create a Checkout Session on submit
    document.querySelector("#submitButton").addEventListener("click", function(evt) {
      createCheckoutSession().then(function(data) {
        stripe
          .redirectToCheckout({
            sessionId: data.sessionId
          })
          .then(handleResult);
      });
    });
  });
