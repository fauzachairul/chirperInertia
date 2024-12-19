import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Chirp from "@/Components/Chirp";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

export default function Index({ auth, chirps }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: "",
        media: null,
    });

    const [preview, setPreview] = useState(null); // State untuk menyimpan preview

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        setData("media", file);

        // Jika file adalah gambar, buat URL untuk preview
        if (file && file.type.startsWith("image/")) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else {
            setPreview(null); // Reset preview jika bukan gambar
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("chirps.store"), {
            onSuccess: () => {
                reset(); // Reset state form
                setPreview(null);

                const fileInput = document.getElementById("media");
                if (fileInput) {
                    fileInput.value = null; // Reset nilai input file
                }
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Chirps" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit} encType="multipart/form-data">
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("message", e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <input
                        type="file"
                        id="media"
                        onChange={handleMediaChange}
                        className="block mt-5"
                    />
                    <InputError
                        message={errors.media && <span>{errors.media}</span>}
                        className="mt-2"
                    />
                    {/* menampilkan previe media yang di upload jika ada*/}
                    {preview && (
                        <div className="mt-4">
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-w-52 h-auto rounded-lg shadow-md"
                            />
                        </div>
                    )}
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Chirp
                    </PrimaryButton>
                </form>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {chirps.map((chirp) => (
                        <Chirp key={chirp.id} chirp={chirp} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
