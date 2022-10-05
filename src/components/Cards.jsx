import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import { Pagination } from 'flowbite-react';
import { publicRequest } from '../utils/requestHeader';
import EmptyCategory from './EmptyCategory';
import axios from 'axios';


const Cards = () => {
    const [propertyList, setPropertyList] = useState([]);

    // const propertiesMemo = useMemo(() => ({properties}), [properties])

    // default to first page
    let currentPage = 1;

    // default page size is 10
    let pageSize = 10;


    // calculate total pages
    let totalPages = Math.ceil(propertyList.length / pageSize);

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
        <div className="py-4">
            <div className="py-4 text-3xl font-bold text-center capitalize">Properties in Kenya</div>
            <div className="py-4 md:px-12 xs:px-6">
                <div className="flex justify-center items-center">
                    <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {propertyList && !propertyList.length ? (
                            <EmptyCategory />
                        ) : (propertyList && propertyList.map((item, index) => {
                            return (
                                <CardItem key={index} property={item} />
                            )
                        })
                        )}

                    </div>
                </div>
                <div className="flex justify-center items-center py-6">
                    {propertyList && propertyList.length > 10 &&
                        <Pagination
                            currentPage={currentPage}
                            // onPageChange={}
                            showIcons={true}
                            totalPages={totalPages}
                        />
                    }
                </div>
            </div>
        </div>
    )

}

export default Cards