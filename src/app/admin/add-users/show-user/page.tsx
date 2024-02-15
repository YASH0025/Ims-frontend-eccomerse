/* eslint-disable @next/next/no-img-element */
"use client";
import { AiOutlineDelete, AiOutlineUser } from "react-icons/ai";
import { Transition } from "@headlessui/react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteUser,
  getUsers,
  setUserRole,
} from "@/app/services/admin-activity.service";
import { useState, useEffect } from "react";

const ShowUsersPage = () => {
  const [users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredRowId, setHoveredRowId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUsers();
        console.log("response,", res.users);
        if (Array.isArray(res)) {
          setUsers(res);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = (userId: any) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const deletedUser = await deleteUser(userId);
              setUsers((prevUsers: any[]) =>
                prevUsers.filter((user) => user._id !== userId)
              );
              console.log(deletedUser);
              alert("User deleted successfully.");
            } catch (error) {
              console.error("Error deleting user:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleRoleToggle = (userId: string, role: any | number) => {
    confirmAlert({
      title: "Confirm Role Assignment",
      message: `Are you sure you want to assign the role '${role}' to this user?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              console.log(userId, role);
              const setedRole = await setUserRole(userId, role);
              console.log("setedRole: ", setedRole);
              setUsers((prevUsers: any[]) =>
                prevUsers.map((user) =>
                  user._id === userId
                    ? { ...user, roleId: { roleName: role } }
                    : user
                )
              );
            } catch (error) {
              console.error("Error updating role:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4 text-blue-600">
        User Management
      </h1>
      <div className="overflow-x-auto">
        <Transition
          show={!isLoading}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap bg-white shadow-md rounded-lg overflow-hidden sm:shadow-lg">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left bg-blue-400 text-white">
                    Icon
                  </th>
                  <th className="px-4 py-2 text-left bg-blue-400 text-white">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left bg-blue-400 text-white">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left bg-blue-400 text-white">
                    Number
                  </th>
                  <th className="px-4 py-2 text-left bg-blue-400 text-white">
                    City
                  </th>
                  <th className="px-4 py-2 text-left bg-blue-400 text-white">
                    State
                  </th>
                  <th className="px-4 py-2 text-left bg-blue-400 text-white">
                    Role
                  </th>
                  <th className="px-4 py-2 text-left bg-blue-400 text-white">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {users.map((user: any) => (
                  <tr
                    key={user._id}
                    className="hover:bg-blue-100 blur-row"
                    onMouseEnter={() => setHoveredRowId(user._id)}
                    onMouseLeave={() => setHoveredRowId(null)}
                  >
                    <td className="border px-4 py-2">
                      {" "}
                      <AiOutlineUser className="text-blue-600" />
                    </td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.number || "N/A"}</td>
                    <td className="border px-4 py-2">{user.address.city}</td>
                    <td className="border px-4 py-2">{user.address.state}</td>

                    <td className="border px-4 py-2">
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          id={`user_${user._id}`}
                          name={`role_${user._id}`}
                          value="user"
                          checked={user.roleId.roleName === "user"}
                          onChange={() => handleRoleToggle(user._id, "user")}
                        />
                        <label htmlFor={`user_${user._id}`}>User</label>
                        <input
                          type="radio"
                          id={`admin_${user._id}`}
                          name={`role_${user._id}`}
                          value="admin"
                          checked={user.roleId.roleName === "admin"}
                          onChange={() => handleRoleToggle(user._id, "admin")}
                        />
                        <label htmlFor={`admin_${user._id}`}>Admin</label>
                      </div>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="btn bg-red-500 hover:bg-red-600"
                      >
                        <AiOutlineDelete
                          style={{
                            fontSize: "1.5rem",
                            color: "white",
                            filter: "drop-shadow(0 0 0.75rem red)",
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Transition>
      </div>
      <Transition
        show={isLoading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex justify-center items-center h-32">
          <div className="spinner-border text-gray-600 h-12 w-12" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default ShowUsersPage;
