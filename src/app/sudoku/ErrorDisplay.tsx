import React from "react";

export default function ErrorDisplay({ error }: { error: string }) {
  if (!error) return null;
  return (
    <div className="bg-red-500 text-white px-4 py-2 rounded-lg my-4 font-medium text-center">
      {error}
    </div>
  );
}