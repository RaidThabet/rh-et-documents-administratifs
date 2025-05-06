import React from 'react';
import DocumentGenerator from '../components/DocumentGenerator';

const AdministrativeDocumentsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Documents Administratifs</h1>
      <DocumentGenerator />
    </div>
  );
};

export default AdministrativeDocumentsPage;
