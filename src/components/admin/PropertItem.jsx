import React, { useState, useEffect } from 'react';
import { Table, Button, TextInput, Pagination } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import numberWithCommas from '../../utils/numberWithCommas';
import EmptyCategory from '../EmptyCategory';
import { toast } from 'react-toastify';
import { publicRequest, userRequest } from '../../utils/requestHeader';
import axios from 'axios';

const PropertItem = () => {

    const [searchField, setSearchField] = useState("");
    const [propertyList, setPropertyList] = useState([]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        publicRequest.get("/property", { cancelToken: cancelToken.token })
            .then((response) => {
                setPropertyList(response.data);
                localStorage.setItem("properties", JSON.stringify(response.data));
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("canceled")
                }
                else {

                }
            })

        return (() => {
            cancelToken.cancel()
        })
    }, []);

    const handleDelete = async (propertyName) => {
        await userRequest.delete(`/property/${propertyName}`).then(() => {
            toast.error('Property deleted successfully');
            setTimeout(() => {
                // eslint-disable-next-line no-restricted-globals
                location.reload()
            }, 2500);
        })
    }
    return (
        <div>
            <div className="flex justify-end mb-5">
                <Button color="success" style={{ width: "200px" }}>
                    <Link to="/admin/add-property">
                        Add new property
                    </Link>
                </Button>
            </div>
            <div className="pb-6">
                <form className="flex items-center">
                    <div className="w-full">
                        <TextInput
                            id="search"
                            type="text"
                            placeholder="Input your earch your search ..."
                            onChange={(e) => setSearchField(e.target.value)}
                        />
                    </div>
                </form>
            </div>
            {propertyList && !propertyList.length ? (
                <EmptyCategory />
            ) :
                <Table>
                    <Table.Head>
                        <Table.HeadCell>
                            Property name
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Category
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Price (ksh)
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">
                                Edit
                            </span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">
                                Delete
                            </span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {propertyList && propertyList.filter((property) => {
                            return (
                                property === "" ? property :
                                    property.name.toLowerCase().includes(searchField.toLowerCase()) ||
                                    property.category.toLowerCase().includes(searchField.toLowerCase()) ||
                                    property.location.toLowerCase().includes(searchField.toLowerCase()) ||
                                    property.price.toLowerCase().includes(searchField.toLowerCase())
                            )
                        }).map((property, index) => {
                            return (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {property.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {property.category}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {numberWithCommas(Number(property.price))}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/admin/view-property/${property.name}`} className="font-medium text-blue-600 ">
                                            <BsPencilSquare />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell className="font-medium text-red-600 cursor-pointer">
                                        <BsFillTrashFill onClick={() => handleDelete(property.name)} />
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                        }
                    </Table.Body>
                </Table>
            }
            <div className="flex justify-end my-5">
                {propertyList && propertyList.length > 10 &&
                    <Pagination
                        currentPage={1}
                        // onPageChange={onPageChange}
                        showIcons={true}
                        totalPages={100}
                    />}
            </div>
        </div >
    )
}

export default PropertItem