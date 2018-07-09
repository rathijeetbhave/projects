import "whatwg-fetch"

export const makeRequest = (url, options) => {
    return fetch(url, options)
        .then(function(response){
            if (response.status >= 200 && response.status < 300) {
                return response;
            }
            else {
                let error = new Error(response.statusText);
                error.code = response.status;
                return response.json().then((body)=>{
                    error.messages = body.errors || body.error;
                    error.message = body.error;
                    throw error;
                }).catch(other_error => {
                    if(!error.message) error.message = "Something went wrong";
                    throw error;
                });
            }
        })
        .then(function(response){
            return response.json();
        })
};
