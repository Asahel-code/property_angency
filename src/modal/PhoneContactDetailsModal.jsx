import { Modal } from 'flowbite-react'

const PhoneContactDetailsModal = ({ closeModal, phoneNumber }) => {
    return (
        <div>
            <Modal
                size="sm"
                show={true}
                onClose={closeModal}
            >
                <Modal.Header>
                    Call us on
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500">
                            Real Estate Agency
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