import joi from "joi";

const signUpSchema = joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().required()
});

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

const urlSchema = joi.object({
    url: joi.string().required()
});

async function validateSignUp(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;

    const validation = signUpSchema.validate(req. body, { abortEarly: false });

    if(validation.error) {
        const error = validation.error.details.map(value => value.message);

        return res.status(422).send(error);
    }

    if(password !== confirmPassword) {
        return res.status(422).send("Wrong Password");
    }

    res.locals.user = { name, email, password };
    next();
};

async function validateSignin(req, res, next) {
    const { email, password } = req.body;

    const validation = signInSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        const error = validation.error.details.map(value => value.message);
        
        return res.status(422).send(error);
    }

    res.locals.user = { email, password };
    next();
};

async function validateUrl(req, res, next) {
    const { url } = req.body;

    const validation = urlSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        const error = validation.error.details.map(value => value.message);

        return res.status(422).send(error);
    }

    res.locals.user = { url };
    next();
}

export { validateSignUp, validateSignin, validateUrl };