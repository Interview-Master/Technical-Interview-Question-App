module.exports = {
  

  Auth : (req, res, next) => {
    const { user, pass } = req.body;
    // Check for valid credentials
    if (user === 'codesmith' && pass === 'ilovetesting') {
      res.cookie('token', 'user');
      next();
    } else if (user === 'codesmith_admin' && pass === 'testingisgreat') {
      res.cookie('token', 'admin');
      next();
    } else {
      res.send('unsuccessful login attempt');
    }
  }
};