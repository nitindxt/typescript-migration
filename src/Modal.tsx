import React, { FunctionComponent,MutableRefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal: FunctionComponent = ({ children }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if(!modalRoot || !elRef.current){//if modalRoot|elref.current is null then return
      //we have to do this as to assure static type cheking because in line 16 we can't appendChild a null.
      return;
    }
    modalRoot.appendChild(elRef.current);
    return () => {
      if(elRef.current){//if it does exist then removeChild (cleanUp)
        modalRoot.removeChild(elRef.current)
      } 
      
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
