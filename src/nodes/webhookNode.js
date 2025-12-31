import { useState } from "react";
import { Position } from "reactflow";
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

  const handles = [
    {
      id: `${id}-url`,
      type: "target",
      position: Position.Left,
    },
    {
      id: `${id}-payload`,
      type: "target",
      position: Position.Left,
    },
    {
      id: `${id}-success`,
      type: "source",
      position: Position.Right,
    },
    {
      id: `${id}-error`,
      type: "source",
      position: Position.Right,
    },
  ];

  return (
    <BaseNode id={id} nodeType={type} title="Webhook" handles={handles}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          URL
          <input
            type="text"
            className="border"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://api.example.com/webhook"
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          Payload
          <textarea
            value={payload}
            onChange={handlePayloadChange}
            placeholder='{"key": "value"}'
            rows={4}
            className="border"
            style={{
              width: "100%",
              boxSizing: "border-box",
              resize: "none",
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};
