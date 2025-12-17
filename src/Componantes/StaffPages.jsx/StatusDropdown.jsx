const StatusDropdown = ({ report, changeStatus }) => {
  const statusFlow = {
    pending: ["in-progress"],
    "in-progress": ["working"],
    working: ["resolved"],
    resolved: ["closed"],
    closed: []
  };

  const allowed = statusFlow[report.status] || [];

  if (allowed.length === 0) {
    return "No Action";
  }

  return (
    <select
      onChange={e => changeStatus(report._id, e.target.value)}
      defaultValue=""
    >
      <option value="" disabled>
        Change Status
      </option>
      {allowed.map(status => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default StatusDropdown;
