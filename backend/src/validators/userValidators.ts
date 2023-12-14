// validators/userValidator.ts
import Joi from 'joi';

const userRegistrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
});

const userLoginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

export const validateUserRegistration = (data: Record<string, any>) => {
  return userRegistrationSchema.validate(data);
};

export const validateUserLogin = (data: Record<string, any>) => {
  return userLoginSchema.validate(data);
};


export const userValidator = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
})



export const LoginValidator= Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
})



const userLoginValidator = Joi.object({
    username:Joi.string().required().min(5).max(20).messages({
      "username.empty": "Please Input Your username with length 5 to 20",
    }),
    password: Joi
      .string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  
  const userRegisterValidator = Joi.object({
    username:Joi.string().required().min(5).max(20).messages({
      "username.empty": "Please Input Your userName with length 5 to 20",
    }),
    email: Joi
      .string()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi
      .string()
      .required()
      .pattern(
        new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:'\"|,.<>?/~`]{8,}$")
      ),
  });
  export const loginValidator = Joi.object({
    email: Joi.string().messages({
      "username.empty": "Please Input Your userName with length 5 to 20",
    }),
    password: Joi
      .string()
      .required()
      .pattern(
        new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:'\"|,.<>?/~`]{8,}$")
      ),
  });
  
  export const userUpdateValidator = Joi.object({
    name: Joi.string().min(5).max(20).messages({
      "username.empty": "Please Input Your userName with length 5 to 20",
    }),
    email: Joi
      .string()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi
      .string()
      .pattern(
        new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:'\"|,.<>?/~`]{8,}$")
      ),

      gender: Joi.string().valid('male', 'female', 'other').required(),


  });
  
  module.exports = {
    loginValidator,
    userRegisterValidator,
    userUpdateValidator,
  };
  