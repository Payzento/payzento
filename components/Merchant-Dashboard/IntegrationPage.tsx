import React from "react";
import Nav from "../Nav";
import Link from "next/link";
import { ArrowLeft, Book, ChevronsLeftRight, Zap } from "lucide-react";
import IntegrationDetails from "./IntegrationDetails";

const IntegrationPage = () => {
  return (
    <div>
      <Nav />
      <div className="w-full mt-15 mb-10 p-6">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href={"/merchants-dashboard"}
            className="flex items-center gap-2 mb-5 text-gray-500 hover:text-black"
          >
            <ArrowLeft />
            Back to dashbord
          </Link>

          <div className="flex flex-col gap-2 mb-5">
            <h1 className="text-3xl font-semibold ">Integration Guide</h1>
            <p className="text-gray-500 text-sm">
              Add Payzento secure checkout to your website or application
            </p>
          </div>

          <div className="w-full flex items-center justify-between gap-4 px-2 mb-5">
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 border shadow-md bg-white rounded-lg">
              <div className="flex items-center justify-center bg-[#dbeafe] w-13 h-13 overflow-hidden rounded-full">
                <Zap className="text-[#2764eb] w-7 h-7" />
              </div>
              <h1 className="text-lg font-semibold">Quick Integration</h1>
              <p className="text-sm text-gray-400">
                Add our JavaScript SDK in minutes
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 border shadow-md bg-white rounded-lg">
              <div className="flex items-center justify-center bg-[#f3e8ff] w-13 h-13 overflow-hidden rounded-full">
                <ChevronsLeftRight className="text-[#9d1bfa] w-7 h-7" />
              </div>
              <h1 className="text-xl font-semibold">RESTful API</h1>
              <p className="text-sm text-gray-400">
                Full control with our REST API
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 border shadow-md bg-white rounded-lg">
              <div className="flex items-center justify-center bg-[#dbfce7] w-13 h-13 overflow-hidden rounded-full">
                <Book className="text-[#17c785] w-7 h-7" />
              </div>
              <h1 className="text-xl font-semibold">Documentation</h1>
              <p className="text-sm text-gray-400">
                Comprehensive guides and examples
              </p>
            </div>
          </div>

          <div className="">
            <IntegrationDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationPage;
