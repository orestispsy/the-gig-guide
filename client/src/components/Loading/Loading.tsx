import React, { useState, useEffect, useRef, useMemo } from "react";

import {
  LoadingContainer,
  Box,
  Dot,
  DotWrapper,
  LoadingIntro,
  LoadingIntroText,
  LogoBox,
  Logo,
  LogoText,
  LogoWrapper,
  LoadingBarWrapper,
  LoadingBar,
} from "./Loading.style";

interface Props {
  loadPercentage?: number;
  noDots?: boolean;
}

export const Loading: React.FC<Props> = ({ loadPercentage, noDots }) => {
  const [dotMap, setDotMap] = useState<any>([]);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const boxRef = useRef<HTMLDivElement | null>(null);

  let refs = useRef<React.RefObject<any>[]>([
    React.createRef(),
    React.createRef(),
  ]);

  const radius = 195;
  const divideBy = 12;
  const circleDivided = 360 / divideBy;

  const updateDotRefs = () => {
    refs.current = refs.current.splice(0, divideBy);
    for (let i = 0; i < divideBy; i++) {
      refs.current[i] = refs.current[i] || React.createRef();
    }
    refs.current = refs.current.map((item) => item || React.createRef());
  };

  const createDotMap = () => {
    let children: any = [];
    for (let i = 0; i < divideBy; i++) {
      let y = Math.sin(circleDivided * i * (Math.PI / 180)) * radius;
      let x = Math.cos(circleDivided * i * (Math.PI / 180)) * radius;
      const object = {
        id: i,
        top: y.toString() + "px",
        left: x.toString() + "px",
        ref: refs.current[i],
      };
      children.push(object);
    }
    setDotMap(children);
  };

  const dots = useCreateDots(dotMap, setIsTransitioning, isTransitioning);

  const shouldLoad = loadPercentage && loadPercentage > 0;

  useEffect(function () {
    updateDotRefs();
    createDotMap();
  }, []);

  return (
    <LoadingContainer>
      <LoadingIntro>
        <Box ref={boxRef} noDots={noDots}>
          <DotWrapper transition={isTransitioning}>{dots}</DotWrapper>
        </Box>
        <LogoBox>
          <LogoWrapper>
            <Logo></Logo>
            <LogoText>The Gig Guide</LogoText>
          </LogoWrapper>
        </LogoBox>
        <LoadingIntroText> LOADING </LoadingIntroText>
        <LoadingBarWrapper shouldLoad={shouldLoad}>
          <LoadingBar percentage={loadPercentage} />
        </LoadingBarWrapper>
      </LoadingIntro>
    </LoadingContainer>
  );
};

const useCreateDots = (
  dotMap: any,
  setIsTransitioning: (e: boolean) => void,
  isTransitioning: boolean
) => {
  return useMemo(
    () =>
      dotMap[0] &&
      dotMap?.map((val: any, index: number) => (
        <Dot
          id={val.id}
          style={{
            top: val.top,
            left: val.left,
            backgroundColor: val.backgroundColor,
          }}
          key={index}
          ref={val.ref}
          delayed={index}
          onTransitionEnd={(e) => setIsTransitioning(false)}
          transition={isTransitioning}
        />
      )),
    [dotMap]
  );
};
