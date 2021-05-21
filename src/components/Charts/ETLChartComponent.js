import React, { useMemo, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
const ETLChartComponent = ({ chartData, parserType = "", chartText }) => {
  const chartRef = useRef(null);
  const categoryChartDomRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data.labels = [];
      chartRef.current.data.datasets[0].data = chartData;
      chartRef.current.update();
    }
  }, [chartRef, chartData]);

  useEffect(() => {
    if (!chartRef.current && categoryChartDomRef.current) {
      let xyParser = {
        xAxisKey: "total_amount",
        yAxisKey: "client_name",
      };

      if (parserType === "companyTotals") {
        xyParser.yAxisKey = "product_company";
      }

      if (parserType === "categoryTotals") {
        xyParser.yAxisKey = "product_category_name";
      }
      categoryChartDomRef.current.setAttribute("height", "200%");
      chartRef.current = new Chart(categoryChartDomRef.current, {
        type: "bar",
        elements: {
          bar: {
            // borderWidth: 10,
          },
        },
        data: {
          datasets: [
            {
              label: "Totals",
              data: chartData,
              backgroundColor: ["#338AD0"],
            },
          ],
        },
        options: {
          maintainAspectRatio: true,
          responsive: true,
          indexAxis: "y",
          parsing: xyParser,
          animations: true,
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                autoSkip: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
              ticks: {
                autoSkip: false,
              },
            },
          },
          plugins: {
            title: {
              text: chartText,
              position: "bottom",
              display: true,
              font: {
                size: 16,
                weight: "bold",
              },
            },
            legend: {
              display: false,
            },
          },
          // disable for all datasets
        },
      });
    }
  }, [chartData, parserType, chartText]);

  const renderChart = useMemo(() => {
    return <canvas ref={categoryChartDomRef} />;
  }, []);

  return <div id="chart">{renderChart}</div>;
};

export default ETLChartComponent;
