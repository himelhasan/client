import React from 'react';
import { Mail, MessageSquare, Upload, Users, Send, Filter, Search, Plus, Edit3, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Select, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectContent } from '../ui/select';
import TruncatedCell from '../TruncatedCell';

const ContactsTab = ({
  leads,
  searchTerm,
  setSearchTerm,
  selectedLeads,
  setSelectedLeads,
  toggleLeadSelection,
  selectAllLeads,
  setShowImportCsvModal,
  setShowContactModal,
  setMessageType,
  setShowMessageModal,
  setEditingLead,
  setShowEditModal,
  deleteLead,
  handleStatusChange,
  showNewStatusInput,
  newStatus,
  setNewStatus,
  handleNewStatusSubmit,
  currentPage,
  totalPages,
  setCurrentPage
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">Contacts</h2>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {leads.length} total
          </span>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => setShowImportCsvModal(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button
            onClick={() => setShowContactModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Bulk actions */}
      {selectedLeads.length > 0 && (
        <div className="flex items-center justify-between bg-blue-50 px-4 py-3 rounded-lg">
          <span className="text-sm text-blue-700">
            {selectedLeads.length} contact(s) selected
          </span>
          <div className="flex space-x-2">
            <Button
              onClick={() => {
                setMessageType('email');
                setShowMessageModal(true);
              }}
            >
              <Mail className="w-4 h-4 mr-1" />
              Email
            </Button>
            <Button
              onClick={() => {
                setMessageType('whatsapp');
                setShowMessageModal(true);
              }}
              variant="secondary"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              WhatsApp
            </Button>
          </div>
        </div>
      )}

      {/* Contacts table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedLeads.length === leads.length && leads.length > 0}
                  onCheckedChange={() => selectAllLeads(leads, setSelectedLeads, selectedLeads.length)}
                />
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
              <TableHead className="w-[150px]">Status</TableHead>
              <TableHead className="w-[150px]">Status</TableHead>
              <TableHead className="w-[150px]">First Name</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="w-[150px]">Phone</TableHead>
              <TableHead className="w-[150px]">First Phone</TableHead>
              <TableHead className="w-[150px]">Work Direct Phone</TableHead>
              <TableHead className="w-[150px]">Mobile Phone</TableHead>
              <TableHead className="w-[150px]">Corporate Phone</TableHead>
              <TableHead className="w-[150px]">Company Phone</TableHead>
              <TableHead className="w-[200px]">Company</TableHead>
              <TableHead className="w-[200px]">Person Linkedin Url</TableHead>
              <TableHead className="w-[200px]">Website</TableHead>
              <TableHead className="w-[200px]">Company Linkedin Url</TableHead>
              <TableHead className="w-[200px]">Facebook Url</TableHead>
              <TableHead className="w-[200px]">Twitter Url</TableHead>
              <TableHead className="w-[150px]">Title</TableHead>
              <TableHead className="w-[150px]">Email Status</TableHead>
              <TableHead className="w-[150px]">Seniority</TableHead>
              <TableHead className="w-[150px]">Departments</TableHead>
              <TableHead className="w-[150px]">Other Phone</TableHead>
              <TableHead className="w-[150px]">Employees</TableHead>
              <TableHead className="w-[150px]">Industry</TableHead>
              <TableHead className="w-[150px]">Keywords</TableHead>
              <TableHead className="w-[150px]">City</TableHead>
              <TableHead className="w-[150px]">State</TableHead>
              <TableHead className="w-[150px]">Country</TableHead>
              <TableHead className="w-[200px]">Company Address</TableHead>
              <TableHead className="w-[150px]">Company City</TableHead>
              <TableHead className="w-[150px]">Company State</TableHead>
              <TableHead className="w-[150px]">Company Country</TableHead>
              <TableHead className="w-[200px]">SEO Description</TableHead>
              <TableHead className="w-[150px]">Technologies</TableHead>
              <TableHead className="w-[150px]">Annual Revenue</TableHead>
              <TableHead className="w-[150px]">Total Funding</TableHead>
              <TableHead className="w-[150px]">Latest Funding</TableHead>
              <TableHead className="w-[150px]">Latest Funding Amount</TableHead>
              <TableHead className="w-[150px]">Last Raised At</TableHead>
              <TableHead className="w-[150px]">Stage</TableHead>
              <TableHead className="w-[150px]">Last Contacted</TableHead>
              <TableHead className="w-[150px]">Home Phone</TableHead>
              <TableHead className="w-[150px]">Subsidiary of</TableHead>
              <TableHead className="w-[150px]">Email Sent</TableHead>
              <TableHead className="w-[150px]">Email Open</TableHead>
              <TableHead className="w-[150px]">Email Bounced</TableHead>
              <TableHead className="w-[150px]">Replied</TableHead>
              <TableHead className="w-[150px]">Demoed</TableHead>
              <TableHead className="w-[200px]">Number of Retail Locations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedLeads.includes(lead._id)}
                    onCheckedChange={() => toggleLeadSelection(lead._id, setSelectedLeads)}
                  />
                </TableCell>
                <TableCell className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (lead.email) {
                        setMessageType('email');
                        setShowMessageModal(true);
                        setSelectedLeads([lead._id]);
                      } else {
                        toast.error('No email address available for this lead.');
                      }
                    }}
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => { setEditingLead(lead); setShowEditModal(true); }}
                    title="Edit Lead"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteLead(lead._id)}
                    title="Delete Lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
                <TableCell className="h-12 overflow-y-auto max-w-[150px] truncate">
                  <Select
                    value={lead.status}
                    onValueChange={(value) => handleStatusChange(lead._id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Contacted">Contacted</SelectItem>
                        <SelectItem value="Qualified">Qualified</SelectItem>
                        <SelectItem value="Unqualified">Unqualified</SelectItem>
                        <SelectItem value="Create New Label">Create New Label</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {showNewStatusInput && lead.status === 'Create New Label' && (
                    <div className="flex mt-2">
                      <Input
                        type="text"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        placeholder="Enter new status"
                      />
                      <Button
                        onClick={() => handleNewStatusSubmit(lead._id)}
                        className="ml-2"
                      >
                        Add
                      </Button>
                    </div>
                  )}
                  
                  </TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.firstName}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.lastName}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">
                  {lead.email ? (
                    <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                      {lead.email}
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">
                  {lead.phone ? (
                    <a href={`https://wa.me/${lead.phone?.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {lead.phone}
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">
                  {lead.firstPhone ? (
                    <a href={`https://wa.me/${lead.firstPhone?.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {lead.firstPhone}
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">
                  {lead.workDirectPhone ? (
                    <a href={`https://wa.me/${lead.workDirectPhone?.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {lead.workDirectPhone}
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">
                  {lead.mobilePhone ? (
                    <a href={`https://wa.me/${lead.mobilePhone?.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {lead.mobilePhone}
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">
                  {lead.corporatePhone ? (
                    <a href={`https://wa.me/${lead.corporatePhone?.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {lead.corporatePhone}
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">
                  {lead.companyPhone ? (
                    <a href={`https://wa.me/${lead.companyPhone?.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {lead.companyPhone}
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.company}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">
                  {lead.personLinkedinUrl ? (
                    <a href={lead.personLinkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      LinkedIn
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">
                  {lead.website ? (
                    <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Website
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">
                  {lead.companyLinkedinUrl ? (
                    <a href={lead.companyLinkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      LinkedIn
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">
                  {lead.facebookUrl ? (
                    <a href={lead.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Facebook
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">
                  {lead.twitterUrl ? (
                    <a href={lead.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Twitter
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.title}</TableCell>
                <TableCell className="h-12 overflow-y-auto max-w-[150px] truncate">
                  <Select
                    value={lead.status}
                    onValueChange={(value) => handleStatusChange(lead._id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Contacted">Contacted</SelectItem>
                        <SelectItem value="Qualified">Qualified</SelectItem>
                        <SelectItem value="Unqualified">Unqualified</SelectItem>
                        <SelectItem value="Create New Label">Create New Label</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {showNewStatusInput && lead.status === 'Create New Label' && (
                    <div className="flex mt-2">
                      <Input
                        type="text"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        placeholder="Enter new status"
                      />
                      <Button
                        onClick={() => handleNewStatusSubmit(lead._id)}
                        className="ml-2"
                      >
                        Add
                      </Button>
                    </div>
                  )}
                  
                  </TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.firstName}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.emailStatus}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.seniority}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.departments}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.otherPhone}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.employees}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.industry}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.keywords}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.city}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.state}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.country}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.companyAddress}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.companyCity}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.companyState}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.companyCountry}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.seoDescription}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.technologies}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.annualRevenue}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.totalFunding}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.latestFunding}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.latestFundingAmount}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.lastRaisedAt}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.stage}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.lastContacted}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.homePhone}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.subsidiaryOf}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.emailSent}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.emailOpen}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.emailBounced}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.replied}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.demoed}</TableCell>
                <TableCell className="h-12 overflow-y-auto overflow-hidden text-ellipsis whitespace-nowrap">{lead.numberOfRetailLocations}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant="outline"
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ContactsTab;
