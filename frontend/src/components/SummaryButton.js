import React from 'react';
import './SummaryButton.css';

const SummaryButton = ({ onClick, loading, disabled }) => {
  return (
    <button
      className="summary-button"
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <div className="spinner"></div>
          <span>Generating Summary...</span>
        </>
      ) : (
        <span>Generate & Send Summary to Slack</span>
      )}
    </button>
  );
};

export default SummaryButton;