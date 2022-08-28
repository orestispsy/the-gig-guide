export const mediaQueries = (
  minPoint: string,
  maxPoint: string,
  orientation: string
) => {
  return (style: any) =>
    `@media only screen and (min-device-width: ${minPoint}px) 
        and (max-device-width:  ${maxPoint}px) and (orientation: ${orientation}){${style}}`;
};
