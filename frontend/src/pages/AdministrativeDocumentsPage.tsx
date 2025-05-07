import DocumentGenerator from '../components/DocumentGenerator';
import {Navigate} from "react-router";

const AdministrativeDocumentsPage = () => {
    const userRole = localStorage.getItem("userRole") as string | "anonymous";

    if (["agent", "professor"].includes(userRole)) {
        return <Navigate to={"/accueil"} />
    }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Documents Administratifs</h1>
      <DocumentGenerator />
    </div>
  );
};

export default AdministrativeDocumentsPage;
