import { Label, TextInput, Button, Textarea } from 'flowbite-react';
import { useState } from 'react';

const Contact = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contactMessage, setContactMessage] = useState("");

    const handleSubmit = () => {
        console.log(firstName, lastName, email, contactMessage)
    }

    return (
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
                                    htmlFor="fname"
                                    value="First name"
                                />
                            </div>
                            <TextInput
                                id="fname"
                                type="text"
                                placeholder="Input your first name"
                                required={true}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="lname"
                                    value="Last name"
                                />
                            </div>
                            <TextInput
                                id="lname"
                                type="text"
                                placeholder="Input your last name"
                                required={true}
                                onChange={(e) => setLastName(e.target.value)}
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
                            <Button type="submit" style={{ width: "100%" }}>
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="contact__side__content flex justify-center items-center opacity-80">
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

    )
}

export default Contact