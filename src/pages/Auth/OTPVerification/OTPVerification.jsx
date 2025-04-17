/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useRef, useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';

const OTPVerification = ({ isOpen, onClose, onVerify, vIsLoading }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setOtp(['', '', '', '', '', '']);
    }
  }, [isOpen]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or first empty input
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex].focus();
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      onVerify(otpString);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={400}
      centered
      maskClosable={false}
      className="otp-verification-modal"
    >
      <div className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Enter Verification Code
          </h3>
          <p className="text-gray-600">
            We've sent a verification code to your email.
            <small className='block'>
            please check your email inbox. Check spam if not in Inbox
            </small>
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          ))}
        </div>

        {
          vIsLoading ?
            <button
              type="submit"
              className="rounded-[12px] bg-gradient-to-r border border-[#4A90E2] p-4 md:p-5 w-full  font-medium text-lg"
            >
              <Spin size="large" />
            </button>
            :
            <button
              onClick={handleVerify}
              disabled={otp.some(digit => !digit)}
              type="submit"
              className="rounded-[12px] bg-gradient-to-r from-[#4A90E2] to-[#1565C0] p-4 md:p-5 w-full text-white font-medium text-lg"
            >
              Verify
            </button>

        }

        <div className="text-center mt-4">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OTPVerification;