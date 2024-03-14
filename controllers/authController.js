

const register = async (req, res) => {
    try {

    } catch (e) {
        return res.status(500).json({
            code: e.code,
            message: e.message
        })
    }
}


module.exports = {
    register
}