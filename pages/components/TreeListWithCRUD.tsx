
"use client"; 

import React, { useState } from "react";
import TreeList, { Column as TreeListColumn, Selection  } from "devextreme-react/tree-list";
import "devextreme/dist/css/dx.light.css";
import Modal from "react-modal";

interface TreeItem {
  id: number;
  parentId: number | null;
  name: string;
}

const initialData: TreeItem[] = [
  { id: 1, parentId: null, name: "Node 1" },
  { id: 2, parentId: 1, name: "Node 1.1" },
  { id: 3, parentId: null, name: "Node 2" },
];

const TreeListWithCRUD: React.FC = () => {
  const [data, setData] = useState<TreeItem[]>(initialData);
  const [selectedRow, setSelectedRow] = useState<TreeItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<TreeItem | null>(null);

  const openModal = (row: TreeItem | null) => {
    setEditingData(row || { id: 0, parentId: null, name: "" });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingData) {
      if (editingData.id) {
        setData((prev) =>
          prev.map((item) => (item.id === editingData.id ? editingData : item))
        );
      } else {
        setData((prev) => [
          ...prev,
          { ...editingData, id: Date.now() },
        ]);
      }
      setIsModalOpen(false);
      setEditingData(null);
    }
  };

  const handleDelete = () => {
    if (selectedRow) {
      setData((prev) => prev.filter((item) => item.id !== selectedRow.id));
      setSelectedRow(null);
    }
  };

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">CRUD TreeList</h1>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => openModal(null)}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow"
        >
          Criar
        </button>
        <button
          onClick={() => selectedRow && openModal(selectedRow)}
          disabled={!selectedRow}
          className={`px-4 py-2 rounded shadow ${
            selectedRow ? "bg-yellow-500 text-white" : "bg-gray-300 text-gray-500"
          }`}
        >
          Editar
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

      <TreeList
        dataSource={data}
        keyExpr="id"
        parentIdExpr="parentId"
        showBorders
        onSelectionChanged={(e) =>
          setSelectedRow(e.selectedRowsData[0] || null)
        }
        className="border border-gray-300 rounded"
      >
        <Selection mode="single" /> 
        <TreeListColumn dataField="name" caption="Nome" />
      </TreeList>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="bg-white p-6 rounded shadow max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">
          {editingData?.id ? "Editar Nó" : "Criar Nó"}
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
            <label className="block mb-2">ID do Pai:</label>
            <input
              type="number"
              value={editingData?.parentId || ""}
              onChange={(e) =>
                setEditingData((prev) => prev && { ...prev, parentId: Number(e.target.value) || null })
              }
              className="border border-gray-300 rounded w-full px-2 py-1"
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

export default TreeListWithCRUD;
