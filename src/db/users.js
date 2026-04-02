const { callFunction, callFunctionScalar } = require('./index');

const login = (username, password) =>
    callFunction('public.login', [username, password]);

const getAllUsers = (token) =>
    callFunction('public.get_all_users', [token]);

const addUser = (token, name, username, password, idUserType, idGroup) =>
    callFunctionScalar('public.add_user', [token, name, username, password, idUserType, idGroup]);

const deactivateUser = (token, idUser) =>
    callFunctionScalar('public.deactivate_user', [token, idUser]);

const reactivateUser = (token, idUser) =>
    callFunctionScalar('public.reactivate_user', [token, idUser]);

const changeUserPassword = (token, idUser, newPassword) =>
    callFunctionScalar('public.change_user_password', [token, idUser, newPassword]);

const changeUserType = (token, idUser, idUserType) =>
    callFunctionScalar('public.change_user_type', [token, idUser, idUserType]);

module.exports = {
    login,
    getAllUsers,
    addUser,
    deactivateUser,
    reactivateUser,
    changeUserPassword,
    changeUserType,
};