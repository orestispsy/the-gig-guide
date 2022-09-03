import { createGlobalStyle } from "styled-components";

import { GoogleMapStyles } from "./GoogleMaps.style";



export const GlobalStyles = createGlobalStyle`
${GoogleMapStyles}

  

@keyframes fadeAbout {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}
@keyframes fadeCover {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 50%;
  }
}


@keyframes bounceDesc {
  0% {
    transition: 1s;
  }

  15% {
    transform: scaleX(-1);
    transition: 0.1s;
  }

  40% {
    transform: scaleX(1);
  }
  52% {
    transform: translateX(-1.3vmax) rotate(-90deg);
    opacity: 100%;
  }

  90% {
    transform: scaleX(1);
    transition: 1s;
    opacity: 0%;
  }
}

@keyframes timeline {
  50% {
    filter: invert(0%) hue-rotate(-510deg);
  }
}

@keyframes fadeIntroColor {
  0% {
    background-color: transparent;
  }
  100% {
    background-color: rgba(0, 0, 0, 0.418);
  }
}

@keyframes fadeIntroColorRewind {
  0% {
    background-color: rgba(0, 0, 0, 0.418);
  }
  100% {
    background-color: transparent;
  }
}

@keyframes blinker {
  5% {
    color: rgb(241, 220, 30);
  }
  25% {
    text-shadow: -0 0 10px orangered, 0 -0 10px orangered, -0 -0 10px orangered,
      -0 -0 10px orangered;
    color: rgb(6, 145, 170);
  }

  50% {
    color: rgb(32, 182, 57);
    text-shadow: -0 0 10px blue, 0 -0 10px blue, -0 -0 10px blue,
      -0 -0 10px blue;
  }

  75% {
    color: white;
    text-shadow: -0 0 10px black, 0 -0 10px black, -0 -0 10px black,
      -0 -0 10px black;
  }
}

@keyframes blinkUploader {
  50% {
    background-color: lime;
  }
}

@keyframes blinker2 {
  33% {
    box-shadow: 0 0 5px #bbff00, 0 0 5px #bbff00, 0 0 5px #bbff00,
      0 0 5px #bbff00;
  }
  55% {
    box-shadow: 0 0 6px rgba(0, 255, 200, 0.7), 0 0 6px rgb(0, 255, 200, 0.7),
      0 0 6px rgb(0, 255, 200, 0.7), 0 0 6px rgb(0, 255, 200, 0.7);
  }
  99% {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0), 0 0 5px rgba(0, 0, 0, 0),
      0 0 5px rgba(255, 251, 0, 0) 0 5px rgba(255, 251, 0, 0);
  }
}

@keyframes blinkerAvatar {
  0% {
    text-shadow: 0 0 6px rgb(217, 255, 0, 0.4), 0 0 6px rgb(217, 255, 0, 0.4),
      0 0 6px rgb(217, 255, 0, 0.4), 0 0 6px rgb(217, 255, 0, 0.4);
  }

  50% {
    text-shadow: none;
  }

  100% {
    text-shadow: 0 0 6px rgb(217, 255, 0, 0.4), 0 0 6px rgb(217, 255, 0, 0.4),
      0 0 6px rgb(217, 255, 0, 0.4), 0 0 6px rgb(217, 255, 0, 0.4);
  }
}

@keyframes blinkerCountDown {
  0% {
    text-shadow: -0 0 5px rgba(19, 253, 50, 0.267),
      0 -0 5px rgba(19, 253, 50, 0.267), -0 -0 5px rgba(19, 253, 50, 0.267),
      -0 -0 5px rgba(19, 253, 50, 0.267);
  }
  20% {
       font-size: 3vmax;
    text-shadow: 0 0 5px yellow, 0 0 5px yellow, 0 0 5px yellow, 0 0 5px yellow;
    color: rgb(0, 255, 213);
  }
  80% {
    font-size: 1.5vmax;
  }
  85% {
    text-shadow: -0 0 5px rgba(19, 253, 50, 0.267),
      0 -0 5px rgba(19, 253, 50, 0.267), -0 -0 5px rgba(19, 253, 50, 0.267),
      -0 -0 5px rgba(19, 253, 50, 0.267);
  }
}



@keyframes blinkerTextCyan {
  0% {
    text-shadow: -0 0 5px rgba(19, 253, 50, 0.267),
      0 -0 5px rgba(19, 253, 50, 0.267), -0 -0 5px rgba(19, 253, 50, 0.267),
      -0 -0 5px rgba(19, 253, 50, 0.267);
  }
  10% {
    font-size: 3vmax;
  }
  20% {
    text-shadow: 0 0 5px yellow, 0 0 5px yellow, 0 0 5px yellow, 0 0 5px yellow;
    color: rgb(0, 255, 213);
  }
  25% {
    font-size: 1.5vmax;
  }

  85% {
    text-shadow: -0 0 5px rgba(19, 253, 50, 0.267),
      0 -0 5px rgba(19, 253, 50, 0.267), -0 -0 5px rgba(19, 253, 50, 0.267),
      -0 -0 5px rgba(19, 253, 50, 0.267);
  }
}

@keyframes blinkerText {
  0% {
    text-shadow: -0 0 5px rgba(19, 253, 50, 0.267),
      0 -0 5px rgba(19, 253, 50, 0.267), -0 -0 5px rgba(19, 253, 50, 0.267),
      -0 -0 5px rgba(19, 253, 50, 0.267);
  }

  20% {
    text-shadow: 0 0 5px yellow, 0 0 5px yellow, 0 0 5px yellow, 0 0 5px yellow;
    color: rgb(0, 255, 213);
  }

  85% {
    text-shadow: -0 0 5px rgba(19, 253, 50, 0.267),
      0 -0 5px rgba(19, 253, 50, 0.267), -0 -0 5px rgba(19, 253, 50, 0.267),
      -0 -0 5px rgba(19, 253, 50, 0.267);
  }
}

@keyframes blinkerBan {
  0% {
    color: tomato;
  }

  50% {
    color: rgb(0, 255, 242);
  }

  100% {
    color: tomato;
  }
}


@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

@keyframes scroll {
  from {
    top: 200vh;
    transform: translateZ(0) rotateX(50deg);
  }
  to {
    top: -180000vh;
    transform: translateZ(-210000vh) rotateX(40deg);
  }
}

@keyframes blinkerLoading {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}

@keyframes privateNotifier {
  0% {
    opacity: 100%;
  }
  25% {
    opacity: 15%;
  }
  50% {
    opacity: 100%;
  }
  75% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}

@keyframes blinkerBoxYellow {
  20% {
    box-shadow: 0 0 5px yellow, 0 0 5px yellow, 0 0 5px yellow, 0 0 5px yellow;
  }
}
  `;
