import { LitElement, html } from "lit";
import style from "./message-element.css.js";
import "classnames";

export class MainElement extends LitElement {
  static get properties() {
    return {
      username: { type: String },
      message: { type: String },
      replies: { type: Array },
      replyTo: { type: Object },
      id: { type: String },
      highlighted: { type: Boolean },
      ownUsername: { type: String },
      botMessage: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.username = "";
    this.message = "";
    this.replies = [];
    this.replyTo = {};
    this.id = "";
    this.highlighted = false;
    this.ownUsername = false;
    this.botMessage = false;
  }

  static styles = [style];

  render() {
    const {
      username,
      message,
      onReply,
      ownUsername,
      id,
      highlighted,
      replyTo,
      replies,
      botMessage,
    } = this;

    const isOwnMessage = ownUsername === username;

    const messageClassNames = classNames("chat", {
      "own-message": isOwnMessage,
      highlighted: highlighted,
      "reply-to": replyTo,
      "bot-message": botMessage,
    });

    const shouldDisplayReplyButton = !isOwnMessage && !replyTo && !botMessage;
    const replyButton = shouldDisplayReplyButton
      ? html`<div @click="${() => onReply(message, id)}" class="reply-button">
          Reply
        </div>`
      : html``;

    return html`<div class="${messageClassNames}">
      <div><b>${username}:</b> ${message}</div>
      ${replyButton}
      ${(replies ?? []).map(
        ({ replyTo, message, username, id, botMessage }) => {
          return html`<message-element
            username="${username}"
            message="${message}"
            id="${id}"
            ownUsername="${ownUsername}"
            replies="${replies}"
            .botMessage="${botMessage}"
            .replyTo="${replyTo}"
          ></message-element>`;
        }
      )}
    </div>`;
  }
}

window.customElements.define("message-element", MainElement);
