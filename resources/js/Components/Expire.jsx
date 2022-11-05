import React, { useEffect, useState } from "react";

export default function Expire (props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, props.delay);
    return () => clearTimeout(timer)
  }, [props.delay]);

  return visible ? <div>{props.children}</div> : <div />;
};