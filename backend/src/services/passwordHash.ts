import bcrypt from "bcrypt";

export const hashPass = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  return hashpassword;
};

export const comparePass = async (inputPass: string, dbPass: string) => {
  const validPass = await bcrypt.compare(inputPass, dbPass);
  return validPass;
};
