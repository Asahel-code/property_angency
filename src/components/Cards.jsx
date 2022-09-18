import { useEffect } from 'react';
import CardItem from './CardItem';
import { Pagination } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties } from '../redux/property-modal/propertyModalSlice';
import EmptyCategory from './EmptyCategory';

const Cards = () => {

    const { properties } = useSelector((state) => state.property);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProperties());
    }, [dispatch])
    return (
        <div className="py-10 px-12">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
                {properties.length > 0 ? (
                    properties.map((item, index) => {
                        return (
                            <CardItem key={index} property={item} />
                        )
                    })
                ) : (
                    <EmptyCategory />
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
    )
}

export default Cards