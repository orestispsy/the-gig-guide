import styled, { css } from "styled-components";
import { mediaQueries } from "../common/mediaQueries";

export const GoogleMapStyles = css`
  .gm-style div {
    -webkit-transform: scale(1.008);
    transform: scale(1.008);
  }
  .gm-style a {
    visibility: hidden !important;
  }

  .gm-style-cc {
    visibility: hidden !important;
  }

  .gm-style .gm-style-iw-tc::after {
    height: 0 !important;
    width: 0 !important;
  }

  .gm-ui-hover-effect {
    background-color: white !important;
    border-radius: 50% !important;
    top: 6px !important;
    right: 6px !important;
    width: 20px !important;
    height: 20px !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .gm-style-iw .gm-style-iw-c {
    padding: 0 !important;
  }
  .gm-style .gm-style-iw-c {
    padding-right: 13px !important;
    max-height: fit-content !important;
    max-width: unset !important;
    margin-top: -1.3vmax !important;
    margin-left: 3vmax;
    position: absolute;
    box-sizing: border-box;
    outline: none !important;
    top: 0;
    left: 0;
    transform: translate(-50%, -100%);
    border-color: rgb(156, 255, 255);
    border: 1px solid white;
    background-color: rgb(0, 0, 0, 0.632);
    border-radius: 8px;
    color: lime;
    box-shadow: -0 0 5px rgba(0, 0, 0, 0.3), 0 -0 5px rgba(0, 0, 0, 0.3),
      -0 -0 5px rgba(229, 255, 0, 0.3), -0 -0 5px rgba(0, 0, 0, 0.3);
    text-shadow: -0 0 5px rgba(0, 0, 0, 0.7), 0 -0 5px rgba(0, 0, 0, 0.7),
      -0 -0 5px rgba(0, 0, 0, 0.7), -0 -0 5px rgba(0, 0, 0, 0.7);
    animation: fadeAbout 2s ease-in-out;
  }

  .gm-style .gm-style-iw-c:hover {
    border-color: rgb(156, 255, 255);
  }

  .gm-style-iw-d {
    text-align: center;
    font-family: "BlackOpsOne";
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: flex-start;
    outline: none !important;
    overflow: unset !important;
    width: 100% !important;
    height: 100% !important;
  }

  .gm-style .gm-style-iw-c,
  .gm-style .gm-style-iw-t::after {
    top: -21px;
  }

  .gm-style-iw-t::after {
    top: -21px;
    height: 0 !important;
  }

  .gm-style .gm-style-iw-c {
    color: white !important;
  }

  ${mediaQueries(
    "landscape",
    css`
      .gm-style .gm-style-iw-c,
      .gm-style .gm-style-iw-t::after {
        margin-left: 8vmax !important;
      }

      .gm-style .gm-style-iw-c,
      .gm-style .gm-style-iw-t::after {
        top: -30px !important;
      }
      .gm-style-iw-d {
        max-height: fit-content !important;
      }
    `
  )}

  ${mediaQueries(
    "portrait",
    css`
      .gm-style .gm-style-iw-c,
      .gm-style .gm-style-iw-t::after {
        margin-left: 4.5vmax !important;
      }
    `
  )}
`;
