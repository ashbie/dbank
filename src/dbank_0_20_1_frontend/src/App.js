import { html, render } from 'lit-html';
import { dbank_0_20_1_backend } from 'declarations/dbank_0_20_1_backend';
import logo from './dbank_logo.png';


//import logo from './logo2.svg';

class App {
  greeting = '';
  balance = '000';


  constructor() {
    this.#render();
  }

  #handleCheckBalance = async () => {
    var currentBalance = await dbank_0_20_1_backend.checkBalance();
    // [round-off to 2 decimal places]
    this.balance = currentBalance ? currentBalance.toFixed(2) : 'loading..';    /*NOTE -  -  change state */
    // ``OR``  this.balance = currentBalance ? Math.round(currentBalance * 100) / 100 : 'loading..';

    this.#render();  /*NOTE - !important --re-render page after changing state */
  };

  #handleLoad = async () => {
     await this.#handleCheckBalance(); 
     /* or << await this.#handleCheckBalance(); >>  --- I think it doesn't matter because there is already
      an `await` in the #handleCheckBalance function, and the page gets re-rendered once the awaited
      response is given (it gets re-rendered at the end of the function).
      
      This applies to all lines/sections where << this.#handleCheckBalance(); >> is found 
      
      But I think not adding ``await`` is dangerous, the code may not do perform as expected
      e.g. when the are more things to do after the ``this.#handleCheckBalance()`` line.
      When I call the ``this.#handleCheckBalance()`` function, does the code stack the function
      and wait for it to finish executing then continue where it left off OR because it's 
      asynchronous, does it call the funtion and continue with the next line of the current funtion
      (not ``this.#handleCheckBalance()``, but the function that called it) , and then does it run
      more than 1 funtion at a time ? 
      
      Does ``await`` make the code execution pause and wait for the awaited response or maybe it makes 
      another process the waits for the response while the previous process continues with what it was
      doing ? */
      this.balance = await dbank_0_20_1_backend.compound();
      this.#render();
  };

  #handleTransaction = async (e) => {
    e.preventDefault();
    const button = e.target.querySelector("#submit-btn");
    button.setAttribute("disabled", true);

    var topUpAmount = document.getElementById('input-amount').value;
    var withdrawAmount = document.getElementById('withdrawal-amount').value;
    //  ******    test      ******
    //withdrawAmount = withdrawAmount ? withdrawAmount : "it's null";
    //topUpAmount = topUpAmount ? topUpAmount : "it's null";
    console.log("\n\t topUp Amount = "+ topUpAmount + "\n\t withdraw Amount = "+ withdrawAmount);
    /**************************/

    if(topUpAmount) { // or if(document.getElementById('input-amount').value.length != 0)
      await dbank_0_20_1_backend.topUp(parseFloat(topUpAmount));
      await this.#handleCheckBalance();
    } 
    if(withdrawAmount) {
      await dbank_0_20_1_backend.withdraw(parseFloat(withdrawAmount));
      await this.#handleCheckBalance();
    }
    document.getElementById('input-amount').value = "";
    document.getElementById('withdrawal-amount').value = "";
    button.removeAttribute("disabled");

  };

  #render() {
    let body = html`
      <main>
        <img src="${logo}" alt="DBank logo" width="100" />
        <h1>Current Balance: $<span id="value">${this.balance}</span></h1>
        <div class="divider"></div>
        <form action="#">
          <h2>Amount to Top Up</h2>
          <input id="input-amount" type="number" step="0.01" min=0 name="topUp" value=""/>
          <h2>Amount to Withdraw</h2>
          <input id="withdrawal-amount" type="number" name="withdraw" step="0.01" min=0 value=""/>
          <input id="submit-btn" type="submit" value="Finalise Transaction" "/>
        </form>
      </main>
    `; 
    render(body, document.getElementById('root'));

    window.addEventListener("load",this.#handleLoad);
    document.querySelector('form').addEventListener('submit', this.#handleTransaction);
  }
}

export default App;
