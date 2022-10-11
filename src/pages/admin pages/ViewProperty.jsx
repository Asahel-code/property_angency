import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { Button, Carousel } from 'flowbite-react';
import { BsTelephoneFill, BsWhatsapp, BsFillGeoAltFill } from "react-icons/bs";
import UpdatePropertyModal from '../../modal/admin/UpdatePropertyModal';
import numberWithCommas from '../../utils/numberWithCommas';
import { publicRequest } from '../../utils/requestHeader';
import axios from 'axios';
import Helmet from '../../components/Helemet';


const ViewProperty = () => {

    const [modal, setModal] = useState(false);
    const [property, setProperty] = useState(undefined);

    let { propertyName } = useParams();

    const { user: currentUser } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser.isAdmin) {
            navigate('/');
        }

        const cancelToken = axios.CancelToken.source();
        publicRequest.get("/property", { cancelToken: cancelToken.token })
            .then((response) => {
                setProperty(response.data.find((property) => property.name === propertyName))
                localStorage.setItem("properties", JSON.stringify(response.data));
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("canceled")
                }
                else {

                }
            })

        return () => {
            cancelToken.cancel()
        }
    }, [propertyName, navigate, currentUser.isAdmin])


    const toggleModal = () => {
        setModal(!modal);
    };
    return (
        <Helmet title={propertyName}>
            <div className="md:mx-12 xs:mx-3 my-6 ">
                <div className="flex justify-end mb-5">
                    <Button color="success" style={{ width: "100px" }} onClick={toggleModal}>
                        Update
                    </Button>
                    {modal && <UpdatePropertyModal property={property} closeModal={toggleModal} />}
                </div>
                <div className="grid md:grid-cols-4 xs:grid-cols-1 gap-6 border shadow-lg mb-5 bg-white rounded-l-lg">
                    <div className="h-56 xs:h-64 xl:h-80 2xl:h-96 col-span-2">
                        {property &&
                            <Carousel slide={false}>
                                {property.images.map((item, index) => {
                                    return (
                                        <img
                                            key={index}
                                            src={item}
                                            alt="..."
                                        />
                                    )
                                })}
                            </Carousel>
                        }
                    </div>
                    <div>
                        <div className="mb-4">
                            <h4 className="text-xl font-bold text-gray-900">{property && property.name}</h4>
                            <div className="flex items-center gap-2 py-2">
                                <p className="text-lg text-gray-800"><BsFillGeoAltFill /></p>
                                <p className="text-gray-700 text-md font-bold">{property && property.location}</p>
                            </div>
                            <h5 className="text-lg text-gray-500 font-semibold">Ksh. {numberWithCommas(Number(property && property.price))}</h5>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Contact details</h3>
                            <div>
                                <div className="flex items-center gap-4">
                                    <div className="text-green-400 text-xl">
                                        <BsWhatsapp />
                                    </div>
                                    <p className="text-gray-400 font-semibold">{property && property.whatsappContact}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-green-400 text-xl">
                                        <BsTelephoneFill />
                                    </div>
                                    <p className="text-gray-400 font-semibold">{property && property.phoneNumberContact}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border shadow-lg p-4 bg-white">
                    <h3 className="text-xl font-bold my-4 underline">Overview</h3>
                    <p className="font-light text-gray-700">
                        {property && property.description}
                    </p>
                </div>
            </div>
        </Helmet>
    )
}

export default ViewProperty;
