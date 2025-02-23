import React from "react";
import useHeader from "../../hooks/useHeader";

const HeaderContent = ({ content }) => {
    const { title, description, buttonText, images } = useHeader(content);

    return (
        <div className="">
            <div className="flex flex-col items-center justify-center px-4  text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <img src={images[0]} alt="landing" className='scale-x-[-1] w-32 lg:w-96' />
                    <button className="cursor-auto text-[8px] md:text-sm lg:text-base rounded-full md:px-3 md:py-2 px-2 py-1 border border-[#1565C0] text-[#1565C0]">{buttonText}</button>
                    <img src={images[1]} alt="landing" className="w-32 lg:w-96 " />
                </div>
                <h1 className="text-2xl md:text-5xl lg:text-6xl font-medium text-[#0F1320] mb-4 md:mb-6  w-[26ch]">
                    {title}
                </h1>
                <p className="max-w-2xl text[#070127] text-sm md:text-base">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default HeaderContent;
