import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineUser } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaCrown } from "react-icons/fa";
import FormInput from "../../../components/form/FormInput";
import FormButton from "../../../components/form/FormButton";
import BigTitle from "../../../components/titles/BigTitle";
import SuccessDialog from "../../../components/dialogs/SuccessDialog";
import validateEditUserInputs from "../../../validation/validateEditUserInputs";
import { getUser, editUser } from "../../../api/usersApiService";

function EditUser() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
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
  }, [id]);

  async function fetchUserData() {
    try {
      const response = await getUser(id);
      setUser((prevUser) => ({ ...prevUser, ...response.data }));
    } catch (error) {
      console.error("Błąd pobierania danych użytkownika:", error);
    }
  }

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleEditUser(event) {
    event.preventDefault();
    if (!validateEditUserInputs(user, setErrors, t)) return;

    console.log(user);
    try {
      await editUser(id, user);
      navigate(`/users`);
      SuccessDialog({
        title: t("userEditedSuccessfully"),
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
        <BigTitle text={t("editUser")} />
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
          <div className="flex flex-col">
            <label htmlFor="role" className="flex gap-1 items-center">
              <FaCrown />
              {t("role")}
            </label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="border-3 p-2 border-bg1 bg-bg1 outline-0 rounded-xl mb-2 transition duration-300 placeholder-gray-400 focus:border-primary hover:border-primary"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <FormButton buttonName={t("saveChanges")} />
          {errors.form && (
            <p className="text-red-500 text-xxs md:text-sm text-center mt-2">
              {errors.form}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default EditUser;
