import React from 'react'
import { Pagination } from "flowbite-react";
import Search from "../../components/Search";
import ContactButtonSection from "../../components/ContactButtonSection";
import Helemet from "../../components/Helemet";
import CategoryItem from "../../components/CategoryItem";
import EmptyCategory from "../../components/EmptyCategory";
import { useSelector } from 'react-redux';


const SearchResult = () => {

    const { properties } = useSelector((state) => state.property);

    return (
        <Helemet title="Search Results">
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-5 lg:mx-5 xs:mx-2">
                <div className="col-span-2 mt-5">
                    <div className="text-center">
                        <h5 className="pb-8">Search results</h5>
                    </div>
                    <div>
                        {properties && !properties.length ? (
                            <EmptyCategory />
                        ) : (properties && properties.map((item, index) =>
                            <CategoryItem key={index} catItem={item} />
                        ))}

                        {properties && properties.length > 10 &&
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
                <div className="lg:block sm:hidden">
                    <Search />
                </div>
            </div>
        </Helemet>

    )
}

export default SearchResult