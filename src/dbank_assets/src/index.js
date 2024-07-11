import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function () {
  var currentValue = await dbank.checkBalance();
  // var currentValue = '000';
   document.getElementById('value').innerHTML = currentValue ? currentValue : '...loading';
  //document.getElementById('value').innerHTML = currentValue;
});
