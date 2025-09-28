import React, { useState } from "react";
import { ChevronDown, Info } from "lucide-react";

const faqs = [
  {
    q: "What is your return policy?",
    a: "You can return any unused product within 30 days for a full refund. Shipping charges may apply for non-defective returns.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping typically takes 5-8 business days. We also offer expedited options at checkout.",
  },
  {
    q: "Do you offer international shipping?",
    a: "Yes — we ship to most countries. Duties and taxes may apply and are the customer's responsibility.",
  },
  {
    q: "How can I contact support?",
    a: "You can reach our support team via the Contact page or email us at support@example.com. We usually respond within 24 hours.",
  },
];

export default function Accordion({ className = "", compact = false }) {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section
      className={`w-full max-w-3xl mx-auto p-6 rounded-2xl shadow-2xl bg-gradient-to-br mt-[60px] from-gray-900 to-black text-white ${className}`}
      aria-label="Frequently asked questions"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-white/6 rounded-lg">
          <Info className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <p className="text-sm text-white/70 mt-1">
            Need help? Browse our common questions.
          </p>
        </div>
      </div>

      <div className={`space-y-3 ${compact ? "text-sm" : "text-base"}`}>
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border border-white/6 rounded-xl overflow-hidden bg-white/2 backdrop-blur-sm"
            >
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                className="w-full flex items-center justify-between gap-4 p-4 text-left"
              >
                <div>
                  <p className="font-medium">{item.q}</p>
                  <p className="mt-1 text-sm text-white/70">
                    {isOpen ? "Open" : "Tap to view answer"}
                  </p>
                </div>

                <span
                  className={`ml-auto transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronDown className="w-6 h-6" />
                </span>
              </button>

              {isOpen && (
                <div id={`faq-${i}`} className="px-4 pb-4 pt-0">
                  <p className="text-white/80">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-sm text-white/60">
        <em>Still have questions? Contact our support.</em>
      </div>
    </section>
  );
}
