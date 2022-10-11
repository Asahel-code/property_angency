import React, { useState, useEffect } from 'react';
import { Label, TextInput, Button, Select, Textarea, FileInput, Avatar, Spinner } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { addProperty } from '../../redux/property-modal/propertyModalSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { publicRequest } from '../../utils/requestHeader';
import Helmet from '../../components/Helemet';

const AddProperty = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [rooms, setRooms] = useState();
    const [landSize, setLandSize] = useState();
    const [categoryItem, setCategoryItem] = useState("");
    const [subCategoryItem, setSubCategoryItem] = useState("");
    const [images, setImages] = useState([]);
    const [phoneNumberContact, setPhoneNumberContact] = useState("");
    const [whatsappContact, setWhatsappContact] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [category, setCategory] = useState("");

    const { user: currentUser } = useSelector((state) => state.auth);
    const { errorMessage } = useSelector((state) => state.errorMessage);

    let subCategory = []

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!currentUser.isAdmin){
            navigate('/');
        }
        const cancelToken = axios.CancelToken.source();
        publicRequest.get("/category", { cancelToken: cancelToken.token })
            .then((response) => {
                setCategory(response.data);
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
    }, [navigate, currentUser.isAdmin]);

    category && category.forEach(element => {
        if (categoryItem === element.name) {
            if (element.subCategory !== []) {
                subCategory.push(element.subCategory);
            }
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('rooms', rooms);
        formData.append('landSize', landSize);
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
                toast.success(`${name} property has been added successfully`);
                navigate("/admin/dashboard");
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.error(errorMessage);
                console.log(error.message);
            })
    }


    return (
        <Helmet title="Add property">
            <div className="flex justify-center items-center py-12">
                <div className="border md:rounded-3xl bg-white md:w-3/5 xs:w-full pb-5">
                    <h3 className="text-center border-b-2 font-bold text-3xl text-blue-900 py-3">
                        Add new property
                    </h3>
                    <form className="w-full" onSubmit={handleSubmit} encType='multipart/form-data'>
                        <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-2 md:my-5 md:bg-gray-200 py-4 md:px-10 xs:px-4">
                            <div className="md:flex md:items-center xs:block w-full gap-2">
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
                            <div className="md:flex md:items-center xs:block w-full gap-2">
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
                        <div className="md:px-6 xs:px-4">
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
                            {categoryItem === "Real Estate" ?
                                <div className="flex flex-col gap-2">
                                    <div className="mt-2 block">
                                        <Label
                                            htmlFor="no_rooms"
                                            value="NUmber of rooms"
                                        />
                                    </div>
                                    <TextInput
                                        id="no_rooms"
                                        type="number"
                                        placeholder="4"
                                        required={true}
                                        onChange={(e) => setRooms(e.target.value)}
                                    />
                                </div>
                                : categoryItem === "Land" &&
                                <div className="flex flex-col gap-2">
                                    <div className="mt-2 block">
                                        <Label
                                            htmlFor="land_size"
                                            value="Size of land (Acers)"
                                        />
                                    </div>
                                    <TextInput
                                        id="land_size"
                                        type="text"
                                        placeholder="1.2"
                                        required={true}
                                        onChange={(e) => setLandSize(e.target.value)}
                                    />
                                </div>
                            }
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
                                    <div className="md:flex md:items-center xs:block w-full">
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
                                    <div className="md:flex md:items-center xs:block w-full">
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
                                {isLoading ? <Button disabled={true} size="lg" style={{ width: "300px", backgroundColor: "#000", color: "#fff" }}>
                                    <Spinner aria-label="Spinner button example" />
                                    <span className="pl-3">
                                        Adding...
                                    </span>
                                </Button> : <Button type="submit" size="lg" style={{ width: "300px", backgroundColor: "#000", color: "#fff" }}>Add</Button>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Helmet>
    )
}

export default AddProperty