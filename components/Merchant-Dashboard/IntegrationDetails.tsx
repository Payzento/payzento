"use client";

import { useState } from "react";
import { Book, Check, Copy, TriangleAlert } from "lucide-react";
import IntegrationCode from "./IntegrationCode";

const IntegrationDetails = () => {
  const [apiKey, setApiKey] = useState("sk_live_abc123xyz789def456ghi");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-4 flex-2">
        {/* API KEYS */}
        <div className="bg-white border shadow-lg p-6 rounded-lg">
          <h1 className="text-xl font-semibold">Your API Keys</h1>
          <p className="text-gray-400 text-sm my-5">
            Use your API keys to authenticate requests to Payzento
          </p>

          <div className="w-full mb-4">
            <p>Live API Key</p>
            <div className="w-full flex items-center justify-between gap-2">
              <input
                type="text"
                disabled
                value="sk_live_abc123xyz789def456ghi"
                className="w-[90%] border p-3 rounded-xl"
              />
              <button
                onClick={handleCopy}
                className="w-[10%] flex items-center justify-center bg-blue-600 p-3 rounded-xl cursor-pointer"
              >
                {copied ? (
                  <Check className="text-white" />
                ) : (
                  <Copy className="text-white" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-[#fffbeb] p-4 border-2 border-[#feea9a] rounded-xl">
            <p className="flex items-center gap-2 text-sm font-semibold mb-1">
              <TriangleAlert className="w-4 h-4" />
              Keep your API Keys secure
            </p>
            <p className="text-gray-400 text-sm">
              Never share your secret keys in publicly accessible code
            </p>
          </div>
        </div>

        {/* JS INTEGRATION */}
        <div className="bg-white border shadow-lg p-6 rounded-lg">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-xl font-normal">JavaScript Integration</h1>
            <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-xl">
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500" />
              )}
              Copy
            </button>
          </div>

          {/* INTEGRATION CODE SNIPPET */}
          <div className="bg-[#0a1f44] my-3 p-6 border shadow-lg rounded-xl">
            <IntegrationCode />
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm border hover:border-blue-600 bg-white px-3 py-2 rounded-xl">
              <Book className="w-4 h-4" />
              View Full Documentation
            </button>
            <span className="hover:bg-gray-100 text-sm px-3 py-2 rounded-xl">
              Try in Sandbox
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        {/* INTEGRATION STEP */}

        <div className="bg-white border p-6 rounded-lg">
          <h1 className="text-xl font-semibold mb-3">Integration Steps</h1>

          <ol className="w-full text-black my-3 space-y-3">
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <span className="flex items-center justify-center w-6 h-6 p-2 bg-[#dbeafe] text-[#656eed] rounded-full">
                1
              </span>{" "}
              Copy Your API from above
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <span className="flex items-center justify-center w-6 h-6 p-2 bg-[#dbeafe] text-[#656eed] rounded-full">
                2
              </span>{" "}
              Add the Payzento script to your site
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <span className="flex items-center justify-center w-6 h-6 p-2 bg-[#dbeafe] text-[#656eed] rounded-full">
                3
              </span>{" "}
              Initialize with your configuration
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <span className="flex items-center justify-center w-6 h-6 p-2 bg-[#dbeafe] text-[#656eed] rounded-full">
                4
              </span>{" "}
              Test in sandbox mode
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <span className="flex items-center justify-center w-6 h-6 p-2 bg-[#dbeafe] text-[#656eed] rounded-full">
                5
              </span>{" "}
              Go live and accept payments
            </li>
          </ol>
        </div>

        {/* HELP */}
        <div className="bg-white border p-6 rounded-lg">
          <h1 className="text-xl font-semibold mb-3">Need Help?</h1>
          <p className="text-sm text-gray-400 mb-5">
            Our team is here to assist with your integration
          </p>

          <button className="w-full text-sm font-semibold border-2 hover:border-blue-600 p-2 rounded-2xl">
            Contact Support
          </button>
        </div>

        <div className="bg-[#f5f9ff] border border-[#c4ddfd] p-6 rounded-lg">
          <h1 className="text-xl font-semibold mb-3">Webhooks</h1>
          <p className="text-sm text-gray-400 mb-5">
            Get real-time notifications for transaction events
          </p>

          <p className="text-center text-sm font-semibold">
            Configure Webhooks
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntegrationDetails;
