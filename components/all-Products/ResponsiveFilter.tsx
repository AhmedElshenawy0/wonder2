import React from 'react'

const ResponsiveFilter = () => {
  return (
<div className="responsive-filters">
        <p className="count"></p>

        <button className="responsive-filter-buttom">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 23 19"
            fill="none"
            className="filter_svg__feather filter_svg__feather-filter everlane-icon styles_filter-toggle__filter-icon__ILXRd"
          >
            <path
              stroke="currentColor"
              d="M.625 3.829h21.75M.625 14.738h21.75"
            ></path>
            <circle
              cx="7.455"
              cy="4"
              r="3.375"
              fill="#fff"
              stroke="currentColor"
            ></circle>
            <circle
              cx="14.999"
              cy="14.909"
              r="3.375"
              fill="#fff"
              stroke="currentColor"
            ></circle>
          </svg>
          FILTERS
        </button>
      </div>)
}

export default ResponsiveFilter