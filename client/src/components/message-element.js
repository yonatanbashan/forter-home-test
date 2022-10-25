import { LitElement, html } from "lit";
import style from "./message-element.css.js";

export class MainElement extends LitElement {
  static get properties() {
    return {
      username: { type: String },
      message: { type: String },
      ownUsername: { type: String },
      onClick: { type: Function },
    };
  }

  constructor() {
    super();
    this.username = "";
    this.message = "";
    this.ownUsername = false;
  }

  static styles = [style];

  render() {
    const { username, message, onClick, ownUsername } = this;
    const ownMessage = ownUsername === username;
    const colorClass = ownMessage ? " own-chat" : "";
    console.log({ username, message, ownMessage });
    return html`<div @click="${onClick}" class="chat${colorClass}">
      <div><b>${username}:</b> ${message}</div>
      ${ownMessage
        ? html``
        : html`<div @click="${onClick}" class="reply">Reply</div>`}
    </div>`;
  }
}

window.customElements.define("message-element", MainElement);
