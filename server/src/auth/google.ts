import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

if (!CLIENT_ID) {
  throw new Error("Missing GOOGLE_CLIENT_ID in environment variables");
}

const client = new OAuth2Client(CLIENT_ID);

export interface GooglePayload {
  googleId: string;
  email: string;
  name: string;
  picture: string;
};

export async function verifyGoogleToken(
  token: string
): Promise<GooglePayload> {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID!,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google token");
  }

  return {
    googleId: payload.sub,
    email: payload.email ?? "",
    name: payload.name ?? "Unknown",
    picture: payload.picture ?? "",
  };
}