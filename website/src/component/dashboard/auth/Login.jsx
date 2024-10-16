import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  return (
    <header className="flex justify-center items-center h-screen">
      <SignedIn></SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </header>
  );
}
