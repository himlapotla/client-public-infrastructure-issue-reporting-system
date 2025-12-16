import axios from "axios";
import { useState } from "react";

const EditModal = ({ issue, onClose, onUpdate }) => {
    const [form, setForm] = useState(issue);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(
            `${import.meta.env.VITE_API_URL}/reports/${issue._id}`,
            form
        );
        onUpdate(form);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-96">
                <input
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    className="input w-full"
                />

                <textarea
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    className="input w-full"
                />

                <button className="btn bg-blue-600 text-white w-full">
                    Update
                </button>

                <button onClick={onClose} type="button" className="btn w-full mt-2">
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditModal;
