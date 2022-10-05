import React, { useState, useEffect } from 'react'
import { Pagination } from "flowbite-react";
import ContactButtonSection from "../../components/ContactButtonSection";
import Helemet from "../../components/Helemet";
import CategoryItem from "../../components/CategoryItem";
import EmptyCategory from "../../components/EmptyCategory";


const SearchResult = () => {

    const [propertyList, setPropertylist] = useState([]);

    useEffect(() => {
        const properties = JSON.parse(localStorage.getItem("properties"));
        setPropertylist(properties)
    }, [])


    return (
        <Helemet title="Search Results">
            <div className="lg:mx-5 xs:mx-2 my-4">
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
            </div>
        </Helemet>

    )
}

export default SearchResult