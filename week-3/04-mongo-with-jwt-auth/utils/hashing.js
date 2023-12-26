const bcrypt = require('bcrypt')

async function hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

async function comparePassword(password, hash) {
    const result = await bcrypt.compare(password, hash);
    return result;
}

module.exports = {
    hashPassword,
    comparePassword,
}