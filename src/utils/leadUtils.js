import axios from 'axios';
import { toast } from 'react-toastify';

export const handleStatusChange = (leadId, newStatusValue, setShowNewStatusInput, setNewStatus, setLeads) => {
  if (newStatusValue === 'Create New Label') {
    setShowNewStatusInput(true);
    setNewStatus(''); // Clear previous input
  } else {
    setShowNewStatusInput(false);
    // Update lead status in the backend
    axios.post(`http://localhost:5000/leads/update/${leadId}`, { status: newStatusValue })
      .then(response => {
        toast.success('Lead status updated successfully!');
        // Update the leads state to reflect the change
        setLeads(prevLeads =>
          prevLeads.map(lead =>
            lead._id === leadId ? { ...lead, status: newStatusValue } : lead
          )
        );
      })
      .catch(error => {
        toast.error('Failed to update lead status.');
        console.error(error);
      });
  }
};

export const handleNewStatusSubmit = (leadId, newStatus, setNewStatus, setShowNewStatusInput, setLeads) => {
  if (newStatus.trim() === '') {
    toast.error('New status cannot be empty.');
    return;
  }
  // Update lead status with the new custom status
  axios.post(`http://localhost:5000/leads/update/${leadId}`, { status: newStatus.trim() })
    .then(response => {
      toast.success('New status added and lead updated successfully!');
      // Update the leads state to reflect the change
      setLeads(prevLeads =>
        prevLeads.map(lead =>
          lead._id === leadId ? { ...lead, status: newStatus.trim() } : lead
        )
      );
      setShowNewStatusInput(false);
      setNewStatus('');
    })
    .catch(error => {
      toast.error('Failed to add new status and update lead.');
      console.error(error);
    });
};

export const deleteLead = (id, currentPage, searchTerm, setLeads, setTotalPages) => {
  axios.delete('http://localhost:5000/leads/'+id)
    .then(response => {
      toast.success('Lead deleted successfully!');
      // Re-fetch leads after deletion to update the list
      axios.get(`http://localhost:5000/leads?page=${currentPage}&search=${searchTerm}`)
        .then(response => {
          setLeads(response.data.leads || []);
          setTotalPages(Math.ceil(response.data.totalLeads / 100));
        })
        .catch((error) => {
          toast.error('Failed to fetch leads after deletion.');
          console.error(error);
          setLeads([]);
        });
    })
    .catch(error => {
      toast.error('Failed to delete lead.');
      console.error(error);
    });
};

export const toggleLeadSelection = (leadId, setSelectedLeads) => {
  setSelectedLeads(prev =>
    prev.includes(leadId)
      ? prev.filter(id => id !== leadId)
      : [...prev, leadId]
  );
};

export const selectAllLeads = (leads, setSelectedLeads, selectedLeadsLength) => {
  setSelectedLeads(
    selectedLeadsLength === leads.length
      ? []
      : leads.map(l => l._id)
  );
};
