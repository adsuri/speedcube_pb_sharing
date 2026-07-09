import { setToken, clearToken } from "./storage";

export interface GoogleLoginResponse {
  token: string;
  cuber: {
    publicId: string;
    name: string | null;
    pictureURL: string | null
  }
}

export async function loginWithGoogle(googleToken: string): Promise<GoogleLoginResponse> {
  const response = await fetch("http://localhost:3000/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      token: googleToken
    })
  });

  if (!response.ok) {
    throw new Error("Failed to sign in...");
  }

  const data: GoogleLoginResponse = await response.json();

  setToken(data.token);

  return data;
}

export function logout(): void {
  clearToken();
}