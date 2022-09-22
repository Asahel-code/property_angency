import { useState, useEffect } from 'react';
import { Breadcrumb, Pagination } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import CategoryItem from "../../components/CategoryItem";
import EmptyCategory from "../../components/EmptyCategory";
import Search from "../../components/Search";
import ContactButtonSection from "../../components/ContactButtonSection";
import { useSelector } from 'react-redux';

const SubCategory = () => {

    const { properties } = useSelector((state) => state.property);
    const [subCategoryItems, setSubCategoryItems] = useState([]);

    let { category } = useParams();
    let { subCategory } = useParams();

    useEffect(() => {
        setSubCategoryItems(properties.filter((e) => e.subCategory === subCategory))
    }, [subCategory, properties])

    return (
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
    )
}

export default SubCategory