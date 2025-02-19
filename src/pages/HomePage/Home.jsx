import dashboardImage from "../../../public/Dashboard.png"

const Home = () => {
    return (
        <div className="" >

            {/* <div className="max-w-[1400px] mx-auto flex justify-center flex-col items-center mt-20 " >
                <div className="w-[60%] mx-auto " >
                    <p className="font-inter text-[#070127]  text-[72px]  text-center w-full mb-0 ">
                        The Best Property Management Solution
                    </p>
                    <p className="font-inter text-[#64636A] font-normal w-full text-[16px] leading-[22.4px] tracking-[-1%] text-center my-6">
                        This software boosts revenue, keeps you organized, and grows your business with advanced tech and top support.
                    </p>
                    <div>
                        <input type="text" placeholder="Enter Your Email" className="w-full p-4 rounded-xl " />
                    </div>
                </div>
            </div>

            <div className="w-[1400px] mx-auto mt-14" >
                <img className="w-full h-[60vh]" src={dashboardImage} alt="" />
            </div>


            <div className="my-24" >
                <p className="font-inter font-medium text-[48px] leading-[53.76px] tracking-[-4%] text-center">
                    Join our community of 10,000+ Real Estates
                </p>

                <p className="text-center" >logo marque</p>

            </div> */}


            <div className="w-full px-4">
                {/* Main Container */}
                <div className="max-w-[1400px] mx-auto flex flex-col items-center mt-20 px-4">

                    {/* Text Section */}
                    <div className="w-full md:w-[80%] lg:w-[60%] text-center">
                        <p className="font-inter text-[#070127] text-3xl sm:text-4xl md:text-5xl lg:text-[72px] leading-tight font-medium mb-4">
                            The Best Property Management Solution
                        </p>
                        <p className="font-inter text-[#64636A] text-base sm:text-lg md:text-xl leading-[22.4px] tracking-[-1%] my-6">
                            This software boosts revenue, keeps you organized, and grows your business with advanced tech and top support.
                        </p>

                        {/* Input Field */}
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="Enter Your Email"
                                className="w-full p-3 sm:p-4 rounded-xl border border-gray-300"
                            />
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="max-w-[1400px] mx-auto mt-14 px-4">
                    <div className="w-full h-auto flex justify-center">
                        <img
                            className="w-full max-w-[100%] h-auto object-contain"
                            src={dashboardImage}
                            alt="Dashboard Preview"
                        />
                    </div>
                </div>

                {/* Community Section */}
                <div className="max-w-[1400px] mx-auto my-24 px-4">
                    <p className="font-inter font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-tight text-center">
                        Join our community of 10,000+ Real Estates
                    </p>
                    <p className="text-center mt-4">logo marque</p>
                </div>
            </div>




        </div>
    );
};

export default Home;