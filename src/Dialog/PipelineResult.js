import { Dialog } from "@headlessui/react";

export const PipelineResultDialog = ({ open, onClose, result }) => {
  if (!result) return null;

  const { num_nodes, num_edges, is_dag } = result;

  return (
    <Dialog open={open} onClose={onClose} className="relative">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-[#1C2536] p-6 shadow-xl">
          <Dialog.Title className="text-lg font-semibold text-white mb-4">
            Pipeline Summary
          </Dialog.Title>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Nodes</span>
              <span className="font-medium text-white">{num_nodes}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Edges</span>
              <span className="font-medium text-white">{num_edges}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">DAG</span>
              <span
                className={`py-1 rounded-full text-xs font-medium ${
                  is_dag
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {is_dag ? "Valid DAG" : "Cycle Detected"}
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md bg-primary-500 text-white hover:opacity-90"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
