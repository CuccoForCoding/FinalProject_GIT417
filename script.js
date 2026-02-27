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

//tax rate and shipping variables
//I live in Michigan so I did 6% tax and an easyflat shipping rate
const TAX_RATE = 0.06;
let SHIPPING = 25; 

//grabbing all of the appropriate form fields/inputs and creating variables
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
    //.toFixed(2) to only get the first two numbers after the decimal place
    cartHTML += "<li>" 
             + cart[i].name 
             + " - $" 
             + cart[i].price.toFixed(2) 
             + " <button class='removeBtn' data-index='" 
             + i 
             + "'>X</button>" 
             + "</li>";
  }

  //Charge shipping only if there’s at least one item in the cart. If the cart is empty, shipping is $0
  //theres another way to do this directly in the total variable removing the shipping cost variable 
  const tax = subtotal * TAX_RATE;
  let shippingCost;

    if (cart.length > 0) {
        shippingCost = SHIPPING;
    }else{
        shippingCost = 0;
    }

  const total = subtotal + tax + shippingCost;

  //forgot to add $
  //these update the cart display on the page for the user for sub total, tax, shipping, amd total
  cartItemList.innerHTML = cartHTML;
  subtotalValue.textContent = "$" + subtotal.toFixed(2);
  taxValue.textContent = "$" + tax.toFixed(2);
  shippingValue.textContent = cart.length > 0 ? "$" + SHIPPING.toFixed(2) : "$0.00";
  totalValue.textContent = "$" + total.toFixed(2);
}

//here i'm basically just telling the checkout button "HEY! if the cart has nothing in it, tell us that!"
checkoutBtn.addEventListener("click", function () {
  //If there aren't any items in the cart, display the string in the alert...
  if (cart.length === 0) {
    alert("Cart Empty. Select Exclusive Offers Before They're GONE!");
    return;
  }

  //this is where I made a variable for the total in the cart of all values and pushed them into another alert message.
  const finalTotal = totalValue.textContent;
  alert(
    "EXCLUSIVES ON THE WAY! \nYour total was " +
      finalTotal +
      "\nSEE EMAIL FOR DETAILS!",
  );

  //when the button gets clicked to get rid of the alert, the array for the cart clears and the entire cart is set back to 0.
  //leaves $0.00 which I really like.
  //REMINDER TO GO BACK TO THE HTML AND SET THE PLACEHOLDER TEXT TO $0.00 FOR: sub total, shipping, tax, and total
  cart = [];
  updateCart();
});

/*
 **CONTACT FORM VALIDATION***
 */

 //The way the ZyBook taught us to validate a form was to create one function called checkForm()
 //for this project I'm going to do the same.
function checkForm() {
  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName");
  const phoneNumber = document.querySelector("#phoneNumber");
  const emailAddress = document.querySelector("#emailAddress");
  const userMessage = document.querySelector("#userMessage");
  const contactMethods = document.getElementsByName("contactMethod");
  const errorMessages = document.querySelectorAll(".errorMessage");

  let isValid = true;
  let selectedMethod = "";

  //iterating through all of the <p>'s that contain the .errorMessage class
  //stops when 'i' reaches the end of the list
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].textContent = "";
  }

  //wiping the old red styling and lets the user start fresh on submit 
  firstName.classList.remove("error");
  lastName.classList.remove("error");
  phoneNumber.classList.remove("error");
  emailAddress.classList.remove("error");
  userMessage.classList.remove("error");

  //grabbing the value of what was typed in the first name input
  //if statement is just checking if the input is empty since were setting it less than one
  //same code for Last Name and Message
  if (firstName.value.trim().length < 1) {
    firstName.nextElementSibling.textContent = "First name is required.";
    firstName.classList.add("error");
    isValid = false;
  }

  if (lastName.value.trim().length < 1) {
    lastName.nextElementSibling.textContent = "Last name is required.";
    lastName.classList.add("error");
    isValid = false;
  }

  if (userMessage.value.trim().length < 1) {
    userMessage.nextElementSibling.textContent = "Message is required.";
    userMessage.classList.add("error");
    isValid = false;
  }

  //this is checking the selected contact method
  for (let i = 0; i < contactMethods.length; i++) {
    if (contactMethods[i].checked) {
      selectedMethod = contactMethods[i].value;
    }
  }

  //checks to see if a radio button isn't selected then spit out the error message were setting 
  if (selectedMethod === "") {
    document.querySelector(".contactMethod").parentElement.querySelector(".errorMessage").textContent = "Preferred contact method is required.";
    isValid = false;
  }
  //got the email pattern from the book. "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;"
  //the {2,5} confused me in the regex but I learned it just means that the .com has to be at least 2 characters and no more than 5. phone number needs to be 10.
  //from that I built a phone pattern
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
const phoneRegex = /^\d{10}$/;

