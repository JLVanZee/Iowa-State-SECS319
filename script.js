fetch("./products.json")
        .then(response => response.json())
        .then(games => uploadBalls(games));


function uploadBalls(data) {
    for (var i = 1; i <= 6; ++i) {
        let textContainer = document.getElementById("text"+i);
        let imageContainer = document.getElementById("image"+i);

        let title = data.products[i-1].title;
        let desc = data.products[i-1].description;
        let price = data.products[i-1].price;
        let img = data.products[i-1].image;

        let div = document.createElement("div");
        div.innerHTML = `
            <p><b>${title}</b> <br>
            <b>$${price}</b><br><br>
            ${desc}</p>
            `
        textContainer.appendChild(div);

        let imgDiv = document.createElement("div");
        imgDiv.innerHTML = `
            <style>
                img {
                    width: 100%;
                    height: 225;
                }
            </style>
            <img src=${img} alt="product picture">
            `
        imageContainer.appendChild(imgDiv);
    }
}

function goToCheckout() {
    $('#store').collapse('hide');
    $('#confirmation').collapse('hide');
    $('#cart').collapse('show');
    console.log("went to cart");
}

function goToStore() {
    $('#cart').collapse('hide');
    $('#confirmation').collapse('hide');
    $('#store').collapse('show');
    console.log("went to store");
}

function goToConfirmation() {

    if(!paymentInfoCheck()) {
        console.log("Payment Info not Sufficient");
        return;
    };
    $('#cart').collapse('hide');
    $('#store').collapse('hide');
    $('#confirmation').collapse('show');
    console.log("went to confirmation");
}

// use productId to reference each part of the array
// number of each product in cart
let cart = [0,0,0,0,0,0];

function addToCart(id) {
    if(id < cart.length){
        cart[id] += 1;
        console.log("Product: " + id + " added to cart.");
    } else {
        console.log("Product: " + id + " could not be added to cart.");
    }
    
}

function removeFromCart(id) {
    if(cart[id] > 0){
        cart[id] -= 1;
        console.log("Product: " + id + " removed from cart.");
    } else {
        console.log("Product: " + id + " could not be removed from cart.");
    }
}

function resetCart() {
    for(let i = 0; i < cart.length; i++){
        cart[i] = 0;
    }
    console.log("Cart has been reset.");
}

function search() {
    let productName = document.forms["search_form"]["search_input"];
    let inputProductName = productName.value;
    console.log("searching");

    fetch("./products.json")
        .then(response => response.json())
        .then(balls => loadResults(balls));

    function loadResults(data) {
        for (var i = 1; i <= 6; ++i) {
            if(inputProductName !== data.products[i-1].title){
                
                $('#card'+i).collapse('hide');
                console.log("Hide");
            } else {
                $('#card'+i).collapse('show');
                console.log("Show");
            }
            
            
    
        }
    }
    
    console.log("done searching");
}


(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

function paymentInfoCheck() {
    fields = ["firstName", "lastName", "address", "country", "state", "zip", "cccardName", "ccnumber", "ccexpiration", "cccvv"];


    //let confirmation = document.forms["paymentValidation"][""];

    var i, l = fields.length;
    var fieldname;
    for (i = 0; i < l; i++) {
        fieldname = fields[i];
        if (document.forms["paymentValidation"][fieldname].value === "") {
            return false;
        }
    }
    return true;
}