import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageStaff = () => {

    const [staffs, setStaffs] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [error, setError] = useState("");

    const fetchStaffs = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/staff`);
        setStaffs(res.data);
    };

    useEffect(() => {
        fetchStaffs();
    }, []);

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        if (!image) return;

        const formData = new FormData();
        formData.append("image", image);

        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
            formData
        );

        setImageURL(res.data.data.url);
    };

    const handleAddStaff = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const pass = form.password.value;

        if (!imageURL) {
            setError("Please upload image");
            return;
        }

        await axios.post(`${import.meta.env.VITE_API_URL}/create-staff`, {
            name,
            email,
            phone,
            pass,
            photoURL: imageURL
        });

        Swal.fire("Success", "Staff added successfully", "success");

        setOpenAdd(false);
        setImageURL("");
        fetchStaffs();
        form.reset();
    };

    const openEditModal = (staff) => {
        setSelectedStaff(staff);
        setImageURL(staff.photoURL);
        setOpenEdit(true);
    };

    
    const handleUpdateStaff = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;

        await axios.patch(
            `${import.meta.env.VITE_API_URL}/update-staff/${selectedStaff._id}`,
            { name, phone, photoURL: imageURL }
        );

        Swal.fire("Updated!", "Staff updated successfully", "success");

        setOpenEdit(false);
        fetchStaffs();
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This staff will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            await axios.delete(`${import.meta.env.VITE_API_URL}/delete-staff/${id}`);
            setStaffs(staffs.filter(staff => staff._id !== id));
            Swal.fire("Deleted!", "Staff has been removed.", "success");
        }
    };

    return (
        <div className="p-6">

            <button className="btn bg-emerald-400 text-white mb-4" onClick={() => setOpenAdd(true)}>
                Add Staff
            </button>

            <table className="table w-full ">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {staffs.map(staff => (
                        <tr key={staff._id}>
                            <td>
                                <img src={staff.photoURL} className="w-12 h-12 rounded-full" />
                            </td>
                            <td>{staff.name}</td>
                            <td>{staff.email}</td>
                            <td>{staff.phone}</td>
                            <td className="space-x-2">
                                <button
                                    className="btn btn-sm btn-warning"
                                    onClick={() => openEditModal(staff)}
                                >
                                    Update
                                </button>

                                <button
                                    className="btn btn-sm btn-error"
                                    onClick={() => handleDelete(staff._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

           
            {openAdd && (
                <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-96 relative">
                        <h2 className="text-xl font-bold mb-4">Add Staff</h2>

                        <form onSubmit={handleAddStaff} className="space-y-3">
                            <input name="name" placeholder="Name" className="input input-bordered w-full" required />
                            <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
                            <input name="phone" placeholder="Phone" className="input input-bordered w-full" required />
                            <input type="file" className="input" onChange={handleImageUpload} />
                            <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />

                            {error && <p className="text-red-500">{error}</p>}

                            <button className="btn btn-primary w-full">Save</button>
                        </form>

                        <button className="absolute top-2 right-2" onClick={() => setOpenAdd(false)}>close</button>
                    </div>
                </div>
            )}

            {openEdit && (
                <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-96 relative">
                        <h2 className="text-xl font-bold mb-4">Update Staff</h2>

                        <form onSubmit={handleUpdateStaff} className="space-y-3">
                            <input
                                name="name"
                                defaultValue={selectedStaff.name}
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                name="phone"
                                defaultValue={selectedStaff.phone}
                                className="input input-bordered w-full"
                                required
                            />

                            <input type="file" onChange={handleImageUpload} />

                            <button className="btn btn-warning w-full">Update</button>
                        </form>

                        <button className="absolute top-2 right-2" onClick={() => setOpenEdit(false)}>close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageStaff;
