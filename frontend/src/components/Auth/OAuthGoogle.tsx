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
        @keyframes rainbow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        .animated-rainbow-text {
            background: linear-gradient(270deg, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee);
            background-size: 1400% 1400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: rainbow 8s ease infinite;
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
