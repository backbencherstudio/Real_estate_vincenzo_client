import React from 'react';
import Marquee from 'react-fast-marquee';
import facebook from "../../assets/community/facebook.png"
import instagram from "../../assets/community/instagram.png"
import linkedin from "../../assets/community/linkedin.png"
import youtube from "../../assets/community/youtube.png"
import rentpad from "../../assets/community/rentpad.svg"
import x from "../../assets/community/x.png"

const JoinOurCommunity = () => {
    const companyLogos = [
        { src: rentpad, alt: 'Facebook', wide: true },
        { src: facebook, alt: 'Instagram', wide: false },
        { src: youtube, alt: 'YouTube', wide: true },
        { src: x, alt: 'X', wide: false },
        { src: linkedin, alt: 'LinkedIn', wide: true },
        { src: instagram, alt: 'Instagram', wide: false },
        { src: rentpad, alt: 'Facebook', wide: true },
        { src: facebook, alt: 'Instagram', wide: false },
        { src: youtube, alt: 'YouTube', wide: true },
        { src: x, alt: 'X', wide: false },
        { src: linkedin, alt: 'LinkedIn', wide: true },
        { src: instagram, alt: 'Instagram', wide: false },
        { src: rentpad, alt: 'Facebook', wide: true },
        { src: facebook, alt: 'Instagram', wide: false },
        { src: youtube, alt: 'YouTube', wide: true },
        { src: x, alt: 'X', wide: false },
        { src: linkedin, alt: 'LinkedIn', wide: true },
        { src: instagram, alt: 'Instagram', wide: false },
        { src: rentpad, alt: 'Facebook', wide: true },
        { src: facebook, alt: 'Instagram', wide: false },
        { src: youtube, alt: 'YouTube', wide: true },
        { src: x, alt: 'X', wide: false },
        { src: linkedin, alt: 'LinkedIn', wide: true },
        { src: instagram, alt: 'Instagram', wide: false },
        { src: rentpad, alt: 'Facebook', wide: true },
        { src: facebook, alt: 'Instagram', wide: false },
        { src: youtube, alt: 'YouTube', wide: true },
        { src: x, alt: 'X', wide: false },
        { src: linkedin, alt: 'LinkedIn', wide: true },
        { src: instagram, alt: 'Instagram', wide: false },
        { src: rentpad, alt: 'Facebook', wide: true },
        { src: facebook, alt: 'Instagram', wide: false },
        { src: youtube, alt: 'YouTube', wide: true },
        { src: x, alt: 'X', wide: false },
        { src: linkedin, alt: 'LinkedIn', wide: true },
        { src: instagram, alt: 'Instagram', wide: false },
    ];

    const midIndex = Math.ceil(companyLogos.length / 2);
    const firstRow = companyLogos.slice(0, midIndex);
    const secondRow = companyLogos.slice(midIndex);

    const LogoContainer = ({ src, alt, wide }) => (
        <div className={`flex-shrink-0 bg-[#F6F7FA] rounded-lg flex items-center justify-center mx-4 ${wide ? 'w-56' : 'w-24'} h-24`}>
            <img src={src} alt={alt} className="h-12 object-contain" />
        </div>
    );

    return (
        <section className="py-16">
            <div className="">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-medium text-[#0F1320] mb-10 lg:mb-14 md:mb-6  lg:w-[36ch] mx-auto text-center">
                    Join our community of 10,000+ Real Estates
                </h2>
                
                <Marquee gradient={false} speed={50} className="mb-4">
                    <div className="flex">
                        {firstRow.map(logo => (
                            <LogoContainer key={logo.id} {...logo} />
                        ))}
                    </div>
                </Marquee>

                <Marquee gradient={false} speed={30} direction="right">
                    <div className="flex">
                        {secondRow.map(logo => (
                            <LogoContainer key={logo.id} {...logo} />
                        ))}
                    </div>
                </Marquee>
            </div>
        </section>
    );
};

export default JoinOurCommunity;