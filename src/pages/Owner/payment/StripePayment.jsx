import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SubscriptionForm from "./SubscriptionForm";
import { useState } from "react";
import { GrRadialSelected } from "react-icons/gr";

const stripePromise = loadStripe('pk_test_51NFvq6ArRmO7hNaVcPS5MwczdEtM4yEMOclovA0k5LtJTxhtzKZ2SKim3p8qmvssQ7j7bREjoRRmHB9Gvz8n8Dfm00UOo9bZYg');

const StripePayment = () => {
    const plans = [
        { name: 'Starter', range: [1, 4], description: "Manage 1-4 users at $20 per unit/month.", price: 20 },
        { name: 'Growth', range: [5, 12], description: "Manage 5-12 users at $18 per unit/month.", price: 18 },
        { name: 'Professional', range: [13, 40], description: "Manage 13-40 users at $15 per unit/month.", price: 15 },
    ];

    const [selectedPlan, setSelectedPlan] = useState(plans[0]);
    const [starterUserCount, setStarterUserCount] = useState(1);
    const [growthUserCount, setGrowthUserCount] = useState(5);
    const [professionalUserCount, setProfessionalUserCount] = useState(13);

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const incrementUserCount = (plan) => {
        if (plan.name === 'Starter' && starterUserCount < plan.range[1]) {
            setStarterUserCount(starterUserCount + 1);
        }
        if (plan.name === 'Growth' && growthUserCount < plan.range[1]) {
            setGrowthUserCount(growthUserCount + 1);
        }
        if (plan.name === 'Professional' && professionalUserCount < plan.range[1]) {
            setProfessionalUserCount(professionalUserCount + 1);
        }
    };

    const decrementUserCount = (plan) => {
        if (plan.name === 'Starter' && starterUserCount > plan.range[0]) {
            setStarterUserCount(starterUserCount - 1);
        }
        if (plan.name === 'Growth' && growthUserCount > plan.range[0]) {
            setGrowthUserCount(growthUserCount - 1);
        }
        if (plan.name === 'Professional' && professionalUserCount > plan.range[0]) {
            setProfessionalUserCount(professionalUserCount - 1);
        }
    };

    const totalPrice = selectedPlan
        ? selectedPlan.name === 'Starter'
            ? starterUserCount * selectedPlan.price
            : selectedPlan.name === 'Growth'
                ? growthUserCount * selectedPlan.price
                : selectedPlan.name === 'Professional'
                    ? professionalUserCount * selectedPlan.price
                    : 0
        : 0;
    console.log(totalPrice)
    const getUserCount = () => {
        if (selectedPlan.name === 'Starter Plan') return starterUserCount;
        if (selectedPlan.name === 'Growth Plan') return growthUserCount;
        if (selectedPlan.name === 'Professional Plan') return professionalUserCount;
        return 0;
    };
    return (
        <div className="md:flex justify-center bg-white shadow-md rounded-md max-w-5xl mx-auto p-6">
            <div className=" md:w-1/2">
                <h1 className="text-2xl font-bold">Plan Type:</h1>
                <div className="space-y-4">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`border transition-all duration-300 ease-in-out transform ${selectedPlan?.name === plan.name ? 'border-blue-500 ring-4 ring-blue-100 scale-105' : 'border-gray-300'} bg-white rounded-lg cursor-pointer`}
                            onClick={() => handlePlanSelect(plan)}
                        >
                            <div className="flex p-4 gap-2">
                                <div className="mt-1.5">
                                    {selectedPlan?.name === plan.name ? (
                                        <div className="text-blue-500 text-lg"><GrRadialSelected /></div>
                                    ) : (
                                        <div className="text-gray-500 text-lg"><GrRadialSelected /></div>
                                    )}
                                </div>
                                <div className="flex justify-between w-full transition-opacity duration-300 ease-in-out">
                                    <div>
                                        <h2 className="text-base lg:text-xl font-bold">{plan.name}</h2>
                                        <p className="text-xs lg:text-sm -mt-3">{plan.description}</p>
                                        {selectedPlan?.name === plan.name && (
                                            <div className="flex gap-2 mt-2 items-center">
                                                <label htmlFor="userCount" className="text-xs lg:text-sm font-bold">Users: </label>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => decrementUserCount(plan)}
                                                        className="border h-4 w-8 pb-0.5 flex justify-center items-center rounded text-lg transition-transform duration-200 hover:scale-110"
                                                        disabled={plan.name === 'Starter Plan' ? starterUserCount <= plan.range[0] : plan.name === 'Growth Plan' ? growthUserCount <= plan.range[0] : professionalUserCount <= plan.range[0]}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-lg">
                                                        {plan.name === 'Starter'
                                                            ? starterUserCount
                                                            : plan.name === 'Growth'
                                                                ? growthUserCount
                                                                : professionalUserCount}
                                                    </span>
                                                    <button
                                                        onClick={() => incrementUserCount(plan)}
                                                        className="border h-4 w-8 pb-0.5 flex justify-center items-center rounded text-lg"
                                                        disabled={plan.name === 'Starter' ? starterUserCount >= plan.range[1] : plan.name === 'Growth' ? growthUserCount >= plan.range[1] : professionalUserCount >= plan.range[1]}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <h3 className="text-xs lg:text-lg font-bold text-blue-500">From ${plan.price}</h3>
                                        <p className="text-xs lg:text-sm text-gray-600  -mt-2 lg:-mt-3">/Month</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="md:w-1/2">
                {selectedPlan ? (
                    <Elements stripe={stripePromise}>
                        <SubscriptionForm selectedPlan={selectedPlan} totalPrice={totalPrice} userCount={getUserCount()} />
                    </Elements>
                ) : (
                    <div className="text-gray-500 text-center mt-10">
                        <p>Select a plan to proceed with payment</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StripePayment;
