const Joi = require('joi');
const { convertFiat, convertCrypto } = require('../services/currencyService');

const validateQueryParams = (params) => {
    const schema = Joi.object({
        from: Joi.string().max(10).uppercase().required(),
        to: Joi.string().max(10).uppercase().required(),
        amount: Joi.number().positive().required(),
        currency:Joi.string().valid('crypto', 'paper').required()
    });

    return schema.validate(params);
};

const convert = async (req, res, next) => {
    const {currency, from, to, amount } = req.query;

    const { error } = validateQueryParams(req.query);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        if (currency=='paper') {
            let convertedAmount = await convertFiat(from, to, amount);
            return res.json({ from, to, amount, convertedAmount });
        } else {
            let convertedAmount = await convertCrypto(from, to, amount);
            console.log(convertedAmount)
            return res.json({ from, to, amount, convertedAmount });
        }
    } catch (error) {
        next(error); 
    }
};

module.exports = { convert };
