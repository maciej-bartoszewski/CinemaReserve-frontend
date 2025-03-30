function SmallTitle({ text, color }) {
  return (
    <h3
      className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold ${color}`}
    >
      {text}
    </h3>
  );
}

export default SmallTitle;
