import React, { Component, useMemo, useEffect, useRef } from "react";
// import Chart from "react-apexcharts";
import Chart from "chart.js/auto";
const ETLSample = ({ chartData, parserType = "" }) => {
  const chartRef = useRef(null);
  const categoryChartDomRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // console.log("chartData", chartRef.current);

      chartRef.current.data.labels = [];
      chartRef.current.data.datasets[0].data = chartData;
      chartRef.current.update();
    }
  }, [chartRef, chartData]);

  useEffect(() => {
    // if (!chartRef.current && categoryChartDomRef.current) {
    //   let xyParser = {
    //     xAxisKey: "total_amount",
    //     yAxisKey: "client_name",
    //   };

    //   if (parserType === "companyTotals") {
    //     xyParser.yAxisKey = "product_company";
    //   }

    //   if (parserType === "categoryTotals") {
    //     xyParser.yAxisKey = "product_category_name";
    //   }
    chartRef.current = new Chart(categoryChartDomRef.current, {
      type: "pie",

      data: {
        labels: ["Company    ", "Category    ", "Client  "],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
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
            position: "right",
          },
        },
      },
    });
  }, [chartData, parserType]);

  const renderChart = useMemo(() => {
    return <canvas ref={categoryChartDomRef} />;
  }, []);

  return (
    <div
      id="chart"
      style={{
        display: "flex",
        alignContent: "center",
        width: "450px",
        height: "450px",
      }}
    >
      {renderChart}
    </div>
  );
};

export default ETLSample;
