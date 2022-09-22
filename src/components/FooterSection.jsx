import { Footer } from 'flowbite-react';
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { Link } from 'react-router-dom';

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
      
    return (
        <div>
            <Footer container={true}>
                <div className="w-full">
                    <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                        <div>
                            <Footer.Brand
                                href="https://flowbite.com"
                                src="https://flowbite.com/docs/images/logo.svg"
                                alt="Flowbite Logo"
                                name="Real Estate Agency"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                            <div>
                                <Footer.Title title="Links" />
                                <Footer.LinkGroup col={true}>
                                    <Link to="/about" className="hover:text-blue-700">About us</Link>
                                    <Link to="/contact" className="hover:text-blue-700">Contact us</Link>
                                </Footer.LinkGroup>
                            </div>
                            <div>
                                <Footer.Title title="Legal" />
                                <Footer.LinkGroup col={true}>
                                    <Link to="#">
                                        Privacy Policy
                                    </Link>
                                    <Link to="#">
                                        Terms & Conditions
                                    </Link>

                                </Footer.LinkGroup>
                            </div>
                        </div>
                    </div>
                    <Footer.Divider />
                    <div className="w-full sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright
                            by="Real Estate Angency"
                            year={2022}
                        />
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                            <div className="hover:text-blue-700 cursor-pointer">
                                <Footer.Icon
                                    icon={BsFacebook}
                                    onClick={handleFacebook}
                                />
                            </div>

                            <div className="hover:text-blue-700 cursor-pointer">
                                <Footer.Icon
                                    icon={BsInstagram}
                                    onClick={handleInstagram}
                                />
                            </div>

                            <div className="hover:text-blue-700 cursor-pointer">
                                <Footer.Icon
                                    icon={BsTwitter}
                                    onClick={handleTwitter}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Footer>
        </div>
    )
}

export default FooterSection