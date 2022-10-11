import { Modal } from 'flowbite-react';
import logo from '../assets/images/logo.png';

const PhoneContactDetailsModal = ({ closeModal, phoneNumber }) => {
    return (
        <div>
            <Modal
                size="sm"
                show={true}
                onClose={closeModal}
            >
                <Modal.Header>
                    <div className="flex gap-2 justify-center items-center">
                        <img src={logo} alt="DMG Logo" width="50" hieght="40" />
                        <h2 className="md:text-xl xs:text-lg font-bold">DMG Properties</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed">
                           Call us on:
                        </p>
                        <p className="text-base leading-relaxed text-gray-500">
                            {phoneNumber}
                        </p>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default PhoneContactDetailsModal