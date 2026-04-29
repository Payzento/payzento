import React from "react";
import Nav from "../Nav";
import { MoveLeft, TriangleAlert, Upload } from "lucide-react";

const DisputeResolution = () => {
  return (
    <div>
      <Nav />

      <section className="max-w-3xl mx-auto px-4 mt-25 space-y-4 my-2">
        <p className="flex items-center gap-2 mb-5">
          <MoveLeft />
          Back to Transaction
        </p>

        <p className="text-2xl font-semibold">Dispute Resolution</p>

        <section className="bg-[#fef6f6] border-2 border-[#ffc9c9] p-6 rounded-xl">
          <div className="w-fit rounded-full text-[#e54e37] py-2 px-4 bg-[#fee2e2] flex items-center gap-2 mb-3">
            <TriangleAlert className="w-3.5 h-3.5" />
            <p className="text-sm">DISPUTE OPEN</p>
          </div>
          <p className="text-gray-500 text-sm">
            Transaction #1234 - Logo Design (₦125,000)
          </p>
        </section>

        <section className="bg-white border border-gray-300 p-6 rounded-xl">
          <p className="font-semibold text-lg">Dispute Information</p>

          <div className="my-3">
            <p className="text-gray-400 text-sm font-semibold mb-2">
              Reason for Dispute
            </p>
            <textarea
              name=""
              id=""
              placeholder="Explain why you're opening this dispute..."
              className="w-full border border-gray-300 focus:outline focus:outline-blue-500 p-4 rounded-xl"
            ></textarea>
          </div>

          <div className="">
            <p className="text-gray-400 text-sm font-semibold mb-2">
              Upload Evidence
            </p>
            <button className="w-full flex items-center justify-center gap-2 text-gray-400 border-2 border-dashed border-gray-400 hover:border-blue-400 p-4 rounded-lg">
              <Upload className="w-5 h-5" />
              <p className="">Upload files (images, documents)
                <input type="file" />
              </p>
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};

export default DisputeResolution;
