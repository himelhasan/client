import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TooltipProvider } from '@radix-ui/react-tooltip';

import ContactsTab from '../components/ContactsTab/ContactsTab';
import CampaignsTab from '../components/CampaignsTab/CampaignsTab';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import DashboardNavigation from '../components/DashboardNavigation/DashboardNavigation';

import { handleStatusChange, handleNewStatusSubmit, deleteLead, toggleLeadSelection, selectAllLeads } from '../utils/leadUtils';

import AddLeadModal from '../components/AddLeadModal';
import EditLeadModal from '../components/EditLeadModal';
import MessageModal from '../components/MessageModal';
import ImportCsvModal from '../components/ImportCsvModal';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  const [leads, setLeads] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageType, setMessageType] = useState('email'); // 'email' or 'whatsapp'
  const [showImportCsvModal, setShowImportCsvModal] = useState(false);
  const [showNewStatusInput, setShowNewStatusInput] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    // Dummy data for campaigns
    setCampaigns([
      {
        id: 1,
        type: 'email',
        subject: 'Welcome to Our Service',
        content: 'Email content...',
        recipients: 120,
        status: 'sent',
        sentAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
        openRate: 75,
        responseRate: 15
      },
      {
        id: 2,
        type: 'whatsapp',
        subject: 'Product Demo Follow-up',
        content: 'WhatsApp message content...',
        recipients: 45,
        status: 'sent',
        sentAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        openRate: 90,
        responseRate: 30
      },
      {
        id: 3,
        type: 'email',
        subject: 'Special Offer for Qualified Leads',
        content: 'Special offer email content...',
        recipients: 80,
        status: 'sent',
        sentAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
        openRate: 60,
        responseRate: 10
      },
    ]);
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/leads?page=${currentPage}&search=${searchTerm}`)
      .then(response => {
        setLeads(response.data.leads || []);
        setTotalPages(Math.ceil(response.data.totalLeads / 100));
      })
      .catch((error) => {
        console.log(error);
        setLeads([]);
      })
  }, [currentPage, searchTerm]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <DashboardNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'contacts' && (
            <ContactsTab
              leads={leads}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedLeads={selectedLeads}
              toggleLeadSelection={(leadId) => toggleLeadSelection(leadId, setSelectedLeads)}
              selectAllLeads={() => selectAllLeads(leads, setSelectedLeads, selectedLeads.length)}
              setShowImportCsvModal={setShowImportCsvModal}
              setShowContactModal={setShowContactModal}
              setMessageType={setMessageType}
              setShowMessageModal={setShowMessageModal}
              setEditingLead={setEditingLead}
              setShowEditModal={setShowEditModal}
              deleteLead={(id) => deleteLead(id, currentPage, searchTerm, setLeads, setTotalPages)}
              handleStatusChange={(leadId, value) => handleStatusChange(leadId, value, setShowNewStatusInput, setNewStatus, setLeads)}
              showNewStatusInput={showNewStatusInput}
              newStatus={newStatus}
              setNewStatus={setNewStatus}
              handleNewStatusSubmit={(leadId) => handleNewStatusSubmit(leadId, newStatus, setNewStatus, setShowNewStatusInput, setLeads)}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
          {activeTab === 'campaigns' && (
            <CampaignsTab
              campaigns={campaigns}
              setShowMessageModal={setShowMessageModal}
            />
          )}
        </div>

        {showContactModal && <AddLeadModal setShowContactModal={setShowContactModal} setLeads={setLeads} />}
        {showEditModal && <EditLeadModal setShowEditModal={setShowEditModal} setLeads={setLeads} lead={editingLead} />}
        {showMessageModal && <MessageModal setShowMessageModal={setShowMessageModal} messageType={messageType} setMessageType={setMessageType} selectedLeads={selectedLeads} />}
        {showImportCsvModal && <ImportCsvModal onClose={() => setShowImportCsvModal(false)} onImportSuccess={() => {
          setCurrentPage(1);
          axios.get('http://localhost:5000/leads?page=1')
            .then(response => {
              setLeads(response.data.leads || []);
              setTotalPages(Math.ceil(response.data.totalLeads / 100));
            })
            .catch((error) => {
              console.log(error);
              setLeads([]);
            })
        }} />}
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;