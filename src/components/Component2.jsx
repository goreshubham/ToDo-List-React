import React, { useState, useEffect } from 'react';
import '../style/component2.css'; 

const Component2 = ({ onFormSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Medium',
    comments: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>{initialData ? 'Edit Task' : 'New Task'}</h2>
        
        
        <div className="form-group two-fields">
          <div>
            <label htmlFor="assignedTo">Assigned To</label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleInputChange}
            >
              <option value="">Assigned To</option>
              <option value="user1">user1</option>
              <option value="user2">user2</option>
              <option value="user3">user3</option>
              <option value="user4">user4</option>
              <option value="user5">user5</option>
            </select>
          </div>

          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="form-group two-fields">
          <div>
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        
        <div className="form-group">
          <label htmlFor="comments">Comments</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {initialData ? 'Save' : 'Add'}
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Component2;
