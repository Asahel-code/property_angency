import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextInput, Label, Spinner } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/user-modal/userModalSlice';
import Helemet from '../../components/Helemet';
import { toast } from 'react-toastify';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { errorMessage } = useSelector((state) => state.errorMessage);

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

        dispatch(login({ email, password }))
            .unwrap()
            .then(() => {
                navigate('/admin/dashboard')
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false);
                toast.error(errorMessage);
                console.log(error)
            })
    }
    
    return (
        <Helemet title="Login">
            <div className="flex justify-center items-center">
                <div className="bg-white md:rounded-3xl border my-10 md:w-2/5 xs:w-full">
                    <div className="w-full">
                        <div className="text-center pb-2 pt-6">
                            <h4 className="font-bold text-3xl text-blue-900">Welcome back</h4>
                        </div>
                        <form className="flex flex-col gap-4 py-2 lg:px-8 md:px-6 xs:px-4" onSubmit={handleSubmit}>
                            <div className="w-full">
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
                            {isLoading ? <Button disabled={true} style={{ width: "100%", backgroundColor: "#000", color: "#fff" }}>
                                <Spinner aria-label="Spinner button example" />
                                <span className="pl-3">
                                    Login in...
                                </span>
                            </Button> : <Button type="submit" style={{ width: "100%", backgroundColor: "#000", color: "#fff" }}>Submit</Button>}
                            <div className="flex items-center justify-start gap-2 text-sm">
                                <div>
                                    <Link to="/admin/request-password-reset" className="hover:text-blue-600">Forgot your password?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Helemet>
    )
}

export default Login