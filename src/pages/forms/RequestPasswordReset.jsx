import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput, Label, Spinner } from 'flowbite-react';
import Helemet from '../../components/Helemet';
import { requestPasswordReset } from '../../redux/user-modal/userModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const RequestPasswordReset = () => {

  const [email, setEmail] = useState("")
  const [isLoading, setLoading] = useState(false);
  const { errorMessage } = useSelector((state) => state.errorMessage );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(requestPasswordReset({ email }))
      .unwrap()
      .then(() => {
        setLoading(false);
        navigate("/admin/password-reset")
        toast.success("Check your email a password reset token has been sent");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        toast.error(errorMessage);
      })

  }


  return (
    <Helemet title="Login">
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
              <div className="my-5">
                {isLoading ? <Button style={{ width: "100%" }}>
                  <Spinner aria-label="Spinner button example" />
                  <span className="pl-3">
                    Sending...
                  </span>
                </Button> : <Button type="submit" style={{ width: "100%" }}>Submit</Button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Helemet>
  )
}

export default RequestPasswordReset