import React, { useState, useEffect } from 'react';
import { Button, Select, TextInput, Spinner } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../redux/category-modal/categoryModalSlice';
import { searchProperties } from '../redux/property-modal/propertyModalSlice';
import { useNavigate } from 'react-router-dom';


const Search = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [propertyCategory, setPropertyCategory] = useState("Real Estate");
    const [subCategory, setSubCategory] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    const categoryNavStyle = "py-2 px-4 uppercase text-white text-xl cursor-pointer";
    const { category } = useSelector((state) => state.category);
    const { isLoaded } = useSelector((state) => state.category)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
            .then(() => {
                if (isLoaded) {
                    setCategoryList(category)
                }
            })
        if (propertyCategory === "Land") {
            setSubCategory("")
        }
    }, [dispatch, propertyCategory, category, isLoaded])

    const handleSearch = () => {
        setLoading(true)
        dispatch(searchProperties({ propertyCategory, subCategory, location, price }))
            .then(() => {
                navigate('/search_results');
                setLoading(false);
            })
            .catch((error) => console.log(error.message))
    }

    return (
        <div className="search__section">
            <div className="flex justify-center items-center py-10">
                <div>
                    <div className="grid grid-cols-2 md:gap-4 md:mb-4">
                        <div className={propertyCategory === "Real Estate" ? `${categoryNavStyle} bg-blue-600` : `${categoryNavStyle} bg-gray-500`} onClick={() => setPropertyCategory("Real Estate")}>Real Estate</div>
                        <div className={propertyCategory === "Land" ? `${categoryNavStyle} bg-blue-600` : `${categoryNavStyle} bg-gray-500`} onClick={() => setPropertyCategory("Land")}>Land</div>
                    </div>
                    <div className="grid grid-cols-4 xs:grid-cols-1 gap-4 py-5 px-4 bg-cyan-300 opacity-80">
                        {propertyCategory === "Real Estate" &&
                            <Select
                                id="subCategory"
                                name="subCategory"
                                onChange={(e) => setSubCategory(e.target.value)}
                            >
                                <option value="">select a sub category</option>
                                {categoryList && categoryList.map((cat, index) => {
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
                        {isLoading ? <Button style={{ width: "100%" }}>
                            <Spinner aria-label="Spinner button example" />
                            <span className="pl-3">
                                Searching...
                            </span>
                        </Button> : <Button onClick={handleSearch} style={{ width: "100%" }}>Search</Button>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Search