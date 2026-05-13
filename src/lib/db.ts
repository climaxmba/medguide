import { openDB, DBSchema, IDBPDatabase } from "idb";

interface ChatDB extends DBSchema {
  messages: {
    key: number;
    value: {
      id?: number;
      role: "user" | "model";
      text: string;
      images?: string[]; // array of base64 strings
      timestamp: number;
    };
    indexes: { "by-timestamp": number };
  };
}

let dbPromise: Promise<IDBPDatabase<ChatDB>> | null = null;

export const getDB = () => {
  if (typeof window === "undefined") return null;
  if (!dbPromise) {
    dbPromise = openDB<ChatDB>("vora-health-chat", 1, {
      upgrade(db) {
        const store = db.createObjectStore("messages", {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("by-timestamp", "timestamp");
      },
    });
  }
  return dbPromise;
};

export async function addMessage(data: {
  role: "user" | "model";
  text: string;
  images?: string[];
}) {
  const db = await getDB();
  if (!db) return;
  return db.add("messages", {
    ...data,
    timestamp: Date.now(),
  });
}

export async function getMessages() {
  const db = await getDB();
  if (!db) return [];
  return db.getAllFromIndex("messages", "by-timestamp");
}

export async function clearMessages() {
  const db = await getDB();
  if (!db) return;
  return db.clear("messages");
}
