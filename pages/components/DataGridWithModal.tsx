"use client"; 

import React, { useState } from "react";
import DataGrid, {
  Column,
  Selection,
  Paging,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.light.css"; 
import Modal from "react-modal"; 

interface DataItem {
  id: number;
  name: string;
  category: string;
}

const DataGridModal: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([
    { id: 1, name: "Item 1", category: "A" },
    { id: 2, name: "Item 2", category: "B" },
  ]);
  const [selectedRow, setSelectedRow] = useState<DataItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<DataItem | null>(null);

  const handleDelete = () => {
    if (selectedRow) {
      setData(data.filter((item) => item.id !== selectedRow.id));
      setSelectedRow(null);
    }
  };

  const handleSave = () => {
    if (editingData) {
      if (editingData.id) {
        setData(data.map((item) => (item.id === editingData.id ? editingData : item)));
      } else {
        setData([...data, { ...editingData, id: Date.now() }]);
      }
      setEditingData(null);
      setIsModalOpen(false);
    }
  };

  const openModal = (rowData: DataItem | null) => {
    setEditingData(rowData || { id: 0, name: "", category: "" });
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">DataGrid com Modal</h1>
      
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => openModal(null)}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow"
        >
          Criar
        </button>
        <button
          onClick={handleDelete}
          disabled={!selectedRow}
          className={`px-4 py-2 rounded shadow ${
            selectedRow ? "bg-red-500 text-white" : "bg-gray-300 text-gray-500"
          }`}
        >
          Deletar
        </button>
      </div>
      
      
      <DataGrid
        dataSource={data}
        keyExpr="id"
        showBorders
        onSelectionChanged={(e) => setSelectedRow(e.selectedRowsData[0] || null)}
      >
        <Selection mode="single" />
        <Paging defaultPageSize={5} />
        <Column dataField="name" caption="Nome" />
        <Column dataField="category" caption="Categoria" />
        <Toolbar>
          <Item
            location="before"
            widget="dxButton"
            options={{
              text: "Editar",
              onClick: () => selectedRow && openModal(selectedRow),
            }}
          />
        </Toolbar>
      </DataGrid>
      
   
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="bg-white p-6 rounded shadow max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-red bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">
          {editingData?.id ? "Editar Item" : "Criar Item"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="mb-4">
            <label className="block mb-2">Nome:</label>
            <input
              type="text"
              value={editingData?.name || ""}
              onChange={(e) =>
                setEditingData((prev) => prev && { ...prev, name: e.target.value })
              }
              className="border border-gray-300 rounded w-full px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Categoria:</label>
            <input
              type="text"
              value={editingData?.category || ""}
              onChange={(e) =>
                setEditingData((prev) => prev && { ...prev, category: e.target.value })
              }
              className="border border-gray-300 rounded w-full px-2 py-1"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DataGridModal;
