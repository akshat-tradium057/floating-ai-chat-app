import {
  createEffect,
  createResource,
  createSignal,
  Match,
  onMount,
  Show,
  Switch,
  type Component,
} from "solid-js";
import { fetchMessage, fetchUsers } from "./routes/api/chat";
import ChatWindow from "./components/ChatWindow";

const App: Component = () => {
  return (
    <div class="h-full w-full flex justify-center items-center bg-slate-100">
      <ChatWindow />
    </div>
  );
};

export default App;
