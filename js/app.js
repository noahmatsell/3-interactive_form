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
//errors
var emailError = "<div class='errormsg'>Enter valid email with @ and .</div>";
var creditError = "<div class='errormsg'>Please enter a number that is at least 16 digits long</div>";
var zipcodeError = "<div class='errormsg'>Zipcode must be 5 digits</div>";
var cvvError = "<div class='errormsg'>CVV must be 3 digits</div>";
var blankError = "<div class='errormsg'>Cannot be blank</div>";
/* ================================= 
Functions
==================================== */
//Update total cost
var calculateCost = function(){
  totalSection.innerHTML = '<p>Total: $'+totalCost+'</p>';
};
//Design selection handler
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
  var fieldset = document.querySelector(".activities");
  fieldset.classList.remove("error");
  if(fieldset.nextSibling.classList && fieldset.nextSibling.classList.contains("errormsg")){
    fieldset.parentNode.removeChild(fieldset.nextSibling);  
  }
  
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

//Show correct payment option
var paymentSelectHandler = function(){
  //Determine option value
  var currentPaymentValue = paymentSelect.value;
  //cc
  if (currentPaymentValue == "credit card"){
    document.querySelector("#credit-card").classList.remove("is-hidden");
    document.getElementsByTagName('form')[0].action = "index.html"
  } else{
    document.querySelector("#credit-card").classList.add("is-hidden");
  }
  //paypal
  if (currentPaymentValue == "paypal") {
    document.querySelector("#paypal").classList.remove("is-hidden");
    document.getElementsByTagName('form')[0].action = "https://www.paypal.com/"
  } else{
    document.querySelector("#paypal").classList.add("is-hidden");
  }
    //bitcoin
  if (currentPaymentValue == "bitcoin") {
    document.querySelector("#bitcoin").classList.remove("is-hidden");
    document.getElementsByTagName('form')[0].action = "https://www.bitcoin.com/"
  } else{
    document.querySelector("#bitcoin").classList.add("is-hidden");
  }
}
//check if required fields are blank
var checkForBlanks = function(){
  var blank = false;
  //if name blank, set blank to true and show error
  var name = document.querySelector('#name');
  if (name.value == ""){
    blank = true;
    name.classList.add("error");
    name.insertAdjacentHTML('afterend', blankError);
  }
  //if email blank, set blank to true and show error
  var email = document.querySelector('#mail');
  if (email.value == ""){
    blank = true;
    email.classList.add("error");
    email.insertAdjacentHTML('afterend', blankError);
  }
  //if register blank, set blank to true and show error
  var regOptions = document.querySelector(".activities").querySelectorAll("label");
  var regBlank = false;
  //loop through all inputs
  for(var i=0;i<regOptions.length;i++){
    var inputChecked = regOptions[0].querySelector("input").checked
    if (inputChecked){
      regBlank = false;
      break;
    }
    else{
      regBlank = true;
    }
  }
  if (regBlank){
    blank = true;
    document.querySelector(".activities").classList.add("error");
    document.querySelector(".activities").insertAdjacentHTML('afterend', blankError);
  }
  //if credit card selected and blank, set blank to true and show error
  if (paymentSelect.value == "credit card"){
    var cc = document.querySelector("#cc-num");
    if (cc.value == ""){
      blank = true;
      cc.classList.add("error");
      cc.insertAdjacentHTML('afterend', blankError);
    }
    var zipcode = document.querySelector("#zip");
    if (zipcode.value == ""){
      blank = true;
      zipcode.classList.add("error");
      zipcode.insertAdjacentHTML('afterend', blankError);
    } 
    var cvv =  document.querySelector("#cvv");
    if (cvv.value == ""){
      blank = true;
      cvv.classList.add("error");
      cvv.insertAdjacentHTML('afterend', blankError);
    } 
  }
  return blank;
}
var emailValidation = function() {
    var emailInput = document.getElementById('mail');
    var blank = true;
    if (emailInput.value === "") {
      emailInput.classList.add("error");
      emailInput.insertAdjacentHTML('afterend', blankError);
      return blank;
    } else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
      emailInput.classList.add("error");
      emailInput.insertAdjacentHTML('afterend', emailError);
      return blank;
    } else {
      blank = false;
      return blank;
    }
}
var realTimeEmailValidation = function() {
  var emailInput = document.getElementById('mail');
  if(
emailInput.nextSibling.classList && emailInput.nextSibling.classList.contains("errormsg")){
    emailInput.parentNode.removeChild(emailInput.nextSibling);  
  }
  if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
    emailInput.classList.add("inline-error");
    emailInput.insertAdjacentHTML('afterend', emailError)
  } else {
    emailInput.classList.remove("inline-error");
  }
};
var realTimeCcValidation = function(){
  var cc = document.getElementById('cc-num');
  if(cc.nextSibling){
    cc.parentNode.removeChild(cc.nextSibling);  
  }
  if (cc.value.length < 13 || cc.value.length > 16) {
    cc.classList.add("inline-error");
    cc.insertAdjacentHTML('afterend', creditError)  
  } else {
    cc.classList.remove("inline-error");
  }
}
var realTimeZipValidation = function(){
  var zipcode = document.getElementById('zip');
  if(zipcode.nextSibling){
    zipcode.parentNode.removeChild(zipcode.nextSibling);  
  }
  if (zipcode.value.length !== 5) {
    zipcode.classList.add("inline-error");
    zipcode.insertAdjacentHTML('afterend', zipcodeError)  
  } else {
    zipcode.classList.remove("inline-error");
  }
}
var realTimeCvvValidation = function(){
  var cvv = document.getElementById('cvv');
  if(cvv.nextSibling){
    cvv.parentNode.removeChild(cvv.nextSibling);  
  }
  if (cvv.value.length !== 3) {
    cvv.classList.add("inline-error");
    cvv.insertAdjacentHTML('afterend', cvvError)  
  } else {
    cvv.classList.remove("inline-error");
  }
}
//Remove blank error if user types
var blankCheck = function(field){
  if(!(field.value === "") && field.classList.contains("error")){
    field.classList.remove("error");
    field.parentNode.removeChild(field.nextSibling);
  }
}
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
//Form Validation on submit
document.addEventListener("submit", function(e){
  //check for blank inputs
  var blank = checkForBlanks();
  var inlineErrors = document.getElementsByClassName('inline-error');
  if(blank || inlineErrors.length > 0){
    e.preventDefault();
    if(document.querySelector('.error')){
      document.querySelector('.error').scrollIntoView();
    }else{
      document.querySelector('.inline-error').scrollIntoView();
    }
  }
});
//Email field must have @ . etc
document.querySelector("#name").addEventListener("keyup", function(){
  blankCheck(this);
});
document.querySelector("#mail").addEventListener("keyup", function(){
 realTimeEmailValidation();
 blankCheck(this); 
});
//If the selected payment option is "Credit Card:
//confirm card number (13-16 digit)
 document.querySelector("#cc-num").addEventListener("keyup", function(){
  realTimeCcValidation();
  blankCheck(this);
 });
//zip code (5 digit)
 document.querySelector("#zip").addEventListener("keyup", function(){
  realTimeZipValidation();
  blankCheck(this);
 });
//cvv (3 digit)
 document.querySelector("#cvv").addEventListener("keyup", function(){
  realTimeCvvValidation();
  blankCheck(this);
 });
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
paymentSelectHandler();