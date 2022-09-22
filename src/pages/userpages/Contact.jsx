import { Label, TextInput, Button, Textarea } from 'flowbite-react';
import { useState } from 'react';

const Contact = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] =useState("");
    const [contactMessage, setContactMessage] = useState("");

    const handleSubmit = () => {
        console.log(firstName, lastName, email, contactMessage) 
    }

    return (
        <div className="border lg:mx-96 md:60 my-10 bg-white md:rounded-3xl w-full">
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
                        onChange={(e)=> setFirstName(e.target.value)}
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
    )
}

export default Contact