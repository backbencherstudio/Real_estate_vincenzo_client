import { Select } from "antd";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const DashboardChart = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const options = {
    series: [
      {
        name: "PRODUCT A",
        data: [44, 55, 41, 67, 22, 43, 30],
      },
      {
        name: "PRODUCT B",
        data: [13, 23, 20, 8, 13, 27, 50],
      },
      {
        name: "PRODUCT C",
        data: [11, 17, 15, 15, 21, 14, 25],
      },
      {
        name: "PRODUCT D",
        data: [21, 7, 25, 13, 22, 8, 10],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
      animations: {
        enabled: true, // Helps with rendering during initial load
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: [
        "01/01/2011 GMT",
        "01/02/2011 GMT",
        "01/03/2011 GMT",
        "01/04/2011 GMT",
        "01/05/2011 GMT",
        "01/06/2011 GMT",
        "01/07/2011 GMT",
      ],
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  };

  const [state, setState] = useState({
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  // Force chart to refresh when component mounts
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300); // Add small delay to simulate container resize
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">
      <div className="bg-white p-5 rounded-md relative overflow-hidden">
        <div className="flex justify-between">
          <h2>Owner Overview</h2>

          <Select
            defaultValue="lucy"
            style={{
              width: 150,
            }}
            onChange={handleChange}
            options={[
              {
                label: <span>manager</span>,
                title: "manager",
                options: [
                  {
                    label: <span>Jack</span>,
                    value: "Jack",
                  },
                  {
                    label: <span>Lucy</span>,
                    value: "Lucy",
                  },
                ],
              },
            ]}
          />
        </div>

        <div>
          <div className="w-full mt-5">
            <ReactApexChart
              options={options}
              series={options.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-md relative overflow-hidden">
        <div className="flex justify-between">
          <h2>Tenant Overview</h2>
          <Select
            defaultValue="lucy"
            style={{
              width: 150,
            }}
            onChange={handleChange}
            options={[
              {
                label: <span>manager</span>,
                title: "manager",
                options: [
                  {
                    label: <span>Jack</span>,
                    value: "Jack",
                  },
                  {
                    label: <span>Lucy</span>,
                    value: "Lucy",
                  },
                ],
              },
            ]}
          />
        </div>

        <div className="mt-5">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
