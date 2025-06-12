
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from './shared/Card';
import PageHeader from './shared/PageHeader';

const Profile = () => {
  const userRole = useSelector(store => store.auth.userRole);
  const user = useSelector(store => store.auth.user);
  // Function to determine which fields to show based on user role
  const renderRoleSpecificFields = () => {
    if (['student', 'tpc'].includes(userRole)) {
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Roll Number
              </label>
              <p className="p-2 bg-gray-50 rounded-md">
                {user.Roll_Number || "Not specified"}
              </p>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                PRN Number
              </label>

              <p className="p-2 bg-gray-50 rounded-md">
                {user.PRN || "Not specified"}
              </p>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Department
              </label>

              <p className="p-2 bg-gray-50 rounded-md">
                {user.Department || "Not specified"}
              </p>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Year of Study
              </label>

              <p className="p-2 bg-gray-50 rounded-md">
                {user.Year || "Not specified"}
              </p>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Division
              </label>

              <p className="p-2 bg-gray-50 rounded-md">{user.Division}</p>
            </div>
          </div>
        </>
      );
    } else if (['teacher'].includes(userRole)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Teacher ID
            </label>

            <p className="p-2 bg-gray-50 rounded-md">
              {user.TeacherID || "Not specified"}
            </p>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Department
            </label>

            <p className="p-2 bg-gray-50 rounded-md">
              {user.Department || "Not specified"}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="My Profile"
        subtitle="View and manage your personal information"
      />

      <Card>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold">{user.Name}</h2>
            <p className="text-gray-600 capitalize">{userRole}</p>
          </div>
        </div>

        <form className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium mb-4 pb-2 border-b">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <p className="p-2 bg-gray-50 rounded-md">{user.Name}</p>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <p className="p-2 bg-gray-50 rounded-md">{user.email}</p>
              </div>
            </div>

            {/* Academic Information */}
          </div>
          {/* Role-specific fields */}
          {renderRoleSpecificFields()}
        </form>
      </Card>
    </div>
  );
};

export default Profile;
