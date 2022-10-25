const bcrypt = require('bcrypt');

const generateHash = async (pwd) => {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(pwd, saltRounds);
    return hashed;
};

module.exports = generateHash;