import React, { useState } from 'react';
import { Button, Select, TextInput } from "flowbite-react"

const Search = () => {
    const [realEstateSearch, setRealEstateSearch] = useState(true);
    const categoryNavStyle = "py-2 px-4 uppercase text-white text-xl cursor-pointer";

    return (
        <div className="search__section">
            <div className="flex justify-center items-center py-10">
                <div>
                    <div className="grid grid-cols-2 md:gap-4 md:mb-4">
                        <div className={realEstateSearch ?`${categoryNavStyle} bg-blue-600` : `${categoryNavStyle} bg-gray-500`} onClick={() => setRealEstateSearch(true)}>Real Estate</div>
                        <div className={!realEstateSearch ?`${categoryNavStyle} bg-blue-600` : `${categoryNavStyle} bg-gray-500`} onClick={() => setRealEstateSearch(false)}>Land</div>
                    </div>
                    <div className="grid grid-cols-4 xs:grid-cols-1 gap-4 py-5 px-4 bg-cyan-300 opacity-80">
                        {realEstateSearch && 
                        <Select
                            id="subCategory"
                        >
                            <option>
                                Sub Category
                            </option>
                        </Select>}
                        <TextInput
                            id="location"
                            placeholder="Enter a location"
                        />
                        <TextInput
                            id="price"
                            placeholder="Price"
                        />
                        <Button>Search</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Search