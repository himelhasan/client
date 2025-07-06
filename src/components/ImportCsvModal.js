import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'react-toastify';

const ImportCsvModal = ({ onClose, onImportSuccess }) => {
  const [file, setFile] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage('');
      Papa.parse(e.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const detectedHeaders = results.meta.fields;
          setHeaders(detectedHeaders);
          setData(results.data);
          toast.info(`Detected ${results.data.length} rows and ${detectedHeaders.length} headers.`);
        },
        error: function (error) {
          setMessage('Error parsing CSV: ' + error.message);
          toast.error('Error parsing CSV: ' + error.message);
        }
      });
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error('Please select a CSV file.');
      return;
    }

    if (data.length === 0) {
      toast.error('No data found in the CSV file.');
      return;
    }

    setMessage('Importing...');
    try {
      const mappedData = data.map(row => ({
        firstName: row["First Name"],
        lastName: row["Last Name"],
        title: row["Title"],
        company: row["Company"],
        companyNameForEmails: row["Company Name for Emails"],
        email: row["Email"],
        emailStatus: row["Email Status"],
        seniority: row["Seniority"],
        departments: row["Departments"],
        firstPhone: row["First Phone"],
        workDirectPhone: row["Work Direct Phone"],
        mobilePhone: row["Mobile Phone"],
        corporatePhone: row["Corporate Phone"],
        otherPhone: row["Other Phone"],
        employees: row["Employees"],
        industry: row["Industry"],
        keywords: row["Keywords"],
        personLinkedinUrl: row["Person Linkedin Url"],
        website: row["Website"],
        companyLinkedinUrl: row["Company Linkedin Url"],
        facebookUrl: row["Facebook Url"],
        twitterUrl: row["Twitter Url"],
        city: row["City"],
        state: row["State"],
        country: row["Country"],
        companyAddress: row["Company Address"],
        companyCity: row["Company City"],
        companyState: row["Company State"],
        companyCountry: row["Company Country"],
        companyPhone: row["Company Phone"],
        seoDescription: row["SEO Description"],
        technologies: row["Technologies"],
        annualRevenue: row["Annual Revenue"],
        totalFunding: row["Total Funding"],
        latestFunding: row["Latest Funding"],
        latestFundingAmount: row["Latest Funding Amount"],
        lastRaisedAt: row["Last Raised At"],
        stage: row["Stage"],
        lastContacted: row["Last Contacted"],
        homePhone: row["Home Phone"],
        subsidiaryOf: row["Subsidiary of"],
        emailSent: row["Email Sent"],
        emailOpen: row["Email Open"],
        emailBounced: row["Email Bounced"],
        replied: row["Replied"],
        demoed: row["Demoed"],
        numberOfRetailLocations: row["Number of Retail Locations"],
      }));

      await axios.post('http://localhost:5000/leads/import', mappedData);
      toast.success('CSV imported successfully!');
      onImportSuccess();
      onClose();
    } catch (error) {
      console.error('Error importing CSV:', error);
      toast.error('Error importing CSV: ' + (error.response?.data?.message || error.message));
      setMessage('Error importing CSV: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import CSV Leads</DialogTitle>
          <DialogDescription>
            Upload your CSV file to import leads. Ensure your CSV has a header row.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="csvFile" className="text-right">
              CSV File:
            </label>
            <Input
              id="csvFile"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="col-span-3"
            />
          </div>

          {headers.length > 0 && (
            <div className="grid grid-cols-4 items-start gap-4">
              <span className="text-right">Detected Headers:</span>
              <div className="col-span-3 flex flex-wrap gap-2">
                {headers.map((header, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {header}
                  </span>
                ))}
              </div>
            </div>
          )}

          {message && <p className="text-red-500 text-sm text-center">{message}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!file || data.length === 0}>
            Import Leads ({data.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportCsvModal;