"use client";

import { Share2, Share2Icon } from "lucide-react";
import { useNeumorph } from "@/contexts/NeumorphContext";
import React from "react";
import {
  FaFacebookMessenger,
  FaInstagram,
  FaPinterestP,
  FaReact,
  FaReddit,
  FaTwitter,
  FaWhatsapp,
  FaFacebook,
  FaPalette,
  FaHospitalSymbol,
  FaShoppingCart,
  FaUserSecret,
  FaChartBar,
  FaMoneyBillWave,
  FaCloud,
  FaRobot,
} from "react-icons/fa";

const ProjectButton: React.FC<{ enableNeumorphism: boolean }> = ({
  enableNeumorphism,
}) => {
  const { isNeumorphism } = useNeumorph();
  //   console.log("enableNeumorphism : ", enableNeumorphism);
  //   console.log("isNeumorphism : ", isNeumorphism);
  return (
    <>
      <div className="buttonProject">
        <button
          className={`${
            isNeumorphism ? "neumorphic-convex neumorphic-box" : ""
          } mainButton`}
        >
          <Share2Icon size={30} />
        </button>

        <button
          className={`react-button buttons ${
            enableNeumorphism ? "neumorphic-convex neumorphic-box" : ""
          }`}
          style={{
            transitionDelay: "0.1s, 0s, 0s",
            transitionProperty: "translate, background, box-shadow",
          }}
        >
          <FaPalette size={30} />
        </button>

        <button
          className={`twitter-button buttons ${
            enableNeumorphism ? "neumorphic-convex neumorphic-box" : ""
          }`}
          style={{
            transitionDelay: "0.2s, 0s, 0.1s",
            transitionProperty: "translate, background, box-shadow",
          }}
        >
          <FaHospitalSymbol size={30} />
        </button>

        <button
          className={`reddit-button buttons ${
            enableNeumorphism ? "neumorphic-convex neumorphic-box" : ""
          }`}
          style={{
            transitionDelay: "0.3s, 0s, 0.2s",
            transitionProperty: "translate, background, box-shadow",
          }}
        >
          <FaShoppingCart size={30} />
        </button>

        <button
          className={`messenger-button buttons ${
            enableNeumorphism ? "neumorphic-convex neumorphic-box" : ""
          }`}
          style={{
            transitionDelay: "0.4s, 0s, 0.3s",
            transitionProperty: "translate, background, box-shadow",
          }}
        >
          <FaUserSecret size={30} />
        </button>

        <button
          className={`pinterest-button buttons ${
            enableNeumorphism ? "neumorphic-convex neumorphic-box" : ""
          }`}
          style={{
            transitionDelay: "0.5s, 0s, 0.4s",
            transitionProperty: "translate, background, box-shadow",
          }}
        >
          <FaChartBar size={30} />
        </button>

        <button
          className={`instagram-button buttons ${
            enableNeumorphism ? "neumorphic-convex neumorphic-box" : ""
          }`}
          style={{
            transitionDelay: "0.6s, 0s, 0.5s",
            transitionProperty: "translate, background, box-shadow",
          }}
        >
          <FaMoneyBillWave size={30} />
        </button>

        <button
          className={`facebook-button buttons ${
            enableNeumorphism ? "neumorphic-convex neumorphic-box" : ""
          }`}
          style={{
            transitionDelay: "0.7s, 0s, 0.6s",
            transitionProperty: "translate, background, box-shadow",
          }}
        >
          <FaCloud size={30} />
        </button>

        <button
          className={`whatsapp-button buttons ${
            enableNeumorphism ? "neumorphic-convex neumorphic-box" : ""
          }`}
          style={{
            transitionDelay: "0.8s, 0s, 0.7s",
            transitionProperty: "translate, background, box-shadow",
          }}
        >
          <FaRobot size={30} />
        </button>
      </div>
      <div className="backdrop"></div>
    </>
  );
};

export default ProjectButton;
