import { userRequest } from "../utils/requestHeader";



const addCategory = async (categoryName, subCategory) => {
    return await userRequest.post("/category", {
        categoryName,
        subCategory
    })
        .then((response) => {
            return response.data;
        });
}

const CategoryService = {
    addCategory
}

export default CategoryService;