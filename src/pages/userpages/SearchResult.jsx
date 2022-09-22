import React from 'react'
import Search from "../../components/Search";
import ContactButtonSection from "../../components/ContactButtonSection";

const SearchResult = () => {
    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-5 lg:mx-5 xs:mx-2">
            <div className="col-span-2">
                <div className="text-center">
                    <h5 className="pb-8">Search results</h5>
                </div>
                <div>
                    
                    <div>
                        <ContactButtonSection />
                    </div>
                </div>
            </div>
            <div className="lg:block sm:hidden">
                <Search />
            </div>
        </div>
    )
}

export default SearchResult