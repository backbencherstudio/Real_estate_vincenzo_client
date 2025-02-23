import { useState } from "react";
import HeaderContent from "../Header/Header";
import landing from "../../assets/landing.svg"
import { FaMinus } from "react-icons/fa";


const faqData = [
    {
        question: "What features are included in each pricing plan?",
        answer:
            "This question helps users understand the specific services and tools they will have access to in each plan (Basic, Standard, Premium) and whether the plan suits their property management needs.",
    },
    {
        question: "Are there any hidden fees or additional costs associated with the pricing plans?",
        answer:
            "Yes! Even if your beat is already uploaded to YouTube, SoundCloud, or any other platform, you can still register it with BeatProtect. This will give you legal proof of ownership, ensuring that you can take action if someone uses your beat without permission.",
    },
    {
        question: "Can I upgrade or downgrade my plan at any time?",
        answer:
            "With your subscription, you receive 20 credits each month (1 credit = 1 beat registration). If you need more, you can purchase additional credits at any time. Your subscription renews automatically every month, and you can manage it from your account dashboard.",
    },
    {
        question: "Can I pay annually for a discount, and what are the payment options?",
        answer:
            "Yes, you can cancel your subscription at any time. When you cancel, you will retain access to your registered beats until the end of your billing cycle. After that, your beat protection services will expire, and you will no longer be able to register new beats unless you resubscribe.",
    },
    {
        question: "Do the plans include customer support, and what are the hours of availability?",
        answer:
            "Yes, you can cancel your subscription at any time. When you cancel, you will retain access to your registered beats until the end of your billing cycle. After that, your beat protection services will expire, and you will no longer be able to register new beats unless you resubscribe.",
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