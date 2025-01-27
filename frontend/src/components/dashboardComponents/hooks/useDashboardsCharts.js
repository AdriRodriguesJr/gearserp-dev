// hooks/useDashboardCharts.js
import { useState, useEffect } from 'react';
import { fetchLucroBruto, fetchServicosAprovados } from '../api/dashboardApi';

const monochromaticPalette = [
    '#2C3E50', '#72A2CE', '#3A5269', '#648EB5', '#486683', '#567A9C'
];

export const useDashboardCharts = (intervalo) => {
    const [lucroBrutoData, setLucroBrutoData] = useState(null);
    const [servicosAprovadosData, setServicosAprovadosData] = useState(null);

    const formatLucroBrutoData = (data) => ({
        labels: data.map(item => item.periodo),
        datasets: [{
            label: 'Lucro Bruto',
            data: data.map(item => item.lucro_bruto),
            backgroundColor: 'rgba(44, 62, 80, 0.6)',
            borderColor: '#2C3E50',
            borderWidth: 1
        }]
    });

    const formatServicosData = (data) => ({
        labels: data.map(item => item.nome_servico),
        datasets: [{
            data: data.map(item => Number(item.total_aprovados)),
            backgroundColor: monochromaticPalette,
            hoverBackgroundColor: monochromaticPalette.map(color => color + 'CC'),
            borderWidth: 0
        }]
    });

    useEffect(() => {
        const loadChartData = async () => {
            try {
                const lucroBruto = await fetchLucroBruto(intervalo);
                setLucroBrutoData(formatLucroBrutoData(lucroBruto));

                const servicosAprovados = await fetchServicosAprovados();
                setServicosAprovadosData(formatServicosData(servicosAprovados));
            } catch (error) {
                console.error('Erro ao carregar dados dos gráficos:', error);
            }
        };

        loadChartData();
    }, [intervalo]);

    return { lucroBrutoData, servicosAprovadosData };
};
