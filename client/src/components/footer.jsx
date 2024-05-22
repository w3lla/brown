import { Link } from "react-router-dom";

const LINKS = [
  "About Wells Fargo",
  "Online Access Agreement",
  "Privacy, Cookies, Security & Legal",
  "Notice of Data Collection",
  "Report Email Fraud",
  "Security Center",
  "Sitemap",
  "Ad Choices",
];

const Footer = () => {
  return (
    <div className="bg-[#f4f0ed] p-[32px_24px_24px]">
      <div className="text-[#4d4d4d] relative w-full max-w-[1080px] text-[12px] mx-auto my-[10px]">
        <div className="flex w-full gap-4 items-center mb-[22px] flex-wrap">
          {LINKS.map((link, i) => (
            <>
              <Link
                key={i}
                className="hover:underline"
                to="#"
              >
                {link}
              </Link>
              <p className="mx-1">|</p>
            </>
          ))}
          <Link
            className="hover:underline"
            to="#"
          >
            Give Us Feedback
          </Link>
        </div>
        <p className="text-[12px] mt-2">
          © 1999 - 2024 Wells Fargo. All rights reserved. NMLSR ID 399801
        </p>
      </div>
    </div>
  );
};

export default Footer;
