import { useState, useEffect } from 'react';
import { Carousel } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import numberWithCommas from '../../utils/numberWithCommas';

const ItemDetails = () => {

    const { properties } = useSelector((state) => state.property);
    const [property, setProperty] = useState(undefined);
    let { propertyName } = useParams();

    useEffect(() => {
        setProperty(properties.find((e) => e.name === propertyName))
    }, [propertyName, properties])

    return (
        <div className="lg:mt-20 lg:mx-8 md:m-8">
            <div className="h-56 sm:h-64 xl:h-96 2xl:h-96">
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
            <div className="bg-white p-4 mt-4 rounded-xl">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 uppercase my-4">
                    {property && property.name} in {property && property.location}
                </h5>
                <p className="text-gray-400 text-sm">
                    {property && property.location}
                </p>
                <p className="font-bold text-sm mt-2">
                    Ksh. {numberWithCommas(Number(property && property.price))}
                </p>
                <h6 className="text-lg font-bold my-4 underline">Overview</h6>
                <p className="font-light text-gray-700">
                    {property && property.description}
                </p>
            </div>
        </div>
    )
}

export default ItemDetails