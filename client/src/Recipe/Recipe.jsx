// Material UI Components
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Backdrop from '@mui/material/Backdrop';

// Material UI Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Recipe({ isOpen, handleClose, selectedRecipe, selectedRecipeIndex }) {

	return(
    <Backdrop open={isOpen} handleClose={() => handleClose(false, false)}>
      <Box>
        <Modal 
          open={isOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
          }}
        >
          <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}>
            <CardContent sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '90%',
            }}>
              <Typography gutterBottom variant="h5" component="div" align="center"> {selectedRecipe?.recipeName} </Typography>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '10px',
              }}>
                <Typography variant="body2" component="div" sx={{ fontWeight: 'bold', color: 'gray' }}>Description: </Typography>
                <Typography variant="body1" component="div">{selectedRecipe?.description || 'No Description'} </Typography>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '10px',
              }}>
                <Typography variant="body2" component="div" sx={{ fontWeight: 'bold', color: 'gray' }}>Ingredients: </Typography>
                <Typography variant="body1" component="div">{selectedRecipe?.ingredients.join(', ') || 'No Ingredients'} </Typography>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '10px',
              }}>
                <Typography variant="body2" component="div" sx={{ fontWeight: 'bold', color: 'gray' }}>Procedure: </Typography>
                <Typography variant="body1" component="div">{selectedRecipe?.procedure || 'No Procedured'}</Typography>
              </div>
            </CardContent>
            <CardActions sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '20%'
              }}>
                <IconButton color="info" onClick={() => handleClose(true, false)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => handleClose(false, true)}><DeleteIcon /></IconButton>
              </div>
              <Button variant="outlined" color="info" onClick={() => handleClose(false, false)}>Close</Button>
            </CardActions>
          </Card>
        </Modal>
      </Box>
    </Backdrop>
	)
}

export default Recipe;