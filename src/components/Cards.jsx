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
            <div className="py-4">
                <div className="py-6 text-3xl font-bold text-center capitalize">Properties in Kenya</div>
                <div className="py-6 md:px-12 xs:px-6">
                    <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {properties && !properties.length ? (
                            <EmptyCategory />
                        ) : (properties && properties.map((item, index) => {
                            return (
                                <CardItem key={index} property={item} />
                            )
                        })
                        )}

                    </div>
                    <div className="flex justify-center items-center py-6">
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
            </div>
        </Suspense>

    )
}

export default Cards