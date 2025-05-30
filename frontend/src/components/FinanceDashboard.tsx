import React from "react";
import { useNeumorph } from "@/contexts/NeumorphContext";
import { Line } from "react-chartjs-2";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { RxCross2 } from "react-icons/rx";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FiCheck, FiDelete } from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TransactionData {
  transactionId: string;
  suspiciousScore: number;
  flagged: boolean;
}

const FinanceDashboard = () => {
  const { isNeumorphism } = useNeumorph();

  const cashFlowData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Cash Flow Forecast",
        data: [1200, 1800, 1300, 2200, 2000, 2500],
        borderColor: "green",
        backgroundColor: "white",
        fill: true,
      },
    ],
  };

  const riskScoreData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Transaction Risk Scores",
        data: [65, 72, 80, 90, 85, 75],
        borderColor: "rgba(244, 63, 94)",
        backgroundColor: "white",
        fill: true,
      },
    ],
  };

  const data: TransactionData[] = React.useMemo(
    () => [
      { transactionId: "1001", suspiciousScore: 85.5, flagged: true },
      { transactionId: "1002", suspiciousScore: 45.2, flagged: false },
      { transactionId: "1003", suspiciousScore: 60.0, flagged: true },
      { transactionId: "1004", suspiciousScore: 90.1, flagged: true },
    ],
    []
  );

  const columnHelper = createColumnHelper<TransactionData>();
  const columns = React.useMemo(
    () => [
      columnHelper.accessor("transactionId", {
        header: "Transaction ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("suspiciousScore", {
        header: "Suspicious Score",
        cell: (info) => info.getValue().toFixed(1),
      }),
      columnHelper.accessor("flagged", {
        header: "Flagged",
        cell: (info) =>
          info.getValue() ? (
            <FiCheck style={{ color: "green" }} />
          ) : (
            <RxCross2 style={{ color: "red" }} />
          ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section
      className={`${
        isNeumorphism ? "neumorphic-convex" : ""
      } grid grid-cols-1 md:grid-cols-3 gap-6 rounded-lg p-6 bg-[var(--body)] text-[10px] text-[var(--text)]`}
    >
      {/* Cash flow graph */}
      <div
        className={`${
          isNeumorphism ? "neumorphic-convex" : ""
        } rounded-lg p-4 bg-[var(--card-2)]`}
      >
        <h4 className="font-bold uppercase text-[var(--accent)] mb-3">
          Cash Flow Forecast
        </h4>
        <Line data={cashFlowData} options={{ responsive: true }} height={200} />
      </div>

      {/* Transaction risk score chart */}
      <div
        className={`${
          isNeumorphism ? "neumorphic-convex" : ""
        } rounded-lg p-4 bg-[var(--card-2)]`}
      >
        <h4 className="font-bold uppercase text-[var(--accent)] mb-3">
          Transaction Risk Scores
        </h4>
        <Line
          data={riskScoreData}
          options={{ responsive: true }}
          height={200}
        />
      </div>

      {/* Suspicious transaction table */}
      <div
        className={`${
          isNeumorphism ? "neumorphic-convex" : ""
        } rounded-lg p-4 overflow-auto bg-[var(--card-2)]`}
      >
        <h4 className="font-bold uppercase text-[var(--accent)] mb-3">
          Suspicious Transaction Heatmap
        </h4>
        <table className="w-full text-[9px] table-fixed border-collapse border border-[color:var(--accent-dark)]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-[var(--accent-dark)]">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-[color:var(--accent-dark)] p-1 text-left"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="odd:bg-[var(--body)] even:bg-[var(--card-2)]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-[color:var(--accent-dark)] p-1 truncate max-w-[100px]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default FinanceDashboard;
