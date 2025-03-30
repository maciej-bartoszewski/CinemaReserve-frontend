import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineUser } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import FormInput from "../components/form/FormInput";
import FormButton from "../components/form/FormButton";
import BigTitle from "../components/titles/BigTitle";
import SuccessDialog from "../components/dialogs/SuccessDialog";
import validateEditUserInputs from "../validation/validateEditUserInputs";
import { getUser, editUser } from "../api/usersApiService";
import { useAuth } from "../security/AuthProvider.jsx";

function Account() {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  async function fetchUserData() {
    try {
      console.log(userId);
      const response = await getUser(userId);
      setUser((prevUser) => ({ ...prevUser, ...response.data }));
    } catch (error) {
      console.error("Błąd pobierania danych użytkownika:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleEditUser(event) {
    event.preventDefault();
    if (!validateEditUserInputs(user, setErrors, t)) return;

    try {
      await editUser(userId, user);
      SuccessDialog({
        title: t("accountEditedSuccessfully"),
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
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col w-full max-w-lg justify-center items-center bg-bg2 shadow-2xl p-10 rounded-2xl">
          <BigTitle text={t("editAccount")} />
          <form onSubmit={handleEditUser} className="flex flex-col w-full">
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
            <FormButton buttonName={t("saveChanges")} />
            {errors.form && (
              <p className="text-red-500 text-xxs md:text-sm text-center mt-2">
                {errors.form}
              </p>
            )}
          </form>
        </div>
      )}
    </section>
  );
}

export default Account;
