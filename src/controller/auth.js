const authService = require("../services/auth")

const login = async (req, res) => {
    try {
        const resp = await authService.login(req.body)
        if(!resp.flag) return res.status(resp.status).json({ code: "Error", message: resp.errMsg })
        else return res.status(200).json({ message: resp.message, data: resp.data })
    } catch (error) {
        console.error("Error - login (controller) ", error)
        res.status(500).json({ Error: "Internal server error during login." })
    }
}

const register = async (req, res) => {
     try {
        const resp = await authService.register(req.body)
        if(!resp.flag) return res.status(resp.status).json({ code: "Error", message: resp.errMsg })
        else return res.status(200).json({ message: resp.message, data: resp.data })
    } catch (error) {
        console.error("Error - login (controller) ", error)
        res.status(500).json({ Error: "Internal server error at User registration." })
    }
}

module.exports = {
    login,
    register
}