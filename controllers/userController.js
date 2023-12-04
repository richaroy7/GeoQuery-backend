const registerUser = (req, res) => {
    res.json({message: 'registering user'});
};

const loginUser = (req, res) => {
    res.json({message: 'logging in user'});
};

module.exports = {registerUser, loginUser};