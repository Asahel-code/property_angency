import { useState, useEffect } from 'react';
import { Breadcrumb, Pagination } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import CategoryItem from "../../components/CategoryItem";
import EmptyCategory from "../../components/EmptyCategory";
import Search from "../../components/Search";
import ContactButtonSection from "../../components/ContactButtonSection";
import Helmet from '../../components/Helemet';
import { publicRequest } from '../../utils/requestHeader';
import axios from 'axios';

const SubCategory = () => {

    const [subCategoryItems, setSubCategoryItems] = useState([]);

    let { category } = useParams();
    let { subCategory } = useParams();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        publicRequest.get("/property", { cancelToken: cancelToken.token })
            .then((response) => {
                setSubCategoryItems(response.data.filter((property) => property.subCategory === subCategory))
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
      
    }, [subCategory])

    return (
        <Helmet title={subCategory}>
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
                                <Breadcrumb.Item>
                                    <Link to={`/${subCategory}`}>{subCategory}</Link>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="text-center">
                            <h5 className="pb-8 text-2xl">{subCategory} in Kenya</h5>
                        </div>
                        <div>
                            {subCategoryItems && !subCategoryItems.length ? (
                                <EmptyCategory />
                            ) : (subCategoryItems && subCategoryItems.map((item, index) =>
                                <CategoryItem key={index} catItem={item} />
                            ))}

                            {subCategoryItems && subCategoryItems.length > 10 &&
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
                        <Search />
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default SubCategory