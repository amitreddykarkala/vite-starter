import React, { useState } from "react";

const DashboardHome = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="flex w-full bg-slate-50 flex-col">
      <h1 className="text-3xl font-bold underline">Vite + React</h1>
      <div className="flex">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="flex">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default DashboardHome;
