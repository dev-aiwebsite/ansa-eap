"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type WillFocusedProps = {
  initialState?: boolean;
  children: (props: {
    isFocused: boolean;
    focusOnChange: (value: boolean) => void;
  }) => ReactNode;
};

const WillFocused = ({ children, initialState = false }: WillFocusedProps) => {
  
  const ref = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setFocused(initialState)
    function handlePointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      const inside = target?.closest(".will-focused") === ref.current;

      if (!inside) {
        setFocused(false)
      } else {
        // clicked inside → focus
        setFocused(true)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [initialState]);

  const focusOnChange = (value: boolean) => {
    setFocused(value)
  };


  function setFocused(state:boolean){
    if(state){
      document
      .querySelectorAll(".overflow-auto")
      .forEach((el) => el.classList.add("overflow-visible"));
      setIsFocused(true);
    } else {
      setIsFocused(false);

      setTimeout(() => {
        document
          .querySelectorAll(".overflow-auto.overflow-visible")
          .forEach((el) => el.classList.remove("overflow-visible"));
      }, 500);
    }
  
  }
  return (
    <div
      ref={ref}
      className={`will-focused card h-fit w-full text-white bg-primary transition-all ${
        isFocused && "focused"
      }`}
    >
      {children({ isFocused, focusOnChange })}
    </div>
  );
};

export default WillFocused;
