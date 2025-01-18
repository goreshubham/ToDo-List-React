import React, { useState } from 'react';
import '../style/component1.css';

const Component1 = ({ formDataList, setFormDataList, setFilteredData, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteTaskData, setDeleteTaskData] = useState(null);

  // Calculate total pages
  const totalPages = Math.ceil(formDataList.length / itemsPerPage);

  // Get current data for the page
  const currentData = formDataList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (index) => {
    const taskToDelete = formDataList[index];
    setDeleteTaskData(taskToDelete);
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = () => {
    const updatedList = formDataList.filter(
      (item) => item !== deleteTaskData
    );
    setFormDataList(updatedList);
    setFilteredData(updatedList);
    setIsDeletePopupOpen(false);
  };

  const cancelDelete = () => {
    setIsDeletePopupOpen(false);
    setDeleteTaskData(null);
  };

  return (
    <div className="table-container">
      {currentData.length > 0 ? (
        <table className="task-table">
          <thead>
            <tr className="table-header">
              <th>Assigned To</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Comments</th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((data, index) => (
              <tr key={(currentPage - 1) * itemsPerPage + index} className="table-row">
                <td>{data.assignedTo}</td>
                <td>{data.status}</td>
                <td>{data.dueDate}</td>
                <td>{data.priority}</td>
                <td>{data.comments}</td>
                <td className="actions-column">
                  <button className="edit-button" onClick={() => onEdit((currentPage - 1) * itemsPerPage + index)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="empty-message">No Task Assigned yet.</p>
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        <span>{currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>

      {/* Delete Popup */}
      {isDeletePopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Are you sure you want to delete this task?</p>
            <div className="popup-actions">
              <button onClick={confirmDelete} className="confirm-button">Yes</button>
              <button onClick={cancelDelete} className="cancel-button">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Component1;
