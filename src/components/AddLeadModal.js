import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectContent } from './ui/select';
import { toast } from 'react-toastify';

const AddLeadModal = ({ setShowContactModal, setLeads }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    companyNameForEmails: '',
    email: '',
    emailStatus: '',
    seniority: '',
    departments: '',
    firstPhone: '',
    workDirectPhone: '',
    mobilePhone: '',
    corporatePhone: '',
    otherPhone: '',
    employees: '',
    industry: '',
    keywords: '',
    personLinkedinUrl: '',
    website: '',
    companyLinkedinUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    city: '',
    state: '',
    country: '',
    companyAddress: '',
    companyCity: '',
    companyState: '',
    companyCountry: '',
    companyPhone: '',
    seoDescription: '',
    technologies: '',
    annualRevenue: '',
    totalFunding: '',
    latestFunding: '',
    latestFundingAmount: '',
    lastRaisedAt: '',
    stage: '',
    lastContacted: '',
    homePhone: '',
    subsidiaryOf: '',
    emailSent: '',
    emailOpen: '',
    emailBounced: '',
    replied: '',
    demoed: '',
    numberOfRetailLocations: '',
    status: 'New', // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/leads/add', formData);
      toast.success('Lead added successfully!');
      setLeads(prevLeads => [...prevLeads, res.data]);
      setShowContactModal(false);
    } catch (error) {
      toast.error('Failed to add lead.');
      console.error(error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={setShowContactModal}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Fill in the details for the new contact.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
            {/* Status */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
              <Select onValueChange={(value) => handleSelectChange('status', value)} defaultValue={formData.status}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                    <SelectItem value="Lost">Lost</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* First Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="firstName" className="text-right">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Last Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="lastName" className="text-right">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Title */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Company */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="company" className="text-right">
                Company
              </label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Company Name for Emails */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="companyNameForEmails" className="text-right">
                Company Name for Emails
              </label>
              <Input
                id="companyNameForEmails"
                name="companyNameForEmails"
                value={formData.companyNameForEmails}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Email Status */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="emailStatus" className="text-right">
                Email Status
              </label>
              <Input
                id="emailStatus"
                name="emailStatus"
                value={formData.emailStatus}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Seniority */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="seniority" className="text-right">
                Seniority
              </label>
              <Input
                id="seniority"
                name="seniority"
                value={formData.seniority}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Departments */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="departments" className="text-right">
                Departments
              </label>
              <Input
                id="departments"
                name="departments"
                value={formData.departments}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* First Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="firstPhone" className="text-right">
                First Phone
              </label>
              <Input
                id="firstPhone"
                name="firstPhone"
                value={formData.firstPhone}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Work Direct Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="workDirectPhone" className="text-right">
                Work Direct Phone
              </label>
              <Input
                id="workDirectPhone"
                name="workDirectPhone"
                value={formData.workDirectPhone}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Mobile Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="mobilePhone" className="text-right">
                Mobile Phone
              </label>
              <Input
                id="mobilePhone"
                name="mobilePhone"
                value={formData.mobilePhone}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Corporate Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="corporatePhone" className="text-right">
                Corporate Phone
              </label>
              <Input
                id="corporatePhone"
                name="corporatePhone"
                value={formData.corporatePhone}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Other Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="otherPhone" className="text-right">
                Other Phone
              </label>
              <Input
                id="otherPhone"
                name="otherPhone"
                value={formData.otherPhone}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Employees */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="employees" className="text-right">
                Employees
              </label>
              <Input
                id="employees"
                name="employees"
                value={formData.employees}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Industry */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="industry" className="text-right">
                Industry
              </label>
              <Input
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Keywords */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="keywords" className="text-right">
                Keywords
              </label>
              <Input
                id="keywords"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Person Linkedin Url */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="personLinkedinUrl" className="text-right">
                Person Linkedin Url
              </label>
              <Input
                id="personLinkedinUrl"
                name="personLinkedinUrl"
                value={formData.personLinkedinUrl}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Website */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="website" className="text-right">
                Website
              </label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Company Linkedin Url */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="companyLinkedinUrl" className="text-right">
                Company Linkedin Url
              </label>
              <Input
                id="companyLinkedinUrl"
                name="companyLinkedinUrl"
                value={formData.companyLinkedinUrl}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Facebook Url */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="facebookUrl" className="text-right">
                Facebook Url
              </label>
              <Input
                id="facebookUrl"
                name="facebookUrl"
                value={formData.facebookUrl}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Twitter Url */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="twitterUrl" className="text-right">
                Twitter Url
              </label>
              <Input
                id="twitterUrl"
                name="twitterUrl"
                value={formData.twitterUrl}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* City */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="city" className="text-right">
                City
              </label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* State */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="state" className="text-right">
                State
              </label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Country */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="country" className="text-right">
                Country
              </label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Company Address */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="companyAddress" className="text-right">
                Company Address
              </label>
              <Input
                id="companyAddress"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Company City */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="companyCity" className="text-right">
                Company City
              </label>
              <Input
                id="companyCity"
                name="companyCity"
                value={formData.companyCity}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Company State */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="companyState" className="text-right">
                Company State
              </label>
              <Input
                id="companyState"
                name="companyState"
                value={formData.companyState}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Company Country */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="companyCountry" className="text-right">
                Company Country
              </label>
              <Input
                id="companyCountry"
                name="companyCountry"
                value={formData.companyCountry}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Company Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="companyPhone" className="text-right">
                Company Phone
              </label>
              <Input
                id="companyPhone"
                name="companyPhone"
                value={formData.companyPhone}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* SEO Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="seoDescription" className="text-right">
                SEO Description
              </label>
              <Input
                id="seoDescription"
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Technologies */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="technologies" className="text-right">
                Technologies
              </label>
              <Input
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Annual Revenue */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="annualRevenue" className="text-right">
                Annual Revenue
              </label>
              <Input
                id="annualRevenue"
                name="annualRevenue"
                value={formData.annualRevenue}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Total Funding */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="totalFunding" className="text-right">
                Total Funding
              </label>
              <Input
                id="totalFunding"
                name="totalFunding"
                value={formData.totalFunding}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Latest Funding */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="latestFunding" className="text-right">
                Latest Funding
              </label>
              <Input
                id="latestFunding"
                name="latestFunding"
                value={formData.latestFunding}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Latest Funding Amount */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="latestFundingAmount" className="text-right">
                Latest Funding Amount
              </label>
              <Input
                id="latestFundingAmount"
                name="latestFundingAmount"
                value={formData.latestFundingAmount}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Last Raised At */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="lastRaisedAt" className="text-right">
                Last Raised At
              </label>
              <Input
                id="lastRaisedAt"
                name="lastRaisedAt"
                value={formData.lastRaisedAt}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Stage */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="stage" className="text-right">
                Stage
              </label>
              <Input
                id="stage"
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Last Contacted */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="lastContacted" className="text-right">
                Last Contacted
              </label>
              <Input
                id="lastContacted"
                name="lastContacted"
                value={formData.lastContacted}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Home Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="homePhone" className="text-right">
                Home Phone
              </label>
              <Input
                id="homePhone"
                name="homePhone"
                value={formData.homePhone}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Subsidiary of */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="subsidiaryOf" className="text-right">
                Subsidiary of
              </label>
              <Input
                id="subsidiaryOf"
                name="subsidiaryOf"
                value={formData.subsidiaryOf}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Email Sent */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="emailSent" className="text-right">
                Email Sent
              </label>
              <Input
                id="emailSent"
                name="emailSent"
                value={formData.emailSent}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Email Open */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="emailOpen" className="text-right">
                Email Open
              </label>
              <Input
                id="emailOpen"
                name="emailOpen"
                value={formData.emailOpen}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Email Bounced */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="emailBounced" className="text-right">
                Email Bounced
              </label>
              <Input
                id="emailBounced"
                name="emailBounced"
                value={formData.emailBounced}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Replied */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="replied" className="text-right">
                Replied
              </label>
              <Input
                id="replied"
                name="replied"
                value={formData.replied}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Demoed */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="demoed" className="text-right">
                Demoed
              </label>
              <Input
                id="demoed"
                name="demoed"
                value={formData.demoed}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Number of Retail Locations */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="numberOfRetailLocations" className="text-right">
                Number of Retail Locations
              </label>
              <Input
                id="numberOfRetailLocations"
                name="numberOfRetailLocations"
                value={formData.numberOfRetailLocations}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContactModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Contact</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadModal;