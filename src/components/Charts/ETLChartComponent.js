import React, { Component, useMemo } from "react";
import Chart from "react-apexcharts";

const ETLChartComponent = ({ categoryTotals, category }) => {
  //console.log(`Logged output: ETLChartComponent -> category`, category);
  // //console.log(
  //   `Logged output: ETLChartComponent -> categoryTotals`,
  //   categoryTotals
  // );
  const seriesData = {
    series: [
      {
        data: categoryTotals || [],
      },
    ],
  };
  const optionsData = {
    options: {
      chart: {
        type: "bar",
        height: 350,
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          // dynamicAnimation: {
          //   enabled: true,
          //   speed: 350,
          // },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        // categories: [
        //   "Subbotin Adrian Guryevich",
        //   "Larisa Andreevna Mironov",
        //   "Alevtina Ivanovna Filippova",
        //   "Fadeev Cyrus Leonovna",
        //   "Agathon V. Kudryashov",
        //   "Kolesnikov Claudius Vikentievich",
        //   "Afanasiev Nikon Efimevich",
        //   "Scherbakov Valentina",
        //   "ChinPopov Euphrosinia D.a",
        //   "Antonov Athanasius Ilyasovich",
        // ],
        categories: category || [],
      },
      title: {
        text: "nujjrag",
        align: "center",
        margin: 10,
        offsetX: 0,
        offsetY: 360,
        floating: false,
        style: {
          fontSize: "12px",
          fontWeight: "normal",
          fontFamily: undefined,
          color: "red",
        },
      },
    },
  };
  const renderChart = useMemo(() => {
    return (
      <Chart
        options={optionsData.options}
        series={seriesData.series}
        type="bar"
        height={350}
        width={500}
      />
    );
  }, [optionsData.options, seriesData.series]);

  return <div id="chart">{renderChart}</div>;
};

export default ETLChartComponent;
