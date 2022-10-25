import { css } from "lit";

export default css`
  :host {
    display: block;
  }

  div {
    font-size: 15px;
    font-family: verdana, Sans-Serif, Arial;
    color: #444444;
  }

  .container {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .chat-controls {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 130px;
    width: 100%;
    top: 0;
    box-sizing: border-box;
    padding: 40px 50px 0;
    background-color: #060606;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
  }

  .messages {
    height: calc(100% - 130px);
    bottom: 0;
    box-sizing: border-box;
    padding: 15px 0;
    overflow-y: auto;
  }

  .messages::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }

  .messages::-webkit-scrollbar {
    width: 8px;
    background-color: rgba(0, 0, 0, 0);
  }

  .messages::-webkit-scrollbar-thumb {
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.8);
    background-color: #777777;
  }

  input {
    height: 35px;
    width: 50%;
    margin: 0 10%;
    border-radius: 25px;
    border: 2px solid transparent;
    font-size: 15px;
    color: #dddddd;
    padding: 3px 10px;
    box-sizing: border-box;
    outline: none;
    background-color: rgba(255, 255, 255, 0.15);
    transition: background-color 0.2s linear;
    margin-bottom: 5px;
  }

  input::placeholder {
    color: #999999;
  }

  input:hover {
    background-color: rgba(255, 255, 255, 0.25);
    border: 2px solid #777777;
  }

  input:focus {
    background-color: rgba(255, 255, 255, 0.4);
    border: 2px solid #aaaaaa;
  }

  input:focus::placeholder {
    color: #cccccc;
  }

  .chat {
    padding: 10px 40px;
    font-size: 20px;
  }

  .replying-to {
    color: rgb(190, 68, 88);
  }

  .sending-as-note {
    margin-bottom: 5px;
    color: #999999;
  }

  .cancel-reply {
    cursor: pointer;
    text-decoration: underline;
    margin-left: 5px;
    color: #cc7777;
  }

  .reply-note {
    display: flex;
    justify-content: flex-start;
    font-weight: bold;
  }
`;
