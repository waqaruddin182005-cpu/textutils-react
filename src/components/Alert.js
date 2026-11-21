import React, { useEffect } from 'react';

export default function Alert({ alert, onClose }) {
  useEffect(() => {
    if (!alert) {
      return undefined;
    }

    const timeoutId = window.setTimeout(onClose, 3000);
    return () => window.clearTimeout(timeoutId);
  }, [alert, onClose]);

  if (!alert) {
    return null;
  }

  return (
    <div key={alert.id} className={`alert alert-${alert.type} alert-dismissible fade show textutils-alert`} role="alert">
      {alert.message}
      <button type="button" className="btn-close" aria-label="Close alert" onClick={onClose} />
    </div>
  );
}
