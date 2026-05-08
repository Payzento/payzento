"use client";

import React, { useState } from "react";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import Link from "next/link";
import Stepper from "../Stepper";

const GettingStarted = () => {
  return (
    <div className="bg-gray-50 mb-4">
      <Stepper
        steps={[Step1, Step2, Step3, Step4]}
        className="max-w-md mt-50"
        footer={
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href={"/sign-in"}
              //   onClick={handleSignIn}
              className="text-blue-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        }
      />
    </div>
  );
};

export default GettingStarted;
