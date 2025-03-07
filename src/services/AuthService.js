import { publicRequest, userRequest } from "../utils/requestHeader";

const register = async (username, email, password, passwordConfirmation) => {
    return await publicRequest.post("/register", {
        username,
        email,
        password,
        passwordConfirmation
    });
};


const login = async (email, password) => {
    return await publicRequest.post("/auth", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};


const requestPasswordReset = async (email) => {
    return await publicRequest.post("/auth/passwordResetRequest", {
            email,
        })
        .then((response) => {
            return response.data;
        });
};

const resetPassword = async (email, token, password, passwordConfirmation) => {
    return await publicRequest.post("/auth/resetPassword", {
            email,token, password, passwordConfirmation
        })
        .then((response) => {
            return response.data;
        });
};
// const verifyEmail = async (userId, otp) => {
//     return axios.post(`${API_URL}email/verify-email`, {
//         userId,
//         otp
//     });
// };

// const resendEmailVerificationCode = async (userId) => {
//     return axios.post(`${API_URL}email/resend-verification-code`, {
//         userId
//     });
// };

const logout = async () => {
    localStorage.removeItem("user");
    return await userRequest.get("/logout");
};

const AuthService = {
    register,
    login,
    requestPasswordReset,
    resetPassword,
    // verifyEmail,
    // resendEmailVerificationCode,
    logout,

};

export default AuthService;