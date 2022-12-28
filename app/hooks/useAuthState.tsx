import { useEffect, useState } from "react";
import { auth } from "@lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

// this hook returns the currently signed in user
// if no user is signed in, value will be null
export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });

    // Unsubscribe from the listener when the component unmounts.
    return () => unsubscribe();
  }, []);

  return [user];
};
