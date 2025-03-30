import { useTranslation } from "react-i18next";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import SocialMediaIcon from "./SocialMediaIcon";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-bg2 text-primary shadow-2xl">
      <div className="sm:flex flex-row-reverse justify-between items-center md:mx-3">
        <div className="max-w-3xl flex gap-10 my-2 justify-around">
          <SocialMediaIcon link={"https://facebook.com"} Icon={FaFacebook} />
          <SocialMediaIcon link={"https://twitter.com"} Icon={FaTwitter} />
          <SocialMediaIcon link={"https://instagram.com"} Icon={FaInstagram} />
          <SocialMediaIcon link={"https://youtube.com"} Icon={FaYoutube} />
          <SocialMediaIcon link={"https://linkedin.com"} Icon={FaLinkedin} />
        </div>

        <p className="text-xxs md:text-sm text-center">
          &copy; {new Date().getFullYear()} CinemaReserve. {t("rightsReserved")}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
