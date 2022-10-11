import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import { publicRequest } from '../utils/requestHeader';
import EmptyCategory from './EmptyCategory';
import axios from 'axios';


const Cards = () => {
    const [propertyList, setPropertyList] = useState([]);

    // const propertiesMemo = useMemo(() => ({properties}), [properties])

    // default to first page
    //let currentPage = 1;

    // default page size is 10
    //let pageSize = 10;


    // calculate total pages
    //let totalPages = Math.ceil(propertyList.length / pageSize);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        publicRequest.get("/property", { cancelToken: cancelToken.token })
            .then((response) => {
                setPropertyList(response.data);
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

    }, [])


    return (
        <div className="md:absolute md:top-42 md:inset-x-12 xs:px-4">
            <div data-aos="fade-up">
                <div className="grid xs:grid-cols-1 md:grid-cols-3 gap-4">
                    {propertyList && !propertyList.length ? (
                        <EmptyCategory />
                    ) : (propertyList && propertyList.slice(0,3).map((item, index) => {
                        return (
                            <CardItem key={index} property={item} />
                        )
                    })
                    )}

                </div>
            </div>
        </div>
    )

}

export default Cards