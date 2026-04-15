import React from "react";

const faqs = [
  {
    question: "How does escrow protect me from scams?",
    answer:
      "Your money is held securely and cannot be released to the seller until you confirm delivery. You always remain in control.",
  },
  {
    question: "What if the seller doesn't deliver?",
    answer:
      "Open a dispute and our team will review the case. Your money stays locked until the issue is resolved.",
  },
  {
    question: "How long does it take to release payment?",
    answer:
      "Payment is released instantly once you confirm delivery. The seller receives it within minutes.",
  },
  {
    question: "Are there any fees?",
    answer:
      "Small transaction fees apply (typically 2-3%). Always clearly displayed before you confirm payment.",
  },
];

export default function FAQSection() {
  return (
    <div className="w-full flex flex-col items-center py-10 px-4 bg-gray-100">
      
      {/* Title */}
      <h2 className="text-3xl font-semibold text-blue-900 mb-8">
        Frequently Asked Questions
      </h2>

      {/* FAQ List */}
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-blue-900">
              {faq.question}
            </h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}