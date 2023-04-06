


function goToCheckout() {
    $('#store').collapse('hide');
    $('#checkout').collapse('show');
    console.log("went to checkout");
}

function goToStore() {
    $('#checkout').collapse('hide');
    $('#store').collapse('show');
    console.log("went to store");
}