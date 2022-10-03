import React, { useState, useEffect} from 'react'
import { Pagination } from "flowbite-react";
import Search from "../../components/Search";
import ContactButtonSection from "../../components/ContactButtonSection";
import Helemet from "../../components/Helemet";
import CategoryItem from "../../components/CategoryItem";
import EmptyCategory from "../../components/EmptyCategory";
import { useSelector } from 'react-redux';


const SearchResult = () => {

    const { properties } = useSelector((state) => state.property);
    const { isLoaded } = useSelector((state) => state.property);
    const [propertyList, setPropertylist] = useState([]);


    useEffect(() => {
        if(isLoaded){
            setPropertylist(properties)
        }
    }, [isLoaded, properties])


    return (
        <Helemet title="Search Results">
            <div className="grid lg:grid-cols-3 xs:grid-cols-1 gap-5 lg:mx-5 xs:mx-2 my-4">
                <div className="col-span-2 mt-5">
                    <div className="text-center">
                        <h5 className="pb-8">Search results</h5>
                    </div>
                    <div>
                        {propertyList && !propertyList.length ? (
                            <EmptyCategory />
                        ) : (propertyList && propertyList.map((item, index) =>
                            <CategoryItem key={index} catItem={item} />
                        ))}

                        {propertyList && propertyList.length > 10 &&
                            <Pagination
                                currentPage={1}
                                totalPages={100}
                            //   onPageChange={onPageChange}
                            />
                        }
                        <div>
                            <ContactButtonSection />
                        </div>
                    </div>
                </div>
                <div className="lg:block xs:hidden">
                    <Search />
                </div>
            </div>
        </Helemet>

    )
}

export default SearchResult