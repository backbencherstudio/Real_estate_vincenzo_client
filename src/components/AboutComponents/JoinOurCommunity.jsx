import React from 'react';
import Marquee from 'react-fast-marquee';

const JoinOurCommunity = () => {
    const companyLogos = [
        { src: 'https://i.ibb.co.com/wZyW85Hk/4202104-flickr-logo-social-social-media-yahoo-icon.png', alt: 'Flickr', wide: true },
        { src: 'https://i.ibb.co.com/0jkfGWPL/4202061-swarm-logo-social-social-media-icon.png', alt: 'Swarm', wide: false },
        { src: 'https://i.ibb.co.com/5WRkPDV7/4202028-ati-logo-social-social-media-icon.png', alt: 'ATI', wide: true },
        { src: 'https://i.ibb.co.com/m5TJj6TZ/4202060-swift-logo-social-social-media-icon.png', alt: 'Swift', wide: false },
        { src: 'https://i.ibb.co.com/0pnXLtm8/4202085-linkedin-logo-social-social-media-icon.png', alt: 'LinkedIn', wide: true },
        { src: 'https://i.ibb.co.com/Cpc6ZfcW/1298747-instagram-brand-logo-social-media-icon.png', alt: 'Instagram', wide: false },
        { src: 'https://i.ibb.co.com/wZyW85Hk/4202104-flickr-logo-social-social-media-yahoo-icon.png', alt: 'Flickr', wide: true },
        { src: 'https://i.ibb.co.com/0jkfGWPL/4202061-swarm-logo-social-social-media-icon.png', alt: 'Swarm', wide: false },
        { src: 'https://i.ibb.co.com/5WRkPDV7/4202028-ati-logo-social-social-media-icon.png', alt: 'ATI', wide: true },
        { src: 'https://i.ibb.co.com/m5TJj6TZ/4202060-swift-logo-social-social-media-icon.png', alt: 'Swift', wide: false },
        { src: 'https://i.ibb.co.com/0pnXLtm8/4202085-linkedin-logo-social-social-media-icon.png', alt: 'LinkedIn', wide: true },
        { src: 'https://i.ibb.co.com/Cpc6ZfcW/1298747-instagram-brand-logo-social-media-icon.png', alt: 'Instagram', wide: false },
        { src: 'https://i.ibb.co.com/wZyW85Hk/4202104-flickr-logo-social-social-media-yahoo-icon.png', alt: 'Flickr', wide: true },
        { src: 'https://i.ibb.co.com/0jkfGWPL/4202061-swarm-logo-social-social-media-icon.png', alt: 'Swarm', wide: false },
        { src: 'https://i.ibb.co.com/5WRkPDV7/4202028-ati-logo-social-social-media-icon.png', alt: 'ATI', wide: true },
        { src: 'https://i.ibb.co.com/m5TJj6TZ/4202060-swift-logo-social-social-media-icon.png', alt: 'Swift', wide: false },
        { src: 'https://i.ibb.co.com/0pnXLtm8/4202085-linkedin-logo-social-social-media-icon.png', alt: 'LinkedIn', wide: true },
        { src: 'https://i.ibb.co.com/Cpc6ZfcW/1298747-instagram-brand-logo-social-media-icon.png', alt: 'Instagram', wide: false },
        { src: 'https://i.ibb.co.com/wZyW85Hk/4202104-flickr-logo-social-social-media-yahoo-icon.png', alt: 'Flickr', wide: true },
        { src: 'https://i.ibb.co.com/0jkfGWPL/4202061-swarm-logo-social-social-media-icon.png', alt: 'Swarm', wide: false },
        { src: 'https://i.ibb.co.com/5WRkPDV7/4202028-ati-logo-social-social-media-icon.png', alt: 'ATI', wide: true },
        { src: 'https://i.ibb.co.com/m5TJj6TZ/4202060-swift-logo-social-social-media-icon.png', alt: 'Swift', wide: false },
        { src: 'https://i.ibb.co.com/0pnXLtm8/4202085-linkedin-logo-social-social-media-icon.png', alt: 'LinkedIn', wide: true },
        { src: 'https://i.ibb.co.com/Cpc6ZfcW/1298747-instagram-brand-logo-social-media-icon.png', alt: 'Instagram', wide: false },
        { src: 'https://i.ibb.co.com/wZyW85Hk/4202104-flickr-logo-social-social-media-yahoo-icon.png', alt: 'Flickr', wide: true },
        { src: 'https://i.ibb.co.com/0jkfGWPL/4202061-swarm-logo-social-social-media-icon.png', alt: 'Swarm', wide: false },
        { src: 'https://i.ibb.co.com/5WRkPDV7/4202028-ati-logo-social-social-media-icon.png', alt: 'ATI', wide: true },
        { src: 'https://i.ibb.co.com/m5TJj6TZ/4202060-swift-logo-social-social-media-icon.png', alt: 'Swift', wide: false },
        { src: 'https://i.ibb.co.com/0pnXLtm8/4202085-linkedin-logo-social-social-media-icon.png', alt: 'LinkedIn', wide: true },
        { src: 'https://i.ibb.co.com/Cpc6ZfcW/1298747-instagram-brand-logo-social-media-icon.png', alt: 'Instagram', wide: false },
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