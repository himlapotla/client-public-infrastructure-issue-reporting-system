import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUser = () => {

    const [users, setUsers] = useState([]);

    /* ================= FETCH USERS ================= */
    const fetchUsers = async () => {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/citizens`
        );
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    /* ================= BLOCK / UNBLOCK ================= */
    const handleBlockToggle = async (user) => {
        const action = user.isBlock ? "Unblock" : "Block";

        const result = await Swal.fire({
            title: `${action} User?`,
            text: `Are you sure you want to ${action.toLowerCase()} this user?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: `Yes, ${action}`
        });

        if (result.isConfirmed) {
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/block-user/${user._id}`,
                { isBlock: !user.isBlock }
            );

            // update UI instantly
            setUsers(users.map(u =>
                u._id === user._id ? { ...u, isBlock: !u.isBlock } : u
            ));

            Swal.fire(
                "Success",
                `User ${action.toLowerCase()}ed successfully`,
                "success"
            );
        }
    };

    return (
        <div className="p-6">

            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

            <table className="table w-full border">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subscription</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name || "N/A"}</td>
                            <td>{user.email}</td>

                            <td>
                                {user.isPremium
                                    ? <span className="badge badge-success">Premium</span>
                                    : <span className="badge badge-ghost">Free</span>
                                }
                            </td>

                            <td>
                                {user.isBlock
                                    ? <span className="badge badge-error">Blocked</span>
                                    : <span className="badge badge-success">Active</span>
                                }
                            </td>

                            <td>
                                <button
                                    className={`btn btn-sm ${user.isBlock ? "btn-success" : "btn-error"}`}
                                    onClick={() => handleBlockToggle(user)}
                                >
                                    {user.isBlock ? "Unblock" : "Block"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default ManageUser;
