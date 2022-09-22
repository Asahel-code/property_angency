import React, { useState, useEffect } from 'react';
import { Modal, Button, TextInput, Label, Textarea, Avatar, Select, FileInput } from 'flowbite-react';
import { useSelector } from 'react-redux';



const UpdatePropertyModal = ({ closeModal, property }) => {

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

    useEffect(() => {
        setName(property.name)
        setDescription(property.description)
        setLocation(property.location)
        setPrice(property.price)
        setCategoryItem(property.category)
        setSubCategoryItem(property.subCategory)
        setPhoneNumberContact(property.phoneNumberContact)
        setWhatsappContact(property.whatsappContact)
    }, [property])

    let subCategory = []

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

    }
    return (
        <div>
            <Modal
                show={true}
                size="5xl"
                onClose={closeModal}
            >
                <Modal.Header>
                    <h3 className="font-bold text-3xl text-blue-900">
                        Update property
                    </h3>
                </Modal.Header>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <Modal.Body>
                        <div className="md:px-6 xs:px-4">
                            <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-2">
                                <div className="block w-full">
                                    <div className="block">
                                        <Label
                                            htmlFor="propertyName"
                                            value="Property name"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <TextInput
                                            id="propertyName"
                                            type="text"
                                            value={name}
                                            required={true}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="block w-full">
                                    <div className="block">
                                        <Label
                                            htmlFor="location"
                                            value="Property location"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <TextInput
                                            id="location"
                                            type="text"
                                            value={location}
                                            required={true}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-2">
                                <div className="block w-full">
                                    <div className="block">
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
                                            <option value={property.category}>{categoryItem}</option>
                                            {category && category.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.name}>{item.name}</option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                </div>
                                <div className="block w-full">
                                    <div className="block">
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
                                            <option value={property.subCategory}>{subCategoryItem}</option>
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
                            <div className="grid md:grid-cols-3 xs:grid-cols-1 gap-2 py-2">
                                <div className="block w-full">
                                    <div className="block">
                                        <Label
                                            htmlFor="price"
                                            value="Property price (ksh)"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <TextInput
                                            id="price"
                                            type="text"
                                            value={price}
                                            required={true}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="block w-full">
                                    <div className="block">
                                        <Label
                                            htmlFor="phonecontactNumber"
                                            value="Phone contact number"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <TextInput
                                            id="phoneContactNumber"
                                            type="text"
                                            value={phoneNumberContact}
                                            required={true}
                                            onChange={(e) => setPhoneNumberContact(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="block w-full">
                                    <div className="block">
                                        <Label
                                            htmlFor="whatsappNumber"
                                            value="Whatsapp number"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <TextInput
                                            id="whatsappNumber"
                                            type="text"
                                            value={whatsappContact}
                                            required={true}
                                            onChange={(e) => setWhatsappContact(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="block w-full">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="description"
                                        value="Property description"
                                    />
                                </div>
                                <div className="w-full">
                                    <Textarea
                                        id="description"
                                        value={description}
                                        required={true}
                                        rows={3}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
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
                            </div>
                            <Button
                                type="submit"
                                size="lg"
                                style={{ width: "50%" }}>
                                Update
                            </Button>
                        </div>
                    </Modal.Body>
                </form>
            </Modal>
        </div>
    )
}

export default UpdatePropertyModal