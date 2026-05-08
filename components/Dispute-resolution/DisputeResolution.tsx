import React from "react";
import Nav from "../Nav";
import { MoveLeft, Search, TriangleAlert} from "lucide-react";
import FileUploader from "../FileUploader";
import Link from "next/link";
import DisputeChat from "./DisputeChat";

const DisputeResolution = () => {
  return (
    <div>
      <Nav />

      <section className="max-w-3xl mx-auto px-4 mt-25 space-y-4 my-5">
        <Link
          href="/review-funds"
          className="flex items-center gap-2 mb-5 cursor-pointer"
        >
          <MoveLeft />
          Back to Transaction
        </Link>

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

        <section className="bg-white border border-gray-300 shadow shadow-gray-300 p-6 rounded-xl">
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
            <FileUploader />
          </div>
        </section>

        <section>
          <DisputeChat />
        </section>

        <section className="w-full flex flex-col items-center justify-center border-2 shadow shadow-[#bedbff] p-6 rounded-xl">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" fill="blue" />
            {/* <SearchIcon /> */}
            <p className="text-sm font-semibold">Under Review</p>
          </div>
          <p className="text-gray-400 text-sm">
            Our team is reviewing this dispute. Funds will remain locked until
            resolved.
          </p>
        </section>
      </section>
    </div>
  );
};

export default DisputeResolution;
