import bcrypt from 'bcrypt';
import accountModel from '../../models/account/model.js';

export function buildLogin(req, res) {
  res.render('account/login', {
    title: 'Sign In',
  });
}

export function buildRegister(req, res) {
  res.render('account/register', {
    title: 'Register',
  });
}

export async function registerUser(req, res, next) {
  try {
    const { first_name, last_name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await accountModel.createUser({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    res.redirect('/login');
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await accountModel.getUserByEmail(email);

    if (!user) {
      return res.render('account/login', {
        title: 'Sign In',
        error: 'Invalid email or password',
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.render('account/login', {
        title: 'Sign In',
        error: 'Invalid email or password',
      });
    }

    req.session.user = {
      user_id: user.user_id,
      email: user.email,
      role: String(user.role ?? '').trim().toLowerCase(),
    };

    req.session.save((err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  } catch (error) {
    next(error);
  }
}
