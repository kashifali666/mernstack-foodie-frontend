import React, { useEffect, useState } from "react";

import ReactDom from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "rgb(34, 34, 34)",
  transform: "translate(-50%, -50%)",
  zIndex: "1000",
  height: "90%",
  width: "90%",
  padding: "20px",
  borderRadius: "8px",
  overflowY: "auto",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgb(0, 0, 0, .7)",
  zIndex: "999",
};

export default function Modal({ children, onClose }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button
          className="btn bg-danger fs-4"
          style={{ position: "absolute", top: "10px", right: "10px" }}
          onClick={onClose}
        >
          X
        </button>
        <div className="text-white">{children}</div>
      </div>
    </>,
    document.getElementById("cart-root")
  );
}
