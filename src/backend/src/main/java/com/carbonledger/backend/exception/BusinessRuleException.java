package com.carbonledger.backend.exception;

import org.springframework.http.HttpStatus;

public class BusinessRuleException extends ApiException {

    public BusinessRuleException(String message) {
        super(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
