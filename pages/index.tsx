import DataGridModal from "./components/DataGridWithModal";
import DataTreeToggle from "./components/DataTreeToggle";
import TreeListWithCRUD from "./components/TreeListWithCRUD";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold text-center my-6">TESTE</h1>
      <DataTreeToggle />
      <DataGridModal />
      <TreeListWithCRUD/>
    </div>
  );
};

export default Home;