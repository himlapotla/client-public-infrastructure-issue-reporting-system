import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LatestCard from './LatestCard';

const LatestIssue = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/reports/latest-resolvedd`)
      .then(res => {
        setIssues(res.data);
        console.log(res.data);
        
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section className="my-12">
      <h2 className="text-center py-8 text-3xl font-bold mb-6">
        Latest Resolved Issues
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map(issue => (
          <LatestCard issue={issue}> </LatestCard>
        ))}
      </div>
    </section>
  );
}

export default LatestIssue