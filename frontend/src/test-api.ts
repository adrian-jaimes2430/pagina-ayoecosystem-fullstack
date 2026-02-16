import { api } from "./lib/api";

async function test() {
  try {
    const res = await api.get("/auth/me");
    console.log("OK:", res.data);
  } catch (err: any) {
    console.error("ERROR:", err.response?.status, err.response?.data);
  }
}

test();
