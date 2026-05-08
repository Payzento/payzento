import React from "react";

type ChatBubble = {
  message: string;
  time: string;
  variant: "incoming" | "outgoing";
};

const Message = ({ message, time, variant }: ChatBubble) => {
  const isOutgoing = variant === "outgoing";

  return (
    <div className={`flex items-center my-2 ${isOutgoing ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[80%]  px-4 py-2 rounded-xl ${isOutgoing ? "bg-[#f3f4f6]" : "bg-[#2056df]"}`}>
        {/* <div className=""> */}
          <p className={`text-sm ${isOutgoing ? "text-black" : "text-white"}`}>{message}</p>
        {/* </div> */}
        <span className="text-gray-300 text-xs text-left">{time}</span>
      </div>
    </div>
  );
};

export default Message;
