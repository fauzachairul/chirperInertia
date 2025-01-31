import React, { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import ReportUserModal from "@/Components/ReportUserModal";
import { useForm, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Chirp({ chirp }) {
    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        message: chirp.message,
        // media: null,
    });

    const [isReporting, setIsReporting] = useState(false);

    const reportUser = (e) => {
        e.preventDefault();

        post(route("user-reports.store"), {
            data: {
                reported_user_id: userId,
                reason: "Inappropriate behavior", // Bisa diubah sesuai input alasan
            },
            onSuccess: () => alert("User has been reported."),
        });
    };

    const [reportReason, setReportReason] = useState("");

    const handleReport = (chirpId) => {
        const reason = prompt("Enter the reason for reporting this chirp:");
        if (reason) {
            axios
                .post(route("reports.store"), { chirp_id: chirpId, reason })
                .then(() => {
                    alert("Report submitted successfully.");
                });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route("chirps.update", chirp.id), {
            onSuccess: () => setEditing(false),
        });
    };

    return (
        <div className="p-6 flex space-x-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 -scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
            </svg>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-gray-800">{chirp.user.name}</span>
                        <small className="ml-2 text-sm text-gray-600">
                            {dayjs(chirp.created_at).fromNow()}
                        </small>
                        {chirp.created_at !== chirp.updated_at && (
                            <small className="text-sm text-gray-600">
                                {" "}
                                &middot; edited
                            </small>
                        )}
                    </div>
                    {chirp.user.id === auth.user.id && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button
                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit
                                </button>
                                <Dropdown.Link
                                    as="button"
                                    href={route("chirps.destroy", chirp.id)}
                                    method="delete"
                                >
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    )}

                    {chirp.user.id !== auth.user.id && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button
                                    onClick={() => handleReport(chirp.id)}
                                    className="p-3 text-red-500 hover:underline"
                                >
                                    Report Chirp
                                </button>
                                <button
                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                    onClick={() => setIsReporting(true)} // Tampilkan modal
                                >
                                    Report User
                                </button>
                            </Dropdown.Content>
                        </Dropdown>
                    )}
                </div>
                {editing ? (
                    <form onSubmit={submit}>
                        <textarea
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        ></textarea>
                        <InputError message={errors.message} className="mt-2" />
                        <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setData("media", file);
                            }}
                            className="mt-4"
                        />
                        <InputError
                            message={
                                errors.media && <span>{errors.media}</span>
                            }
                            className="mt-2"
                        />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button
                                className="mt-4"
                                onClick={() => {
                                    setEditing(false);
                                    reset();
                                    clearErrors();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <p className="mt-4 text-lg text-gray-900">
                            {chirp.message}
                        </p>
                        {chirp.media && (
                            <div className="mt-4">
                                {chirp.media.endsWith(".mp4") ? (
                                    <video
                                        controls
                                        className="w-full rounded-lg"
                                    >
                                        <source
                                            src={`/storage/${chirp.media}`}
                                            type="video/mp4"
                                        />
                                    </video>
                                ) : (
                                    <img
                                        src={`/storage/${chirp.media}`}
                                        alt="Chirp Media"
                                        className="w-fauto max-h-40 rounded-lg"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
            {isReporting && (
                <ReportUserModal
                    userId={chirp.user.id} // Kirim ID user yang akan dilaporkan
                    onClose={() => setIsReporting(false)} // Tutup modal
                />
            )}
        </div>
    );
}
