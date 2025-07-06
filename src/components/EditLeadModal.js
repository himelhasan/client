import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

import { toast } from 'react-toastify';

const EditLeadModal = ({ setShowEditModal, setLeads, lead }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (lead) {
      setFormData(lead);
    }
  }, [lead]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/leads/update/${lead._id}`, formData);
      toast.success('Lead updated successfully!');
      setLeads(prevLeads => prevLeads.map(l => l._id === lead._id ? { ...l, ...formData } : l));
      setShowEditModal(false);
    } catch (error) {
      toast.error('Failed to update lead.');
      console.error(error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={setShowEditModal}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogDescription>
            Make changes to the contact details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
            {Object.keys(formData).map(key => (
              <div key={key} className="grid grid-cols-4 items-center gap-4">
                <label htmlFor={key} className="text-right">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                </label>
                {typeof formData[key] === 'boolean' ? (
                  <Checkbox
                    id={key}
                    name={key}
                    checked={formData[key]}
                    onCheckedChange={(checked) => handleChange({ target: { name: key, value: checked, type: 'checkbox' } })}
                    className="col-span-3"
                  />
                ) : (
                  <Input
                    id={key}
                    name={key}
                    type="text"
                    value={formData[key] || ''}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLeadModal;