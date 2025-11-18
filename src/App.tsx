import { type Component } from "solid-js";

import FloatingChat from "./components/FloatingChat";

const App: Component = () => {
  return (
    <div class="h-full w-full flex flex-col gap-1 justify-center items-center bg-slate-100 ">
      <FloatingChat />
    </div>
  );
};

export default App;
