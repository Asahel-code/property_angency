import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput, Label } from 'flowbite-react';
import { BsFillPlusCircleFill, BsDashCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../redux/category-modal/categoryModalSlice';
import { toast } from 'react-toastify';

const AddCategory = () => {

    const [categoryName, setCategoryName] = useState("");
    const [subCategory, setSubCategory] = useState([
        { name: "" },
    ]);
    const { successMessage } = useSelector((state) => state.successMessage);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddInput = () => {
        let newfield = { name: "" }
        setSubCategory([...subCategory, newfield]);

    };
    const handleDeleteInput = (index) => {
        const list = [...subCategory];
        list.splice(index, 1);
        setSubCategory(list);
    };
    const handleInput = (e, index) => {
        const list = [...subCategory];
        list[index][e.target.name] = e.target.value;
        setSubCategory(list);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addCategory({ categoryName, subCategory }))
            .unwrap()
            .then(() => {
                toast.success(successMessage);
                navigate('/admin/dashboard');
            })
            .catch((error) => {
                toast.error(`${categoryName} has been added successfully`);
                console.log(error.message)
            })
    }
    return (
        <div className="flex justify-center items-center">
            <div className="border my-10 bg-white md:rounded-3xl md:w-2/5 xs:w-full">
                <div className="text-center border-b-2 py-4">
                    <h4 className="font-bold text-3xl text-blue-900">Add a new Category</h4>
                </div>
                <form className="flex flex-col gap-4 py-4 px-4" onSubmit={handleSubmit}>
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="category"
                                value="Category name"
                            />
                        </div>
                        <TextInput
                            id="category"
                            type="text"
                            placeholder="Real Estate"
                            required={true}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 flex justify-between items-center">
                            <Label
                                htmlFor="subCategory"
                                value="SubCategory name"
                            />
                            <div className="cursor-pointer text-lg text-gray-600">
                                <BsFillPlusCircleFill onClick={handleAddInput} />
                            </div>
                        </div>
                        {subCategory.map((input, index) => {
                            return (
                                <div className="flex justify-between items-center mb-2" key={index}>
                                    <TextInput
                                        id="subCategory"
                                        type="text"
                                        name='name'
                                        placeholder="flats"
                                        onChange={(e) => handleInput(e, index)}
                                    />
                                    <div className="cursor-pointer text-lg text-gray-600">
                                        <BsDashCircleFill onClick={() => handleDeleteInput(index)} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <Button type="submit" style={{ width: "100%" }}>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory