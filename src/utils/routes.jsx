import AddCategory from "../pages/admin pages/AddCategory"
import AddProperty from "../pages/admin pages/AddProperty"
import Dashboard from "../pages/admin pages/Dashboard"
import ViewProperty from "../pages/admin pages/ViewProperty"
import Login from "../pages/forms/Login"
import Signup from "../pages/forms/Signup"
import Category from "../pages/userpages/Category"
import Home from "../pages/userpages/Home"
import PropertyDetails from "../pages/userpages/PropertyDetails"
import SubCategory from "../pages/userpages/SubCategory"
import Contact from "../pages/userpages/Contact"
import SearchResult from "../pages/userpages/SearchResult"

export const useRouter = () => [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/search_results",
        element: <SearchResult />,
    },
    {
        path: "/:category",
        element: <Category />,
    },
    {
        path: "/:category/:subCategory",
        element: <SubCategory />,
    },
    {
        path: "/:category/:subCategory/:propertyName",
        element: <PropertyDetails />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {
        path: "/admin/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/admin/add-property",
        element: <AddProperty />,
    },
    {
        path: "/admin/add-category",
        element: <AddCategory />,
    },
    {
        path: "/admin/view-property/:propertyName",
        element: <ViewProperty />,
    },
    {
        path: "/admin/login",
        element: <Login />,
    },
    {
        path: "/admin/register",
        element: <Signup />,
    },
]