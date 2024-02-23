import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import breakfast from '../../images/food-bowl.jpg'
import './style.css'

function Card() {
  return(
    <div className="card">
      <div className="card-content">
        <img className="card-image" src={breakfast} alt="food" />
        <div className="bottom-text">
          <h3>Breakfast</h3>
          <div className="actions">
            <div className="time">
              <TimerOutlinedIcon fontSize="medium" />
              <p>60'</p>
            </div>
            <div className="buttons">
              <button className="edit"><EditIcon fontSize='small' /></button>
              <button className="delete"><DeleteIcon fontSize='small' /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;