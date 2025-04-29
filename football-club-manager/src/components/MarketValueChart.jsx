import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function MarketValueChart({marketValueHistory}){
  const labels = marketValueHistory.map(
      entry => `${entry.date}`
    );

  const dataValues = marketValueHistory.map(entry => entry.marketValue);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            const value = new Intl.NumberFormat('de-DE').format(context.raw);
            const teamName = marketValueHistory[context.dataIndex].clubName;
            return `€${value} - ${teamName}`;
          }
        }
      }
    },

    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        }
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Market Value (€)',
        data: dataValues,
        borderColor: 'rgb(75, 192, 77)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  return <Line options={options} data={data} />;
}

export default MarketValueChart