import { useState } from "react";
import { BaseNode } from "./base/baseNode";

export const WebhookNode = ({ id, data, type }) => {
  const [url, setUrl] = useState(data?.url || "");
  const [payload, setPayload] = useState(data?.payload || "");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handlePayloadChange = (e) => {
    setPayload(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      nodeType={type}
      title="Webhook"
      handles={data?.handles ?? []}
    >
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1 text-sm">
          <span>URL</span>
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://api.example.com/webhook"
            className="w-full border rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-primary-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span>Payload</span>
          <textarea
            value={payload}
            onChange={handlePayloadChange}
            placeholder='{"key": "value"}'
            rows={4}
            className="w-full border rounded px-2 py-1 text-sm resize-none outline-none focus:ring-1 focus:ring-primary-500"
          />
        </label>
      </div>
    </BaseNode>
  );
};
