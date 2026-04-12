import puter from "puter-js";

export async function askAI(prompt) {
  try {
    const response = await puter.ai.chat(prompt);
    return response;
  } catch (err) {
    console.error("AI error:", err);
    return "Sorry, I couldn’t process that.";
  }
}

// KV storage wrapper
export async function saveMessage(key, value) {
  try {
    await puter.kv.set(key, value);
  } catch (err) {
    console.error("KV storage error:", err);
    throw new Error("Failed to save message.");
  }
}

export async function getMessage(key) {
  try {
    return await puter.kv.get(key);
  } catch (err) {
    console.error("KV storage error:", err);
    throw new Error("Failed to retrieve message.");
  }
}
