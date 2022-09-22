import { useState, useEffect } from 'react';
import { Breadcrumb, Pagination } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import CategoryItem from "../../components/CategoryItem";
import EmptyCategory from "../../components/EmptyCategory";
import Search from "../../components/Search";
import ContactButtonSection from "../../components/ContactButtonSection";
import { useSelector } from 'react-redux';

const Category = () => {

    const { properties } = useSelector((state) => state.property);
    const [categoryItems, setCategoryItems] = useState([]);

    let { category } = useParams();

    useEffect(() => {
        setCategoryItems(properties.filter((e) => e.category === category))
    }, [category, properties])
    return (
        <div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-5 lg:mx-5 xs:mx-2 my-4">
                <div className="col-span-2">
                    <div  className="pb-6">
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
                        <h5 className="pb-8 text-2xl">{category} in Kenya</h5>
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
                <div className="lg:block sm:hidden">
                    <Search />
                </div>
            </div>
        </div>
    )
}

export default Category