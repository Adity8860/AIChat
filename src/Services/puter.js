import puter from "@heyputer/puter.js";

export async function askAI(prompt) {
  try {
    const response = await puter.ai.chat(prompt);

    console.log("RAW:", response); // debug once

    return response?.message?.content || "No response from AI";
  } catch (err) {
    console.error("AI error:", err);
    return "Sorry, I couldn’t process that.";
  }
}

export async function saveMessage(key, value) {
  try {
    await puter.kv.set(key, JSON.stringify(value));
  } catch (err) {
    console.error("KV storage error:", err);
    throw new Error("Failed to save message.");
  }
}

export async function getMessage(key) {
  try {
    const data = await puter.kv.get(key);
    return JSON.parse(data);
  } catch (err) {
    console.error("KV storage error:", err);
    throw new Error("Failed to retrieve message.");
  }
}
