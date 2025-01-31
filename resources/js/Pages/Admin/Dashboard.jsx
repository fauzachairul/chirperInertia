import React from "react";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Components/layout";
import ChirpStatistics from "@/Components/ChirpStatistics";

const Dashboard = ({
    userCount,
    chirpReportCount,
    userReportCount,
    auth,
    labels,
    data,
    selectedPeriod,
}) => {
    return (
        <Layout user={auth.user}>
            <Head title="Dashboard" />
            <div className="w-full py-10">
                <h1>Dashboard</h1>

                <div className="mt-10 flex gap-10 flex-wrap justify-between">
                    <Link
                        href={route("users.index")}
                        className="flex-grow flex-shrink-0 p-6 shadow-lg bg-gradient-to-br from-slate-50 to-gray-100 rounded-lg w-max border border-slate-800"
                    >
                        <div className="flex flex-col justify-center items-center">
                            <h1>Jumlah Users</h1>
                            <p className="mt-5 text-3xl font-semibold">
                                {userCount}
                            </p>
                        </div>
                    </Link>
                    <Link
                        href={route("admin.report.index")}
                        className="flex-grow flex-shrink-0 p-6 shadow-lg bg-gradient-to-br from-slate-50 to-gray-100 rounded-lg w-max border border-slate-800"
                    >
                        <div className="flex flex-col justify-center items-center">
                            <h1>Chirp Reports</h1>
                            <p className="mt-5 text-3xl font-semibold">
                                {chirpReportCount}
                            </p>
                        </div>
                    </Link>
                    <Link
                        href={route("admin.user.reports")}
                        className="flex-grow flex-shrink-0 p-6 shadow-lg bg-gradient-to-br from-slate-50 to-gray-100 rounded-lg w-max border border-slate-800"
                    >
                        <div className="flex flex-col justify-center items-center">
                            <h1>User Reports</h1>
                            <p className="mt-5 text-3xl font-semibold">
                                {userReportCount}
                            </p>
                        </div>
                    </Link>
                </div>
                {/* Komponen Statistik Chirps */}
                <ChirpStatistics
                    labels={labels}
                    data={data}
                    selectedPeriod={selectedPeriod}
                />
            </div>
        </Layout>
    );
};

export default Dashboard;
