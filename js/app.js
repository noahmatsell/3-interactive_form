/* ================================= 
Globals
==================================== */
var totalCost = 0;
var colorSection = document.querySelector('#colors-js-puns');
var colorSelector = document.querySelector('#color');
var designSelect = document.querySelector('#design');
var activitiesChecklist = document.querySelector('.activities').getElementsByTagName('label');
var otherTitle = document.querySelector('#other-title');
var titleSelect = document.querySelector('#title');
var paymentSelect = document.querySelector('#payment');

/* ================================= 
Setup on-load
==================================== */
//focus on first field
window.onload = function(){
 document.querySelector('form').getElementsByTagName('input')[0].focus(); 
}
//hide color dropdown until design is chosen
colorSection.classList.add('is-hidden');
//Hide 'other' field
otherTitle.classList.add("is-hidden");
//create total section
var totalSection = document.createElement('div');
totalSection.className = 'total';
totalSection.innerHTML = '<p>Total: $'+totalCost+'</p>';
document.querySelector('fieldset.activities').append(totalSection);
//Credit card selected by default
paymentSelect.value = "credit card";

/* ================================= 
Functions
==================================== */
var calculateCost = function(){
  totalSection.innerHTML = '<p>Total: $'+totalCost+'</p>';
};
var designSelectHandler = function(){
  colorSection.classList.remove('is-hidden');
   //Determine design selected
  var designSelectValue = designSelect.options[designSelect.selectedIndex].value;
  var allOptions = document.querySelector('#color').children;
  //hide all colors
  for(var i = 0;i < allOptions.length;i++){
    allOptions[i].classList.add("is-hidden");
  }
  //show correct colors
  console.log(designSelectValue);
  if(designSelectValue == "js puns"){
    colorSelector.value = "cornflowerblue";
    document.querySelector('#color option[value="cornflowerblue"]').classList.remove("is-hidden");
    document.querySelector('#color option[value="darkslategrey"]').classList.remove("is-hidden");
    document.querySelector('#color option[value="gold"]').classList.remove("is-hidden");
  }else if(designSelectValue == "heart js"){
    colorSelector.value = "tomato";
    document.querySelector('#color option[value="tomato"]').classList.remove("is-hidden");
    document.querySelector('#color option[value="steelblue"]').classList.remove("is-hidden");
    document.querySelector('#color option[value="dimgrey"]').classList.remove("is-hidden");
  }else{
    colorSection.classList.add('is-hidden');
  }
};
  
//Function to reserve or free up timeslot
var reserveTimeslot = function(currentCheckbox){
  var itemName = currentCheckbox.name;
  var checked = currentCheckbox.checked;
  if(checked){
      switch(itemName){
        case "all":
        totalCost += 200;
        calculateCost();
        break;
        case "js-frameworks":
        document.querySelector("input[name='express']").disabled = true;
        totalCost += 100;
        calculateCost();
        break;
        case "js-libs":
        document.querySelector("input[name='node']").disabled = true;
        totalCost += 100;
        calculateCost();
        break;
        case "express": 
        document.querySelector("input[name='js-frameworks']").disabled = true;
        totalCost += 100;
        calculateCost();
        break;
        case "node": 
        document.querySelector("input[name='js-libs']").disabled = true;
        totalCost += 100;
        calculateCost();
        break;
        case "build-tools": 
        totalCost += 100;
        calculateCost();
        break;
        case "npm":
        totalCost += 100;
        calculateCost();
        break;
      }
  }else{
    switch(itemName){
        case "all":
        totalCost -= 200;
        calculateCost();
        break;
        case "js-frameworks":
        document.querySelector("input[name='express']").disabled = false;
        totalCost -= 100;
        calculateCost();
        break;
        case "js-libs":
        document.querySelector("input[name='node']").disabled = false;
        totalCost -= 100;
        calculateCost();
        break;
        case "express": 
        document.querySelector("input[name='js-frameworks']").disabled = false;
        totalCost -= 100;
        calculateCost();
        break;
        case "node": 
        document.querySelector("input[name='js-libs']").disabled = false;
        totalCost -= 100;
        calculateCost();
        break;
        case "build-tools": 
        totalCost -= 100;
        calculateCost();
        break;
        case "npm":
        totalCost -= 100;
        calculateCost();
        break;
      }
  }
};

var paymentSelectHandler = function(){
  
  //Determine option value
  var currentPaymentValue = paymentSelect.value;
  console.log("Current payment:"+currentPaymentValue);
  //hide current section
  if (currentPaymentValue == "credit card"){
    document.querySelector("#credit-card").classList.remove("is-hidden");
  } else{
    document.querySelector("#credit-card").classList.add("is-hidden");
  }
}

var nameValidator = function(){
  var value = document.querySelector("#name").value
  if(value == ""){
    console.log("Name blank")
    return false;
  }else{
    console.log("Name not blank")
    return true;
  }
};

var checkForBlanks = function(){
  var blank = false;
  //if name blank, set blank to true and show error
  //if email blank, set blank to true and show error
  //if register blank, set blank to true and show error
  //if credit card selected and blank, set blank to true and show error
};
/* ================================= 
Event listeners
==================================== */
//Event listener for change in activities
for(var i = 0;i<activitiesChecklist.length;i++){
  var item = activitiesChecklist[i].childNodes[0];
  item.addEventListener("click", function(){
    reserveTimeslot(this);
  });
}
//Event listener for design change
designSelect.addEventListener('change', function(){
  designSelectHandler();
});
//Event for when job role changes
titleSelect.addEventListener("change", function (){
    if (titleSelect.options[titleSelect.selectedIndex].value == "other"){
      otherTitle.classList.toggle("is-hidden");
      otherTitle.focus();
    }else{
      otherTitle.classList.add("is-hidden");
    }
  }
);

//Event listner for payment option is changed
paymentSelect.addEventListener("change", function(){
  paymentSelectHandler();
});
  

//Form Validation
//on submit
document.addEventListener("submit", function(e){
  var blank = checkForBlanks();
  if(blank){
    e.preventDefault();
  }
});
  //Name field can't be blank
  document.querySelector("#name").addEventListener("keyup", function(){
    nameValidator();
  });
  //Email field must have @ . etc
  document.querySelector("#name").addEventListener("keyup", function(){});
  //Must select at least one checkbox under the "Register for Activities" section
  //If the selected payment option is "Credit Card:
      //confirm card number (13-16 digit)
      //zip code (5 digit)
      //cvv (3 digit)
  //show error message
    //border
    //show message
    //realtime