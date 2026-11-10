package com.carbonledger.backend.dto.workspace;

import com.carbonledger.backend.entity.enums.WorkspaceType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateWorkspaceRequest {

    @NotBlank(message = "Workspace name is required")
    private String name;

    @NotNull(message = "Workspace type is required")
    private WorkspaceType type;

    @NotNull(message = "Floor area is required")
    @DecimalMin(value = "0.01", message = "Floor area must be greater than 0")
    private BigDecimal floorAreaM2;

    @NotNull(message = "Occupants count is required")
    @Min(value = 1, message = "There must be at least 1 occupant")
    private Integer occupants;
}
