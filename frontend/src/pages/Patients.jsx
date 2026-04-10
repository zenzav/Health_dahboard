import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, UserRound, Filter, X } from 'lucide-react';
import { patientsAPI } from '../services/api';
import Modal from '../components/common/Modal';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';

const PAGE_SIZE = 8;
const EMPTY_FORM = { name: '', age: '', gender: 'Male', contact: '', admissionDate: '', medicineDetails: '' };

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const fetchPatients = useCallback(async (params = {}) => {
    try {
      const res = await patientsAPI.getAll(params);
      setPatients(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPatients(); }, [fetchPatients]);

  const handleDateFilter = () => {
    const params = {};
    if (dateFilter.startDate) params.startDate = dateFilter.startDate;
    if (dateFilter.endDate) params.endDate = dateFilter.endDate;
    fetchPatients(params);
    setPage(1);
  };

  const clearDateFilter = () => {
    setDateFilter({ startDate: '', endDate: '' });
    fetchPatients();
    setPage(1);
  };

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.contact?.includes(search)
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openCreate = () => { setEditItem(null); setForm(EMPTY_FORM); setError(''); setFieldErrors({}); setModalOpen(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      name: item.name,
      age: item.age || '',
      gender: item.gender || 'Male',
      contact: item.contact || '',
      admissionDate: item.admissionDate ? item.admissionDate.split('T')[0] : '',
      medicineDetails: item.medicineDetails || '',
    });
    setError(''); setFieldErrors({});
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Patient name is required';
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setSaving(true);
    setError(''); setFieldErrors({});
    try {
      if (editItem) {
        const res = await patientsAPI.update(editItem._id, form);
        setPatients((prev) => prev.map((p) => (p._id === editItem._id ? res.data : p)));
      } else {
        const res = await patientsAPI.create(form);
        setPatients((prev) => [res.data, ...prev]);
      }
      setModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save patient');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await patientsAPI.delete(id);
      setPatients((prev) => prev.filter((p) => p._id !== id));
      setDeleteId(null);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Patients</h2>
          <p className="text-sm text-gray-500">{patients.length} total patients</p>
        </div>
        <button onClick={openCreate} className="btn-primary"><Plus size={16} /> Add Patient</button>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" className="form-input pl-9 py-1.5 text-sm" placeholder="Search patients..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-gray-400" />
            <input type="date" className="form-input py-1.5 text-xs w-36" value={dateFilter.startDate} onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })} />
            <span className="text-gray-400 text-xs">to</span>
            <input type="date" className="form-input py-1.5 text-xs w-36" value={dateFilter.endDate} onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })} />
            <button onClick={handleDateFilter} className="btn-primary py-1.5 text-xs">Apply</button>
            {(dateFilter.startDate || dateFilter.endDate) && (
              <button onClick={clearDateFilter} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={14} /></button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="table-th">#</th>
                <th className="table-th">Patient Name</th>
                <th className="table-th">Age</th>
                <th className="table-th">Gender</th>
                <th className="table-th">Contact</th>
                <th className="table-th">Admission Date</th>
                <th className="table-th">Medicine Details</th>
                <th className="table-th text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={8} className="text-center py-12"><div className="inline-block w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /></td></tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <UserRound size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-400 text-sm">{search ? 'No patients match your search' : 'No patients yet'}</p>
                  </td>
                </tr>
              ) : (
                paginated.map((p, i) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                    <td className="table-td text-gray-400">{(page - 1) * PAGE_SIZE + i + 1}</td>
                    <td className="table-td font-medium text-gray-800">{p.name}</td>
                    <td className="table-td">{p.age ?? '—'}</td>
                    <td className="table-td"><StatusBadge status={p.gender} /></td>
                    <td className="table-td text-gray-500">{p.contact || '—'}</td>
                    <td className="table-td text-gray-500">{p.admissionDate ? new Date(p.admissionDate).toLocaleDateString() : '—'}</td>
                    <td className="table-td text-gray-500 max-w-[200px] truncate" title={p.medicineDetails}>{p.medicineDetails || '—'}</td>
                    <td className="table-td text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => setDeleteId(p._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Patient' : 'Add Patient'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Patient Name <span className="text-red-500">*</span></label>
              <input type="text" className={`form-input ${fieldErrors.name ? 'border-red-400' : ''}`} value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setFieldErrors((p) => ({ ...p, name: '' })); }} placeholder="Full name" />
              {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
            </div>
            <div>
              <label className="form-label">Age</label>
              <input type="number" className="form-input" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="Age" min={0} max={150} />
            </div>
            <div>
              <label className="form-label">Gender</label>
              <select className="form-input" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="form-label">Contact Number</label>
              <input type="tel" className="form-input" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="Phone number" />
            </div>
            <div>
              <label className="form-label">Admission Date</label>
              <input type="date" className="form-input" value={form.admissionDate} onChange={(e) => setForm({ ...form, admissionDate: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="form-label">Medicine Details</label>
            <textarea className="form-input resize-none" rows={3} value={form.medicineDetails} onChange={(e) => setForm({ ...form, medicineDetails: e.target.value })} placeholder="Prescribed medicines, dosage, etc." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
              {saving ? 'Saving...' : editItem ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete" size="sm">
        <p className="text-gray-600 text-sm mb-6">Are you sure you want to remove this patient record?</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="btn-secondary">Cancel</button>
          <button onClick={() => handleDelete(deleteId)} className="btn-danger">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
