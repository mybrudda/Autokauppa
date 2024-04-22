import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

export default function Addcar(props) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "", model: "", color: "", fuel: "", modelYear: "", price: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value})
  };

  const addCar = () => {
    props.saveCar(car);
    handleClose();
  }


  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add car
      </Button>
      <Dialog open={open} onClose={handleClose}>
       
          <DialogTitle>Add new car information
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              fullWidth
              variant="standard"
              name="brand"
              label="Brand"
              value={car.brand}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              fullWidth
              variant="standard"
              name="model"
              label="Model"
              value={car.model}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              fullWidth
              variant="standard"
              name="color"
              label="Color"
              value={car.color}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              fullWidth
              variant="standard"
              name="fuel"
              label="Fuel"
              value={car.fuel}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              fullWidth
              variant="standard"
              name="modelYear"
              label="Year"
              value={car.modelYear}
              onChange={handleChange}
            />
            {/* When filling price textfield in the form, the number should be whole number. */}
            <TextField
              required
              margin="dense"
              fullWidth
              variant="standard"
              name="price"
              label="Price"
              value={car.price}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addCar} type="submit">Save</Button>
          </DialogActions>
        
      </Dialog>
    </>
  );
}