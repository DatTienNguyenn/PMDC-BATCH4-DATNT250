package com.carbonledger.backend.exception;

import org.springframework.http.HttpStatus;

public class TenantAccessDeniedException extends ApiException {

    public TenantAccessDeniedException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }
}
