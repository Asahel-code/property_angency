import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput, Label, Spinner } from 'flowbite-react';
import Helemet from '../../components/Helemet';
import { resetPassword } from '../../redux/user-modal/userModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ResetPassword = () => {

    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isLoading, setLoading] = useState(false);
    const { errorMessage } = useSelector((state) => state.errorMessage);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        dispatch(resetPassword({ email, token, password, passwordConfirmation}))
        .unwrap()
        .then(() => {
            setLoading(false);
            toast.success("Your password has been reset successfully");
            navigate("/admin/login");
        })
        .catch((error) => {
            setLoading(false);
            toast.error(errorMessage);
            console.log(error.message);
        })
    }

  return (
<Helemet title="Reset password">
            <div className="flex justify-center items-center">
                <div className="bg-white md:rounded-3xl border my-10 md:w-2/5 xs:w-full">
                    <div className="w-full">
                        <div className="text-center pb-2 pt-6">
                            <h4 className="font-bold text-3xl text-blue-900">Reset password</h4>
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
                                        htmlFor="token"
                                        value="Your reset token"
                                    />
                                </div>
                                <TextInput
                                    id="token"
                                    type="text"
                                    placeholder="Your reset token"
                                    required={true}
                                    onChange={(e) => setToken(e.target.value)}
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
                            {isLoading ? <Button disabled={true} style={{ width: "100%", backgroundColor: "#000", color: "#fff" }}>
                                <Spinner aria-label="Spinner button example" />
                                <span className="pl-3">
                                    Reseting...
                                </span>
                            </Button> : <Button type="submit" style={{ width: "100%", backgroundColor: "#000", color: "#fff" }}>Submit</Button>}
                        </form>
                    </div>
                </div>
            </div>
        </Helemet>
  )
}

export default ResetPassword