
import joi from 'joi'

export const SentMessage = {

    body: joi.object().required().keys({
        name: joi.string().required(),
        phone: joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/).required(),
        email: joi.string().required().email(),
        message:joi.string().required(),
        
    })
}