import React, { useEffect } from "react";

export default function App() {
  useEffect(() => {
    alert("hydration complete");
  }, []);

  return <div>Hello World</div>;
}
