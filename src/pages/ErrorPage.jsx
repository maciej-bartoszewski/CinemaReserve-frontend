import { useTranslation } from "react-i18next";

function ErrorPage() {
  const { t } = useTranslation();

  return (
    <div className="h-full w-full text-center flex flex-col items-center justify-center">
      <h1 className="text-5xl md:text-7xl lg:text-9xl text-primary">404</h1>
      <h2 className="text-2xl md:text-3xl lg:text-4xl">{t("pageNotFound")}</h2>
    </div>
  );
}

export default ErrorPage;
