package com.carbonledger.backend.security;

import java.util.UUID;

public final class TenantContext {

    private static final ThreadLocal<UUID> CURRENT_WORKSPACE_ID = new ThreadLocal<>();

    private TenantContext() {
    }

    public static void setCurrentWorkspaceId(UUID workspaceId) {
        CURRENT_WORKSPACE_ID.set(workspaceId);
    }

    public static UUID getCurrentWorkspaceId() {
        return CURRENT_WORKSPACE_ID.get();
    }

    public static void clear() {
        CURRENT_WORKSPACE_ID.remove();
    }
}
