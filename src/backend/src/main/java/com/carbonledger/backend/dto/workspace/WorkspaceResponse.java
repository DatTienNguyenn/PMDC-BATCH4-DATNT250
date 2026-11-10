package com.carbonledger.backend.dto.workspace;

import com.carbonledger.backend.entity.enums.WorkspaceRole;
import com.carbonledger.backend.entity.enums.WorkspaceStatus;
import com.carbonledger.backend.entity.enums.WorkspaceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkspaceResponse {

    private UUID id;
    private String name;
    private WorkspaceType type;
    private String inviteCode;
    private WorkspaceStatus status;
    private WorkspaceRole myRole;
    private BigDecimal floorAreaM2;
    private Integer occupants;
    private Instant createdAt;
}
