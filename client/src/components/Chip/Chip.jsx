import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import './styles';


function Chip({ ingredientName, ingredientQuantity, ingredientUnit, deleteChip }) {
  return (
    <div className="chip">
      <p>{ingredientQuantity}{ingredientUnit} {ingredientName}</p>
      <button onClick={() => deleteChip()}><CloseIcon /></button>
    </div>
  )
}

export default Chip;