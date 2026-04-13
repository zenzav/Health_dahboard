import React, { useEffect, useState } from 'react';
import { Users, Stethoscope, UserRound, Wrench, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { departmentsAPI, staffAPI, doctorsAPI, patientsAPI, equipmentsAPI } from '../services/api';
import StatusBadge from '../components/common/StatusBadge';

const StatCard = ({ title, value, icon: Icon, color, trend, to }) => {
  const navigate = useNavigate();
  return (
    <div className="card flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(to)}>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500 truncate">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value ?? <span className="text-lg text-gray-400">Loading...</span>}</p>
        {trend && <p className="text-xs text-green-600 flex items-center gap-1 mt-0.5"><TrendingUp size={12} />{trend}</p>}
      </div>
    </div>
  );
};

export default function Overview() {
  const [data, setData] = useState({ patients: [], staff: [], doctors: [], equipments: [], departments: [] });
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [p, s, d, e, dept] = await Promise.all([
          patientsAPI.getAll(),
          staffAPI.getAll(),
          doctorsAPI.getAll(),
          equipmentsAPI.getAll(),
          departmentsAPI.getAll(),
        ]);
        setData({
          patients: p.data,
          staff: s.data,
          doctors: d.data,
          equipments: e.data,
          departments: dept.data,
        });
        setFilteredPatients(p.data);
      } catch (err) {
        console.error('Failed to fetch overview data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleDateFilter = async () => {
    try {
      const params = {};
      if (dateFilter.startDate) params.startDate = dateFilter.startDate;
      if (dateFilter.endDate) params.endDate = dateFilter.endDate;
      const res = await patientsAPI.getAll(params);
      setFilteredPatients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const clearFilter = async () => {
    setDateFilter({ startDate: '', endDate: '' });
    try {
      const res = await patientsAPI.getAll();
      setFilteredPatients(res.data);
    } catch (err) { console.error(err); }
  };

  // Group staff by department
  const staffByDept = data.departments.map((dept) => ({
    ...dept,
    members: data.staff.filter((s) => s.departmentId?._id === dept._id),
  })).filter((d) => d.members.length > 0);

  const activeDoctors = data.doctors.filter((d) => d.status === 'Active');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Patients" value={data.patients.length} icon={UserRound} color="bg-blue-500" trend="Registered patients" to="/patients" />
        <StatCard title="Total Staff" value={data.staff.length} icon={Users} color="bg-emerald-500" trend="Across all departments" to="/staff" />
        <StatCard title="Total Doctors" value={data.doctors.length} icon={Stethoscope} color="bg-violet-500" trend={`${activeDoctors.length} active`} to="/doctors" />
        <StatCard title="Total Equipments" value={data.equipments.length} icon={Wrench} color="bg-amber-500" trend="Managed equipment" to="/equipments" />
      </div>

      {/* Patient List with Date Filter */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="font-semibold text-gray-800">Patient List</h2>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="date"
              className="form-input py-1.5 text-xs w-36"
              value={dateFilter.startDate}
              onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
            />
            <span className="text-gray-400 text-xs">to</span>
            <input
              type="date"
              className="form-input py-1.5 text-xs w-36"
              value={dateFilter.endDate}
              onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
            />
            <button onClick={handleDateFilter} className="btn-primary py-1.5 text-xs">Filter</button>
            {(dateFilter.startDate || dateFilter.endDate) && (
              <button onClick={clearFilter} className="btn-secondary py-1.5 text-xs">Clear</button>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="table-th">#</th>
                <th className="table-th">Name</th>
                <th className="table-th">Age</th>
                <th className="table-th">Gender</th>
                <th className="table-th">Contact</th>
                <th className="table-th">Admission Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPatients.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No patients found</td></tr>
              ) : (
                filteredPatients.slice(0, 8).map((p, i) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                    <td className="table-td text-gray-400">{i + 1}</td>
                    <td className="table-td font-medium text-gray-800">{p.name}</td>
                    <td className="table-td">{p.age}</td>
                    <td className="table-td"><StatusBadge status={p.gender} /></td>
                    <td className="table-td">{p.contact}</td>
                    <td className="table-td">{p.admissionDate ? new Date(p.admissionDate).toLocaleDateString() : '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filteredPatients.length > 8 && (
          <p className="text-xs text-gray-400 text-center pt-3 border-t border-gray-50">
            Showing 8 of {filteredPatients.length} patients.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Doctors */}
        <div className="card">
          <h2 className="font-semibold text-gray-800 mb-4">Available Doctors</h2>
          {activeDoctors.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">No active doctors</p>
          ) : (
            <ul className="space-y-3">
              {activeDoctors.map((doc) => (
                <li key={doc._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center">
                      <Stethoscope size={16} className="text-violet-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-800">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.specialization}</p>
                    </div>
                  </div>
                  <StatusBadge status={doc.status} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Staff by Department */}
        <div className="card">
          <h2 className="font-semibold text-gray-800 mb-4">Staff by Department</h2>
          {staffByDept.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">No staff data</p>
          ) : (
            <ul className="space-y-3">
              {staffByDept.map((dept) => (
                <li key={dept._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Users size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-800">{dept.name}</p>
                      <p className="text-xs text-gray-500">
                        {dept.members.map((m) => m.name).join(', ').substring(0, 40)}
                        {dept.members.map((m) => m.name).join(', ').length > 40 ? '...' : ''}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    {dept.members.length}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
