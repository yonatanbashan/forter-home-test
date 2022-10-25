import { LitElement, html } from "lit";
import style from "./main-element.css.js";
import postMessage from "../network/postMessage.js";
import nameGenerator from "../business-logic/nameGenerator";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const BOT_USERNAME = "AnswerBot";

export class MainElement extends LitElement {
  static get properties() {
    return {
      messages: { type: Object },
      username: { type: String },
      replyingTo: { type: Object },
    };
  }

  constructor() {
    super();
    this.messages = {};
    this.replyingTo = {};
    nameGenerator().then((name) => {
      this.username = name;
    });
    this.socket = io("http://localhost:3000", {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    this.socket.on("new connection", console.log);
    this.socket.on(
      "message",
      ({ username, message, id, replyToId, botMessage }) => {
        if (replyToId) {
          const repliedToMessage = this.messages[replyToId];
          if (repliedToMessage) {
            const currentReplies = this.messages[replyToId].replies ?? [];
            const fullMessage = botMessage
              ? `You're lucky! This was already answered by the helpful. ${username}! The latest answer was: '${message}'`
              : message;
            const newMessageUsername = botMessage ? BOT_USERNAME : username;
            const newReplyMessage = {
              username: newMessageUsername,
              message: fullMessage,
              replyTo: replyToId,
              botMessage,
            };

            this.messages = {
              ...this.messages,
              [replyToId]: {
                ...this.messages[replyToId],
                replies: [...currentReplies, newReplyMessage],
              },
            };
            return;
          }
        }
        this.updateMessages({ ...this.messages, [id]: { username, message } });
      }
    );
  }

  static styles = [style];

  async updateMessages(newMessages) {
    this.messages = newMessages;
    await this.updateComplete;
    const messages = this.shadowRoot.getElementById("messages");
    if (messages) {
      messages.scrollTo({ top: messages.scrollHeight + 200 });
    }
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "messages") {
        const messages = this.shadowRoot.getElementById("messages");
        if (messages) {
          messages.scrollTo({ top: messages.scrollHeight + 200 });
        }
      }
    });
  }

  onKeyPress(e) {
    if (e.key === "Enter") {
      if (!e.target.value) return;
      postMessage(
        e.target.value,
        this.username,
        this.replyingTo.message,
        this.replyingTo.id
      );
      e.target.value = "";
      this.replyingTo = {};
    }
  }

  onReplyMessage(message, id) {
    this.replyingTo = { message, id };
    const input = this.shadowRoot.getElementById("searchbox");

    if (input) {
      input.focus();
    }
  }

  cancelReply() {
    this.replyingTo = { message: null, id: null };
  }

  render() {
    const { messages, onKeyPress, replyingTo, cancelReply } = this;
    const usernameExist = this.username !== undefined;
    if (!usernameExist) {
      return html`Loading...`;
    }

    const replyNote = replyingTo.id
      ? html`<div class="replying-to">Replying to highlighted message.</div>
          <div @click="${cancelReply}" class="cancel-reply">Cancel</div>`
      : html`<br />`;

    return html`
      <div class="container">
        <div class="chat-controls">
          <div class="sending-as-note">
            Sending messages as: <b>${this.username}</b>
          </div>
          <input
            placeholder="Hit Enter to send"
            id="searchbox"
            type="text"
            @keypress="${onKeyPress}"
          />
          <div class="reply-note">${replyNote}</div>
        </div>
        <div id="messages" class="messages">
          ${Object.keys(messages)
            .map((key) => ({ ...messages[key], id: key }))
            .map(
              ({
                replyTo,
                replies,
                message,
                username: messageUsername,
                id,
                botMessage,
              }) => {
                const highlighted = id === replyingTo.id;
                return html`<message-element
                  username="${messageUsername}"
                  message="${message}"
                  id="${id}"
                  ownUsername="${this.username}"
                  .botMessage="${botMessage}"
                  .replies="${replies}"
                  .replyTo="${replyTo}"
                  .onReply=${() => this.onReplyMessage(message, id)}
                  .highlighted=${highlighted}
                ></message-element>`;
              }
            )}
        </div>
      </div>
    `;
  }
}

window.customElements.define("main-element", MainElement);
