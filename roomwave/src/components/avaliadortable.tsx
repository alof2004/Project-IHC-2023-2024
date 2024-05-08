import React, { useState, useEffect } from 'react';
import './styles.css'; // Import your CSS file

function ResponsiveTable() {
  const [isResponsive, setIsResponsive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 767);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="container">
      <h2>Responsive Tables Using LI <small>Triggers on 767px</small></h2>
      <div className={isResponsive ? 'responsive-table-wrapper' : ''}>
        {isResponsive ? (
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1">Job Id</div>
              <div className="col col-2">Customer Name</div>
              <div className="col col-3">Amount Due</div>
              <div className="col col-4">Payment Status</div>
            </li>
            <li className="table-row">
              <div className="col col-1" data-label="Job Id">42235</div>
              <div className="col col-2" data-label="Customer Name">John Doe</div>
              <div className="col col-3" data-label="Amount">$350</div>
              <div className="col col-4" data-label="Payment Status">Pending</div>
            </li>
            {/* Additional table rows */}
          </ul>
        ) : (
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Job Id</th>
                <th>Customer Name</th>
                <th>Amount Due</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Job Id">42235</td>
                <td data-label="Customer Name">John Doe</td>
                <td data-label="Amount">$350</td>
                <td data-label="Payment Status">Pending</td>
              </tr>
              {/* Additional table rows */}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ResponsiveTable;
