import DashboardStats from "./components/DashboardStats";
import AmountStats from "./components/AmountStats";
import PageStats from "./components/PageStats";

import FireIcon from "@heroicons/react/24/outline/FireIcon";
import BellAlertIcon from "@heroicons/react/24/outline/BellAlertIcon";
import EyeDropperIcon from "@heroicons/react/24/outline/EyeDropperIcon";
import ArrowTrendingDownIcon from "@heroicons/react/24/outline/ArrowTrendingDownIcon";
import UserChannels from "./components/UserChannels";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import DoughnutChart from "./components/DoughnutChart";
import fastapi from "../../lib/api";
import { useEffect, useState } from "react";

function Dashboard({ container_id }) {
  const dispatch = useDispatch();
  const containerr = {
    id: 1,
    name: "Virtual Container",
    cold: false,
    temperature: 26.4,
    humidity: 20.0,
    slope: 17.3,
    vibration: 31.5,
    port: "Port",
    wharf: "Wharf",
    create_date: "2021-04-15T15:40:15.087337",
    modify_date: "2021-05-21T10:40:15.087337",
  };
  const [container, setContainer] = useState(containerr);

  useEffect(async () => {
    console.log("왜?");
    await fastapi("get", "/api/container/detail/" + container_id).then(
      (data) => {
        setContainer(data);
      }
    );
  }, []);

  const statsData = [
    {
      title: "Temperature",
      value: container.temperature.toFixed(2),
      icon: <FireIcon className="w-8 h-8" />,
      description: "↗︎ 2300 (22%)",
    },
    {
      title: "Slope",
      value: container.slope.toFixed(2),
      icon: <ArrowTrendingDownIcon className="w-8 h-8" />,
      description: "Current month",
    },
    {
      title: "Humidity",
      value: container.humidity.toFixed(2),
      icon: <EyeDropperIcon className="w-8 h-8" />,
      description: "50 in hot containers",
    },
    {
      title: "Vibration",
      value: container.vibration.toFixed(2),
      icon: <BellAlertIcon className="w-8 h-8" />,
      description: "↙ 300 (18%)",
    },
  ];

  const updateDashboardPeriod = (newRange) => {
    // Dashboard range changed, write code to refresh your values
    dispatch(
      showNotification({
        message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
        status: 1,
      })
    );
  };

  return (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      {/** ---------------------- Different charts ------------------------- */}
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart title="Temperature" lastNum={container.temperature} />
        <LineChart title="Slope" lastNum={container.slope} />
        <LineChart title="Humidity" lastNum={container.humidity} />
        <LineChart title="Vibration" lastNum={container.vibration} />
        {/* <BarChart /> */}
      </div>

      {/** ---------------------- Different stats content 2 ------------------------- */}

      {/* <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        <AmountStats />
        <PageStats />
      </div> */}

      {/** ---------------------- User source channels table  ------------------------- */}

      {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <UserChannels />
        <DoughnutChart />
      </div> */}
    </>
  );
}

export default Dashboard;
