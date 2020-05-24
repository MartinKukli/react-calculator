import React from "react";
import "./styles.css";

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memory: "0",
      screen: "0"
    };
    // bind all functins to component
    this.clear = this.clear.bind(this);
    this.addNum = this.addNum.bind(this);
    this.addZero = this.addZero.bind(this);
    this.addComa = this.addComa.bind(this);
    this.operation = this.operation.bind(this);
    this.evaluation = this.evaluation.bind(this);
  }
  // clear the calcs screen
  clear() {
    this.setState({
      memory: "0",
      screen: "0"
    });
  }
  // add number to the screen
  addNum(event) {
    // state variables
    const value = event.target.value;
    const memory = this.state.memory;
    const screen = this.state.screen;
    let updateM;
    let updateS;
    if (screen === "0") {
      // only a zero on screen, add clicked number
      updateM = value;
      updateS = value;
    } else if (/[+\-*/]/.test(screen) === true) {
      // math sign on screen
      updateM = memory + value; // add value to memory
      updateS = value; // update screen
    } else {
      // every other case
      updateM = memory + value; // update memory
      updateS = screen + value; // update screen
    }
    // update state
    this.setState({
      memory: updateM,
      screen: updateS
    });
  }
  // function for checking zero button
  addZero() {
    // state variables
    const memory = this.state.memory;
    const screen = this.state.screen;
    // add a zero only if the last number is not zero
    const updateM = screen === "0" ? memory : memory + "0";
    const updateS = screen === "0" ? screen : screen + "0";
    // update state
    this.setState({
      memory: updateM,
      screen: updateS
    });
  }
  // adds coma
  addComa(event) {
    // state variables
    const memory = this.state.memory;
    const screen = this.state.screen;
    // add coma only if no math sign is on the screen
    const updateM = /[.+\-*/]/.test(screen) === true ? memory : memory + ".";
    const updateS = /[.+\-*/]/.test(screen) === true ? screen : screen + ".";
    // update state
    this.setState({
      memory: updateM,
      screen: updateS
    });
  }
  // math operations
  operation(event) {
    // state variables
    const memory = this.state.memory;
    const value = event.target.value;
    const memoryEnd = memory.slice(-1);
    const updateS = value;
    let updateM;
    // add/updates math sign
    switch (true) {
      case /[+\-*/]/.test(memoryEnd):
        updateM = memory.slice(0, -1) + value;
        break;
      default:
        updateM = memory + value;
        break;
    }
    // update state
    this.setState({
      memory: updateM,
      screen: updateS
    });
  }
  // does the math
  evaluation() {
    try {
      // state variables
      const memory = this.state.memory;
      // evals then converts result to string for screen
      // TODO: replcae eval with parser
      const evaluate = eval(memory).toString();
      // update state
      this.setState({
        screen: evaluate
      });
    } catch (e) {
      console.error(e);
      this.setState({
        screen: 0,
        memory: 0
      });
    }
  }

  render() {
    const inputCSS = "w3-input w3-border w3-gray";
    const buttonCSS = "w3-button w3-large w3-black w3-ripple numberButtons";

    return (
      <section class="w3-gray">
        <section class="w3-panel w3-light-gray w3-round-large w3-display-middle">
          <p>ELECTRONIC CALCULATOR</p>
          <div id="displayArea">
            <input
              id="memoryField"
              className={inputCSS}
              type="text"
              value={this.state.memory}
              readonly
            />
            <input
              id="display"
              className={inputCSS}
              type="text"
              value={this.state.screen}
              readonly
            />
          </div>
          <div id="clearDiv">
            <button
              id="clear"
              className="w3-button w3-border w3-black"
              onClick={this.clear}
            >
              Clear
            </button>
          </div>
          <div class="w3-padding-16">
            <div>
              <button
                id="seven"
                className={buttonCSS}
                value={7}
                onClick={this.addNum}
              >
                7
              </button>
              <button
                id="eight"
                className={buttonCSS}
                value={8}
                onClick={this.addNum}
              >
                8
              </button>
              <button
                id="nine"
                className={buttonCSS}
                value={9}
                onClick={this.addNum}
              >
                9
              </button>
              <button
                id="divide"
                className={buttonCSS}
                value={"/"}
                onClick={this.operation}
              >
                /
              </button>
            </div>
            <div>
              <button
                id="four"
                className={buttonCSS}
                value={4}
                onClick={this.addNum}
              >
                4
              </button>
              <button
                id="five"
                className={buttonCSS}
                value={5}
                onClick={this.addNum}
              >
                5
              </button>
              <button
                id="six"
                className={buttonCSS}
                value={6}
                onClick={this.addNum}
              >
                6
              </button>
              <button
                id="multiply"
                className={buttonCSS}
                value={"*"}
                onClick={this.operation}
              >
                *
              </button>
            </div>
            <div>
              <button
                id="one"
                className={buttonCSS}
                value={1}
                onClick={this.addNum}
              >
                1
              </button>
              <button
                id="two"
                className={buttonCSS}
                value={2}
                onClick={this.addNum}
              >
                2
              </button>
              <button
                id="three"
                className={buttonCSS}
                value={3}
                onClick={this.addNum}
              >
                3
              </button>
              <button
                id="subtract"
                className={buttonCSS}
                value={"-"}
                onClick={this.operation}
              >
                -
              </button>
            </div>
            <div>
              <button
                id="zero"
                className={buttonCSS}
                value={0}
                onClick={this.addZero}
              >
                0
              </button>
              <button
                id="decimal"
                className={buttonCSS}
                value={"."}
                onClick={this.addComa}
              >
                .
              </button>
              <button
                id="equals"
                className={buttonCSS}
                onClick={this.evaluation}
              >
                =
              </button>
              <button
                id="add"
                className={buttonCSS}
                value={"+"}
                onClick={this.operation}
              >
                +
              </button>
            </div>
          </div>
        </section>
      </section>
    );
  }
}
