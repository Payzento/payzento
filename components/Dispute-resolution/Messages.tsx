import React from "react";
import Message from "./Message";

const Messages = () => {
  return (
    <div className="overflow-scroll h-60">
      <Message variant="incoming" message="Hello" time="just now" />
      <Message variant="outgoing" message="Hello" time="just now" />
    </div>
  );
};

export default Messages;
