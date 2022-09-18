import React, { useState } from "react";
import { Card, Button } from 'flowbite-react';
import ContactModal from '../modal/ContactModal';

const ContactButtonSection = () => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <div className="flex justify-center items-center my-6">
            <Card className="max-w-md">
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Planning to sell your land?
                </p>
                <div className="flex justify-center items-center">
                    <Button onClick={toggleModal}>Contact us</Button>
                </div>
            </Card>
            {modal && <ContactModal closeModal={toggleModal} />}
        </div>
    )
}

export default ContactButtonSection