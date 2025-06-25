import { BarElement, CategoryScale, Chart as ChartJS, ChartOptions, Legend, LinearScale, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
    data: {
        report_date: string;
        total_revenue: number;
        total_expense: number;
        net_profit: number;
    }[];
}

const ProfitChart: React.FC<Props> = ({ data }) => {
    const chartData = {
        labels: data.map((item) => item.report_date),
        datasets: [
            {
                label: 'Total Pendapatan',
                data: data.map((item) => item.total_revenue),
                backgroundColor: '#22c55e', // hijau
            },
            {
                label: 'Total Pengeluaran',
                data: data.map((item) => item.total_expense),
                backgroundColor: '#ef4444', // merah
            },
            {
                label: 'Laba Bersih',
                data: data.map((item) => item.net_profit),
                backgroundColor: '#3b82f6', // biru
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true, // tampilkan legenda
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="mx-auto h-[400px] w-full">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ProfitChart;
