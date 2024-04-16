import React, { createContext, useContext, useState } from "react";

type ModalContextType = {
  show: boolean;
  setShow: (b: boolean) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function useModalContext() {
  const value = useContext(ModalContext);
  if (value == null) throw Error("Cannot use outside of Modal Provider");

  return value;
}

export default function Modal({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  return (
    <ModalContext.Provider value={{ show, setShow }}>
      {children}
    </ModalContext.Provider>
  );
}
