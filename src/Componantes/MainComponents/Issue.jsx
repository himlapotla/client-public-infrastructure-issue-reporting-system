import React, { useEffect, useState } from "react";
import axios from "axios";
import IssueCard from "./IssueCard";

const Issue = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/reports`)
      .then(res => {
        setReports(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (reports.length === 0) {
    return <p className="text-center mt-10">No issues found</p>;
  }

  return (
    <div className="w-11/12 mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map(report => (
        <IssueCard key={report._id} report={report} />
      ))}
    </div>
  );
};

export default Issue;
