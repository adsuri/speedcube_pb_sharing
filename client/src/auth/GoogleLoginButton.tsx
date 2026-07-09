import { GoogleLogin } from "@react-oauth/google";

import { loginWithGoogle } from "../api/auth";
import { useAuth } from "./AuthContext";

function GoogleLoginButton() {
  const { setUser } = useAuth();

  return (
    <GoogleLogin
      use_fedcm_for_button={false}
      use_fedcm_for_prompt={false}
      theme="outline"
      size="large"
      text="signin_with"
      shape="rectangular"
      width="250"
      onSuccess={async (credentialResponse) => {
        try {
          const googleToken = credentialResponse.credential;
          if (!googleToken) {
            console.error("Missing Google credential");
            return;
          }

          const response = await loginWithGoogle(googleToken);

          setUser(response.cuber);
        } catch (err) {
          console.error("Login failed: ", err);
        }
      }}
      
      onError={() => {
        console.error("Google login failed...");
      }} />
  );
}

export default GoogleLoginButton;