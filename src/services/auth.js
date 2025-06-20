const { JWT } = require("../../config/config");
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT.SECRET, {
    expiresIn: JWT.EXPIRE_IN
  });
};


const login = async(data) => {
    try {
        const { email, password } = data;
    
        if (!email || !password) return { errMsg: 'Email and password are required.', flag: false, status: 400 }

        const user = await User.findOne({ email });
        if (!user) return { errMsg: 'Invalid credentials.', flag: false, status: 400 }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return { errMsg: 'Invalid password.', flag: false, status: 401 }

        const token = generateToken(user._id);
        await User.updateOne({ _id: user._id }, { $push: { token: token } })
        return { flag: true, message: "User logged in successfully.", data: token }
    } catch (error) {
        console.error("Error - login", error)
        return { flag: false, errMsg: "Error throws while login user", status: 500 }
    }
}

const register = async (data) => {
    try {
        const { username, email, password } = data;
    
        if (!username || !email || !password) return { errMsg: 'All fields are required.', flag: false, status: 400 }

        if (password.length < 8) return { errMsg: 'Password must be at least 8 characters.', flag: false, status: 400 }

        // Check if user already exists
        const existingUser = await User.findOne({ email })

        if (existingUser) return { errMsg: 'User already exists with this email.', flag: false, status: 400 }

        // Create new user
        const user = await User.create({ username, email, password })

        // Generate token
        const token = generateToken(user);

        await User.updateOne({ _id: user._id }, { token: [token] })

        return { flag: true, message: "User created successfully.", data: { token, user } }
    } catch (error) {
        console.error("Error - Register ", error)
        return { errMsg: "Error throws while register user", flag: false, status: 500 }
    }
}

module.exports = {
    login,
    register
}