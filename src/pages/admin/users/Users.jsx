import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getUsers,
  searchUsers,
  deleteUser,
} from "../../../api/usersApiService";
import AddButton from "../../../components/admin/AddButton";
import EditButton from "../../../components/admin/EditButton";
import DeleteButton from "../../../components/admin/DeleteButton";
import SuccessDialog from "../../../components/dialogs/SuccessDialog";
import ErrorDialog from "../../../components/dialogs/ErrorDialog";
import ConfirmDialog from "../../../components/dialogs/confirmDialog";
import Title from "../../../components/titles/Title";
import Table from "../../../components/admin/Table";
import Pagination from "../../../components/pagination/Pagination";
import SearchBar from "../../../components/admin/SearchBar.jsx";
import Loading from "../../../components/common/Loading.jsx";
import NotFoundComponent from "../../../components/common/NotFoundComponent.jsx";

function Users() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [page, size, searchQuery]);

  async function fetchUsers() {
    try {
      setLoading(true);
      let response;
      if (searchQuery.trim()) {
        setPage(0);
        response = await searchUsers(searchQuery, page, size);
      } else {
        response = await getUsers(page, size);
      }
      setUsers(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Błąd pobierania użytkowników:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(userId) {
    const result = await ConfirmDialog({
      title: t("confirmDeleteTitle"),
      text: t("confirmDeleteText"),
      confirmText: t("confirmDeleteYes"),
      cancelText: t("confirmDeleteNo"),
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(userId);
        fetchUsers();
        SuccessDialog({
          title: t("deleteSuccessTitle"),
          text: t("deleteUserSuccessText"),
        });
      } catch (error) {
        ErrorDialog({
          title: t("deleteErrorTitle"),
          text: t("deleteErrorText"),
        });
      }
    }
  }

  const columns = [
    t("id"),
    t("firstName"),
    t("lastName"),
    t("email"),
    t("role"),
  ];
  const mobileVisibleIds = [0, 3];

  const renderRowActions = (user) => (
    <>
      <EditButton link={`/users/edit/${user.userId}`} text={t("edit")} />
      <DeleteButton
        action={() => handleDelete(user.userId)}
        text={t("delete")}
      />
    </>
  );

  return (
    <section className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2 md:mb-3 lg:mb-4">
        <Title text={t("userList")} />
        <SearchBar
          className={"hidden lg:flex w-1/3 lg:w-1/2 mx-2"}
          placeholder={t("searchUserPlaceholder")}
          isAdminSearch={true}
          onSearch={setSearchQuery}
        />
        <AddButton link={"/users/add"} text={t("addUser")} />
      </div>
      <div className="flex w-full justify-center lg:hidden mb-2">
        <SearchBar
          className={"w-full md:w-2/3"}
          placeholder={t("searchUserPlaceholder")}
          isAdminSearch={true}
          onSearch={setSearchQuery}
        />
      </div>
      {loading ? (
        <Loading />
      ) : users.length > 0 ? (
        <>
          <Table
            headers={columns}
            rows={users}
            renderActions={renderRowActions}
            mobileVisibleIds={mobileVisibleIds}
          />
          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        <NotFoundComponent text={t("noUsersFound")} />
      )}
    </section>
  );
}

export default Users;
