import React, { useState, useEffect } from 'react';
import { Button, TextInput, Label, Spinner } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/user-modal/userModalSlice';
import Helmet from '../../components/Helemet';
import { toast } from 'react-toastify';

const Signup = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isLoading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/admin/dashboard')
        }
    }, [isLoggedIn, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        dispatch(register({ username, email, password, passwordConfirmation }))
            .unwrap()
            .then(() => {
                console.log(message);
                toast.success(message);
                navigate("/admin/login");
                setLoading(false);
            })
            .catch((error) => {
                toast.error(message);
                console.log(error.message);
                setLoading(false);
            });

    }

    return (
        <Helmet title="register">
            <div className="flex justify-center items-center">
                <div className="border my-4 bg-white md:rounded-3xl md:w-2/5 xs:w-full">
                    <div className="w-full">
                        <div className="text-center pb-2 pt-6">
                            <h4 className="font-bold text-3xl text-blue-900">Lets create your account</h4>
                        </div>
                        <form className="flex flex-col gap-4 py-2 lg:px-8 md:px-6 xs:px-4" onSubmit={handleSubmit}>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="username"
                                        value="Your username"
                                    />
                                </div>
                                <TextInput
                                    id="username"
                                    type="text"
                                    placeholder="John Doe"
                                    required={true}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email1"
                                        value="Your email"
                                    />
                                </div>
                                <TextInput
                                    id="email1"
                                    type="email"
                                    placeholder="name@example.com"
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="password1"
                                        value="Your password"
                                    />
                                </div>
                                <TextInput
                                    id="password1"
                                    type="password"
                                    required={true}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="password2"
                                        value="Confirm your password"
                                    />
                                </div>
                                <TextInput
                                    id="password2"
                                    type="password"
                                    required={true}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                />
                            </div>
                            {isLoading ? <Button style={{ width: "100%" }}>
                                <Spinner aria-label="Spinner button example" />
                                <span className="pl-3">
                                    Creating...
                                </span>
                            </Button> : <Button type="submit" style={{ width: "100%" }}>Submit</Button>}
                            <div className="text-sm">
                                Already created your account?,<Link className="hover:text-blue-600" to="/admin/login"> Sign in</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default Signup