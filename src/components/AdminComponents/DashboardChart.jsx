import { Select } from "antd";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
const DashboardChart = ({ overviewData }) => {
  console.log(overviewData?.data);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const chartOptions = {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      hover: {
        sizeOffset: 2,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => `${val} `,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (value) {
          return new Date(value).toLocaleDateString("default", {
            month: "short",
            year: "numeric",
          });
        },
      },
    },
  };

  const propertyChartOptions = {
    ...chartOptions,
    colors: ["#4A90E2"],
    series: [
      {
        name: "Properties",
        data: overviewData?.data?.monthlyProperties?.map((item) => item.count),
      },
    ],
    xaxis: {
      ...chartOptions.xaxis,
      categories: overviewData?.data?.monthlyProperties?.map(
        (item) => item.date
      ),
    },
  };

  const tenantChartOptions = {
    ...chartOptions,
    colors: ["#86C0FB"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    series: [
      {
        name: "Tenants",
        data: overviewData?.data?.monthlyTenants?.map((item) => item.count),
      },
    ],
    xaxis: {
      ...chartOptions.xaxis,
      categories: overviewData?.data?.monthlyTenants?.map((item) => item.date),
    },
  };

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">
      <div className="bg-white p-5 rounded-md relative overflow-hidden">
        <div className="flex justify-between">
          <h2>Property Overview</h2>

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
              options={propertyChartOptions}
              series={propertyChartOptions.series}
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
            options={tenantChartOptions}
            series={tenantChartOptions.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};
export default DashboardChart;
