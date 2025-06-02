import { FcGoogle } from "react-icons/fc";
import { useNeumorph } from "@/contexts/NeumorphContext";

export default function OAuthGoogle() {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = encodeURIComponent(
    "http://localhost:3000/oauth/callback"
  );
  const scope = encodeURIComponent("openid email profile");
  const responseType = "code";
  const accessType = "offline";
  const prompt = "consent";

  const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&prompt=${prompt}`;

  const { isNeumorphism } = useNeumorph();

  return (
    <>
      <style>
        {`
        .animated-rainbow-text {
          background: linear-gradient(
            270deg,
            #ff4d4d,  /* soft red */
            #ff944d,  /* orange-ish */
            #ffff4d,  /* lemon yellow */
            #80ff80,  /* light green */
            #66ccff,  /* sky blue */
            #b366ff,  /* lavender */
            #ff4dff   /* pink-violet */
          );
          background-size: 800% 800%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: rainbow 10s ease infinite;
        }

        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        `}
      </style>

      <button
        onClick={() => (window.location.href = googleOAuthUrl)}
        className={`${
          isNeumorphism ? "neumorphic-flat neumorphic-box" : ""
        } flex my-2 items-center gap-2 px-1 py-1 rounded-md hover:bg-opacity-100 transition cursor-pointer shadow-sm`}
        style={{ maxWidth: 280 }}
        aria-label="Login with Google"
      >
        <FcGoogle size={24} />
        <span className="font-medium animated-rainbow-text">
          Login with Google
        </span>
      </button>
    </>
  );
}
