
import React, { useState } from 'react';
import { Mail, MessageSquare, Bot } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea'; // Assuming Textarea component will be created
import { toast } from 'react-toastify';

const MessageModal = ({ setShowMessageModal, messageType, setMessageType, selectedLeads }) => {
  const [messageContent, setMessageContent] = useState('');
  const [messageSubject, setMessageSubject] = useState('');
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);

  const generateMessage = async (type) => {
    setIsGeneratingMessage(true);

    // Simulate AI generation
    setTimeout(() => {
      const templates = {
        email: {
          subject: "Partnership Opportunity with [Company Name]",
          content: `Dear [Name],\n\nI hope this email finds you well. I came across your profile and was impressed by your work.\n\nWe specialize in helping companies like yours. Would you be open to a brief 15-minute call to explore potential collaboration opportunities?\n\nBest regards,\n[Your Name]`
        },
        whatsapp: {
          content: `Hi [Name]! 👋\n\nI noticed your work. We help companies like yours. Would you be interested in a quick chat about potential collaboration?\n\nThanks!\n[Your Name]`
        }
      };

      const template = templates[type];
      setMessageSubject(template.subject || '');
      setMessageContent(template.content);
      setIsGeneratingMessage(false);
      toast.success('Message generated successfully!');
    }, 2000);
  };

  const sendMessages = () => {
    // Here you would implement the logic to send emails or WhatsApp messages
    console.log('Sending messages...');
    console.log('Type:', messageType);
    console.log('Subject:', messageSubject);
    console.log('Content:', messageContent);
    console.log('Recipients:', selectedLeads);
    toast.success(`Sending ${selectedLeads.length} ${messageType} messages.`);
    setShowMessageModal(false);
  }

  return (
    <Dialog open={true} onOpenChange={setShowMessageModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            New {messageType === 'email' ? 'Email' : 'WhatsApp'} Campaign
          </DialogTitle>
          <DialogDescription>
            Compose and send messages to your selected leads.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Message type selector */}
          <div className="flex space-x-4">
            <Button
              variant={messageType === 'email' ? 'default' : 'outline'}
              onClick={() => setMessageType('email')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button
              variant={messageType === 'whatsapp' ? 'default' : 'outline'}
              onClick={() => setMessageType('whatsapp')}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Recipients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipients ({selectedLeads.length})
            </label>
            <div className="text-sm text-gray-500">
              {selectedLeads.length === 0
                ? 'No contacts selected'
                : `${selectedLeads.length} contact(s) selected`}
            </div>
          </div>

          {/* Subject (email only) */}
          {messageType === 'email' && (
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <Input
                id="subject"
                type="text"
                value={messageSubject}
                onChange={(e) => setMessageSubject(e.target.value)}
                placeholder="Enter email subject..."
              />
            </div>
          )}

          {/* Message content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <Button
                type="button"
                onClick={() => generateMessage(messageType)}
                disabled={isGeneratingMessage}
                variant="secondary"
              >
                <Bot className="w-4 h-4 mr-1" />
                {isGeneratingMessage ? 'Generating...' : 'AI Generate'}
              </Button>
            </div>
            <Textarea
              id="messageContent"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              rows={8}
              placeholder={`Enter your ${messageType} message...`}
            />
            <div className="mt-2 text-xs text-gray-500">
              Use placeholders like [Name] to personalize messages
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowMessageModal(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={sendMessages}
            disabled={!messageContent || selectedLeads.length === 0}
          >
            Send {messageType === 'email' ? 'Email' : 'WhatsApp'} ({selectedLeads.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
