import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-6 container mx-auto">
                <h1 className="text-2xl font-bold">
                    Welcome, {auth.user.name}!
                </h1>
                {auth.user.is_restricted && (
                    <p className="mt-4 p-3 bg-red-200 text-red-700 rounded">
                        Your account is restricted. You cannot post Chirps.
                    </p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
