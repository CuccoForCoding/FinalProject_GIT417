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

let cart = [];

const taxRate = 0.06;
const flatShippingRate = 25;

const addToCartButtons = document.querySelector(".addToCartBTN");
const cartItemList = document.querySelector(".cartItemList");
const subTotalValue = document.getElementById("subTotalValue");
const taxValue = document.getElementById("taxValue");
const shippingValue = document.getElementById("shippingValue");
const totalValue = document.getElementById("totalValue");
const checkoutBtn = document.getElementById("checkoutBtn");

for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", function() {
        const productItem = addToCartButtons[i];
        
    });
}



/*

NOTES TO SELF: 

The cleanest Loop for changing nav item colors:

const navItems = document.querySelectorAll(".navItem a");

navItems.forEach(link => {
    link.addEventListener("mouseover", () => link.style.color = "blue");
    link.addEventListener("mouseout", () => link.style.color = "");
});


*/