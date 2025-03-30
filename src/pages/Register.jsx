import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineUser } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import FormInput from "../components/form/FormInput";
import FormButton from "../components/form/FormButton";
import BigTitle from "../components/titles/BigTitle";
import SuccessDialog from "../components/dialogs/SuccessDialog";
import validateNewUserInputs from "../validation/validateNewUserInputs";
import { registerToApp } from "../api/authApiService";

function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  async function handleRegister(event) {
    event.preventDefault();
    if (!validateNewUserInputs(user, setErrors, t)) return;

    try {
      await registerToApp(user);
      navigate(`/login`);
      SuccessDialog({
        title: t("userRegisteredSuccessfully"),
      });
    } catch (error) {
      setErrors({
        form:
          error.response?.status === 400
            ? t("invalidData")
            : error.response?.status === 409
              ? t("userExists")
              : t("serverError"),
      });
    }
  }

  const formFields = [
    {
      name: "firstName",
      type: "text",
      placeholder: "enterFirstName",
      icon: <HiOutlineUser />,
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "enterLastName",
      icon: <HiOutlineUser />,
    },
    {
      name: "email",
      type: "email",
      placeholder: "enterEmail",
      icon: <MdEmail />,
    },
    {
      name: "password",
      type: "password",
      placeholder: "enterPassword",
      icon: <TbLockPassword />,
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "enterConfirmPassword",
      icon: <TbLockPassword />,
    },
  ];

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-full max-w-lg justify-center items-center bg-bg2 shadow-2xl p-10 rounded-2xl">
        <BigTitle text={t("register")} />
        <form onSubmit={handleRegister} className="flex flex-col w-full">
          {formFields.map(({ name, type, placeholder, icon }) => (
            <FormInput
              key={name}
              type={type}
              inputValue={user[name]}
              setInputValue={(value) =>
                setUser((prev) => ({ ...prev, [name]: value }))
              }
              inputName={t(name)}
              icon={icon}
              placeholder={t(placeholder)}
              error={errors[name]}
            />
          ))}
          <FormButton buttonName={t("register")} />
          {errors.form && (
            <p className="text-red-500 text-xxs md:text-sm text-center mt-2">
              {errors.form}
            </p>
          )}
        </form>
        <p className="mt-5">
          {t("haveAccount?")}{" "}
          <Link
            to={"/login"}
            className="cursor-pointer font-semibold text-primary hover:text-secondary transition duration-300"
          >
            {t("loginNow")}
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
