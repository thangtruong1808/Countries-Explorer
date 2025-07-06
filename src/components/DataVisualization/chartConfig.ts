import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#666666',
        font: {
          size: 11,
          weight: 500,
        },
        usePointStyle: true,
        padding: 15,
      },
    },
    tooltip: {
      backgroundColor: '#ffffff',
      titleColor: '#000000',
      bodyColor: '#666666',
      borderColor: '#e0e0e0',
      borderWidth: 1,
      cornerRadius: 8,
      titleFont: {
        size: 13,
        weight: 600,
      },
      bodyFont: {
        size: 12,
      },
    },
  },
};

export const pieChartOptions = {
  ...baseChartOptions,
  plugins: {
    ...baseChartOptions.plugins,
    legend: {
      ...baseChartOptions.plugins.legend,
      display: true,
    },
  },
};

export const barChartOptions = {
  ...baseChartOptions,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#e0e0e0',
        drawBorder: false,
      },
      ticks: {
        color: '#666666',
        font: {
          size: 11,
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#666666',
        font: {
          size: 11,
        },
      },
    },
  },
}; 