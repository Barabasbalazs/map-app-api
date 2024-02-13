import userModel, { User, AuthenticatedUser } from "../../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function createToken (id: string) {
  const secret = process.env.SECRET || "secret";
  const authToken = jwt.sign(id, secret);
  return authToken;
}

const authService = {
  findByEmail: async function (email: string): Promise<User | null> {
    return await userModel.findOne({ email });
  },

  signup: async function (user: User): Promise<AuthenticatedUser | void> {
    const saltRounds: number = Number(process.env.SALT_ROUNDS || 10); //add this to the schema
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password!, salt);
    const persistedUser = await userModel.create(user);
    return {
      user: persistedUser,
      authToken: createToken(persistedUser.id),
    }
  },
};

export default authService;
