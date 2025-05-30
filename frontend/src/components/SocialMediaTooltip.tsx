"use client";
import { useNeumorph } from "@/contexts/NeumorphContext";
import React from "react";
useNeumorph;
interface TooltipCardProps {
  icon: React.ReactNode;
  account: string;
  name: string;
  username?: string;
  connections?: string;
  href: string;
  border: string;
  color: string;
  img?: string;
}

const TooltipCard: React.FC<TooltipCardProps> = ({
  account,
  icon,
  name,
  username,
  connections,
  href,
  border,
  color,
  img,
}) => {
  const { isNeumorphism } = useNeumorph();

  return (
    <div className="tooltip-container">
      <div className="tooltip">
        <div className="profile">
          <div className="user">
            <div className="flex justify-center w-15 h-15 items-center">
              <div
                className="img rounded-full border border-gray-300"
                style={{
                  backgroundImage: `url(${img})`,
                }}
              ></div>
            </div>
            <div className="details">
              <div className="name">{name}</div>
              <div className="username">{`${
                username ? `@${username}` : ""
              }`}</div>
            </div>
          </div>
          <div className="about">
            {connections ? connections + " Connections" : ""}
          </div>
        </div>
      </div>

      <div
        className={`text ${
          isNeumorphism ? "neumorphic-convex rounded-md" : ""
        }`}
      >
        <a
          className="icon"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="layer">
            <span className={border}></span>
            <span className={border}></span>
            <span className={border}></span>
            <span className={border}></span>
            <span className={`icon-box ${color} ${border}`}>{icon}</span>
          </div>
          <div className={`text ${color}`}>{account}</div>
        </a>
      </div>
    </div>
  );
};

export default TooltipCard;
