import React, { useEffect, useState } from "react";
import axios from "axios";

const Payments = () => {

    const [payments, setPayments] = useState([]);
    const [filterType, setFilterType] = useState("all");

    const fetchPayments = async () => {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/payments`
        );
        setPayments(res.data);
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const filteredPayments = payments.filter(payment => {
        if (filterType !== "all" && payment.type !== filterType) return false;
        return true;
    })

    return (
        <div className="p-6">

            <h2 className="text-2xl font-bold mb-4">Payments</h2>

            <div className="flex gap-4 mb-4">
                <select
                    className="select select-bordered"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="issue">Issue Boost</option>
                    <option value="subscription">Subscription</option>
                </select>

              
            </div>
            
            <table className="table w-full border">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Transaction ID</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredPayments.map(payment => (
                        <tr key={payment._id}>
                            <td>{payment.email}</td>
                            <td className="capitalize">{payment.type}</td>
                            <td>${payment.amount / 100}</td>
                            <td className="text-xs">{payment.transactionId}</td>
                            <td>
                                {new Date(payment.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {filteredPayments.length === 0 && (
                <p className="text-center mt-4 text-gray-500">
                    No payments found
                </p>
            )}
        </div>
    );
};

export default Payments;
