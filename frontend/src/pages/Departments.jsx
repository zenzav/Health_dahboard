import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, Building2 } from 'lucide-react';
import { departmentsAPI } from '../services/api';
import Modal from '../components/common/Modal';
import Pagination from '../components/common/Pagination';

const PAGE_SIZE = 8;
const EMPTY_FORM = { name: '', description: '' };

export default function Departments() {
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

  const fetchDepartments = useCallback(async () => {
    try {
      const res = await departmentsAPI.getAll();
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDepartments(); }, [fetchDepartments]);

  const filtered = departments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.description?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openCreate = () => { setEditItem(null); setForm(EMPTY_FORM); setError(''); setFieldErrors({}); setModalOpen(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ name: item.name, description: item.description || '' }); setError(''); setFieldErrors({}); setModalOpen(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Department name is required';
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setSaving(true);
    setError(''); setFieldErrors({});
    try {
      if (editItem) {
        const res = await departmentsAPI.update(editItem._id, form);
        setDepartments((prev) => prev.map((d) => (d._id === editItem._id ? res.data : d)));
      } else {
        const res = await departmentsAPI.create(form);
        setDepartments((prev) => [res.data, ...prev]);
      }
      setModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save department');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await departmentsAPI.delete(id);
      setDepartments((prev) => prev.filter((d) => d._id !== id));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Departments</h2>
          <p className="text-sm text-gray-500">{departments.length} total departments</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} /> Add Department
        </button>
      </div>

      {/* Table Card */}
      <div className="card p-0 overflow-hidden">
        {/* Search */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="form-input pl-9 py-1.5 text-sm"
              placeholder="Search departments..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="table-th">#</th>
                <th className="table-th">Department Name</th>
                <th className="table-th">Description</th>
                <th className="table-th">Created Date</th>
                <th className="table-th text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-12"><div className="inline-block w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /></td></tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <Building2 size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-400 text-sm">{search ? 'No departments match your search' : 'No departments yet'}</p>
                  </td>
                </tr>
              ) : (
                paginated.map((dept, i) => (
                  <tr key={dept._id} className="hover:bg-gray-50 transition-colors">
                    <td className="table-td text-gray-400">{(page - 1) * PAGE_SIZE + i + 1}</td>
                    <td className="table-td font-medium text-gray-800">{dept.name}</td>
                    <td className="table-td text-gray-500">{dept.description || '—'}</td>
                    <td className="table-td text-gray-500">{new Date(dept.createdAt).toLocaleDateString()}</td>
                    <td className="table-td text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(dept)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => setDeleteId(dept._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
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

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Department' : 'Add Department'}>
        <form onSubmit={handleSave} className="space-y-4">
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
          <div>
            <label className="form-label">Department Name <span className="text-red-500">*</span></label>
            <input type="text" className={`form-input ${fieldErrors.name ? 'border-red-400' : ''}`} value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setFieldErrors((p) => ({ ...p, name: '' })); }} placeholder="e.g. Cardiology" />
            {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
          </div>
          <div>
            <label className="form-label">Description</label>
            <textarea className="form-input resize-none" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description of the department" />
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

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete" size="sm">
        <p className="text-gray-600 text-sm mb-6">Are you sure you want to delete this department? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="btn-secondary">Cancel</button>
          <button onClick={() => handleDelete(deleteId)} className="btn-danger">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
