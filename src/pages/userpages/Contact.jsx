import { Label, TextInput, Button, Textarea, Spinner } from 'flowbite-react';
import { useState } from 'react';
import Helmet from '../../components/Helemet';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../redux/contactus-modal/contactUsModalSlice';
import { toast } from 'react-toastify';

const Contact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSuject] = useState("");
    const [contactMessage, setContactMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const { errorMessage } = useSelector((state) => state.errorMessage);


    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(contactUs({ name, email, subject, contactMessage }))
            .unwrap()
            .then(() => {
                setLoading(false);
                toast.success("Your message has been sent successfully");
            })
            .catch((error) => {
                setLoading(false);
                toast.error(errorMessage);
                console.log(error.message);
            })
    }

    return (
        <Helmet title="Contact us">
            <div className="grid md:grid-cols-2 xs:grid-cols-1">
                <div className=" my-10 flex justify-center">
                    <div className="bg-white border md:rounded-3xl md:w-5/6 xs:w-full">
                        <form className="space-y-6 md:px-6  xs:px-2 pb-4 sm:pb-6 lg:px-8 xl:pb-8" onSubmit={handleSubmit}>
                            <div className="text-center pb-2 pt-6">
                                <h3 className="font-bold text-3xl text-blue-900">
                                    Contact us
                                </h3>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="name"
                                        value="Name"
                                    />
                                </div>
                                <TextInput
                                    id="name"
                                    type="text"
                                    placeholder="Input your name"
                                    required={true}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email"
                                        value="E-mail"
                                    />
                                </div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    placeholder="Input your email"
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="subject"
                                        value="Subject"
                                    />
                                </div>
                                <TextInput
                                    id="subject"
                                    type="text"
                                    placeholder="Input your subject"
                                    required={true}
                                    onChange={(e) => setSuject(e.target.value)}
                                />
                            </div>
                            <div id="textarea">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="description"
                                        value="Message"
                                    />
                                </div>
                                <Textarea
                                    id="description"
                                    placeholder="Your message..."
                                    required={true}
                                    rows={4}
                                    onChange={(e) => setContactMessage(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
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
                <div className="contact__side__content flex justify-center items-center">
                    <div className="md:w-3/5 xs:w-full px-10 py-24">
                        <h2 className="pb-5 md:text-3xl xs:text-2xl font-bold text-center">Real Estate Agency</h2>
                        <p className="md:text-lg xs:text:md text-justify">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book.
                        </p>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default Contact