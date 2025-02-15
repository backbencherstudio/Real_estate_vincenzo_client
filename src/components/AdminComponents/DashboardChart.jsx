/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { DatePicker, Select } from "antd";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import ownerApi from "../../redux/fetures/owner/ownerApi";
import { skipToken } from "@reduxjs/toolkit/query";
const DashboardChart = ({ overviewData }) => {
  // const currentUser = useSelector(selectCurrentUser);
  // const currentDate = new Date()

  // const [selectedDate, setSelectedDate] = useState(currentDate)

  // const { data } = ownerApi.useGetPaymentDataOverviewByOwnerQuery(currentUser?.userId, selectedDate)
  // console.log(data);

  // const handleChange = (value) => {
  //   if (value) {
  //     const selectedMonth = value.month() + 1;
  //     const selectedYear = value.year();

  //     setSelectedDate(selectedMonth, selectedYear)
  //   }
  // };

  const currentUser = useSelector(selectCurrentUser);

  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(
    `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`
  );

  const { data } = ownerApi.useGetPaymentDataOverviewByOwnerQuery(
    currentUser.role === "owner"
      ? { ownerId: currentUser?.userId, selectedDate }
      : skipToken
  );

  const totalDueRentAmount = data?.data?.totalDueRentAmount || 0;
  const totalPaidRentAmount = data?.data?.totalPaidRentAmount || 0;

  const handleChange = (value) => {
    if (value) {
      const selectedMonth = value.month() + 1;
      const selectedYear = value.year();
      setSelectedDate(`${selectedYear}-${selectedMonth}`);
    }
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
  
  console.log(overviewData);

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

  const donutChartOptions = {
    series: [totalPaidRentAmount, totalDueRentAmount],
    chart: {
      type: "donut",
    },
    colors: ["#4a90e2", "#E0E0E0"],
    labels: ["Received Rent", "Due Rent"],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: false,
            },
          },
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
      labels: {
        colors: "#000000",
      },
      formatter: function (seriesName, opts) {
        return [
          seriesName,
          " - ",
          opts.w.globals.series[opts.seriesIndex],
          "$",
        ];
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }, []);

  return (
    <div
      className={`grid grid-cols-1 ${
        currentUser?.role === "owner" ? "lg:grid-cols-3" : "lg:grid-cols-2"
      } lg:gap-10 mt-4`}
    >
      <div
        className={`bg-white p-5 rounded-md relative overflow-hidden ${
          currentUser.role === "owner" ? "col-span-2" : "col-span-1"
        }`}
      >
        <div className="flex justify-between">
          <h2>Property Overview</h2>

          {/* <Select
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
          /> */}
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
      <div className="bg-white mt-5 lg:mt-0 p-5 rounded-md relative overflow-hidden col-span-1">
        {currentUser?.role === "admin" ? (
          <div>
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
        ) : (
          <div>
            <div className="flex justify-between">
              <h2>Rent Overview</h2>
              <DatePicker
                onChange={handleChange}
                picker="month"
                format="MMM YYYY"
              />
            </div>
            <div className="mt-5">
              {totalDueRentAmount === 0 && totalPaidRentAmount === 0 ? (
                <div className="flex justify-center items-center">
                  {" "}
                  <h2 className="text-center text-2xl mt-10">
                    {" "}
                    Looks like there's nothing here yet!{" "}
                  </h2>{" "}
                </div>
              ) : (
                <ReactApexChart
                  options={donutChartOptions}
                  series={donutChartOptions.series}
                  type="donut"
                  height={350}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DashboardChart;
