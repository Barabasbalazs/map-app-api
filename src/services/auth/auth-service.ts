import userModel, { User, AuthenticatedUser } from "../../models/user-model.js";
import environmentVariables from "../../config/env-variables.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function createToken(id: string) {
  const secret = environmentVariables.getSecret();
  const authToken = jwt.sign(id, secret);
  return authToken;
}

const authService = {
  authenticateUser: async function (
    user: User
  ): Promise<AuthenticatedUser | null> {
    const storedUser = await userModel.findOne({ email: user.email });
    if (!storedUser) {
      return null;
    }
    const isPasswordMatching = await bcrypt.compare(
      user.password!,
      storedUser.password!
    );
    if (!isPasswordMatching) {
      return null;
    }
    const authToken = createToken(storedUser.id);

    return {
      user: storedUser,
      authToken: authToken,
    };
  },

  findByEmail: async function (email: string): Promise<User | null> {
    return await userModel.findOne({ email });
  },

  signup: async function (user: User): Promise<AuthenticatedUser | void> {
    const saltRounds: number = Number(environmentVariables.getSaltRounds());
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password!, salt);
    const persistedUser = await userModel.create(user);
    return {
      user: persistedUser,
      authToken: createToken(persistedUser.id),
    };
  },
  getUserFromToken: async function (token: string, secret: string) {
    const userId = jwt.verify(token, secret) as string;
    const user = await userModel.findById(userId);
    return user;
  },
  
};

export default authService;
