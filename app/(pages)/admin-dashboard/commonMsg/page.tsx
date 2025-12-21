"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useCreateCommonMessage, useDeleteCommonMessage, useListCommonMessages, useUpdateCommonMessage } from "@/app/hooks/useCommonMessage";
import { ListCommonMessagesResponse } from "@/app/types/commonMessage";

export default function AdminCommonMsgPage() {
  const { data, isLoading, error: qError, refetch } = useListCommonMessages();
  const createMut = useCreateCommonMessage();
  const updateMut = useUpdateCommonMessage();
  const deleteMut = useDeleteCommonMessage();

  const messages = (data as ListCommonMessagesResponse | undefined)?.messages ?? [];
  const latest = useMemo(() => (messages && messages.length > 0 ? messages[0] : null), [messages]);

  const [form, setForm] = useState({ content: "" });

  useEffect(() => {
    if (latest) setForm({ content: latest.content });
  }, [latest?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    await createMut.mutateAsync({ content: form.content });
    await refetch();
  };

  const handleUpdate = async () => {
    if (!latest) return;
    await updateMut.mutateAsync({ id: latest.id, payload: { content: form.content } });
    await refetch();
  };

  const handleDelete = async () => {
    if (!latest) return;
    if (!confirm("Delete the latest common message?")) return;
    await deleteMut.mutateAsync({ id: latest.id });
    setForm({ content: "" });
    await refetch();
  };

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-semibold mb-4">Common Message</h1>

      {(qError || createMut.error || updateMut.error || deleteMut.error) && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 text-red-700 p-3 text-sm">
          {(qError as any)?.message || (createMut.error as any)?.message || (updateMut.error as any)?.message || (deleteMut.error as any)?.message || 'An error occurred'}
        </div>
      )}

      <div className="mb-6 space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Message Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          value={form.content}
          onChange={handleChange}
          placeholder="Type announcement here (supports emojis 😊)"
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-xs text-gray-500">Plain text and emojis are supported.</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleCreate}
          disabled={createMut.isPending}
          className="inline-flex items-center rounded bg-blue-600 px-3 py-2 text-white text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          Create New
        </button>
        <button
          onClick={handleUpdate}
          disabled={!latest || updateMut.isPending}
          className="inline-flex items-center rounded bg-yellow-600 px-3 py-2 text-white text-sm hover:bg-yellow-700 disabled:opacity-50"
        >
          Update Latest
        </button>
        <button
          onClick={handleDelete}
          disabled={!latest || deleteMut.isPending}
          className="inline-flex items-center rounded bg-red-600 px-3 py-2 text-white text-sm hover:bg-red-700 disabled:opacity-50"
        >
          Delete Latest
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium mb-2">Existing Messages</h2>
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500 text-sm">No messages found.</p>
        ) : (
          <ul className="space-y-2">
            {messages.map((m) => (
              <li key={m.id} className="rounded border p-3 bg-white shadow-sm">
                <div className="text-sm text-gray-800 whitespace-pre-wrap break-words">{m.content}</div>
                <div className="text-xs text-gray-500 mt-1">ID: {m.id}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
