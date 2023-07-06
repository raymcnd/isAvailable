const bcrypt = require('bcryptjs');
const saltRounds = 13;

function hashPassword(plain) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plain, salt);
    return hash;
}

function comparePassword(input, hash) {
    return bcrypt.compareSync(input, hash);
}

module.exports = { hashPassword, comparePassword }