import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';

export default function Carlist() {
    const [cars, setCars] = useState([]);
    const [gridApi, setGridApi] = useState(null); // State to hold gridApi

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(error => console.error('Error fetching data:', error));
    };

    const columnDefs = [
        { headerName: 'Brand', field: 'brand', width: 200 },
        { headerName: 'Model', field: 'model', width: 200 },
        { headerName: 'Color', field: 'color', width: 200 },
        { headerName: 'Fuel', field: 'fuel', width: 150 },
        { headerName: 'Year', field: 'modelYear', width: 150 },
        { headerName: 'Price', field: 'price', width: 150 }
    ];

    const onGridReady = (params) => {
        setGridApi(params.api); // Setting gridApi when grid is ready
    };

    const handleDeleteRow = () => {
        const selectedRows = gridApi.getSelectedRows(); // Get selected rows
        if (selectedRows.length === 1) {
            const carId = selectedRows[0]._links.self.href.split('/').pop(); // Extract car ID from self.href
            fetch(`https://carrestservice-carshop.rahtiapp.fi/cars/${carId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    const updatedCars = cars.filter(car => car._links.self.href.split('/').pop() !== carId);
                    setCars(updatedCars);
                } else {
                    alert('Failed to delete car.');
                }
            })
            .catch(error => console.error('Error deleting car:', error));
        }
    };

    return (
        <div>
            <div className="ag-theme-material" style={{ height: '500px', width: '1100px' }}>
            <div style={{ marginBottom: '20px' }}> 
                    <button className="lightButton" onClick={handleDeleteRow}>Delete Row</button>
                </div>
                <AgGridReact
                    rowSelection="single"
                    animateRows={true}
                    rowData={cars}
                    columnDefs={columnDefs}
                    pagination={true}
                    onGridReady={onGridReady}
                />
            </div>
        </div>
    );
}