//This is for if the phone radio is selected perform the phone/email pattern validation 
if (selectedMethod === "email") {
    //if there's nothing typed besides spaces, then throw (in this case add) that error message into the <p> I created in the HTML under all form elements 
  if (emailAddress.value.trim().length < 1) {
    emailAddress.nextElementSibling.textContent = "Email is required.";
    //the styling class we made for the error <p> tag
    emailAddress.classList.add("error");
    isValid = false;
  } else if (!emailRegex.test(emailAddress.value.trim())) {
    emailAddress.nextElementSibling.textContent = "Enter a valid email address.";
    emailAddress.classList.add("error");
    isValid = false;
    //working
    console.log(phoneRegex);
  }
}

//same as above but for the phone radio
if (selectedMethod === "phone") {
  if (phoneNumber.value.trim().length < 1) {
    phoneNumber.nextElementSibling.textContent = "Phone number is required.";
    phoneNumber.classList.add("error");
    isValid = false;
  } else if (!phoneRegex.test(phoneNumber.value.trim())) {
    phoneNumber.nextElementSibling.textContent = "Enter a valid 10 digit phone number.";
    phoneNumber.classList.add("error");
    isValid = false;
  }

 //forgot to add email validation if the phone radio was selected
 //the form was submitting and letting me put anything in the email
 //if the user typed something in the email boxm but its NOT (!) a valid email format, then show the error
  if (emailAddress.value.trim().length > 0 && !emailRegex.test(emailAddress.value.trim())) {
    emailAddress.nextElementSibling.textContent = "Enter a valid email address.";
    emailAddress.classList.add("error");
    isValid = false;
  }
}

  //if all values the validation test, stuff them into formData array
  //.trim() used just to remove any extra space at the start or end 
  //so if a user puts 3 spaces before or after what they typed, remove those spaces
  if (isValid) {
    const formData = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      phone: phoneNumber.value.trim(),
      email: emailAddress.value.trim(),
      preferredContact: selectedMethod,
      message: userMessage.value.trim(),
    };

    //Instead of using JSON.Stringify() I created a custom alert 
    //If I have time I want to have this show up in a custom modal box
    //I'm appending the form data that the user entered from the formData array and spitting it back out to them with this custom message
    let confirmationMessage = "Thank you " + formData.firstName + " " + formData.lastName + "!\n\n";
        confirmationMessage += "We received your message:\n";
        confirmationMessage += "\"" + formData.message + "\"\n\n";
        confirmationMessage += "Preferred contact method: " + formData.preferredContact + "\n";

        //these are just standard statements for grabbing the radio buttons that are selected out of the array and appending that selection to the page
        //either email or phone 
        if (formData.preferredContact === "email") {
            confirmationMessage += "We will contact you at: " + formData.email;
        }

        if (formData.preferredContact === "phone") {
            confirmationMessage += "We will contact you at: " + formData.phone;
        }

    //heres the actual alert that spits out all of the information from the array
    //along with resetting the form upon completion
    alert(confirmationMessage);
    document.querySelector("#contactForm").reset();
  }
}

//when the form "Send Message" button is clicked, call the checkForm() function
document.querySelector("#contactBtn").addEventListener("click", function (event) {
    checkForm();
    //I dont want the browser to refresh, the form to submit, or the page to reload
    //so I use preventDefault() to stop the browser from doing it's normal behavior
    event.preventDefault();
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