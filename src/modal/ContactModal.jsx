import { Modal, Label, TextInput, Checkbox, Button, Textarea } from 'flowbite-react'

const ContactModal = ({ closeModal }) => {
    return (
        <div>
            <Modal
                show={true}
                size="lg"
                popup={true}
                onClose={closeModal}
            >
                <Modal.Header />
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
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="phoneNumber"
                                    value="phone Number"
                                />
                            </div>
                            <TextInput
                                id="phoneNumber"
                                type="text"
                                placeholder="Input your phone number"
                                required={true}
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
                            />
                        </div>
                        <div className="flex gap-2">
                            <Checkbox id="titledead" />
                            <Label htmlFor="titledead">
                                Check if title deed is present
                            </Label>
                        </div>
                        <div className="w-full">
                            <Button style={{ width: "100%" }}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ContactModal