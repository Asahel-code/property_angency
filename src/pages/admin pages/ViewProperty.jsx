import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Carousel } from 'flowbite-react';
import { BsTelephoneFill, BsWhatsapp } from "react-icons/bs";
import UpdatePropertyModal from '../../modal/admin/UpdatePropertyModal';
import { useSelector } from 'react-redux';
import numberWithCommas from '../../utils/numberWithCommas';

const ViewProperty = () => {

    const [modal, setModal] = useState(false);
    const [property, setProperty] = useState(undefined);
    const { properties } = useSelector((state) => state.property);

    let { propertyName } = useParams();

    useEffect(() => {
        setProperty(properties.find((e) => e.name === propertyName))
    }, [propertyName, properties])


    const toggleModal = () => {
        setModal(!modal);
    };
    return (
        <div className="m-12">
            <div className="flex justify-end mb-5">
                <Button color="success" style={{ width: "100px" }} onClick={toggleModal}>
                    Update
                </Button>
                {modal && <UpdatePropertyModal property={property} closeModal={toggleModal} />}
            </div>
            <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-6 border shadow-lg mb-5">
                <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 col-span-2">
                    {property &&
                        <Carousel slide={false}>
                            {property.images.map((item, index) => {
                                return (
                                    <img
                                        key={index}
                                        src={`https://real-estate-agency-mark.herokuapp.com/${item}`}
                                        alt="..."
                                    />
                                )
                            })}
                        </Carousel>
                    }
                </div>
                <div>
                    <h4 className="text-xl font-bold text-gray-900">{property && property.name}</h4>
                    <p className="text-gray-600 text-md">{property && property.location}</p>
                    <h5 className="text-lg text-gray-800 pt-8">Ksh. {numberWithCommas(Number(property && property.price))}</h5>
                    <div className="pt-8">
                        <h3 className="text-lg font-bold text-gray-900">Contact details</h3>
                        <div>
                            <div className="flex items-center">
                                <div className="text-green-400 text-xl pr-5">
                                    <BsWhatsapp />
                                </div>
                                <p>{property && property.whatsappContact}</p>
                            </div>
                            <div className="flex items-center">
                                <div className="text-green-400 text-xl  pr-5">
                                    <BsTelephoneFill />
                                </div>
                                <p>{property && property.phoneNumberContact}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border shadow-lg p-4">
                <h3 className="text-xl font-bold my-4 underline">Overview</h3>
                <p className="font-light text-gray-700">
                    {property && property.description}
                </p>
            </div>
        </div>
    )
}

export default ViewProperty;
