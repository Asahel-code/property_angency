import React, { useEffect, Suspense } from 'react';
import { Pagination } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties } from '../redux/property-modal/propertyModalSlice';
import EmptyCategory from './EmptyCategory';

const CardItem = React.lazy(() => import('./CardItem'));

const Cards = () => {

    const { properties } = useSelector((state) => state.property);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProperties());
    }, [dispatch])
    return (
        <Suspense fallback={<h1>Loading profile...</h1>}>
            <div className="py-10 md:px-12 xs:px-6">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {properties && !properties.length ? (
                        <EmptyCategory />
                    ) : (properties && properties.map((item, index) => {
                        return (
                            <CardItem key={index} property={item} />
                        )
                    })
                    )}

                </div>
                <div className="flex justify-center items-center mt-8">
                    {properties && properties.length > 10 &&
                        <Pagination
                            currentPage={1}
                            // onPageChange={}
                            showIcons={true}
                            totalPages={100}
                        />
                    }

                </div>
            </div>
        </Suspense>

    )
}

export default Cards