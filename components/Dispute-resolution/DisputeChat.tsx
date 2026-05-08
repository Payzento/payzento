import { MessageSquare, Send } from "lucide-react";
import React from "react";
import Messages from "./Messages";

const DisputeChat = () => {
  return (
    <div className="shadow shadow-gray-400 p-6 rounded-xl">
      <h1 className="flex items-center gap-2 text-lg font-semibold">
        <MessageSquare className="w-4.5 h-4.5 text-[#356eed]"/>
        Communication
      </h1>

      <div className="">
        <Messages />

        <div className="w-full flex items-center justify-between gap-2">
            <input type="text" placeholder="Type your message..." className="min-w-[90%] h-12.5 border border-gray-300 rounded-lg p-4 text-sm focus:outline focus:outline-[#2360e8]" />
            <button className="min-w-[10%] bg-[#225de6] p-4 rounded-xl h-12.5 flex items-center justify-center cursor-pointer">
                <Send className="w-5 h-5 text-white" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default DisputeChat;
