import React, { useMemo, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
const ETLPieChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const categoryChartDomRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = chartData;
      chartRef.current.update();
    }
  }, [chartRef, chartData]);

  useEffect(() => {
    if (!chartRef.current && categoryChartDomRef.current) {
      chartRef.current = new Chart(categoryChartDomRef.current, {
        type: "pie",

        data: {
          labels: [
            "Merchant Totals($)",
            "Category Totals($)",
            "Purchaser Totals($)",
          ],
          datasets: [
            {
              label: "Totals",
              data: chartData,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              text: "Totals",
              display: true,
              position: "bottom",
              font: {
                size: 16,
                weight: "bold",
              },
            },
            legend: {
              position: "bottom",
            },
          },
        },
      });
    }
  }, [chartData]);

  const renderChart = useMemo(() => {
    return <canvas ref={categoryChartDomRef} />;
  }, []);

  return <div id="chart">{renderChart}</div>;
};

export default ETLPieChart;
