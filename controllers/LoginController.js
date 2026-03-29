const loginService = require("../services/login.service");

class LoginController {
  async create(req, res) {
    const { username, email, password } = req.body;

    const { status, data, message } = await loginService.create(
      username,
      email,
      password
    );

    res.status(status);
    res.json({ message, data });
  }

  
}

module.exports = LoginController;
