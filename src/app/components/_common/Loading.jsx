import React from 'react';

const spinnerStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%'
}

const Loading = () => {

    return (
        <div className="loading" style={spinnerStyles}>
            <svg width='40px' height='40px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                    className="uil-reload">
                <rect x="0" y="0" width="100" height="100" fill="none" className="bk"></rect>
                <g>
                    <path d="M50 15A35 35 0 1 0 74.787 25.213" fill="none" stroke="#293037"
                            strokeWidth="12px"></path>
                    <path d="M50 0L50 30L66 15L50 0" fill="#293037"></path>
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s"
                                        repeatCount="indefinite"></animateTransform>
                </g>
            </svg>
        </div>
    )
}

export default Loading 