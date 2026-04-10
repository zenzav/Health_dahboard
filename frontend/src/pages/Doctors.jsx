import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, Stethoscope, ToggleLeft, ToggleRight } from 'lucide-react';
import { doctorsAPI, departmentsAPI } from '../services/api';
import Modal from '../components/common/Modal';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';

const PAGE_SIZE = 8;
const EMPTY_FORM = { name: '', specialization: '', phone: '', departmentId: '', status: 'Active' };

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const [dRes, deptRes] = await Promise.all([doctorsAPI.getAll(), departmentsAPI.getAll()]);
      setDoctors(dRes.data);
      setDepartments(deptRes.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openCreate = () => { setEditItem(null); setForm(EMPTY_FORM); setError(''); setFieldErrors({}); setModalOpen(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({ name: item.name, specialization: item.specialization || '', phone: item.phone || '', departmentId: item.departmentId?._id || '', status: item.status });
    setError(''); setFieldErrors({});
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Doctor name is required';
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setSaving(true);
    setError(''); setFieldErrors({});
    try {
      if (editItem) {
        const res = await doctorsAPI.update(editItem._id, form);
        setDoctors((prev) => prev.map((d) => (d._id === editItem._id ? res.data : d)));
      } else {
        const res = await doctorsAPI.create(form);
        setDoctors((prev) => [res.data, ...prev]);
      }
      setModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save doctor');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await doctorsAPI.toggleStatus(id);
      setDoctors((prev) => prev.map((d) => (d._id === id ? res.data : d)));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await doctorsAPI.delete(id);
      setDoctors((prev) => prev.filter((d) => d._id !== id));
      setDeleteId(null);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Doctors</h2>
          <p className="text-sm text-gray-500">{doctors.length} total doctors</p>
        </div>
        <button onClick={openCreate} className="btn-primary"><Plus size={16} /> Add Doctor</button>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" className="form-input pl-9 py-1.5 text-sm" placeholder="Search doctors..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="table-th">#</th>
                <th className="table-th">Doctor Name</th>
                <th className="table-th">Specialization</th>
                <th className="table-th">Phone</th>
                <th className="table-th">Department</th>
                <th className="table-th">Status</th>
                <th className="table-th text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={7} className="text-center py-12"><div className="inline-block w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /></td></tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <Stethoscope size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-400 text-sm">{search ? 'No doctors match your search' : 'No doctors yet'}</p>
                  </td>
                </tr>
              ) : (
                paginated.map((doc, i) => (
                  <tr key={doc._id} className="hover:bg-gray-50 transition-colors">
                    <td className="table-td text-gray-400">{(page - 1) * PAGE_SIZE + i + 1}</td>
                    <td className="table-td font-medium text-gray-800">{doc.name}</td>
                    <td className="table-td text-gray-500">{doc.specialization || '—'}</td>
                    <td className="table-td text-gray-500">{doc.phone || '—'}</td>
                    <td className="table-td text-gray-500">{doc.departmentId?.name || '—'}</td>
                    <td className="table-td"><StatusBadge status={doc.status} /></td>
                    <td className="table-td text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleStatus(doc._id)}
                          title="Toggle Status"
                          className={`p-1.5 rounded-lg transition-colors ${doc.status === 'Active' ? 'hover:bg-green-50 text-green-600' : 'hover:bg-gray-100 text-gray-400'}`}
                        >
                          {doc.status === 'Active' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                        </button>
                        <button onClick={() => openEdit(doc)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => setDeleteId(doc._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={14} /></button>
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Doctor' : 'Add Doctor'}>
        <form onSubmit={handleSave} className="space-y-4">
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Doctor Name <span className="text-red-500">*</span></label>
              <input type="text" className={`form-input ${fieldErrors.name ? 'border-red-400' : ''}`} value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setFieldErrors((p) => ({ ...p, name: '' })); }} placeholder="Dr. Full Name" />
              {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
            </div>
            <div>
              <label className="form-label">Specialization</label>
              <input type="text" className="form-input" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} placeholder="e.g. Cardiologist" />
            </div>
            <div>
              <label className="form-label">Phone</label>
              <input type="tel" className="form-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" />
            </div>
            <div>
              <label className="form-label">Department</label>
              <select className="form-input" value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })}>
                <option value="">— Select Department —</option>
                {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Status</label>
              <select className="form-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
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
        <p className="text-gray-600 text-sm mb-6">Are you sure you want to remove this doctor?</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="btn-secondary">Cancel</button>
          <button onClick={() => handleDelete(deleteId)} className="btn-danger">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
