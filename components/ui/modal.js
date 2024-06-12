// components/ui/modal.js
import React from 'react';
import { Button } from '@/components/ui/button';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
