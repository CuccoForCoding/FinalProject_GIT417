//Original loop I wrote for changing nav li's colors instead of just doing a CSS :hover.
let navColor = document.getElementsByClassName("navItem");

for (let item of navColor) {
    item.addEventListener("mouseover", () => {
        item.querySelector("a").style.color = "var(--green)";
        item.querySelector("a").style.fontSize = "40px";
        item.querySelector("a").style.textDecoration = "underline";
    });

    item.addEventListener("mouseout", () => {
        item.querySelector("a").style.color = "";
        item.querySelector("a").style.fontSize = "";
        item.querySelector("a").style.textDecoration = "";
    });
};

//Clean light/dark mode toggle with a .darkMode and .blend CSS class 
//uses global style variable var(--dark-gray) for background when clicked and also changes text color to var(--green)
//using const instead of let because I'm not reassigning toggleButton 
const toggleButton = document.getElementById("lightDarkModeBTN");

toggleButton.addEventListener("click", function() {
    document.body.classList.toggle("darkMode");
});

//THIS IS THE CODE/LOGIC FOR THE SHOPPING CART
//I AM ONLY DISPLAYING TO THE CONSOLE AND TO THE PAGE
//NO localStorage VARIABLES USED OR PAYMENT PROCESSING

//standard empty array to create my shopping cart
let cart = [];

//tax rate and shipping
//I live in Michigan so I did 6% tax and an easy
const TAX_RATE = 0.06;
let SHIPPING = 25; 


const addToCartButtons = document.querySelectorAll(".addToCartBtn");
const cartItemList = document.querySelector(".cartItemList");
const subtotalValue = document.getElementById("subtotalValue");
const taxValue = document.getElementById("taxValue");
const shippingValue = document.getElementById("shippingValue");
const totalValue = document.getElementById("totalValue");
const checkoutBtn = document.getElementById("checkoutBtn");

//standard for loop iteration for getting the 6 buttons associated with the "purchaseable" products and storing them in an array
//for each is cleaner, but I don't understand them as well
for (let i = 0; i < addToCartButtons.length; i++) {

    const button = addToCartButtons[i];

    //added an event listener for when one of the 6 buttons is clicked
    button.addEventListener("click", function() {
        const productItem = button.parentElement;

        //I used .textContexttextContent to get just the text from the name and price text elements.
        //Then I cleaned up the price string so parseFloat can turn it into a number.
        const name = productItem.querySelector(".productName").textContent;
        const priceText = productItem.querySelector(".productPrice").textContent;
        const price = parseFloat(priceText.replace("$", "").replace(",", ""));

        //I'm just stuffing an array named product with the two variables name and price
        //Then just pushing those variables to the shopping cart array when cliked
        const product = {
            name: name,
            price: price
        };
        //array showing up in console! yay!
        console.log(product);
        cart.push(product);
        //cant forget to call the updateCart() function or nothing will show up in the shopping cart for the user.
        updateCart();
    });
}

//event delegation so dynamically created remove buttons work
cartItemList.addEventListener("click", function(event) {

    if (event.target.classList.contains("removeBtn")) {
        const index = event.target.getAttribute("data-index");
        cart.splice(index, 1);
        //this wasn't working for a half hour because I FORGOT TO CALL updateCart() LOL!
        updateCart();
    }
});

//new function to update the shopping cart when an item is added
function updateCart() {

    let subtotal = 0;
    let cartHTML = "";

    //looping through the cart to get/update price
    for (let i = 0; i < cart.length; i++) {
        subtotal += cart[i].price;

        //this is where I'm appendong my "X" (remove button)
        //I remember this giving me trouble years ago on a client website
        //Unsure if it's industry standard, but I like to indent my concatinations at the + operator. I find it easier to read/understand
        cartHTML += "<li>" 
                 + cart[i].name  + " - $" 
                 + cart[i].price.toFixed(2)  
                 + " <button class='removeBtn' data-index='" 
                 + i 
                 + "'>X</button>"  + "</li>";
    }

    //tax and total calculations
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + (cart.length > 0 ? SHIPPING : 0);

    //forgot to add $
    //these update the cart display on the page for the user for sub total, tax, shipping, amd total
    cartItemList.innerHTML = cartHTML;
    subtotalValue.textContent = "$" + subtotal.toFixed(2);
    taxValue.textContent = "$" + tax.toFixed(2);
    shippingValue.textContent = cart.length > 0 ? "$" + SHIPPING.toFixed(2) : "$0.00";
    totalValue.textContent = "$" + total.toFixed(2);
}

//here i'm basically just telling the checkout button "HEY! if the cart has nothing in it, tell us that!"
checkoutBtn.addEventListener("click", function() {

    //If there aren't any items in the cart, display a custom alert...
    if (cart.length === 0) {
        alert("Cart Empty. Select Exclusive Offers Before They're GONE!");
        return;
    }

    //this is where I made a variable for the total in the cart of all values and pushed them into another alert message. 
    const finalTotal = totalValue.textContent;
    alert("EXCLUSIVES ON THE WAY! \nYour total was " + finalTotal + "\nSEE EMAIL FOR DETAILS!");

    //when the button gets clicked to get rid of the alert, the array for the cart clears and the entire cart is set back to 0.
    //leaves $0.00 which I really like.
    //REMINDER TO GO BACK TO THE HTML AND SET THE PLACEHOLDER TEXT TO $0.00 FOR: sub total, shipping, tax, and total
    cart = [];
    updateCart();
});

//GO BACK AND ADD PLACEHOLDER TEXT IN HTML FOR FORM
//THIS IS MY FORM VALIDATION LOGIC

/*

NOTES TO SELF: 

FOR EACH LOOPS ARE VERY CLEAN AND ARE ANOTHER WAY TO ITERATE
GO BACK AFTER PROJECT IS GRADED AND TRY THE SAME LOGIC WITH FOR EACH LOOPS

The cleanest Loop for changing nav item colors:

const navItems = document.querySelectorAll(".navItem a");

navItems.forEach(link => {
    link.addEventListener("mouseover", () => link.style.color = "blue");
    link.addEventListener("mouseout", () => link.style.color = "");
});


*/