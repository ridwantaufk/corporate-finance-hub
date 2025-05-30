import React from "react";
import { useNeumorph } from "@/contexts/NeumorphContext";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaEnvelope,
  FaBalanceScale,
} from "react-icons/fa";

const Footer = () => {
  const { isNeumorphism } = useNeumorph();

  return (
    <>
      <hr className="mt-2 border-[var(--text)] w-full mx-auto" />
      <footer
        className={`${
          isNeumorphism ? "neumorphic-flat" : ""
        } bg-[var(--body)] px-6 py-6 mt-2`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--text)] mb-3">
              Corporate Finance Hub
            </h4>
            <p className="text-sm text-[var(--text-accent)] leading-relaxed">
              Platform edukasi dan analisis mendalam seputar dunia corporate
              finance, valuasi, investasi, dan strategi keuangan perusahaan.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="font-semibold text-[var(--text)] mb-3">
              Navigation
            </h5>
            <ul className="space-y-2 text-[var(--text-accent)] text-sm">
              <li>
                <a href="/about" className="hover:text-[var(--text)]">
                  About Us
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-[var(--text)]">
                  Blog & Insights
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[var(--text)]">
                  Contact
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-[var(--text)]">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="font-semibold text-[var(--text)] mb-3">Resources</h5>
            <ul className="space-y-2 text-[var(--text-accent)] text-sm">
              <li>
                <a href="/whitepapers" className="hover:text-[var(--text)]">
                  Whitepapers
                </a>
              </li>
              <li>
                <a href="/reports" className="hover:text-[var(--text)]">
                  Market Reports
                </a>
              </li>
              <li>
                <a href="/webinars" className="hover:text-[var(--text)]">
                  Webinars
                </a>
              </li>
              <li>
                <a href="/tools" className="hover:text-[var(--text)]">
                  Financial Tools
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h5 className="font-semibold text-[var(--text)] mb-3">
              Legal & Social
            </h5>
            <ul className="space-y-2 text-[var(--text-accent)] text-sm mb-4">
              <li>
                <a href="/terms" className="hover:text-[var(--text)]">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-[var(--text)]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/license" className="hover:text-[var(--text)]">
                  Content License
                </a>
              </li>
            </ul>

            <div className="flex space-x-4 text-[var(--text-accent)] text-xl">
              <a href="mailto:hello@corpfinancehub.com" title="Email">
                <FaEnvelope />
              </a>
              <a
                href="https://linkedin.com/company/corpfinancehub"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/corpfinancehub" title="Twitter">
                <FaTwitter />
              </a>
              <a href="https://github.com/corpfinancehub" title="GitHub">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <hr
          className={`mt-5 border-[var(--text)] w-full mx-auto ${
            isNeumorphism ? "neumorphic-convex" : ""
          }`}
        />

        <div className="mt-5 text-[var(--text-accent)] text-center text-xs pt-4">
          <p>
            © {new Date().getFullYear()} Corporate Finance Hub. All rights
            reserved. Powered by <FaBalanceScale className="inline mb-1" />{" "}
            Finance for the Future.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
