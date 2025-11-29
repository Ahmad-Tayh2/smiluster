import { signUp } from '../../services/Auth/signUpUser';
const jwt = require('jsonwebtoken');
import { sendConfirmationEmail } from '../../helpers/Auth/sendConfirmationEmail';
import { TOKEN_SECRET_KEY } from '../../config';

// create Token
const createToken = (userID: number) => {
    return jwt.sign({ userID }, TOKEN_SECRET_KEY, {expiresIn: '1d'});
}

export async function signupUser  (req: any, res: any) {
    const newUserData = req.body;
    try {
  
      const user = await signUp(newUserData);
      const token = createToken(user.userID);
      //sendConfirmationEmail(token, user.email);
  
      res.status(200).json({
        message: "Check your email for confirmation!",
      });
  
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
