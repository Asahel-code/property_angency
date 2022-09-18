import { publicRequest, userRequest } from "../utils/requestHeader";


const getCategories = async () => {
    return await publicRequest.get("/category")
        .then((response) => {
            localStorage.setItem("category", JSON.stringify(response.data));
            return response.data;
        });
};

const addCategory = async (categoryName, subCategory) => {
    return await userRequest.post("/category", {
        categoryName,
        subCategory
    })
        .then((response) => {
            localStorage.setItem("category", JSON.stringify(response.data));
            return response.data;
        });
}

const CategoryService = {
    getCategories,
    addCategory
}

export default CategoryService;