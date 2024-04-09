import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

export default function EditCar(props) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "", model: "", color: "", fuel: "", modelYear: "", price: ""
  });

  const handleClickOpen = () => {
    console.log(props.car);
    setCar({
      brand: props.car.brand,
      model: props.car.model,
      color: props.car.color,
      fuel: props.car.fuel,
      modelYear: props.car.modelYear,
      price: props.car.price
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value})
  };

  const updateCar = () => {
    props.updateCar(car, props.car._links.car.href);
    handleClose();
  }


  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
       
          <DialogTitle>Edit Information
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
            <Button onClick={updateCar} type="submit">Save</Button>
          </DialogActions>
        
      </Dialog>
    </>
  );
}