import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Registrasi Chart.js
Chart.register(...registerables);

export default function ChirpStatistics() {
    const { labels, data, selectedPeriod } = usePage().props;
    const [period, setPeriod] = useState(selectedPeriod || "daily");

    // Handle perubahan periode
    const handleChangePeriod = (e) => {
        const newPeriod = e.target.value;
        setPeriod(newPeriod);
        router.get(
            route("admin.chirpStatistics"),
            { period: newPeriod },
            { preserveState: true }
        );
    };

    // Data untuk Chart.js
    const chartData = {
        labels,
        datasets: [
            {
                label: "Jumlah Chirps",
                data,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                fill: true,
                tension: 0.3,
            },
        ],
    };

    return (
        <div className="p-4 border rounded bg-gray-100 mt-20">
            <h2 className="text-lg font-bold mb-2">Grafik Chirps</h2>

            {/* Dropdown untuk memilih periode */}
            <select
                value={period}
                onChange={handleChangePeriod}
                className="mb-4 p-2 border rounded-md bg-white"
            >
                <option value="daily">Harian</option>
                <option value="weekly">Mingguan</option>
                <option value="monthly">Bulanan</option>
            </select>

            <Line data={chartData} />
        </div>
    );
}
