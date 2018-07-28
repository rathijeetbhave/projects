import React, { PropTypes as T } from 'react';
import { formValidationConstants } from "../../../../constants/index";


function CheckReqiuredValid(props, type) {
    let returnValue = null;
    if (type === "Update") {
        returnValue = formValidationConstants.SUCCESS_STATE;
    }
    if (props.length === 0 || props === '') {
        returnValue = formValidationConstants.ERROR_STATE;
    }
    else {
        returnValue = formValidationConstants.SUCCESS_STATE;

    }
    return returnValue;
}

function CheckEmailValid(email, required, choice) {
    let requireStatus = null;
    if (required) {
        requireStatus = CheckReqiuredValid(email, choice);
    }
    if (requireStatus === formValidationConstants.ERROR_STATE) {
        return formValidationConstants.ERROR_STATE;
    }
    else if (requireStatus === formValidationConstants.SUCCESS_STATE) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
            return formValidationConstants.SUCCESS_STATE;
        }
        else {
            return formValidationConstants.WARNING_STATE;
        }
    }
    else {
        return null;
    }
}

function CheckPhoneValid(phone, required, choice) {
    let requireStatus = null;
    if (required) {
        requireStatus = CheckReqiuredValid(phone, choice);
    }
    if (requireStatus === formValidationConstants.ERROR_STATE) {
        return formValidationConstants.ERROR_STATE;
    }
    else if (requireStatus === formValidationConstants.SUCCESS_STATE) {
        let re = /^[789]\d{9}$/;
        if (re.test(String(phone))) {
            return formValidationConstants.SUCCESS_STATE;
        }
        else {
            return formValidationConstants.WARNING_STATE;
        }
    }
    else {
        return null;
    }
}
function LimitCheck(value, delimeter, limitValue, required, choice) {
    let requireStatus = null
    if (required) {
        requireStatus = CheckReqiuredValid(value, choice)
    }
    if (requireStatus === formValidationConstants.ERROR_STATE)
        return requireStatus
    else if (requireStatus === formValidationConstants.SUCCESS_STATE) {
        if (delimeter == 'max') {
            if (parseInt(value) <= parseInt(limitValue)) return formValidationConstants.SUCCESS_STATE
            else return formValidationConstants.WARNING_STATE
        }
        else {
            if (parseInt(value) >= parseInt(limitValue)) return formValidationConstants.SUCCESS_STATE
            else return formValidationConstants.WARNING_STATE
        }
    }
    else return null
}

function ValidationCases(type, value, choice, delimeter = null, limitValue = null) {
    let returnValue = null;
    switch (type) {
        case formValidationConstants.REQUIRED: {
            returnValue = CheckReqiuredValid(value, choice);
            break;
        }
        case formValidationConstants.EMAIL: {
            returnValue = CheckEmailValid(value, choice);
            break;
        }

        case formValidationConstants.EMAILPREQ: {
            returnValue = CheckEmailValid(value, true, choice);
            break;
        }

        case formValidationConstants.PHONEPREQ: {
            returnValue = CheckPhoneValid(value, true, choice);
            break;
        }
        case formValidationConstants.LIMITCHECK: {
            returnValue = LimitCheck(value, delimeter, limitValue, false, choice);
            break;
        }
        case formValidationConstants.LIMITCHECKPREQ: {
            returnValue = LimitCheck(value, delimeter, limitValue, true, choice);
            break;
        }

        default: {
            break;
        }
    }
    return returnValue;
}

export {
    ValidationCases
}
