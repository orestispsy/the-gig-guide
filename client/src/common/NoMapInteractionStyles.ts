import { createGlobalStyle } from "styled-components";

export const NoMapInteractionStyles = createGlobalStyle`
.gm-style .gm-style-iw-c {
  display: none;
}

.gm-style {
  pointer-events: none;
}
`;
