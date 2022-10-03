import { publicRequest, userRequest } from "../utils/requestHeader";

const getProperties = async () => {
    try{
        return await publicRequest.get("/property")
        .then((response) => {
            localStorage.setItem("properties", JSON.stringify(response.data));
            return response.data;
        });
    }
    catch(error) {console.log(error.message)}
    
};

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
    searchProperties,
    addProperty,
    updateProperty,
    deleteProperty
}

export default PropertyService;