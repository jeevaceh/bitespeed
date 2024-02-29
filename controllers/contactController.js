const { identifyContactService } = require('../services/contactService');

exports.identifyContact = async (req, res) => {
    try {
        const { email, phoneNumber } = req.body;

        if (!email && !phoneNumber) {
            return res.status(400).json({ error: 'Email or phone number is required' });
        }
        
        if (email &&!checkEmail(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        if (phoneNumber&&!checkPhoneNumber(phoneNumber)) {
            return res.status(400).json({ error: 'Invalid phone number' });
        }
        
        
        const contact = await identifyContactService(email, phoneNumber);
        res.status(200).json({ contact });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const checkEmail= (email)=> {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const checkPhoneNumber = (phoneNumber) =>{
    return Number.isInteger(phoneNumber) && phoneNumber.toString().length > 6;
}