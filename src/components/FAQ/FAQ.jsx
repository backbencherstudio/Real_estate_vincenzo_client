import { useState } from "react";
import HeaderContent from "../Header/Header";
import landing from "../../assets/landing.svg"
import { FaMinus } from "react-icons/fa";


const faqData = [
    {
        question: "What features are included in each pricing plan?",
        answer:
            "You can see all the features in detail on our pricing tab.",
    },
    {
        question: "Are there any hidden fees or additional costs associated with the pricing plans?",
        answer:
            "No, unlike other rent management platforms there are no hidden fees.",
    },
    {
        question: "Can I upgrade or downgrade my plan at any time?",
        answer:
            " Yes, you can upgrade or downgrade your plan anytime via your owner dashboard.",
    },
    {
        question: "Do the plans include customer support, and what are the hours of availability?",
        answer:
            "Yes, our plans include customer service—you can text or email us at any time, and we’ll respond within 24 hours.",
    },
];
const Contents = {
    title: "Frequently Asked Questions",
    buttonText: "FAQ",
    images: [landing, landing],
};


const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="max-w-7xl mx-auto">
            <div className="pt-16">
                <HeaderContent content={Contents} />
            </div>
            <div className="max-w-6xl mx-auto px-4 xl:px-0">
                <div className="space-y-6">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`border rounded-3xl overflow-hidden bg-white transition transform ${openIndex === index ? "border-blue-500 " : "border-transparent"}`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex justify-between items-center text-left px-6 py-8 text-black font-medium text-xl lg:text-2xl hover:text-blue-600 transition-all duration-300"
                            >
                                <span>{item.question}</span>
                                <span
                                    className={`text-xl bg-zinc-200 rounded-full p-2 transform transition-transform ${openIndex === index ? " bg-gradient-to-r from-[#4A90E2] to-[#1565C0] text-[#E9E9EA]" : ""
                                        }`}
                                >
                                    <FaMinus />
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden text-base transition-all duration-500 ${openIndex === index ? "max-h-96 opacity-100 pb-4 -mt-6 px-6 text-zinc-500" : "max-h-0 opacity-0"
                                    }`}
                            >
                                {item.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;