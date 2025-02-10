import { IUser } from '../models/User';
import User from '../models/User';
import { comparePasswords, hashPassword  } from '../helpers/passwordHelper';
import jwt from 'jsonwebtoken';


export class UserService {

  async register(name: string, email: string, password: string): Promise<IUser> {
    const hashedPassword = await hashPassword(password); 

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return newUser;
  }

  async getAllUsers(): Promise<IUser[]> {
    return User.find();
  }


  async login(email: string, password: string): Promise<any> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await comparePasswords(user.password, password);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    return { user, token };
  }
}
