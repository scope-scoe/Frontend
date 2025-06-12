import React from 'react'
import { useState } from 'react'
import PageHeader from '../shared/PageHeader';
import Card from '../shared/Card';
import { useNavigate } from 'react-router-dom';
import { USER_API_ENDPOINT } from '@/utils/constants';
import axios from 'axios';
import { toast } from 'sonner';
function CreateQuery() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    queryText: ''
  });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res =await axios.post(`${USER_API_ENDPOINT}/student/createQuery`, formData, {
        withCredentials: true,
      });
      console.log('Response from server:', res.data);
      console.log("Creating query with data:", formData);
      alert("Query submitted successfully!");
      navigate("/queries");
    } catch (error) {
      console.log('Error submitting query:', error);
    }
      
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Submit a New Query"
        subtitle="Get assistance from TPC for your placement-related questions"
      />
      
      <form onSubmit={handleSubmit}>
        <Card>
          <h2 className="text-xl font-semibold mb-6">Query Details</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Query *
              </label>
              <textarea
                name="queryText"
                value={formData.queryText}
                onChange={handleChange}
                rows={6}
                className={`w-full p-2 border rounded-md ${errors.queryText ? 'border-scope-error' : 'border-gray-300'}`}
                placeholder="Please provide detailed information about your query..."
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/queries')}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-scope-primary hover:bg-scope-dark text-white rounded-md"
              >
                Submit Query
              </button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}

export default CreateQuery