import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './style.css';


function Chip({ text, deleteChip, style={} }) {
  return (
    <div className="chip" style={style}>
      <span>{text}</span>
      <button onClick={() => deleteChip()}><CloseIcon /></button>
    </div>
  )
}

export default Chip;