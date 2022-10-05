import React, { useState, useEffect } from 'react';
import { Button, Select, TextInput, Spinner } from "flowbite-react";
import { useDispatch } from 'react-redux';
import { searchProperties } from '../redux/property-modal/propertyModalSlice';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../utils/requestHeader';
import axios from 'axios';


const Search = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [propertyCategory, setPropertyCategory] = useState("Real Estate");
    const [subCategory, setSubCategory] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    const categoryNavStyle = "py-2 px-4 uppercase text-white md:text-xl xs:text-md cursor-pointer";

    const dispatch = useDispatch();

    useEffect(() => {
        if (propertyCategory === "Land") {
            setSubCategory("")
        }

        const cancelToken = axios.CancelToken.source();
        publicRequest.get("/category", { cancelToken: cancelToken.token })
            .then((response) => {
                setCategoryList(response.data);
                localStorage.setItem("category", JSON.stringify(response.data));
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("canceled")
                }
                else {

                }
            })

        return () => {
            cancelToken.cancel()
        }

    }, [propertyCategory])

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
                    <div className="flex justify-start">
                        <div className="grid grid-cols-2 md:gap-0 md:mb-0 xs:gap-4 xs:mb-4">
                            <div className={propertyCategory === "Real Estate" ? `${categoryNavStyle} bg-blue-800` : `${categoryNavStyle} bg-blue-400`} onClick={() => setPropertyCategory("Real Estate")}>Real Estate</div>
                            <div className={propertyCategory === "Land" ? `${categoryNavStyle} bg-blue-800` : `${categoryNavStyle} bg-blue-400`} onClick={() => setPropertyCategory("Land")}>Land</div>
                        </div>
                    </div>
                    <div className="py-5 px-4 bg-cyan-300 opacity-80">
                        {propertyCategory === "Real Estate" ?
                            <div className="grid md:grid-cols-4 xs:grid-cols-1 gap-4">
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
                            :
                            <div className="grid md:grid-cols-4 xs:grid-cols-1 gap-4 w-full">
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
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Search