import axios, {AxiosResponse} from 'axios';
import {
    fetchSignInBody,
    fetchSignInResponse,
    fetchSignUpBody,
    fetchSignUpResponse
} from "../../interfaces/api/authentication/authentication.interface";

const apiHost = process.env.REACT_APP_BACKEND_HOST;

export const fetchSignUp = async (data: fetchSignUpBody) => {
    const response: AxiosResponse<fetchSignUpResponse, any> = await axios.post(`${apiHost}/api/authentication/sign-up`, data);
    localStorage.setItem("accessToken", response.data.data.accessToken);
    localStorage.setItem("refreshToken", response.data.data.refreshToken);
};

export const fetchSignIn = async (data: fetchSignInBody) => {
    const response: AxiosResponse<fetchSignInResponse, any> = await axios.post(`${apiHost}/api/authentication/sign-in`, data);
    localStorage.setItem("accessToken", response.data.data.accessToken);
    if (data.rememberMe) {
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
    }
};