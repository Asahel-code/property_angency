import { useState, useEffect } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/user-modal/userModalSlice';
import { getCategories } from '../redux/category-modal/categoryModalSlice';

const Header = () => {
    const [openNav, setOpenNav] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    const { category } = useSelector((state) => state.category);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
        dispatch(getCategories());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout())
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    const adminNavList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/admin/add-category" className="flex items-center hover:text-blue-700">
                    Add a category
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Dropdown
                    inline={true}
                    arrowIcon={false}
                    label="Admin"
                >
                    <Dropdown.Item onClick={handleLogout}>
                        logout
                    </Dropdown.Item>
                </Dropdown>
            </Typography>
        </ul>
    )

    const userNavList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {category && category.map((cat, index) => {
                return (
                    <div key={index}>
                        {!cat.subCategory.length ? (<Typography
                            as="li"
                            variant="small"
                            color="blue-gray"
                            className="p-1 font-normal"
                        >
                            <Link to={`/${cat.name}`} className="flex items-center hover:text-blue-700">
                                {cat.name}
                            </Link>
                        </Typography>)
                            : (
                                <Typography
                                    as="li"
                                    variant="small"
                                    color="blue-gray"
                                    className="p-1 font-normal"
                                >
                                    <Dropdown
                                        inline={true}
                                        label={cat.name}
                                        className="hover:text-blue-700"
                                    >
                                        {cat.subCategory.map((dropDownItem, index) => (
                                            <Dropdown.Item key={index}>
                                                <Link className="hover:text-blue-700" to={`/${cat.name}/${dropDownItem.name}`}>{dropDownItem.name}</Link>
                                            </Dropdown.Item>
                                        ))}

                                    </Dropdown>
                                </Typography>
                            )
                        }
                    </div>



                )
            })}


            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/admin/login" className="flex items-center hover:text-blue-700">
                    About us
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="contact" className="flex items-center hover:text-blue-700">
                    Contact us
                </Link>
            </Typography>
        </ul>
    );

    return (
        <Navbar className="py-2 lg:py-4">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="li"
                    variant="small"
                    className="mr-4 cursor-pointer py-1.5 font-normal"
                >
                    <Link to="/">Real Estate Agency</Link>
                </Typography>
                {currentUser ?
                    (<div className="hidden lg:block">{adminNavList}</div>)
                    : (<div className="hidden lg:block">{userNavList}</div>)
                }

                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            {currentUser ? (
                <MobileNav open={openNav}>
                    {adminNavList}
                </MobileNav>
            ) : (
                <MobileNav open={openNav}>
                    {userNavList}
                </MobileNav>
            )}




        </Navbar>
    );
}

export default Header;