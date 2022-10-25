const users = require('../fixtures/users');
const bcrypt = require('bcrypt');

const compareHash = async (pwd, user) => {
    return new Promise(async (resolve, reject) => {
        const cmp = await bcrypt.compare(pwd, user.password);
        resolve(cmp ? user : undefined);
    });
}

const findUser = async (username, password) => {
    const usrPrm = await Promise.all(users.filter(user => user.username === username).map(user => compareHash(password, user))).then((response) => {
        return response.find(u => u !== undefined) || undefined;
    })
        .catch(error => {
            return undefined;
        });
    return usrPrm
}

const findUserByCredentials = async ({ username, password }) => {
    return await findUser(username, password);
}

exports.byCredentials = findUserByCredentials;

const findUserByToken = ({ userId }) =>
    users.find(user => user.id === userId);

exports.byToken = findUserByToken;
