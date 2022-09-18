import React, { useState, } from 'react';
import { BsTelephoneFill, BsEnvelope, BsWhatsapp } from "react-icons/bs";
import { Link } from 'react-router-dom';
import PhoneContactDetailsModal from '../modal/PhoneContactDetailsModal';
import numberWithCommas from '../utils/numberWithCommas';

const CategoryItem = ({ catItem }) => {
    const [previewImg, setPreviewImg] = useState(catItem.images[0]);
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleWhatsapp = (number,propertyName) => {
        window.open(`https://api.whatsapp.com/send/?phone=%2B${number}&text=Hi%2C+I+am+interested+in+your+property+${propertyName}&type=phone_number&app_absent=0`, "_blank");
      };

    return (
        <div>
            <div className="my-6 border grid sm:grid-cols-1 md:grid-cols-3 bg-white rounded-xl">
                <div className="w-full pb-4 md:pr-4 sm:pr-0">
                    <div className="mb-3 w-full">
                        <img className="w-full h-60" src={`https://real-estate-agency-mark.herokuapp.com/${previewImg}`} alt="preview" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-full">
                        {catItem.images.map((item, index) => {
                            return (
                                <div className="cursor-pointer" key={index} onClick={() => setPreviewImg(item)}>
                                    <img className="w-32 h-12" src={`https://real-estate-agency-mark.herokuapp.com/${item}`} alt="hello" />
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
                            <p className="font-light text-gray-700 py-3">
                                {catItem.description.length > 250 ?
                                    `${catItem.description.substring(0, 250)}...` : catItem.description
                                }
                            </p>
                            <p className="text-gray-400 text-sm">
                                {catItem.location}
                            </p>
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