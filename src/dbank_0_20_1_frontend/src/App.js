import { html, render } from 'lit-html';
import { dbank_0_20_1_backend } from 'declarations/dbank_0_20_1_backend';
import logo from './dbank_logo.png';


//import logo from './logo2.svg';

class App {
  greeting = '';


  constructor() {
    this.#render();
  }

  #handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    this.greeting = await dbank_0_20_1_backend.greet(name);
    this.#render();
  };
  #handleLoad = async (e) => {
    e.preventDefault();
    var currentValue = await dbank_0_20_1_backend.checkBalance();
    // var currentValue = '000';
    document.getElementById('value').innerHTML = currentValue ? currentValue : '...loading';
   //document.getElementById('value').innerHTML = currentValue;
   this.#render();

  };

  #render() {
/*     let body = html`
      <main>
        <img src="${logo}" alt="DFINITY logo" />
        <br />
        <br />
        <form action="#">
          <label for="name">Enter your name: &nbsp;</label>
          <input id="name" alt="Name" type="text" />
          <button type="submit">Click Me!</button>
        </form>
        <section id="greeting">${this.greeting}</section>
      </main>
    `; */
    let body = html`
      <main>
        <img src="${logo}" alt="DBank logo" width="100" />
        <h1>Current Balance: $<span id="value">234</span></h1>
        <div class="divider"></div>
        <form action="#">
          <h2>Amount to Top Up</h2>
          <input id="input-amount" type="number" step="0.01" min=0 name="topUp" value=""/>
          <h2>Amount to Withdraw</h2>
          <input id="withdrawal-amount" type="number" name="withdraw" step="0.01" min=0 value=""/>
          <input id="submit-btn" type="submit" value="Finalise Transaction" />
        </form>
      </main>
    `; 
    render(body, document.getElementById('root'));
    /* document
      .querySelector('form')
      .addEventListener('submit', this.#handleSubmit); */
      window.addEventListener("load",this.#handleLoad);
  }
}

export default App;
