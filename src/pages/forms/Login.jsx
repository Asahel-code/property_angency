import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextInput, Label } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/user-modal/userModalSlice'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isLoggedIn } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isLoggedIn){
            navigate('/admin/dashboard')
        }
    }, [isLoggedIn, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login({email, password}))
        .unwrap()
        .then(() => {
            navigate('/admin/dashboard')
        })
        .catch((error) => {
            console.log(error)
        })
    }


    return (
        <div className="border mx-96 my-10 bg-white rounded-3xl">
            <div className="flex justify-center items-center">
                <div className="w-full">
                    <div className="text-center pb-2 pt-6">
                        <h4 className="font-bold text-3xl text-blue-900">Welcome back</h4>
                    </div>
                    <form className="flex flex-col gap-4 py-2 px-8" onSubmit={handleSubmit}>
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
                        <Button type="submit" style={{ width: "100%", color: "white" }}>
                            Submit
                        </Button>
                        <div className="flex items-center justify-start gap-2 text-sm">
                            <div>
                                <Link to="#" className="hover:text-blue-600">Forgot your password?</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login