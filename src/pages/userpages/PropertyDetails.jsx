import { useState, useEffect } from 'react';
import { Carousel } from "flowbite-react";
import { useParams } from "react-router-dom";
import numberWithCommas from '../../utils/numberWithCommas';
import { BsFillGeoAltFill } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { GiIsland } from "react-icons/gi";
import Helmet from '../../components/Helemet';
import { publicRequest } from '../../utils/requestHeader';
import axios from 'axios';

const PropertyDetails = () => {

    const [property, setProperty] = useState(undefined);
    let { propertyName } = useParams();

    useEffect(() => {
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
    }, [propertyName])

    return (
        <Helmet title={propertyName}>
            <div className="lg:mt-20 lg:mx-8 md:m-8">
                <div className="h-56 sm:h-64 xl:h-96 2xl:h-96">
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
                <div className="bg-white p-4 mt-4 rounded-xl">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 uppercase my-4">
                        {property && property.name} in {property && property.location}
                    </h5>
                    {property && property.category === "Real Estate" ?
                        <div className="flex items-center gap-2 py-1">
                            <p className="text-gray-800 text-lg font-semibold py-1">
                                <FaBed />
                            </p>
                            <p className="text-gray-800 text-lg font-semibold">
                                {property && property.rooms} bed
                            </p>
                        </div>
                        : property && property.category === "Land" &&
                        <div className="flex items-center gap-2 py-1">
                            <p className="text-gray-800 py-1 text-lg font-semibold">
                                <GiIsland />
                            </p>
                            <p className="text-gray-800 text-lg font-semibold">
                                {property && property.landSize} arces
                            </p>
                        </div>
                    }
                    <div className="flex items-center gap-4">
                        <p className="text-gray-700 md:text-lg xs:text-md">
                            <BsFillGeoAltFill />
                        </p>
                        <p className="text-gray-500 text-sm">
                            {property && property.location}
                        </p>
                    </div>
                    <p className="font-bold text-md mt-2">
                        Ksh. {numberWithCommas(Number(property && property.price))}
                    </p>
                    <h6 className="text-xl font-bold my-4 underline">Overview</h6>
                    <p className="font-light text-gray-700 md:text-lg xs:text-md">
                        {property && property.description}
                    </p>
                </div>
            </div>
        </Helmet>
    )
}

export default PropertyDetails