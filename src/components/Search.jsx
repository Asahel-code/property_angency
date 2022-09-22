import React, { useState, useEffect } from 'react';
import { Button, Select, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../redux/category-modal/categoryModalSlice';

const Search = () => {
    const [propertySearch, setPropertySearch] = useState("Real Estate");
    const [subCategory, setSubCategory] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");

    const categoryNavStyle = "py-2 px-4 uppercase text-white text-xl cursor-pointer";
    const { category } = useSelector((state) => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const handleSearch =() => {
        console.log({propertySearch, subCategory, location, price})
    }

    return (
        <div className="search__section">
            <div className="flex justify-center items-center py-10">
                <div>
                    <div className="grid grid-cols-2 md:gap-4 md:mb-4">
                        <div className={propertySearch === "Real Estate" ? `${categoryNavStyle} bg-blue-600` : `${categoryNavStyle} bg-gray-500`} onClick={() => setPropertySearch("Real Estate")}>Real Estate</div>
                        <div className={propertySearch === "Land" ? `${categoryNavStyle} bg-blue-600` : `${categoryNavStyle} bg-gray-500`} onClick={() => setPropertySearch("Land")}>Land</div>
                    </div>
                    <div className="grid grid-cols-4 xs:grid-cols-1 gap-4 py-5 px-4 bg-cyan-300 opacity-80">
                        {propertySearch === "Real Estate" &&
                            <Select
                                id="subCategory"
                                name="subCategory"
                                onChange={(e) => setSubCategory(e.target.value)}
                            >
                                <option value="">select a sub category</option>
                                {category && category.map((cat, index) => {
                                    return (
                                        cat.subCategory.length > 0 && cat.subCategory.map((sub, index) => {
                                            return (
                                                <option key={index} value={sub.name}>{sub.name}</option>
                                            )
                                        })

                                    )

                                })
                                }
                            </Select>
                        }
                        <TextInput
                            id="location"
                            type="text"
                            placeholder="Enter a location"
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <TextInput
                            id="price"
                            type="text"
                            placeholder="Price"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <Button onClick={handleSearch}>Search</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Search