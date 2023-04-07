


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
    $('#cart').collapse('hide');
    $('#store').collapse('hide');
    $('#confirmation').collapse('show');
    console.log("went to confirmation");
}