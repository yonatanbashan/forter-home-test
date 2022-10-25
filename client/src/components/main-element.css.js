import { css } from "lit";

export default css`
  :host {
    display: block;
  }

  div {
    font-size: 15px;
    font-family: verdana, Sans-Serif, Arial;
  }

  .container {
    padding: 40px 50px;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #aebaff;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
  }

  input {
    height: 25px;
    width: 50%;
    margin: 15px 10%;
    border-radius: 8px;
    box-shadow: 0 0 5px 1px rgba(60, 70, 130, 0.3);
    border: 1px solid #dddddd;
    font-size: 15px;
    padding: 3px 10px;
    outline: none;
    background-color: rgba(255, 255, 255, 0.4);
  }

  input:focus,
  input:hover {
    border: 1px solid #999999;
    box-shadow: 0 0 5px 1px rgba(60, 70, 130, 0.5);
  }

  .chat {
    padding: 10px 40px;
    font-size: 20px;
  }
`;
