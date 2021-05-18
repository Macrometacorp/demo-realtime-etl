import React, { Component, useMemo, useEffect, useRef } from "react";
// import Chart from "react-apexcharts";
import Chart from "chart.js/auto";
const ETLChartComponent = ({ chartData, parserType = "" }) => {
  const chartRef = useRef(null);
  const categoryChartDomRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      console.log("chartData", chartRef.current);

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
          indexAxis: "y",
          parsing: xyParser,
          spanGaps: true,
          showLine: false,
          animations: false,
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
          // disable for all datasets
        },
      });
    }
  }, [chartData, parserType]);

  const renderChart = useMemo(() => {
    return <canvas ref={categoryChartDomRef} />;
  }, []);

  return <div id="chart">{renderChart}</div>;
};

export default ETLChartComponent;
