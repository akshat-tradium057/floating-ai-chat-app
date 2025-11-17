import { For, Match, Switch } from "solid-js";
import { GRADIENT_CLASS } from "../constants/chatConstants";

export default ({ messagesData }) => {
  return (
    <>
      <For each={messagesData()}>
        {(item) => {
          return (
            <>
              <Switch>
                <Match when={item.role === "CHATBOT"}>
                  <p
                    class="ml-auto w-32 bg-slate-100 p-2 rounded-xl text-sm "
                    id={item.id}
                  >
                    {item?.text || ""}
                  </p>
                </Match>
                <Match when={item.role === "USER"}>
                  <p
                    class={`mr-auto max-w-44 p-2 rounded-xl text-sm text-white ${GRADIENT_CLASS} `}
                    id={item.id}
                  >
                    {item?.text || ""}
                  </p>
                </Match>
              </Switch>
            </>
          );
        }}
      </For>
    </>
  );
};
