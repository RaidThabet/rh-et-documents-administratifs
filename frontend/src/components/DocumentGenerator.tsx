import React, { useEffect, useState } from 'react';
import { Card } from '@heroui/card';
import { Button } from '@heroui/button';
import { Select, SelectItem } from '@heroui/select';
import { Alert } from '@heroui/alert';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import {getAllUsers} from "../actions/userActions.ts";

const COMPANY_INFO = {
  name: "WorkForce Solutions",
  address: "123 Avenue des Affaires, 75000 Paris",
  logo: "/logo.png",
  phone: "+33 1 23 45 67 89",
  email: "contact@workforce-solutions.com",
  website: "www.workforce-solutions.com",
};

const DOCUMENT_TYPES = [
  { id: 'work_attestation', name: 'Attestation de Travail' },
  { id: 'leave_certificate', name: 'Attestation de Congé' },
  { id: 'salary_certificate', name: 'Attestation de Salaire' },
];

type Employee = {
  _id: string;
  username?: string;
  grade?: string;
  department?: string;
  joinDate?: string;
};

const DocumentGenerator = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(DOCUMENT_TYPES[0].id);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const users = await getAllUsers();
        setEmployees(users);
        if (users.length) {
          setSelectedEmployeeId(users[0]._id);
        }
      } catch (err) {
        setError('Échec du chargement des employés.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);


  const getSelectedEmployee = () => employees.find(e => e._id === selectedEmployeeId);

  const generatePDF = () => {
    const employee = getSelectedEmployee();
    if (!employee) return setError('Aucun employé sélectionné');

    try {
      setLoading(true);
      const doc = new jsPDF();

      doc.setFontSize(18).setTextColor(0, 51, 102)
          .text(COMPANY_INFO.name, 105, 20, { align: 'center' });

      doc.setFontSize(10).setTextColor(100, 100, 100)
          .text(COMPANY_INFO.address, 105, 30, { align: 'center' })
          .text(`Tel: ${COMPANY_INFO.phone} | Email: ${COMPANY_INFO.email}`, 105, 35, { align: 'center' });

      const title = DOCUMENT_TYPES.find(d => d.id === selectedDocument)?.name || '';
      doc.setFontSize(16).setTextColor(0, 0, 0).text(title, 105, 50, { align: 'center' });

      const today = new Date();
      const formattedDate = today.toLocaleDateString('fr-FR');
      const ref = `REF-${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}-${Math.floor(Math.random() * 1000)}`;

      doc.setFontSize(10)
          .text(`Référence: ${ref}`, 20, 65)
          .text(`Date: ${formattedDate}`, 20, 70);

      switch (selectedDocument) {
        case 'work_attestation':
          addWorkAttestation(doc, employee);
          break;
        case 'leave_certificate':
          doc.text('Contenu d’attestation de congé à implémenter.', 20, 90);
          break;
        case 'salary_certificate':
          doc.text('Contenu d’attestation de salaire à implémenter.', 20, 90);
          break;
      }

      doc.setFontSize(8).setTextColor(100, 100, 100)
          .text(`Ce document est généré automatiquement | ${COMPANY_INFO.website}`, 105, 280, { align: 'center' });

      setPreviewUrl(doc.output('datauristring'));
    } catch (err) {
      setError('Erreur lors de la génération du document.');
    } finally {
      setLoading(false);
    }
  };

  const addWorkAttestation = (doc: jsPDF, emp: Employee) => {
    const joinDate = new Date(emp.joinDate || '2020-01-01');
    const today = new Date();
    const years = today.getFullYear() - joinDate.getFullYear() - (
        today.getMonth() < joinDate.getMonth() ||
        (today.getMonth() === joinDate.getMonth() && today.getDate() < joinDate.getDate()) ? 1 : 0
    );

    doc.setFontSize(12).setTextColor(0, 0, 0);
    doc.text("Je soussigné(e), Directeur des Ressources Humaines de la société", 20, 90);
    doc.setFont("helvetica", "bold").text(COMPANY_INFO.name + ",", 20, 100).setFont("helvetica", "normal");

    doc.text("Certifie que:", 20, 115);
    doc.setFont("helvetica", "bold").text(emp.username || 'Nom Prénom', 30, 130).setFont("helvetica", "normal");

    doc.text(`Matricule : ${emp._id?.slice(0, 8)}`, 30, 140);
    doc.text(`Fonction : ${emp.grade || 'Poste inconnu'}`, 30, 150);
    doc.text(`Département : ${emp.department || 'Non précisé'}`, 30, 160);
    doc.text(`Employé(e) depuis le ${joinDate.toLocaleDateString('fr-FR')}`, 20, 180);
    doc.text("Cette attestation est délivrée pour servir et valoir ce que de droit.", 20, 195);

    doc.text(`Fait à Paris, le ${today.toLocaleDateString('fr-FR')}`, 130, 220);
    doc.text("Le Directeur des Ressources Humaines", 130, 230);
    doc.setFont("helvetica", "bold").text("Signature et cachet", 130, 250);
  };

  const downloadPDF = () => {
    const employee = getSelectedEmployee();
    if (!previewUrl || !employee) return;
    const fileName = `${selectedDocument}_${employee.username || 'Employé'}_${new Date().toISOString().slice(0, 10)}.pdf`;

    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = fileName;
    link.click();
  };

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Générateur de Documents</h1>

        {error && (
            <Alert variant="danger" className="mb-4">
              {error}
              <Button variant="ghost" onPress={() => setError(null)} className="ml-4">Fermer</Button>
            </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left panel */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Options</h2>

            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Type de Document</label>
              <Select
                  selectedKeys={[selectedDocument]}
                  onSelectionChange={(keys) => {
                    const id = Array.from(keys)[0]?.toString();
                    if (id) setSelectedDocument(id);
                    setPreviewUrl(null);
                  }}
              >
                {DOCUMENT_TYPES.map(doc => (
                    <SelectItem key={doc.id} value={doc.id}>{doc.name}</SelectItem>
                ))}
              </Select>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Employé</label>
              <Select
                  selectedKeys={[selectedEmployeeId]}
                  onSelectionChange={(keys) => {
                    const id = Array.from(keys)[0]?.toString();
                    if (id) setSelectedEmployeeId(id);
                    setPreviewUrl(null);
                  }}
              >
                {employees.map(emp => (
                    <SelectItem key={emp._id} value={emp._id}>
                      {emp.username || 'Utilisateur inconnu'}
                    </SelectItem>
                ))}
              </Select>
            </div>

            <Button className="w-full mb-3" onPress={generatePDF} isDisabled={!selectedEmployeeId}>
              Générer Aperçu
            </Button>
            <Button variant="outline" className="w-full" onPress={downloadPDF} isDisabled={!previewUrl}>
              Télécharger PDF
            </Button>
          </Card>

          {/* Preview panel */}
          <Card className="p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Aperçu</h2>
            {loading ? (
                <div className="flex justify-center items-center h-[600px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : previewUrl ? (
                <iframe src={previewUrl} className="w-full h-[600px] border rounded-lg" title="PDF Preview" />
            ) : (
                <div className="flex items-center justify-center h-[600px] bg-gray-50 border rounded-lg">
                  <p className="text-gray-400">Aucun aperçu disponible</p>
                </div>
            )}
          </Card>
        </div>
      </div>
  );
};

export default DocumentGenerator;
