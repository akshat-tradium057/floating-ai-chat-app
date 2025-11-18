import { createSignal, Show } from "solid-js";
import { fetchMessage } from "../routes/api/chat";
import BotAndUserChat from "./BotAndUserChat";
import { GRADIENT_CLASS } from "../constants/chatConstants";
import ThreeDotsLoader from "./ThreeDotsLoader";

export default ({ toggleChat }) => {
  const [typedMessage, setTypedMessage] = createSignal("");
  const [showLoader, setShowLoader] = createSignal(false);
  const [messages, setMessages] = createSignal([{}]);

  const handleOnInput = (e: Event) => {
    const val = (e.target as HTMLInputElement | null)?.value;
    if (val != null) {
      setTypedMessage(val);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (showLoader()) {
      return;
    }

    if (e.key === "Enter") {
      onClickSend();
    }
  };

  const onClickSend = async () => {
    setShowLoader(true);

    const msg = typedMessage();
    if (msg) {
      const id = crypto.randomUUID().slice(0, 8);
      setMessages((messages: any) => {
        return [
          ...messages,
          {
            role: "USER",
            text: msg,
            id: id,
          },
        ];
      });

      setTypedMessage("");

      const res = await fetchMessage(msg);

      console.log("🚀 ~ onClickSend ~ res:", res);

      if (res?.text && res?.response_id) {
        setShowLoader(false);
        setMessages((messages: any) => {
          return [
            ...messages,
            {
              role: "CHATBOT",
              text: res.text,
              id: res.response_id,
            },
          ];
        });
      }
    }

    setShowLoader(false);
  };

  return (
    <div class="h-[480px] w-92 flex flex-col  rounded-xl bg-white transition-all duration-800 ease-out">
      <div
        class={`p-4 text-center text-white rounded-xl ${GRADIENT_CLASS} flex justify-between items-center`}
      >
        <p>CHATBOT APP</p>
        <button class="p-2 cursor-pointer" onClick={toggleChat}>
          ╳
        </button>
      </div>
      <div class="flex-1 bg-white rounded-md overflow-y-auto p-5 flex flex-col gap-3">
        <BotAndUserChat messagesData={messages} />
        <Show when={showLoader()}>
          <ThreeDotsLoader />
        </Show>
      </div>
      <div class="flex justify-start p-2  border-t border-slate-300 bg-white">
        <input
          type="text"
          value={typedMessage()}
          class="flex-1 outline-0 px-2 "
          id="message"
          placeholder="Type a message..."
          onInput={handleOnInput}
          onKeyPress={handleKeyPress}
        />
        <button
          class="p-3 bg-transparent h-8 text-center flex justify-center items-center border border-purple-500 rounded-md cursor-pointer hover:bg-purple-500 hover:text-white transition-all duration-500 disabled:bg-slate-300 disabled:hover:text-inherit disabled:cursor-not-allowed disabled:border-slate-300"
          onClick={onClickSend}
          disabled={showLoader()}
        >
          send
        </button>
      </div>
    </div>
  );
};
