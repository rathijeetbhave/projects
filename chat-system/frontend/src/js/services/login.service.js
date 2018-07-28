import {makeRequest} from "./baseApi.services"
import { confirmLogin } from "../utils/auth";
const getHeaders = () => {

    let headers = {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    }

    return headers
}

function login(username, password) {
    const data = {
        username : username,
        password : password
    }
    const options = {
        method: 'POST',
        headers: getHeaders(),
        mode: 'cors',
        body: JSON.stringify(data)
    }
    const auth_url = "http://127.0.0.1:8000/login/";

    //console.log( makeRequest(auth_url, options))
    /* return makeRequest(auth_url, options)
        .then(response => {
            console.log(response)
            confirmLogin(response)
            return response;
        }) */
        confirmLogin('helloiamloggedin')
}

function logout() {
    return confirmLogout().then(response => response);
}

export const loginService = {login, logout}
