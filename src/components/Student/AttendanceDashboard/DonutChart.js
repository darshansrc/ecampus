import React from 'react';

const DonutChart = ({ totalAttendancePercentage }) => {
  const radius = 50; // Radius of the donut chart
  const circumference = 2 * Math.PI * radius; // Circumference of the donut chart
  const percentageFilled = (totalAttendancePercentage / 100) * circumference; // Length of the filled portion

  let color = "#ffc107"; // Default color is yellow

  if (totalAttendancePercentage > 75) {
    color = "green"; // Red if above 75%
  } else if (totalAttendancePercentage < 50) {
    color = "red"; // Red if below 50%
  }

  return (
    <svg width="120" height="120">
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke="#ccc"
        strokeWidth="10"
      />
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeDasharray={`${percentageFilled} ${circumference}`}
      />
      <text
        x="62"
        y="63"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: "25px",fontWeight: 'bolder' }}
      >
        {`${totalAttendancePercentage}%`}
      </text>
    </svg>
  );
};

export default DonutChart;
