function SocialMediaIcon({ link, Icon }) {
  return (
    <a href={link} target="_blank" className="hover:bg-white bg-transparent rounded-full hover:scale-110 p-1 transition duration-300">
      <Icon className="w-5 h-5" />
    </a>
  );
}

export default SocialMediaIcon;
