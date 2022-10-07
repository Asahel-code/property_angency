import React, { useState, useEffect } from 'react';
import { Button, Select, TextInput, Spinner } from "flowbite-react";
import { useDispatch } from 'react-redux';
import { searchProperties } from '../redux/property-modal/propertyModalSlice';
import { Link, useNavigate } from 'react-router-dom';
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

    const categoryNavStyle = "py-2 px-4 uppercase md:text-xl xs:text-md cursor-pointer";

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
        <div className="search__section relative bg-[#E2F4FE]">
            <div className="">
                <div className="grid lg:grid-cols-2 xs:grid-cols-1 lg:py-20 md:py-14 xs:py-8">
                    <div className="md:px-24 xs:px-10">
                        <h1 className="capitalize lg:text-5xl xs:text-xl font-bold pb-4 lg:tracking-wide" data-aos="fade-down">Find a property that suit you</h1>
                        <p className="text-gray-500" data-aos="fade-down">What to find a property? We are ready to help you find one that suit your lifestyle and needs</p>
                        <div className="py-4" data-aos="fade-down">
                            <Button style={{ backgroundColor: "#000", color: "#fff" }}>
                                <Link to="#">Get started</Link>
                            </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-3 pb-5">
                            <div data-aos="fade-up">
                                <div className="flex items-center gap-1">
                                    <span className="md:text-2xl md:font-bold xs:text-lg xs:font-semibold">1200</span>
                                    <span className="md:text-2xl md:font-bold xs:text-lg xs:font-semibold text-[#3874F1]">
                                        +
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">Listed properties</p>
                            </div>
                            <div data-aos="fade-up">
                                <div className="flex items-center gap-1">
                                    <span className="md:text-2xl md:font-bold xs:text-lg xs:font-semibold">4500</span>
                                    <span className="md:text-2xl md:font-bold xs:text-lg xs:font-semibold text-[#3874F1]">
                                        +
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">Happy customers</p>
                            </div>
                            <div data-aos="fade-up">
                                <div className="flex items-center gap-1">
                                    <span className="md:text-2xl md:font-bold xs:text-lg xs:font-semibold">100</span>
                                    <span className="md:text-2xl md:font-bold xs:text-lg xs:font-semibold text-[#3874F1]">
                                        +
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">Awards</p>
                            </div>
                        </div>
                    </div>
                    <div className="search__section__bgImage md:block xs:hidden" data-aos="zoom-in">
                    </div>
                </div>
            </div>
            <div className="lg:absolute lg:top-[90%] lg:inset-x-64" data-aos="fade-up">
                <div className="bg-white drop-shadow-lg rounded-md pb-4">
                    <div className="flex justify-start">
                        <div className="grid grid-cols-2 gap-0 xs:mb-4">
                            <div className={propertyCategory === "Real Estate" ? `${categoryNavStyle} bg-black text-white` : `${categoryNavStyle} bg-[#EAF1FB]`} onClick={() => setPropertyCategory("Real Estate")}>Real Estate</div>
                            <div className={propertyCategory === "Land" ? `${categoryNavStyle} bg-black text-white` : `${categoryNavStyle} bg-[#EAF1FB]`} onClick={() => setPropertyCategory("Land")}>Land</div>
                        </div>
                    </div>
                    <div className="py-2 px-4">
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
                                {isLoading ? <Button disabled={true} style={{ width: "100%", backgroundColor: "#000", color: "#fff" }}>
                                    <Spinner aria-label="Spinner button example" />
                                    <span className="pl-3">
                                        Searching...
                                    </span>
                                </Button> : <Button onClick={handleSearch} style={{ width: "100%", backgroundColor: "#000", color: "#fff" }}>Search</Button>}
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
                                {isLoading ? <Button disabled={true} style={{ width: "100%", backgroundColor: "#000", color: "#fff" }}>
                                    <Spinner aria-label="Spinner button example" />
                                    <span className="pl-3">
                                        Searching...
                                    </span>
                                </Button> : <Button onClick={handleSearch} style={{ width: "100%", backgroundColor: "#000", color: "#fff" }}>Search</Button>}
                            </div>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Search