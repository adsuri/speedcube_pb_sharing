import { API_URL } from "./API_CONSTANTS";
import { setToken } from "./storage";

export interface GoogleLoginResponse {
  token: string;
  cuber: {
    publicId: string;
    name: string | null;
    pictureURL: string | null
  }
}

export interface AuthUser {
  publicId: string;
  name: string | null;
  pictureURL: string | null
}

export async function loginWithGoogle(googleToken: string): Promise<GoogleLoginResponse> {
  const response = await fetch(API_URL + "/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
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

export async function fetchLoggedInUser(jwtToken: string): Promise<[boolean, AuthUser | null]> {
  const response = await fetch(
    `${API_URL}/auth/me`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`
      }
    }
  );

  if (!response.ok) {
    return [false, null];
  } else {
    return [true, await response.json()];
  }
}