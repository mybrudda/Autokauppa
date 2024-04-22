import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import Addcar from "./Addcar";
import EditCar from "./EditCar"; // Import EditCar component

export default function Carlist() {
  const [cars, setCars] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://carrestservice-carshop.rahtiapp.fi/cars")
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const updateCar = (car, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
   .then(res => fetchData())
   .catch(err => console.error(err))
  }

  const columnDefs = [
    { headerName: "Brand", field: "brand", width: 150, editable: true }, 
    { headerName: "Model", field: "model", width: 150, editable: true },
    { headerName: "Color", field: "color", width: 150, editable: true },
    { headerName: "Fuel", field: "fuel", width: 150, editable: true },
    { headerName: "Year", field: "modelYear", width: 150, editable: true },
    { headerName: "Price", field: "price", width: 150, editable: true },
    {
      width: 100,
      headerName: "Edit",
      cellRenderer: (props) => (
        <div>
          {/* Render EditCar component with props.original as car prop */}
          <EditCar updateCar={updateCar} car={props.data}></EditCar>
        </div>
      ),
    },
  ];



  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const handleDeleteRow = () => {
    const selectedRows = gridApi.getSelectedRows();
    if (selectedRows.length === 1) {
      const carId = selectedRows[0]._links.self.href.split("/").pop();
      fetch(`https://carrestservice-carshop.rahtiapp.fi/cars/${carId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            const updatedCars = cars.filter(
              (car) => car._links.self.href.split("/").pop() !== carId
            );
            setCars(updatedCars);
          } else {
            alert("Failed to delete car.");
          }
        })
        .catch((error) => console.error("Error deleting car:", error));
    }
  };

  const saveCar = (car) => {
    fetch("https://carrestservice-carshop.rahtiapp.fi/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  
  return (
    <div>
      <div style={{ margin: "20px" }}>
        <Addcar saveCar={saveCar} />
      </div>
      <div
        className="ag-theme-material"
        style={{ height: "500px", width: "1050px" }}
      >
        <div style={{ margin: "20px" }}>
          <button className="lightButton" onClick={handleDeleteRow}>
            Delete Row
          </button>
        </div>
        <AgGridReact
          rowSelection="single"
          animateRows={true}
          rowData={cars}
          columnDefs={columnDefs}
          pagination={true}
          onGridReady={onGridReady}
          // Enable editing
          defaultColDef={{
            editable: true,
          }}
        />
      </div>
    </div>
  );
}