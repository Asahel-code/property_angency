import React, { useState, } from 'react';
import { BsTelephoneFill, BsEnvelope, BsWhatsapp, BsFillGeoAltFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import PhoneContactDetailsModal from '../modal/PhoneContactDetailsModal';
import numberWithCommas from '../utils/numberWithCommas';

const CategoryItem = ({ catItem }) => {
    const [previewImg, setPreviewImg] = useState(catItem.images[0]);
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleWhatsapp = (number, propertyName) => {
        window.open(`https://api.whatsapp.com/send/?phone=%2B${number}&text=Hi%2C+I+am+interested+in+your+property+${propertyName}&type=phone_number&app_absent=0`, "_blank");
    };

    return (
        <div data-aos="fade-up">
            <div className="my-2 border grid xs:grid-cols-1 md:grid-cols-3 bg-white rounded-r-md">
                <div className="w-full pb-1 md:pr-4 sm:pr-0">
                    <div className="mb-1 w-full">
                        <img className="w-full h-60" src={previewImg} alt="preview" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 w-full">
                        {catItem.images.map((item, index) => {
                            return (
                                <div className="cursor-pointer" key={index} onClick={() => setPreviewImg(item)}>
                                    <img className="w-32 h-14" src={item} alt="hello" />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="relative col-span-2">
                    <Link to={`/${catItem.category}/${catItem.subCategory ? catItem.subCategory : catItem.category}/${catItem.name}`}>
                        <div className="mt-4">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">
                                Ksh. {numberWithCommas(Number(catItem.price))}
                            </h5>
                            <p className="font-light text-gray-700 py-3 lmd:text-lg">
                                {catItem.description.length > 250 ?
                                    `${catItem.description.substring(0, 250)}...` : catItem.description
                                }
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-gray-700 md:text-lg xs:text-md">
                                    <BsFillGeoAltFill />
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {catItem.location}
                                </p>
                            </div>
                        </div>
                    </Link>
                    <div className="absolute bottom-2 right-4">
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                            <div className="cursor-pointer text-green-400 text-2xl">
                                <BsWhatsapp onClick={() => handleWhatsapp(catItem.whatsappContact, catItem.name)} />
                            </div>
                            <div className="cursor-pointer text-green-400 text-2xl">
                                <BsTelephoneFill onClick={toggleModal} />
                                {modal && <PhoneContactDetailsModal phoneNumber={catItem.phoneNumberContact} closeModal={toggleModal} />}
                            </div>
                            <div className="cursor-pointer text-red-600 text-2xl">
                                <Link to="/contact">
                                    <BsEnvelope />
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CategoryItem