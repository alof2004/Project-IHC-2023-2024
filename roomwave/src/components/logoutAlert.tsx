import React from 'react';
import "../css/Alert.css";

const LogoutAlert: React.FC<{ show: boolean }> = ({ show }) => {
  if (show) {
    return (
      <div id="logout-alert" className="logout-alert">
        <p>Você fez logout!</p>
      </div>
    );
  }
  return null;
}

export default LogoutAlert;
