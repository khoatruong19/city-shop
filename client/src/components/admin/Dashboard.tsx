import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { useAppDispatch, useAppSelector } from '../../store';

ChartJS.register(...registerables);

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { products, loading } = useAppSelector((state) => state.product);

  const { orders } = useAppSelector((state) => state.order);

  const { user } = useAppSelector((state) => state.user);

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['#3BB77E'],
        hoverBackgroundColor: ['#3BB77E'],
        data: [0, 120],
      },
    ],
  };

  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [1, products.length - 1],
      },
    ],
  };

  return (
    <div>
      asdjasd
      <div style={{ width: '80vw' }}>
        <Line data={lineState} />
      </div>
      <div style={{ width: '80vw' }}>
        <Doughnut data={doughnutState} />
      </div>
    </div>
  );
};

export default Dashboard;
