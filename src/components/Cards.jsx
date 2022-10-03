import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import { Pagination } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties } from '../redux/property-modal/propertyModalSlice';
import EmptyCategory from './EmptyCategory';


const Cards = () => {

    const { properties } = useSelector((state) => state.property);
    const { isLoaded } = useSelector((state) => state.property)
    const [propertyList, setPropertyList] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            dispatch(getProperties())
                .then(() => {
                    if (isLoaded) {
                        setPropertyList(properties);
                    }
                })
        }

        return () => {
            isMounted = false;
        }

    }, [dispatch, properties, isLoaded])

    if (!isLoaded) {
        return <h1>Loading</h1>
    }
    else {
        return (
            <div className="py-4">
                <div className="py-6 text-3xl font-bold text-center capitalize">Properties in Kenya</div>
                <div className="py-6 md:px-12 xs:px-6">
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
                    <div className="flex justify-center items-center py-6">
                        {propertyList && propertyList.length > 10 &&
                            <Pagination
                                currentPage={1}
                                // onPageChange={}
                                showIcons={true}
                                totalPages={100}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default Cards