import { publicRequest } from "../utils/requestHeader";

const contactUs = async (name, email, subject, contactMessage) => {
    return await publicRequest.post('/contact', {
        name, email, subject, contactMessage
    })
        .then((response) => {
            return response.data
        });
}

const propertySellContact = async (name, email, phoneNumber, contactMessage, titleDeadStatus) => {
    return await publicRequest.post('/contact/propertyContact', {
        name, email, phoneNumber, contactMessage, titleDeadStatus
    })
        .then((response) => {
            return response.data
        });
}

const ContactService = {
    contactUs,
    propertySellContact
}

export default ContactService;