import React, { useState } from 'react';
import Component1 from './components/Component1';
import Component2 from './components/Component2';
import './style/App.css';

const App = () => {
  const [formDataList, setFormDataList] = useState([
    { assignedTo: 'user1', status: 'Completed', dueDate: '2025-01-20', priority: 'High', comments: 'Initial task' },
    { assignedTo: 'user2', status: 'In Progress', dueDate: '2025-01-25', priority: 'Medium', comments: 'Working on this' },
    { assignedTo: 'user3', status: 'Not Started', dueDate: '2025-02-10', priority: 'Low', comments: 'Not started yet' },
    { assignedTo: 'user4', status: 'Completed', dueDate: '2025-02-05', priority: 'High', comments: 'Task Completed' },
    { assignedTo: 'user5', status: 'In Progress', dueDate: '2025-01-30', priority: 'Medium', comments: 'Under development' },
  ]);

  const [filteredData, setFilteredData] = useState(formDataList);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setFilteredData(
      formDataList.filter((item) =>
        item.assignedTo.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.comments.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleFormSubmit = (formData) => {
    if (editingData) {
      setFormDataList((prevData) =>
        prevData.map((item) =>
          item.assignedTo === editingData.assignedTo ? formData : item
        )
      );
    } else {
      setFormDataList((prevData) => [...prevData, formData]);
    }

    setFilteredData((prevData) =>
      editingData
        ? prevData.map((item) =>
            item.assignedTo === editingData.assignedTo ? formData : item
          )
        : [...prevData, formData]
    );

    setIsPopupOpen(false);
    setEditingData(null);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setEditingData(null);
  };

  // eslint-disable-next-line no-unused-vars
const handleDelete = (newData) => {
  setFilteredData(newData);
  setFormDataList(newData);
};


  return (
    <div className="app-container">
      <div className="app-header">
        <div className="search-box-container">
          <input
            type="text"
            className="app-search-box"
            placeholder="Search Tasks...."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <button className="app-button" onClick={() => setIsPopupOpen(true)}>
          New Task
        </button>
      </div>

      <div className="app-content">
        <Component1
          formDataList={filteredData}
          setFormDataList={setFormDataList}
          setFilteredData={setFilteredData}
          onEdit={(index) => {
            setEditingData(filteredData[index]);
            setIsPopupOpen(true);
          }}
          onDelete={(index) => {
            const updatedList = filteredData.filter((_, i) => i !== index);
            setFilteredData(updatedList);
            setFormDataList((prevData) =>
              prevData.filter((item) =>
                !updatedList.some((filteredItem) => filteredItem === item)
              )
            );
          }}
        />
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Component2
              onFormSubmit={handleFormSubmit}
              initialData={editingData}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
