import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuUserRound } from "react-icons/lu";
import { TbLockPassword } from "react-icons/tb";
import { useAuth } from "../security/AuthProvider";
import FormInput from "../components/form/FormInput";
import FormButton from "../components/form/FormButton";
import BigTitle from "../components/titles/BigTitle";
import SuccessDialog from "../components/dialogs/SuccessDialog";
import validateLoginInputs from "../validation/validateLoginInputs";

function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  async function handleLogin(event) {
    event.preventDefault();
    if (!validateLoginInputs(user, setErrors, t)) return;

    try {
      await login(user);
      navigate(`/`);
      SuccessDialog({
        title: t("userLoggedIn"),
      });
    } catch (error) {
      setErrors({
        form:
          error.response?.status === 401
            ? t("invalidCredentials")
            : t("serverError"),
      });
    }
  }

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-full max-w-lg justify-center items-center bg-bg2 p-10 rounded-2xl">
        <BigTitle text={t("login")} />
        <form onSubmit={handleLogin} className="flex flex-col w-full">
          <FormInput
            inputValue={user.email}
            type={"email"}
            setInputValue={(value) => setUser({ ...user, email: value })}
            inputName={t("email")}
            icon={<LuUserRound />}
            placeholder={t("enterEmail")}
            error={errors.email}
          />
          <FormInput
            inputValue={user.password}
            type={"password"}
            setInputValue={(value) => setUser({ ...user, password: value })}
            inputName={t("password")}
            icon={<TbLockPassword />}
            placeholder={t("enterPassword")}
            error={errors.password}
          />
          <FormButton buttonName={t("login")} />
          {errors.form && (
            <p className="text-red-500 text-xxs md:text-sm text-center mt-2">
              {errors.form}
            </p>
          )}
        </form>
        <p className="mt-5">
          {t("noAccount?")}{" "}
          <Link
            to={"/register"}
            className="cursor-pointer font-semibold text-primary hover:text-secondary transition duration-300"
          >
            {t("registerNow")}
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
