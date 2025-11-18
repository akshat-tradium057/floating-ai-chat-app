import {
  createEffect,
  createSignal,
  Match,
  onCleanup,
  onMount,
  Switch,
} from "solid-js";
import { GRADIENT_CLASS } from "../constants/chatConstants";
import ChatWindow from "./ChatWindow";

export default () => {
  const [isChatOpen, toggleChat] = createSignal(false);
  const [position, setPosition] = createSignal({
    x: window.innerWidth / 2,
    y: 200,
  });
  const [isDragging, setIsDragging] = createSignal(false);

  let offsetX = 0;
  let offsetY = 0;
  let chatRef: HTMLDivElement | undefined;

  const handleToggleChat = () => {
    toggleChat((val) => !val);
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (!chatRef) return;

    setIsDragging(true);

    const rect = chatRef.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging() || !chatRef) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const chatWidth = chatRef.offsetWidth;
    const chatHeight = chatRef.offsetHeight;

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    const minX = 0;
    const minY = 0;
    const maxX = viewportWidth - chatWidth;
    const maxY = viewportHeight - chatHeight;

    newX = Math.min(Math.max(newX, minX), maxX);
    newY = Math.min(Math.max(newY, minY), maxY);

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  onMount(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  });

  onCleanup(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  });
  return (
    <Switch>
      <Match when={isChatOpen()}>
        <div
          ref={chatRef}
          class={`fixed z-50 cursor-move `}
          style={{
            left: `${position().x}px`,
            top: `${position().y}px`,
          }}
          onMouseDown={handleMouseDown}
        >
          <ChatWindow toggleChat={handleToggleChat} />
        </div>
      </Match>
      <Match when={!isChatOpen()}>
        <button
          class={`${GRADIENT_CLASS} text-white p-2 cursor-pointer`}
          onClick={handleToggleChat}
        >
          Start Chat 💬
        </button>
      </Match>
    </Switch>
  );
};
