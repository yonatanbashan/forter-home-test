import { css } from "lit";

export default css`
  .chat {
    padding: 10px 40px;
    font-size: 20px;
  }

  .own-chat {
    color: #3355dd;
  }

  .reply {
    color: #777777;
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;
  }

  .reply:hover {
    color: #6666bb;
    text-decoration: underline;
  }
`;
