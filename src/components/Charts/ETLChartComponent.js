import React, { Component } from "react";
import Chart from "react-apexcharts";

const ETLChartComponent = ({ categoryTotals, category }) => {
  console.log(`Logged output: ETLChartComponent -> category`, category);
  console.log(
    `Logged output: ETLChartComponent -> categoryTotals`,
    categoryTotals
  );
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
          enabled: false,
          // easing: "easeinout",
          // speed: 800,
          // animateGradually: {
          //   enabled: true,
          //   delay: 150,
          // },
          dynamicAnimation: {
            enabled: false,
            // speed: 350,
          },
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
    },
  };

  return (
    <div id="chart">
      <Chart
        options={optionsData.options}
        series={seriesData.series}
        type="bar"
        height={350}
        a
        width={500}
      />
    </div>
  );
};

export default ETLChartComponent;
