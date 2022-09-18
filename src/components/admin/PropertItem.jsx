import React, { useEffect } from 'react';
import { Table, Button, TextInput, Pagination } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import numberWithCommas from '../../utils/numberWithCommas';
import { getProperties, deleteProperty } from '../../redux/property-modal/propertyModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCategory from '../EmptyCategory';

const PropertItem = () => {

    const { properties } = useSelector((state) => state.property);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProperties());
    }, [dispatch]);

    const handleDelete = (propertyName) => {
        dispatch(deleteProperty(propertyName))
        .unwrap()
        .then(()=> {
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
                        />
                    </div>
                    <div className="text-2xl pl-6 cursor-pointer">
                        <BiSearch />
                    </div>
                </form>
            </div>
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
                    {properties && !properties.length ? (
                        <EmptyCategory />
                    ) : (properties.map((property, index) => {
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
                                <Table.Cell>
                                    <div className="font-medium text-red-600 cursor-pointer">
                                        <BsFillTrashFill onClick={() => handleDelete(property.name)} />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )
                    }))}
                </Table.Body>
            </Table>
            <div className="flex justify-end my-5">
                {properties && properties.length > 10 &&
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