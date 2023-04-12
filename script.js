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
    buildCart();
    console.log("went to cart");
}

function goToStore() {
    $('#cart').collapse('hide');
    $('#confirmation').collapse('hide');
    $('#store').collapse('show');
    console.log("went to store");
}

function goToConfirmation() {
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
        updateProductCount(id, cart[id]);
    } else {
        console.log("Product: " + id + " could not be added to cart.");
    }
}

function removeFromCart(id) {
    if(cart[id] > 0){
        cart[id] -= 1;
        console.log("Product: " + id + " removed from cart.");
        updateProductCount(id, cart[id]);
    } else {
        console.log("Product: " + id + " could not be removed from cart.");
    }
}

function resetCart() {
    for(let i = 0; i < cart.length; i++){
        cart[i] = 0;
        updateProductCount(i, 0);
    }
    console.log("Cart has been reset.");
}

function updateProductCount(id, newValue) {
    document.getElementById("num"+id).innerHTML = "Total: " + newValue;
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

function buildCart() {
    console.log("entered build cart");
    //resets the cart to rebuild it, necessary when cart has already been built at least once
    document.getElementById("cartDisplay").innerHTML = "";
    console.log("reset cart page");
       
    fetch("./products.json")
        .then(response => response.json())
        .then(items => displayCart(items));

    function displayCart(items) {
        let shopContainer = document.getElementById("cartDisplay");
        let finalPrice = 0;
        
        for(var i = 0; i < cart.length; ++i) {
            if (cart[i] == 0) {
                continue;
            }

            let title = items.products[i].title;
            let price = items.products[i].price;
            let img = items.products[i].image;
            
            let div = document.createElement("div");
            let subtotal = getTotal(price, i);
            finalPrice = ((finalPrice * 100) + (subtotal * 100)) / 100.0;
            finalPrice.toFixed(2);
            
            
            div.innerHTML = `
                <div class="row border-top border-bottom">
                    <div class="row main align-items-center">
                        <div class="col-2"><img class="img-fluid" src=${img}></div>
                        <div class="col">
                            <div class="row">${title}</div>
                        </div>
                        <div class="col">
                            <a>In Cart: ${cart[i]}</a>
                        </div>
                        <div class="col">Sub Total: $${subtotal}</div>
                    </div>
                </div>
            `
            shopContainer.appendChild(div);
        }

        

    }
    console.log("Cart Built");
}

function getTotal(price, cartID) {
    if (cart[cartID] == 0) {
        return 0;
    }
    
    let cents = price * 100;
    cents *= cart[cartID];
    let finalPrice = cents / 100.0;
    return finalPrice.toFixed(2);
}

