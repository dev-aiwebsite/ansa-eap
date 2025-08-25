"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type WillFocusedProps = {
  children: (props: {
    isFocused: boolean;
    focusOnChange: (value: boolean) => void;
  }) => ReactNode;
};

const WillFocused = ({ children }: WillFocusedProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      const inside = target?.closest(".will-focused") === ref.current;

      if (!inside) {
        // clicked outside → lose focus
        setIsFocused(false);

        // remove overflow-visible after 500ms
        setTimeout(() => {
          document
            .querySelectorAll(".overflow-auto.overflow-visible")
            .forEach((el) => el.classList.remove("overflow-visible"));
        }, 500);
      } else {
        // clicked inside → focus
        document
        .querySelectorAll(".overflow-auto")
        .forEach((el) => el.classList.add("overflow-visible"));
        setIsFocused(true);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const focusOnChange = (value: boolean) => {
    setIsFocused(value);

    if (!value) {
      // if programmatically unfocusing, also cleanup after 500ms
      setTimeout(() => {
        document
          .querySelectorAll(".overflow-auto.overflow-visible")
          .forEach((el) => el.classList.remove("overflow-visible"));
      }, 500);
    }
  };

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
