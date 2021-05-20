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
      chartRef.current = new Chart(categoryChartDomRef.current, {
        type: "bar",
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        data: {
          datasets: [
            {
              label: "Totals",
              data: chartData,
              backgroundColor: ["#338AD0"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          maintainAspectRatio: true,
          responsive: true,
          indexAxis: "y",
          parsing: xyParser,
          spanGaps: true,
          showLine: false,
          animations: true,
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                autoSkip: false,
              },
              // min: 10000,
              // max: 600000,
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

  return (
    <div id="chart" style={{ height: "auto", width: "auto" }}>
      {renderChart}
    </div>
  );
};

export default ETLChartComponent;
