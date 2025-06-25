import { ArcElement, ChartData, Chart as ChartJS, ChartOptions, Legend, Title, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface Props {
    data: {
        [key: string]: number;
    };
}

const PaymentMethodPieChart: React.FC<Props> = ({ data }) => {
    const labels = Object.keys(data)?.map((label) =>
        label
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
    );
    const values = Object.values(data);

    const chartData: ChartData<'pie'> = {
        labels,
        datasets: [
            {
                label: 'Jumlah Transaksi',
                data: values,
                backgroundColor: ['#4ade80', '#60a5fa'],
                borderColor: '#ffffff',
                borderWidth: 2,
            },
        ],
    };

    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Transaksi Berdasarkan Metode Pembayaran',
                font: {
                    size: 16,
                },
            },
        },
    };

    return <Pie data={chartData} options={options} />;
};

export default PaymentMethodPieChart;
