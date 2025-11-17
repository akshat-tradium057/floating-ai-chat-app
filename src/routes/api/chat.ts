export const fetchMessage = async (userMessage: string) => {
  try {
    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        model: "command-r-plus-08-2024",
      }),
    });

    return await response.json();
  } catch (err) {
    return {
      text: "something went wrong",
      role: "error",
    };
  }

  /*
  Sample Response 

  // const res = {
      //   response_id: "d7a778b0-d59c-4fa4-bdf6-aa8dfbecb14b",
      //   text: "Hello! How can I help you today?",
      //   generation_id: "36bf1b64-9664-4f24-9b1d-4382f03e0701",
      //   chat_history: [
      //     {
      //       role: "USER",
      //       message: "hello",
      //     },
      //     {
      //       role: "CHATBOT",
      //       message: "Hello! How can I help you today?",
      //     },
      //   ],
      // };

  */
};

export const fetchUsers = async (id: number) => {
  if (id) {
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    return response.json();
  }
};
