
import React from 'react';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="py-6 mb-6">
      <h1 className="text-3xl font-bold text-scope-dark">{title}</h1>
      {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
