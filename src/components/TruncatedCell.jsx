import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';
import { Button } from './ui/button';

const TruncatedCell = ({ content, className, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`truncate ${className}`} onClick={() => setIsOpen(true)} title={content || undefined}>
      {content}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{label || "Full Content"}</DialogTitle>
            <DialogClose />
            <DialogDescription>
              {content}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TruncatedCell;