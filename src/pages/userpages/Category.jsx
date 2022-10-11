import { useState, useEffect } from 'react';
import { Breadcrumb, Pagination } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import CategoryItem from "../../components/CategoryItem";
import EmptyCategory from "../../components/EmptyCategory";
import ContactButtonSection from "../../components/ContactButtonSection";
import Helmet from '../../components/Helemet';
import { publicRequest } from '../../utils/requestHeader';
import AdvertSpace from '../../components/AdvertSpace';
import axios from 'axios';

const Category = () => {

    const [categoryItems, setCategoryItems] = useState([]);

    let { category } = useParams();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        publicRequest.get("/property", { cancelToken: cancelToken.token })
            .then((response) => {
                setCategoryItems(response.data.filter((property) => property.category === category))
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
    }, [category]);

    return (
        <Helmet title={category}>
            <div>
                <div className="grid lg:grid-cols-3 xs:grid-cols-1 gap-5 lg:mx-5 xs:mx-2 my-4">
                    <div className="col-span-2">
                        <div className="pb-6">
                            <Breadcrumb aria-label="Default breadcrumb example">
                                <Breadcrumb.Item
                                    icon={HiHome}
                                >
                                    <Link to="/">Home</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to={`/${category}`}>{category}</Link>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="text-center">
                            <h5 className="pb-8 md:text-3xl xs:text-2xl font-bold">{category} in Kenya</h5>
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
                            {categoryItems && !categoryItems.length ? (
                                <EmptyCategory />
                            ) : (categoryItems && categoryItems.map((item, index) =>
                                <CategoryItem key={index} catItem={item} />
                            ))}

                            {categoryItems && categoryItems.length > 10 &&
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

export default Category