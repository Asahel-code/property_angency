import { publicRequest, userRequest } from "../utils/requestHeader";

const searchProperties = async (propertyCategory, subCategory, location, price) => {
    return await publicRequest.get(`/property/${propertyCategory ? propertyCategory : null}/${subCategory ? subCategory : propertyCategory}/${location ? location : null}/${price ? price : null}`)
        .then((response) => {
            localStorage.setItem("properties", JSON.stringify(response.data));
            return response.data;
        });
};

const addProperty = async (formData) => {
    return await userRequest.post("/property", formData)
        .then((response) => {
            return response.data;
        })
}

const updateProperty = async (formData, propertyName) => {
    return await userRequest.patch(`/property/${propertyName}`, formData)
        .then((response) => {
            localStorage.setItem("properties", JSON.stringify(response.data));
            return response.data;
        })
}


const PropertyService = {
    searchProperties,
    addProperty,
    updateProperty,
}

export default PropertyService;