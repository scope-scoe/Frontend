import React from 'react'
import { useState } from 'react'
import PageHeader from '../shared/PageHeader';
import Card from '../shared/Card';
function CreateQuery() {
  //const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: 'medium',
    attachments: []
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
  
  
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    
    if (!formData.title) {
      tempErrors.title = 'Query title is required';
      isValid = false;
    }
    
    if (!formData.description) {
      tempErrors.description = 'Query description is required';
      isValid = false;
    }
    
    if (!formData.category) {
      tempErrors.category = 'Please select a category';
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would call an API to create the query
      console.log('Creating query with data:', formData);
      alert('Query submitted successfully!');
      navigate('/queries');
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
                Query Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.title ? 'border-scope-error' : 'border-gray-300'}`}
                placeholder="Enter a brief title for your query"
              />
              {errors.title && <p className="mt-1 text-xs text-scope-error">{errors.title}</p>}
            </div>
            
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Urgency Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                <label className={`flex items-center justify-center p-2 border rounded cursor-pointer ${formData.urgency === 'low' ? 'border-scope-primary bg-scope-light' : 'border-gray-300'}`}>
                  <input
                    type="radio"
                    name="urgency"
                    value="low"
                    checked={formData.urgency === 'low'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span>Low</span>
                </label>
                <label className={`flex items-center justify-center p-2 border rounded cursor-pointer ${formData.urgency === 'medium' ? 'border-scope-primary bg-scope-light' : 'border-gray-300'}`}>
                  <input
                    type="radio"
                    name="urgency"
                    value="medium"
                    checked={formData.urgency === 'medium'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span>Medium</span>
                </label>
                <label className={`flex items-center justify-center p-2 border rounded cursor-pointer ${formData.urgency === 'high' ? 'border-scope-primary bg-scope-light' : 'border-gray-300'}`}>
                  <input
                    type="radio"
                    name="urgency"
                    value="high"
                    checked={formData.urgency === 'high'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span>High</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Query Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className={`w-full p-2 border rounded-md ${errors.description ? 'border-scope-error' : 'border-gray-300'}`}
                placeholder="Please provide detailed information about your query..."
              />
              {errors.description && <p className="mt-1 text-xs text-scope-error">{errors.description}</p>}
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