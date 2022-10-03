import { Modal, Label, TextInput, Checkbox, Button, Textarea } from 'flowbite-react';
import { useState } from 'react';

const ContactModal = ({ closeModal }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [contactMessage, setContactMessage] = useState("");
    const [titleDeadStatus, setTitleDeadStatus] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, phoneNumber, contactMessage, titleDeadStatus);
    }
    return (
        <div>
            <Modal
                show={true}
                size="lg"
                popup={true}
                onClose={closeModal}
            >
                <Modal.Header />
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="space-y-6 px-6 pb-4 sm:pb-2 lg:px-4 xl:pb-6">
                            <div className="text-center">
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
                                        htmlFor="phoneNumber"
                                        value="contact Number"
                                    />
                                </div>
                                <TextInput
                                    id="phoneNumber"
                                    type="text"
                                    placeholder="Input your phone number"
                                    required={true}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div id="textarea">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="description"
                                        value="Describe what you would like to sell"
                                    />
                                </div>
                                <Textarea
                                    id="description"
                                    placeholder="What do you what to sell..."
                                    required={true}
                                    rows={2}
                                    onChange={(e) => setContactMessage(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Checkbox id="titledead" defaultChecked={titleDeadStatus === 1 ? true : false} onChange={(e) => setTitleDeadStatus(e.target.checked)} />
                                <Label htmlFor="titledead">
                                    Check if title deed is present
                                </Label>
                            </div>
                            <div className="w-full">
                                <Button style={{ width: "100%" }} onClick={closeModal} >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </form>

            </Modal>
        </div>
    )
}

export default ContactModal