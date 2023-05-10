export const breakpoints: any = {
  landscape: {
    orientation: "landscape",
    minPoint: 273,
    maxPoint: 1024,
  },
  portrait: {
    orientation: "portrait",
    minPoint: 100,
    maxPoint: 480,
  },
};

export const mediaQueries = (screenSize: string, func: any) => {
  return () =>
    `@media only screen and (min-device-width: ${breakpoints[screenSize].minPoint}px) and
         (max-device-width: ${breakpoints[screenSize].maxPoint}px) and
          (orientation: ${breakpoints[screenSize].orientation}) {${func}}
        `;
};
