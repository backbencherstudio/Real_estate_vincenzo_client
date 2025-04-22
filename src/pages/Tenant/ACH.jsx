/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import tenantApi from "../../redux/fetures/tenant/tenantApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ACH = ({
  paymentData,
  totalAmount,
  lateFee,
  setOpen,
  setSuccessPaymentData,
  securityDeposit,
  email,
  bankAccountId2,
  customerId2,
}) => {
  const [customerId, setCustomerId] = useState(
    () => localStorage.getItem("ach_customerId") || customerId2
  );
  const [bankToken, setBankToken] = useState(
    () => localStorage.getItem("ach_bankToken") || ""
  );
  const [bankAccountId, setBankAccountId] = useState(
    () => localStorage.getItem("ach_bankAccountId") || bankAccountId2
  );
  const [verifyAccountId, setVerifyaccountId] = useState(
    () => localStorage.getItem("ach_verifyAccountId") || ""
  );
  const [currentStep, setCurrentStep] = useState(
    () => parseInt(localStorage.getItem("ach_currentStep")) || 1
  );
  const [amount, setAmount] = useState(totalAmount + securityDeposit);
  const currentUser = useSelector(selectCurrentUser);
  const [createCustomerForACHpayment, { isLoading }] =
    tenantApi.useCreateCustomerForACHpaymentMutation();
  const [createBankTokenForACHpayment, { isLoading: isLoadinCreateBankToken }] =
    tenantApi.useCreateBankTokenForACHpaymentMutation();
  const [attachACHbankAccount, { isLoading: isLoadinattachACHbankAccount }] =
    tenantApi.useAttachACHbankAccountMutation();
  const [verifyBankAccountApi, { isLoading: verifyBankAccountIsLoading }] =
    tenantApi.useVerifyBankAccountApiMutation();
  const [
    payRentUserACHcontroller,
    { isLoading: payRentUserACHcontrollerIsLoading },
  ] = tenantApi.usePayRentUserACHcontrollerMutation();

  const { register, handleSubmit } = useForm();

  const {
    register: createBankTokenRegister,
    handleSubmit: createBankTokenHandleSubmit,
  } = useForm();
  const {
    register: attachBankAccountRegister,
    handleSubmit: attachBankAccountHandleSubmit,
  } = useForm();
  const {
    register: verifyBankAccountRegister,
    handleSubmit: verifyBankAccountHandleSubmit,
  } = useForm();

  const updateLocalStorage = (key, value) => {
    localStorage.setItem(`ach_${key}`, value);
  };


  const onSubmit = async (data) => {
    const res = await createCustomerForACHpayment(data);
    console.log(res);

    if (res?.data?.success) {
      setCustomerId(res?.data?.data?.customerId);
      updateLocalStorage("customerId", res?.data?.data?.customerId);
      toast.success(res?.data?.message);
    }
  };

  const onSubmitFroCreateBankToken = async (data) => {
    const res = await createBankTokenForACHpayment(data);
    console.log(85, res?.data);
    
    console.log(res);
    if (res?.data?.success) {
      setBankToken(res?.data?.data?.bankToken);
      updateLocalStorage("bankToken", res?.data?.data?.bankToken);
      toast.success(res?.data?.message);
    }
  };

  const attachBankAccount = async () => {
    const res = await attachACHbankAccount({ customerId, bankToken });
    console.log(res);
    if (res?.data?.success) {
      setBankAccountId(res?.data?.data?.id);
      updateLocalStorage("bankAccountId", res?.data?.data?.id);
      toast.success(res?.data?.message);
    }
  };

  const verifyBankAccount = async (data) => {
    const newAmounts = [data.firstDeposit, data.secondDeposit];
    const newData = {
      customerId,
      bankAccountId,
      amounts: newAmounts,
    };
    const res = await verifyBankAccountApi(newData);
    console.log(res);
    if (res?.data?.success) {
      setVerifyaccountId(res?.data?.data?.verification?.id);
      updateLocalStorage("verifyAccountId", res?.data?.data?.verification?.id);
      toast.success(res?.data?.message);
    }
  };

  const payRent = async () => {
    const res = await payRentUserACHcontroller({
      customerId,
      bankAccountId,
      amount: parseInt(totalAmount) + parseInt(securityDeposit),
      lateFee: parseInt(lateFee),
      monthlyPaymentId: paymentData?.key,
      ownerId: paymentData?.ownerId,
      email,
      paymentBy: "ACH",
    });
    console.log(res);
    if (res?.data?.success) {
      localStorage.removeItem("ach_customerId");
      localStorage.removeItem("ach_bankToken");
      localStorage.removeItem("ach_bankAccountId");
      localStorage.removeItem("ach_verifyAccountId");
      localStorage.removeItem("ach_currentStep");
      toast.success(res?.data?.message);
      setOpen(false);
    }
  };

  const formContainerStyle = {
    display: "flex",
    overflow: "hidden",
    width: "100%",
    position: "relative",
  };

  const formStyle = {
    minWidth: "100%",
    transition:
      customerId2 && bankAccountId2 ? "none" : "transform 0.5s ease-in-out",
    transform: `translateX(-${(currentStep - 1) * 100}%)`,
  };

  const nextStep = () => {
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    updateLocalStorage("currentStep", newStep);
  };

  const resetACHForm = () => {
    setCustomerId("");
    setBankToken("");
    setBankAccountId("");
    setVerifyaccountId("");
    setCurrentStep(1);

    localStorage.removeItem("ach_customerId");
    localStorage.removeItem("ach_bankToken");
    localStorage.removeItem("ach_bankAccountId");
    localStorage.removeItem("ach_verifyAccountId");
    localStorage.removeItem("ach_currentStep");
  };

  // const handleSuccessfulPayment = () => {
  //   if (res?.data?.success) {
  //     toast.success(res?.data?.message);
  //     resetACHForm();
  //   }
  // };
  useEffect(() => {
    if (customerId2 && bankAccountId2) {
      setCurrentStep(5);
    }
  }, [customerId2, bankAccountId2]);

  return (
    <div className="w-full p-2 rounded-lg shadow-md">
      {/* <h1>ACH Rent Payment</h1> */}

      <div style={formContainerStyle}>
        <div style={formStyle} className="flex">
          {/* Step 1: Create Stripe Customer */}
          <div className="min-w-full flex justify-center items-center ">
            <div className=" mx-auto rounded-2xl py-6 px-1 w-full">
              <h2 className="text-xl font-bold text-center mb-4 ">
                Step 1: Create Stripe Customer
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <label
                  className="block text-lg font-semibold text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Enter Your Name"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label
                  className="block text-lg font-semibold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder={currentUser?.email}
                  readOnly
                  className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                />
                <div className="pt-2">
                  <button
                    className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${customerId && "cursor-not-allowed"
                      }`}
                    type="submit"
                    disabled={isLoading || customerId}
                  >
                    {isLoading ? "Loading..." : "Create Stripe Customer"}
                  </button>
                </div>
              </form>
              <div
                className={`opacity-0 ${customerId && "opacity-100"
                  } transition-opacity duration-500`}
              >
                <p className="text-center font-semibold text-gray-600 mt-2">
                  Customer ID: {customerId}
                </p>
                <button
                  onClick={nextStep}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Create Bank Token */}
          <div className="min-w-full flex justify-center items-center">
            <div className="max-w-md mx-auto bg-white  rounded-2xl p-1 w-full">
              <h2 className="text-xl font-bold text-center mb-4">
                Step 2: Create Bank Token
              </h2>
              <form
                onSubmit={createBankTokenHandleSubmit(
                  onSubmitFroCreateBankToken
                )}
                className="space-y-2"
              >
                <label
                  className="block text-lg font-semibold text-gray-700"
                  htmlFor="email"
                >
                  Account Number
                </label>
                <input
                  {...createBankTokenRegister("account_number")}
                  type="text"
                  placeholder="Account Number"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label
                  className="block text-lg font-semibold text-gray-700"
                  htmlFor="email"
                >
                  Routing Number
                </label>
                <input
                  {...createBankTokenRegister("routing_number")}
                  type="text"
                  placeholder="Routing Number"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label
                  className="block text-lg font-semibold text-gray-700"
                  htmlFor="email"
                >
                  Account Holder Name
                </label>
                <input
                  {...createBankTokenRegister("account_holder_name")}
                  type="text"
                  placeholder="Account Holder Name"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="pt-2">
                  <button
                    className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${bankToken && "cursor-not-allowed"
                      }`}
                    type="submit"
                    disabled={isLoadinCreateBankToken || bankToken}
                  >
                    {isLoadinCreateBankToken
                      ? "Loading..."
                      : "Create Bank Token"}
                  </button>
                </div>
              </form>
              <div
                className={`opacity-0 ${bankToken && "opacity-100"
                  } transition-opacity duration-500`}
              >
                <p className="text-center font-semibold text-gray-600 mt-2">
                  Bank Token: {bankToken}
                </p>
                <button
                  onClick={nextStep}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Attach Bank Account */}
          <div className="min-w-full flex justify-center items-center">
            <div className="max-w-md mx-auto bg-white rounded-2xl p-1 w-full">
              <h2 className="text-xl font-bold text-center mb-4">
                Step 3: Attach Bank Account{" "}
              </h2>
              <form
                onSubmit={attachBankAccountHandleSubmit(attachBankAccount)}
                className="space-y-4"
              >
                <input
                  {...attachBankAccountRegister("customerId")}
                  type="text"
                  placeholder={customerId}
                  readOnly
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  {...attachBankAccountRegister("bankToken")}
                  type="text"
                  placeholder={bankToken}
                  readOnly
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${bankAccountId && "cursor-not-allowed"
                    }`}
                  type="submit"
                  disabled={isLoadinattachACHbankAccount || bankAccountId}
                >
                  {isLoadinattachACHbankAccount
                    ? "Loading..."
                    : "Attach Bank Account"}
                </button>
              </form>
              <div
                className={`opacity-0 ${bankAccountId && "opacity-100"
                  } transition-opacity duration-500`}
              >
                <p className="text-center font-semibold text-gray-600 mt-2">
                  Bank ID: {bankAccountId}
                </p>
                <button
                  onClick={nextStep}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Step 4: Verify Bank Account */}
          <div className="min-w-full flex justify-center items-center">
            <div className="w-full mx-auto rounded-2xl p-1">
              <h2 className="text-xl font-bold text-center mb-4">
                Step 4: Verify Bank Account{" "}
                <small>
                  (Verification may take 1–2 business days. A small deposit will be sent to your bank via Stripe for confirmation.)
                </small>
              </h2>

              <form
                onSubmit={verifyBankAccountHandleSubmit(verifyBankAccount)}
                className="space-y-2"
              >
                <label
                  className="block text-lg font-semibold text-gray-700"
                  htmlFor="email"
                >
                  First Deposit
                </label>
                <input
                  {...verifyBankAccountRegister("firstDeposit")}
                  type="text"
                  placeholder="Enter first deposit amount"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label
                  className="block text-lg font-semibold text-gray-700"
                  htmlFor="email"
                >
                  Second Deposit
                </label>
                <input
                  {...verifyBankAccountRegister("secondDeposit")}
                  type="text"
                  placeholder="Enter second deposit amount"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* {verifyAccountId && (
                  <p className="text-center font-semibold text-gray-600">
                    Verify ID: {verifyAccountId}
                  </p>
                )} */}

                <div className="pt-2">
                  <button
                    className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${verifyAccountId && "cursor-not-allowed"
                      }`}
                    type="submit"
                    disabled={verifyBankAccountIsLoading || verifyAccountId}
                  >
                    {verifyBankAccountIsLoading
                      ? "Loading..."
                      : "Verify Bank Account"}
                  </button>
                </div>
              </form>
              <div
                className={`opacity-0 ${verifyAccountId && "opacity-100"
                  } transition-opacity duration-500`}
              >
                <p className="text-center font-semibold text-gray-600 mt-2">
                  Verify ID: {verifyAccountId}
                </p>
                <button
                  onClick={nextStep}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Step 5: Pay Rent */}
          <div className="min-w-full flex justify-center items-center">
            <div className="flex flex-col items-center space-y-4 p-6 max-w-sm mx-auto bg-gray-100 rounded-lg h-full w-full">
              <input
                type="number"
                placeholder="Enter Rent Amount"
                value={amount}
                readOnly
                className="w-full px-4 py-3 text-lg text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
              />

              <button
                className="w-full py-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition ease-in-out duration-300"
                onClick={payRent}
              >
                {payRentUserACHcontrollerIsLoading ? "Loading..." : "Pay Rent"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`w-3 h-3 rounded-full ${step === currentStep ? "bg-green-500" : "bg-gray-300"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ACH;
