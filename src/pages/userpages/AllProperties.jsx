import { useState, useEffect } from 'react';
import { Pagination } from "flowbite-react";
import CategoryItem from "../../components/CategoryItem";
import EmptyCategory from "../../components/EmptyCategory";
import ContactButtonSection from "../../components/ContactButtonSection";
import AdvertSpace from '../../components/AdvertSpace';
import Helmet from '../../components/Helemet';
import { publicRequest } from '../../utils/requestHeader';
import axios from 'axios';


const AllProperties = () => {

    const [properties, setProperties] = useState([]);

    useEffect(()=>{
        const cancelToken = axios.CancelToken.source();
        publicRequest.get("/property", { cancelToken: cancelToken.token })
        .then((response) => {
            setProperties(response.data);
            localStorage.setItem("properties", JSON.stringify(response.data));
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
    },[]);

    console.log(properties)

    return (
        <Helmet title="All Properties">
            <div>
                <div className="grid lg:grid-cols-3 xs:grid-cols-1 gap-5 lg:mx-5 xs:mx-2 my-4">
                    <div className="col-span-2 pt-2">
                        <div className="text-center">
                            <h5 className="pb-8 md:text-3xl xs:text-2xl font-bold">Properties in Kenya</h5>
                        </div>
                        {/* <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center w-full">
                            <Label htmlFor="sort" value="Sort by" />
                            <div className="w-1/2">
                                <Select
                                    id="sort"
                                >
                                    <option>
                                        Featured
                                    </option>
                                </Select>
                            </div>


                        </div>
                        <div className="flex gap-2 items-center w-full">
                            <Label htmlFor="items" value="Show items" />
                            <div className="w-1/2">
                                <Select
                                    id="items"
                                >
                                    <option>
                                        10 items
                                    </option>
                                </Select>
                            </div>
                        </div>
                    </div> */}
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
                    <div className="lg:block xs:hidden">
                        <AdvertSpace/>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default AllProperties