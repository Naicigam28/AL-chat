import React from "react";
export const Message = ({ id, sender, text, dpURL }) => {
  return (
    <div className="Message">
      <img src={dpURL} />
      <p>
        <b>{sender}: </b>
        {text}
      </p>

      <hr />
    </div>
  );
};
