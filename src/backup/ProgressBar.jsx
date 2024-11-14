import { useEffect, useState } from "react";

const ProgressBar = ({ value = 0 }) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(300, Math.max(value, 0)));
  }, [value]);

  return (
    <div className="progress-bar">
      <span style={{ color: percent > 49 ? "white" : "black" }}>
        {percent.toFixed()}%
      </span>
      <div
        // style={{ width: `${percent}%` }} //optimization issue as width changes everytime
        style={{
          transform: `scaleX(${percent / 300})`,
          transformOrigin: "left",
        }}
        role="progress bar"
        aria-valuemin={0}
        aria-valuemax={300}
        aria-valuenow={percent}
      ></div>
    </div>
  );
};

export default ProgressBar;
