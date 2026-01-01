import { useState } from "react";
import { useStore } from "./store";
import { PipelineResultDialog } from "./Dialog/PipelineResult";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();
      setResult(data);
      setOpen(true);
    } catch {
      setResult({
        num_nodes: nodes.length,
        num_edges: edges.length,
        is_dag: false,
      });
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className={`flex items-center gap-2 px-8 py-2 rounded-md font-medium border
            ${
              isLoading
                ? "cursor-not-allowed opacity-60 border-primary-500 text-primary-500"
                : "border-primary-500 text-primary-500"
            }`}
        >
          {isLoading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
          )}
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>

      <PipelineResultDialog
        open={open}
        onClose={() => setOpen(false)}
        result={result}
      />
    </>
  );
};
