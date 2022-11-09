import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function BasicMenuSizes() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{fontSize:"large"}}
      >
        Size
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem style={{fontSize:"medium"}} onClick={handleClose}>S</MenuItem>
        <MenuItem style={{fontSize:"medium"}} onClick={handleClose}>M</MenuItem>
        <MenuItem style={{fontSize:"medium"}} onClick={handleClose}>L</MenuItem>
        <MenuItem style={{fontSize:"medium"}} onClick={handleClose}>XL</MenuItem>

      </Menu>
    </div>
  );
}