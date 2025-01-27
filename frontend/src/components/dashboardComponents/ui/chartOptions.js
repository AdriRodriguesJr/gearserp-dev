export const formatNumber = (value) => {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(0) + 'k';
    }
    return value.toString();
};

export const createBarOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function (value) {
                    return value.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });
                }
            }
        },
        x: {
            grid: {
                display: false
            }
        }
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return context.parsed.y.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });
                }
            }
        }
    }
});

export const createDoughnutOptions = (isMobile) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: isMobile ? 'bottom' : 'right',
            align: 'center',
            labels: {
                font: {
                    size: isMobile ? 10 : 12
                },
                color: '#2C3E50',
                padding: isMobile ? 10 : 15,
                boxWidth: isMobile ? 12 : 15,
                generateLabels: function (chart) {
                    const data = chart.data;
                    if (data.labels.length && data.datasets.length) {
                        return data.labels.map((label, i) => ({
                            text: `${label} (${formatNumber(data.datasets[0].data[i])})`,
                            fillStyle: data.datasets[0].backgroundColor[i],
                            hidden: false,
                            index: i
                        })).slice(0, 5);
                    }
                    return [];
                }
            }
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: function (context) {
                    const label = context.label?.split('(')[0].trim() || '';
                    const value = context.parsed;
                    return `${label}: ${formatNumber(value)}`;
                }
            },
            titleFont: {
                size: isMobile ? 10 : 12
            },
            bodyFont: {
                size: isMobile ? 9 : 11
            }
        }
    },
    cutout: '75%',
    scales: {
        x: { display: false },
        y: { display: false }
    },
    layout: {
        padding: {
            bottom: isMobile ? 0 : 10,
            right: isMobile ? 0 : 10
        }
    }
});
