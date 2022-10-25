import { css } from "lit";

export default css`
  .chat {
    width: fit-content;
    margin: 5px 0 0 30px;
    padding: 5px 10px;
    border: 1px solid #404040;
    font-size: 20px;
    border-radius: 10px;
    background-color: #202020;
    box-shadow: 0 0 3px 1px rgba(50, 50, 50, 0.15);
    color: #aaaaaa;
    transition: background-color 0.2s ease-in-out;
  }

  .own-message {
    color: #3355dd;
    background-color: #202020;
  }

  .reply-button {
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;
    color: #777777;
  }

  .reply-button:hover {
    text-decoration: underline;
  }

  .reply:hover {
    color: #6666bb;
    text-decoration: underline;
  }

  .highlighted {
    background-color: #503030;
  }

  .reply-to {
    font-size: 15px;
    margin-left: 15px;
  }

  .reply-to:not(.own-message):not(.bot-message) {
    color: #666666;
    b {
      color: #373737;
    }
  }

  .bot-message {
    color: #dd3366;
  }
`;
