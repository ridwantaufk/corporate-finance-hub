"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/Navigations/Sidebar";
import Topbar from "@/components/Navigations/Topbar";
import Footer from "@/components/Footer";
import TooltipCard from "@/components/SocialMediaTooltip";
import {
  LiaGithub,
  LiaInstagram,
  LiaLinkedinIn,
  LiaWhatsapp,
} from "react-icons/lia";
import { useNeumorph } from "@/contexts/NeumorphContext";
import { motion, useAnimation } from "framer-motion";
import ChatUserSidebar from "../Chat/ChatUserSidebar";
// import ChatUserSidebar from "@/components/Navigations/ChatUserSidebar";

export default function RootLayoutdWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { isNeumorphism } = useNeumorph();
  const controls = useAnimation();
  const mainRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollThreshold = 5;

  const handleScroll = () => {
    if (mainRef.current) {
      const currentScrollY = mainRef.current.scrollTop;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);

      // only processes if the scroll difference is quite significant
      if (scrollDifference > scrollThreshold) {
        // display when scroll up, hide when scroll down
        if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        }

        setLastScrollY(currentScrollY);
      }
    }
  };

  useEffect(() => {
    const currentElement = mainRef.current;
    if (currentElement) {
      currentElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentElement) {
        currentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (isVisible) {
      controls.start({
        opacity: 1,
        translateY: "0px",
        transition: { duration: 0.8, ease: "easeIn" },
      });
    } else {
      controls.start({
        opacity: 0,
        translateY: "100px",
        transition: { duration: 0.8, ease: "easeOut" },
      });
    }
  }, [isVisible, controls]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatUserSidebar />
      <main
        ref={mainRef}
        className={`${
          isNeumorphism ? "" : "px-0.5"
        } flex-1 flex flex-col overflow-y-auto scrollbar-thin relative`}
      >
        <Topbar />
        {children}
        <Footer />
      </main>
      <motion.div
        initial={{ opacity: 0, translateY: "-20px" }}
        animate={controls}
        className="fixed right-24 bottom-5 flex flex-col gap-4 z-50"
      >
        <div className="flex gap-10">
          <TooltipCard
            icon={<LiaLinkedinIn className="w-3/4 h-3/4" />}
            img="/images/fotoku4.jpeg"
            name="Ridwan Taufik"
            connections="500+"
            border="border-blue-400 border"
            color="text-blue-400"
            href="https://www.linkedin.com/in/ridwan-taufik-b3624325a/"
            account="LinkedIn"
          />
          <TooltipCard
            icon={<LiaInstagram className="w-3/4 h-3/4" />}
            img="/images/fotoku3.jpeg"
            name="Ridwan Taufik"
            username="ridwantaufk"
            connections="500+"
            border="border-rose-500 border"
            color="text-rose-500"
            href="https://www.instagram.com/ridwantaufk/"
            account="Instagram"
          />
          <TooltipCard
            icon={<LiaGithub className="w-3/4 h-3/4" />}
            img="/images/fotoku.jpg"
            name="Ridwan Taufik"
            username="ridwantaufk"
            border="border"
            color=""
            href="https://www.github.com/ridwantaufk/"
            account="GitHub"
          />
          <TooltipCard
            icon={<LiaWhatsapp className="w-3/4 h-3/4" />}
            img="/images/fotoku2.jpg"
            name="Ridwan Taufik"
            username="081312025217"
            border="border-[#25D366] border"
            color="text-[#25D366]"
            href="https://wa.me/6281312025217"
            account="WhatsApp"
          />{" "}
        </div>
      </motion.div>
    </div>
  );
}
