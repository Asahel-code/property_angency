import React, { useState, useEffect } from 'react';
import { Label, TextInput, Button, Select, Textarea, FileInput, Avatar } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/category-modal/categoryModalSlice';
import { addProperty } from '../../redux/property-modal/propertyModalSlice';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [categoryItem, setCategoryItem] = useState("");
    const [subCategoryItem, setSubCategoryItem] = useState("");
    const [images, setImages] = useState([]);
    const [phoneNumberContact, setPhoneNumberContact] = useState("");
    const [whatsappContact, setWhatsappContact] = useState("");

    const { category } = useSelector((state) => state.category);

    let subCategory = []

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch]);

    category && category.forEach(element => {
        if (categoryItem === element.name) {
            if (element.subCategory !== []) {
                subCategory.push(element.subCategory);
            }
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        Object.values(images).forEach(image => {
            formData.append('images', image);
        });
        formData.append('category', categoryItem);
        formData.append('subCategory', subCategoryItem);
        formData.append('location', location);
        formData.append('phoneNumberContact', phoneNumberContact);
        formData.append('whatsappContact', whatsappContact);

        dispatch(addProperty(formData))
            .unwrap()
            .then(() => {
                navigate("/admin/dashboard")
            })
            .catch((error) => console.log(error.message))
    }


    return (
        <div className="flex justify-center py-12 lg:mx-48 md:mx-24 w-full">
            <div className="border md:rounded-3xl w-full pb-5 shadow bg-white">
                <h3 className="text-center border-b-2 font-bold text-3xl text-blue-900 py-3">
                    Add new property
                </h3>
                <form className="w-full" onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-2 my-5 md:bg-gray-200 py-4 px-10">
                        <div className="flex xs:flex-col items-center w-full">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="category"
                                    value="Category"
                                />
                            </div>
                            <div></div>
                            <div className="w-full">
                                <Select
                                    id="category"
                                    name="category"
                                    onChange={(e) => setCategoryItem(e.target.value)}
                                >
                                    <option value="">Select a category</option>
                                    {category && category.map((item, index) => {
                                        return (
                                            <option key={index} value={item.name}>{item.name}</option>
                                        )
                                    })}
                                </Select>
                            </div>
                        </div>
                        <div className="flex items-center w-full">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="subCategory"
                                    value="Sub-category"
                                />
                            </div>
                            <div className="w-full">
                                <Select
                                    id="subCategory"
                                    name="subCategory"
                                    onChange={(e) => setSubCategoryItem(e.target.value)}
                                >
                                    <option value="">Select a sub-category</option>
                                    {subCategory.map((item, index) => {
                                        return (
                                            item.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.name}>{item.name}</option>
                                                )
                                            })
                                        )
                                    })}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="px-6">
                        <div className="flex flex-col gap-2">
                            <div className="mt-2 block">
                                <Label
                                    htmlFor="propertyName"
                                    value="Property name"
                                />
                            </div>
                            <TextInput
                                id="propertyName"
                                type="text"
                                placeholder="Input property name"
                                required={true}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="location"
                                    value="Location"
                                />
                            </div>
                            <TextInput
                                id="location"
                                type="text"
                                placeholder="Input a properties location"
                                required={true}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="price"
                                    value="Price"
                                />
                            </div>
                            <TextInput
                                id="price"
                                type="text"
                                placeholder="100000"
                                required={true}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="mt-2 block">
                                <Label
                                    htmlFor="description"
                                    value="Property description"
                                />
                            </div>
                            <Textarea
                                id="comment"
                                placeholder="Add property description..."
                                required={true}
                                rows={3}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="flex flex-col gap-2">
                                <div className="mt-2 block">
                                    <Label
                                        htmlFor="images"
                                        value="Upload your images"
                                    />
                                </div>
                                <FileInput
                                    id="images"
                                    multiple
                                    helperText="Upload at least 3 photos of a property"
                                    onChange={(e) => setImages(pre => [...e.target.files])}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {!images.length ? (
                                    <Avatar
                                        img="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                    />
                                ) : (
                                    images.map((image, index) => {
                                        return (
                                            <Avatar
                                                key={index}
                                                img={URL.createObjectURL(image)}
                                            />
                                        )
                                    })
                                )}

                            </div>
                            <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-2 py-4">
                                <div className="flex xs:flex-col items-center w-full">
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="phonecontactNumber"
                                            value="Phone contact number"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <TextInput
                                            id="phoneContactNumber"
                                            type="text"
                                            placeholder="Input a phone number"
                                            required={true}
                                            onChange={(e) => setPhoneNumberContact(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center w-full">
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="whatsappNumber"
                                            value="Whatsapp number"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <TextInput
                                            id="whatsappNumber"
                                            type="text"
                                            placeholder="Input a whatsapp number"
                                            required={true}
                                            onChange={(e) => setWhatsappContact(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                size="lg"
                                style={{ width: "300px" }}>
                                Add
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProperty