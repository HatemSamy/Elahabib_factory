
import joi from 'joi'

export const CreaterequestForm = {

    body: joi.object().required().keys({
        fullName: joi.string().required(),
        phoneNumber: joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/).required(),
        city: joi.string().required(),
        email: joi.string().required().email(),
        currentBusiness:joi.string(),
        Notes:joi.string(),
        hasWebsite: joi.boolean(),

    })
}

