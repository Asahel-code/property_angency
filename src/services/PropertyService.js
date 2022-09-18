import { publicRequest, userRequest } from "../utils/requestHeader";

const getProperties = async () => {
    return await publicRequest.get("/property")
        .then((response) => {
            localStorage.setItem("properties", JSON.stringify(response.data));
            return response.data;
        });
};


const addProperty = async (formData) => {
    return await userRequest.post("/property", formData)
    .then((response) => {
        localStorage.setItem("properties", JSON.stringify(response.data));
            return response.data;
    })
}

const updateProperty = async (propertyName, formData) => {
    return await userRequest.patch(`/property/${propertyName}`, formData)
    .then((response) => {
        localStorage.setItem("properties", JSON.stringify(response.data));
            return response.data;
    })
}

const deleteProperty = async (propertyName) => {
    return await userRequest.delete(`/property/${propertyName}`)
}

const PropertyService = {
    getProperties,
    addProperty,
    updateProperty,
    deleteProperty
}

export default PropertyService;