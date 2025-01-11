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
        data: [44, 55, 41, 67, 22, 43, 20],
      },
      {
        name: "PRODUCT B",
        data: [13, 23, 20, 8, 53, 27, 50],
      },
      {
        name: "PRODUCT c",
        data: [20, 33, 30, 5, 63, 67, 60],
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
        enabled: false,
      },
      animations: {
        enabled: true,
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
        borderRadius: 0,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        // dataLabels: {
        //   total: {
        //     enabled: true,
        //     style: {
        //       fontSize: "13px",
        //       fontWeight: 900,
        //     },
        //   },
        // },
        stroke: {
          show: true,       
          width: 2,         
          colors: ['#000000'], 
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
    colors: ['#4A90E2', '#68AEF5', '#F0F7FE'],
  };
  const [state, setState] = useState({
    series: [{
      data: [
        587, 419, 743, 351, 688, 945, 598, 294, 193, 106, 
        768, 498, 257, 873, 637, 709, 564, 387, 596, 347, 
      ]
    }],
    options: {
      chart: {
        type: 'line',
        height: 350,
        zoom: {
          enabled: true 
        }
      },
      stroke: {
        curve: 'stepline',
        width: 1 
      },
      colors: ['#86C0FB'], 
      dataLabels: {
        enabled: false
      },
      title: {
        text: '',
        align: 'left'
      },
      markers: {
        hover: {
          sizeOffset: 2
        }
      },
      tooltip: {
        shared: true,
        intersect: false, 
        x: {
          show: true, 
        },
        y: {
          formatter: (val) => `${val} units`, 
        }
      },
      xaxis: {
        categories: ['Jan', 'Jan', 'Feb', 'Feb', 'Mar', 'Mar', 'Apr', 'Apr', 'May', 'Jun', 'Jul'],
        crosshairs: {
          show: true, 
          width: 1,
          position: 'front',
          opacity: 0.9,
          stroke: {
            color: '#86C0FB', 
            width: 1,
            dashArray: 0
          }
        }
      },
      yaxis: {
        crosshairs: {
          show: true, 
          width: 1,
          position: 'front',
          opacity: 0.9,
          stroke: {
            color: '#86C0FB',
            width: 1,
            dashArray: 0
          }
        }
      }
    },
  });
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
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
