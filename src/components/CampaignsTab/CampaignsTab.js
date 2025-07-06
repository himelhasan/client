import React from 'react';
import { Mail, MessageSquare, Send, Eye, Users, Plus } from 'lucide-react';
import { Button } from '../ui/button';

const CampaignsTab = ({
  campaigns,
  setShowMessageModal
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Campaigns</h2>
        <Button
          onClick={() => setShowMessageModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Campaign stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Send className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Total Sent</div>
              <div className="text-2xl font-bold text-gray-900">
                {campaigns.reduce((acc, c) => acc + c.recipients, 0)}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Eye className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Avg. Open Rate</div>
              <div className="text-2xl font-bold text-gray-900">
                {campaigns.length > 0 ? Math.round(campaigns.reduce((acc, c) => acc + c.openRate, 0) / campaigns.length) : 0}%
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Avg. Response Rate</div>
              <div className="text-2xl font-bold text-gray-900">
                {campaigns.length > 0 ? Math.round(campaigns.reduce((acc, c) => acc + c.responseRate, 0) / campaigns.length) : 0}%
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">Active Campaigns</div>
              <div className="text-2xl font-bold text-gray-900">{campaigns.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns list */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Campaigns</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                    campaign.type === 'email' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {campaign.type === 'email' ? (
                      <Mail className="w-5 h-5 text-blue-600" />
                    ) : (
                      <MessageSquare className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {campaign.subject || `${campaign.type} Campaign`}
                    </div>
                    <div className="text-sm text-gray-500">
                      {campaign.recipients} recipients • {new Date(campaign.sentAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-medium text-gray-900">{campaign.openRate}%</div>
                    <div className="text-xs text-gray-500">Open Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-medium text-gray-900">{campaign.responseRate}%</div>
                    <div className="text-xs text-gray-500">Response Rate</div>
                  </div>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {campaign.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignsTab;
