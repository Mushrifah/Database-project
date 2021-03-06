import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import BaseCtrl from './base';
class UserCtrl extends BaseCtrl {
  model = User;

  login = (req, res) => {
      let secret;
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        secret= process.env.SECRET_TOKEN
        const token = jwt.sign({ user },secret); // , { expiresIn: 10 } seconds
        res.status(200).json({ token });
      });
    });
  }

}

export default UserCtrl;
