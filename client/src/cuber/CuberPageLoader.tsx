import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cuber } from "./Cuber";
import CuberPage from "./CuberPage";
import { grabUser } from "../api/profile";
import { getToken } from "../api/storage";
import { useAuth } from "../auth/AuthContext";

function CuberPageLoader() {
  const { publicId } = useParams();

  const { user: authUser } = useAuth();

  const [user, setUser] = useState<Cuber | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    if (!publicId) {
      setError("Missing user id...");
      setLoading(false);
      return;
    }

    async function loadUser() {
      try {
        const [isOwner, cuber] = await grabUser(getToken(), publicId!);

        setUser(cuber);
        setCanEdit(isOwner);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load user... This user may not exist.");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [publicId, authUser]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <span className="spinner large"></span> <p>Loading...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <p>{error}</p>
    );
  }

  return (
    <CuberPage user={user} isOwner={canEdit} />
  );
}

export default CuberPageLoader;