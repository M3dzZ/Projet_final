import React from "react";
import "./Objective.scss";

function Objective() {
  return (
    <div className="quest">
      <div className="box__quest">
        <div className="test"></div>
        <div className="trash">
          <div className="trash__content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zM9 4v2h6V4H9z"
                fill="#FFF"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Objective;
