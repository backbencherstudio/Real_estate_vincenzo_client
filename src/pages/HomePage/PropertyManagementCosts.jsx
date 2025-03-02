
const PropertyManagementCosts = () => {
    return (
        <div className="py-10 lg:py-20" >
            <div className="max-w-7xl mx-auto px-4 xl:px-0">
                <div className="mb-8" >
                    <span className="text-xs border border-[#1565C0] text-[#1565C0] mb-8 py-2 px-3 rounded-full ">Features</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 " >
                    <div className="" >
                        <p className="font-inter font-medium text-2xl sm:text-4xl md:text-4xl xl:text-[48px] md:leading-[53.76px] tracking-[-4%] ">
                            Match your unique real estate portfolio
                            with a plan tailored to your needs
                        </p>
                    </div>
                    <div className="">
                        <p className="font-inter font-normal text-base leading-[22.4px] tracking-[-1%]  text-[#64636A] mb-6">
                        Optimize your savings by selecting a plan
                        designed to manage the amount of units you own.
                        </p>
                        {/* <button className="primary-btn" >Explore More</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyManagementCosts;