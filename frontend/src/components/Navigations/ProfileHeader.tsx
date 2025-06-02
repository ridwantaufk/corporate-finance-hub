import React, { useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaEllipsisH,
  FaThumbsUp,
  FaUser,
} from "react-icons/fa";
import { useNeumorph } from "@/contexts/NeumorphContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { combineAndCapitalize } from "@/utils/textUtils";
import { formatTimestampCompact } from "@/utils/timeGenerate";
import ProfileheaderSkeleton from "@/components/Skeletons/ProfileHeaderSkeleton";
import { FaUserTie } from "react-icons/fa";

const ProfileHeader = () => {
  const { isNeumorphism } = useNeumorph();
  const { userBiodata, isMeLoading, isLogoutLoading, isLoggingOut, meError } =
    useAuthContext();

  if (isMeLoading || isLogoutLoading || isLoggingOut) {
    return <ProfileheaderSkeleton />;
  }

  if (meError) {
    return <div>{meError.message}</div>;
  }

  const { biodata, username, created_at } = userBiodata ?? {};

  const fullName = combineAndCapitalize(
    biodata?.first_name || "Unknown",
    biodata?.last_name || ""
  );
  const occupation = biodata?.occupation || "No status";
  const email = biodata?.email || "No email";
  const phone = biodata?.phone || "No phone";
  const createdAt = created_at ? formatTimestampCompact(created_at) : "Unknown";

  return (
    <div
      className={`${
        isNeumorphism ? "neumorphic-convex p-0.5" : ""
      } relative rounded-lg mb-2`}
    >
      <section
        className="p-3 rounded-lg"
        style={{
          backgroundImage:
            "url('/images/finance.jpg'), linear-gradient(to bottom, #3a0ca3, #240046)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow:
            "inset 0 80px 80px rgba(0,0,0), inset 0 -50px 50px rgba(0,0,0)",
        }}
      >
        <div className="flex flex-wrap flex-col md:flex-row md:items-start md:space-x-4">
          <div className="relative flex-shrink-0 mb-4 md:mb-0">
            {
              // biodata?.profile_picture ? (
              <img
                alt={`Avatar of ${fullName}`}
                className="rounded-lg w-18 h-18 object-cover"
                src="/api/upload?filename=ridwan.jpeg"
              />
              // ) : (
              //   <FaUserTie className="w-18 h-18" />
              // )
            }
            <span
              className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full border-1 border-[#aadf37] bg-[#9fef00]"
              title="Online status"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1
              className="text-white font-extrabold text-lg leading-none truncate"
              title={fullName}
            >
              {fullName}
            </h1>
            <div className="flex items-center space-x-2 text-[9px] font-bold text-[#999] truncate">
              <span className="text-[var(--text-accent)] flex-shrink-0">
                {username || "No username"}
              </span>
              <span className="text-[#999]">{occupation}</span>
            </div>
            <p className="text-[10px] mt-1 truncate">
              <span className="text-[var(--text-accent)] mr-2">{email}</span>
              <span className="text-white">• {phone}</span>
            </p>
            <p className="text-[10px] text-[#a3f600] font-bold mt-1 flex items-center space-x-1 truncate">
              <FaThumbsUp className="flex-shrink-0" />
              <span>ACTIVE SINCE {createdAt}</span>
            </p>
          </div>
          <div className="flex space-x-3 text-white text-xs flex-shrink-0">
            <a
              aria-label="Facebook"
              className="hover:text-[var(--text-accent)]"
              href="#"
            >
              <FaFacebookF />
            </a>
            <a
              aria-label="Twitter"
              className="hover:text-[var(--text-accent)]"
              href="#"
            >
              <FaTwitter />
            </a>
            <a
              aria-label="LinkedIn"
              className="hover:text-[var(--text-accent)]"
              href="#"
            >
              <FaLinkedinIn />
            </a>
            <a
              aria-label="YouTube"
              className="hover:text-[var(--text-accent)]"
              href="#"
            >
              <FaYoutube />
            </a>
            <button
              aria-label="More options"
              className="text-[var(--text-accent)] hover:text-white cursor-pointer"
            >
              <FaEllipsisH />
            </button>
          </div>
        </div>

        <div className="mt-44 w-full text-[8px] font-bold uppercase tracking-widest text-white">
          <div className="flex flex-wrap justify-between gap-y-2">
            <div className="scroll-x">
              <div className="flex min-w-max items-center gap-2 md:gap-4">
                {[
                  "OVERVIEW",
                  "CLIENTS",
                  "CASH MANAGEMENT",
                  "TRADE FINANCE",
                  "TREASURY & FX",
                  "COMPLIANCE",
                  "ANALYTICS",
                ].map((tab, index) => (
                  <button
                    key={tab}
                    className={`whitespace-nowrap ${
                      index === 0
                        ? "text-[var(--text-accent)] border-b-2 border-[#6b21a8] pb-1"
                        : ""
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 flex space-x-3 scroll-x justify-center w-full flex-wrap">
              <button className="bg-[#6b21a867] px-4 py-1 rounded-full text-[5px] md:text-[6px] lg:text-[10px] font-bold whitespace-nowrap">
                + ADD CLIENT
              </button>
              <button className="bg-[#f9741675] px-4 py-1 rounded-full text-[5px] md:text-[6px] lg:text-[10px] font-bold whitespace-nowrap">
                INVITE TO TEAM
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileHeader;
