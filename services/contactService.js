const { Contact } = require('../models'); 

exports.identifyContactService = async (email, phoneNumber) => {
    try {
        let primaryContact;

        // Find existing primary contact with the given phone number
        if (phoneNumber) {
            primaryContact = await Contact.findOne({ where: { phoneNumber, linkPrecedence: 'primary' } });
        }

        // If no primary contact found, create a new one
        if (!primaryContact) {
            primaryContact = await Contact.create({
                email,
                phoneNumber,
                linkPrecedence: 'primary'
            });

            return {
                primaryContactId: primaryContact.id,
                emails: [email],
                phoneNumbers: [phoneNumber],
                secondaryContactIds: []
            };
        }

        // If email is provided and different from the primary contact's email
        // Create a new secondary contact linked to the primary contact
        if (email && email !== primaryContact.email) {
            const secondaryContact = await Contact.create({
                email,
                phoneNumber,
                linkedId: primaryContact.id,
                linkPrecedence: 'secondary'
            });

            return {
                primaryContactId: primaryContact.id,
                emails: [primaryContact.email, email],
                phoneNumbers: [phoneNumber],
                secondaryContactIds: [secondaryContact.id]
            };
        }

        // If no email provided or the same as the primary contact's email
        // Return the primary contact details
        return {
            primaryContactId: primaryContact.id,
            emails: [primaryContact.email],
            phoneNumbers: [phoneNumber],
            secondaryContactIds: []
        };
    } catch (error) {
        throw new Error('Error identifying contact');
    }
};
