import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useDashboardCharts } from './hooks/useDashboardsCharts';
import { createBarOptions, createDoughnutOptions } from './ui/chartOptions';
import './css/Dashboard.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [intervalo, setIntervalo] = useState('dia');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { lucroBrutoData, servicosAprovadosData } = useDashboardCharts(intervalo);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className='dashboard-container container'>
            <h1>Dashboard</h1>
            <div className="container">
                <div className="row">
                    {/* Gráfico de Lucro Bruto */}
                    <div className="col-12 col-md-6">
                        <div className="chart-container mb-4">
                            <h2>Lucro Bruto</h2>
                            <select
                                value={intervalo}
                                onChange={(e) => setIntervalo(e.target.value)}
                                className="interval-select"
                            >
                                <option value="dia">Por Dia</option>
                                <option value="semana">Por Semana</option>
                                <option value="ano">Por Ano</option>
                            </select>
                            {lucroBrutoData ? (
                                lucroBrutoData.datasets[0].data.length > 0 ? (
                                    <div className="chart">
                                        <Bar data={lucroBrutoData} options={createBarOptions()} />
                                    </div>
                                ) : (
                                    <p>Nenhum dado disponível para o período selecionado</p>
                                )
                            ) : (
                                <p>Carregando dados...</p>
                            )}
                        </div>
                    </div>

                    {/* Gráfico de Serviços Aprovados */}
                    <div className="col-12 col-md-6">
                        <div className="chart-container doughnut-container">
                            <h2 className='text-center'>Serviços Mais Aprovados</h2>
                            {servicosAprovadosData && (
                                <div className="chart">
                                    <Doughnut
                                        data={servicosAprovadosData}
                                        options={createDoughnutOptions(isMobile)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;