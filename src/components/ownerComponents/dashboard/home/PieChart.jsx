import React from "react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = ({ count }) => {
  if (!count || typeof count !== "object") {
    return null;
  }

  const data = {
    labels: Object.keys(count),
    datasets: [
      {
        label: "Count",
        data: Object.values(count),
        backgroundColor: Object.keys(count).map((status) => {
          switch (status) {
            case "Cancelled":
              return "rgba(255, 159, 64, 1)"; // Darker Orange for Cancelled
            case "Success":
              return "rgba(0, 255, 0, 0.9)"; // Bright Green for Success
            case "CheckedIn":
              return "rgba(255, 206, 86, 1)"; // Brighter Yellow for CheckedIn
            case "CheckedOut":
              return "rgba(54, 162, 235, 0.9)"; // Darker Blue for CheckedOut
            default:
              return "rgba(153, 102, 255, 0.8)"; // Default color
          }
        }),
        borderColor: Object.keys(count).map((status) => {
          switch (status) {
            case "Cancelled":
              return "rgba(255, 159, 64, 1)"; // Darker Orange for Cancelled
            case "Success":
              return "rgba(0, 255, 0, 0.9)"; // Bright Green for Success
            case "CheckedIn":
              return "rgba(255, 206, 86, 1)"; // Brighter Yellow for CheckedIn
            case "CheckedOut":
              return "rgba(54, 162, 235, 0.9)"; // Darker Blue for CheckedOut
            default:
              return "rgba(153, 102, 255, 1)"; // Default color
          }
        }),
        borderWidth: 2,
        hoverOffset: 10, // Increase hover offset
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default PieChart;
