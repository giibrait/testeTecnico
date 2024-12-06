import React, { useState } from "react";
import DataGrid, { Column } from "devextreme-react/data-grid";
import TreeList, { Column as TreeColumn } from "devextreme-react/tree-list";

interface DataItem {
  id: number;
  name: string;
  category: string;
  parentId?: number;
}

const sampleData: DataItem[] = [
  { id: 1, name: "Item 1", category: "A", parentId: 0 },
  { id: 2, name: "Item 2", category: "B", parentId: 1 },
  { id: 3, name: "Item 3", category: "A", parentId: 0 },
];

const DataTreeToggle: React.FC = () => {
  const [view, setView] = useState<"DataGrid" | "TreeList">("DataGrid");

  return (
    <div className="p-4">
      <button
        onClick={() => setView(view === "DataGrid" ? "TreeList" : "DataGrid")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded shadow"
      >
        Alternar para {view === "DataGrid" ? "TreeList" : "DataGrid"}
      </button>
      

      {view === "DataGrid" ? (
        <DataGrid dataSource={sampleData} keyExpr="id" showBorders>
          <Column dataField="name" caption="Nome" />
          <Column dataField="category" caption="Categoria" />
        </DataGrid>
      ) : (
        <TreeList
          dataSource={sampleData}
          keyExpr="id"
          parentIdExpr="parentId"
          showBorders
        >
          <TreeColumn dataField="name" caption="Nome" />
          <TreeColumn dataField="category" caption="Categoria" />
        </TreeList>
      )}
    </div>
  );
};

export default DataTreeToggle;
