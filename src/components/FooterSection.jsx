import { Footer } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { ImQuotesLeft } from "react-icons/im";
import logo from '../assets/images/logo.png';

const FooterSection = () => {

    const handSocialMediaLinks = (link) => {
        window.open(link, "_blank");
    };

    const handleInstagram = () => {
        handSocialMediaLinks('https://www.instagram.com');
    };

    const handleTwitter = () => {
        handSocialMediaLinks('https://www.twitter.com');
    };

    const handleFacebook = () => {
        handSocialMediaLinks('https://www.facebook.com');
    };

    const location = useLocation();

    const footerStyling = "md:px-10 xs:px-4 pb-8"
    return (
        <div className="bg-black text-white">
            <div className={location.pathname !== "/" ? `${footerStyling} pt-8` : `${footerStyling} md:pt-64 xs:pt-8`}>
                <div className="w-full">
                    <div className="grid md:grid-cols-2 xs:grid-cols-1 lg:gap-96 sm:gap-60">
                        <div>
                            <Footer.Brand
                                href="/"
                                src={logo}
                                alt="DMG Logo"
                                name="DMG Properties"
                            />
                        </div>
                        <div className="flex gap-2 text-gray-400">
                            <span className="text-2xl "><ImQuotesLeft /></span>
                            <span className="text-justify">
                                Our business is built off of close relationships and
                                we are glad that we are able to share our positive real
                                estate experiences with our clients
                            </span>
                        </div>
                    </div>
                    <Footer.Divider />
                    <div className="w-full sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright
                            by="DMG Properties"
                            year={2022}
                        />
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center text-gray-400">
                            <div className="hover:text-white cursor-pointer" onClick={handleFacebook}>
                                <Footer.Icon
                                    icon={BsFacebook}
                                />
                            </div>

                            <div className="hover:text-white cursor-pointer" onClick={handleInstagram}>
                                <Footer.Icon
                                    icon={BsInstagram}
                                />
                            </div>

                            <div className="hover:text-white cursor-pointer" onClick={handleTwitter}>
                                <Footer.Icon
                                    icon={BsTwitter}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterSection