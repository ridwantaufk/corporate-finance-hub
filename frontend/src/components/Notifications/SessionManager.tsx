import React, { useEffect, useRef, useState } from "react";
import { useLogoutUser } from "@/graphql/auth/hooks";
import { useNeumorph } from "@/contexts/NeumorphContext";

const INACTIVITY_BEFORE_PROMPT = 1800; // detik
const PROMPT_DURATION = 3600; // detik

const SessionManager: React.FC = () => {
  const { isNeumorphism } = useNeumorph();
  const [showPrompt, setShowPrompt] = useState(false);
  const [countdown, setCountdown] = useState(PROMPT_DURATION);
  const showPromptRef = useRef(showPrompt);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const logoutTimer = useRef<NodeJS.Timeout | null>(null);
  const countdownInterval = useRef<NodeJS.Timeout | null>(null);

  const [logoutUser] = useLogoutUser();

  useEffect(() => {
    showPromptRef.current = showPrompt;
  }, [showPrompt]);

  const resetTimers = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    if (countdownInterval.current) clearInterval(countdownInterval.current);

    setShowPrompt(false);
    setCountdown(PROMPT_DURATION);

    inactivityTimer.current = setTimeout(() => {
      setShowPrompt(true);
      setCountdown(PROMPT_DURATION);

      logoutTimer.current = setTimeout(() => {
        handleAutoLogout();
      }, PROMPT_DURATION * 1000);

      let tick = PROMPT_DURATION;
      countdownInterval.current = setInterval(() => {
        tick -= 1;
        setCountdown(tick);
        if (tick <= 0 && countdownInterval.current) {
          clearInterval(countdownInterval.current);
        }
      }, 1000);
    }, INACTIVITY_BEFORE_PROMPT * 1000);
  };

  useEffect(() => {
    const handleActivity = () => {
      if (!showPromptRef.current) {
        resetTimers();
      }
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("touchstart", handleActivity);

    resetTimers();

    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      if (countdownInterval.current) clearInterval(countdownInterval.current);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
    };
  }, []);

  const handleStayActive = () => {
    resetTimers();
  };

  const handleAutoLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/auth/login";
  };

  return (
    <>
      {showPrompt && (
        <div style={styles.overlay}>
          <div
            style={styles.modal}
            className={`session-modal-animate ${
              isNeumorphism ? "neumorphic-convex" : ""
            }`}
          >
            <div
              style={styles.iconCircle}
              className={`${
                isNeumorphism ? "neumorphic-pressed p-3 rounded-md" : ""
              }`}
            >
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                style={{ display: "block", margin: "0 auto" }}
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="12" fill="#fff3cd" />
                <path
                  d="M12 8v4m0 4h.01"
                  stroke="#f1c40f"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className={`${
                isNeumorphism ? "neumorphic-pressed p-3 rounded-lg  " : ""
              }`}
            >
              <h2 style={styles.title}>Inactivity Detected</h2>
              <p style={styles.text}>
                There is no detected activity.
                <br />
                You will log out automatically in{" "}
                <span style={styles.countdown}>{countdown}</span> second.
              </p>
            </div>
            <div style={styles.buttonRow}>
              <button
                onClick={handleStayActive}
                type="button"
                className={`${
                  isNeumorphism ? "neumorphic-convex neumorphic-box" : ""
                } py-1 px-2 rounded-md`}
              >
                Stay Active
              </button>
              <button
                onClick={handleAutoLogout}
                type="button"
                className={`${
                  isNeumorphism ? "neumorphic-convex neumorphic-box" : ""
                } py-1 px-2 rounded-md`}
              >
                Logout ?
              </button>
            </div>
          </div>
          <style>{`
            .session-modal-animate {
              animation: fadeInScale 0.35s cubic-bezier(.4,2,.6,1) both;
            }
            @keyframes fadeInScale {
              0% { opacity: 0; transform: scale(0.85);}
              100% { opacity: 1; transform: scale(1);}
            }
          `}</style>
        </div>
      )}
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(34,34,34,0.45)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    transition: "background 0.2s",
  },
  modal: {
    background: `var(--card-2)`,
    padding: "36px 32px 28px 32px",
    borderRadius: 16,
    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)",
    minWidth: 340,
    maxWidth: "94vw",
    textAlign: "center",
    position: "relative",
  },
  iconCircle: {
    background: "#fff3cd",
    borderRadius: "50%",
    width: 56,
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 12px auto",
    border: "2px solid #ffeeba",
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "#856404",
    margin: "0 0 10px 0",
    letterSpacing: 0.2,
  },
  text: {
    fontSize: 16,
    color: "#444",
    margin: "0 0 18px 0",
    lineHeight: 1.6,
  },
  countdown: {
    fontWeight: 700,
    color: "#d35400",
    fontSize: 18,
  },
  buttonRow: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    marginTop: 10,
  },
  stayBtn: {
    background: "#f1c40f",
    color: "#fff",
    boxShadow: "0 2px 8px 0 rgba(241,196,15,0.10)",
  },
  logoutBtn: {
    background: "#e74c3c",
    color: "#fff",
    boxShadow: "0 2px 8px 0 rgba(231,76,60,0.10)",
  },
};

export default SessionManager;
