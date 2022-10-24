import { LitElement, html } from "lit";
import style from "./main-element.css.js";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

export class MainElement extends LitElement {
  static get properties() {
    return {
      messages: { type: Array },
    };
  }

  constructor() {
    super();
    this.messages = [];
    this.username = `User${Math.floor(Math.random() * 100000)}`;
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
      fetch(
        `http://localhost:3000/message?message=${encodeURIComponent(
          e.target.value
        )}&username=${this.username}`,
        {
          method: "POST",
        }
      );
      e.target.value = "";
    }
  }

  render() {
    const { name, count } = this;
    return html`
      <div>Your username is ${this.username}</div>
      <div>Type your message here:</div>
      <input type="text" @keypress="${this.onKeyPress}" />
      <br /><br />
      <div>Messages:</div>
      <div>
        ${this.messages.map(({ message, username }) => {
          const color = username === this.username ? "#dd3355" : "black";
          return html`<div style="color: ${color}">
            ${username}: ${message}
          </div>`;
        })}
      </div>
    `;
  }
}

window.customElements.define("main-element", MainElement);
