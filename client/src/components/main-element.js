import { LitElement, html } from "lit";
import style from "./main-element.css.js";
import postMessage from "../network/postMessage.js";
import nameGenerator from "../business-logic/nameGenerator";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

export class MainElement extends LitElement {
  static get properties() {
    return {
      messages: { type: Array },
      username: { type: String },
    };
  }

  constructor() {
    super();
    this.messages = [];
    nameGenerator().then((name) => {
      this.username = name;
    });
    this.socket = io("http://localhost:3000", {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    this.socket.on("new connection", console.log);
    this.socket.on("message", ({ username, message }) => {
      this.messages = [...this.messages, { username, message }];
    });
  }

  static styles = [style];

  onKeyPress(e) {
    if (e.key === "Enter") {
      postMessage(e.target.value, this.username);
      e.target.value = "";
    }
  }

  onClickMessage() {
    console.log("clicked!");
  }

  render() {
    const { messages, onKeyPress, onClickMessage } = this;
    const usernameExist = this.username !== undefined;

    if (!usernameExist) {
      return html`Loading...`;
    }

    return html`
      <div class="container">
        <div>Welcome - your username is ${this.username}</div>
        <br />
        <div>Chat here (click Enter to send):</div>
        <input type="text" @keypress="${onKeyPress}" />
        <br /><br />
      </div>
      <br />
      <div>
        ${messages.map(({ message, username: messageUsername }) => {
          return html`<message-element
            username="${messageUsername}"
            message="${message}"
            ownUsername="${this.username}"
            .onClick=${onClickMessage}
          ></message-element>`;
        })}
      </div>
    `;
  }
}

window.customElements.define("main-element", MainElement);
