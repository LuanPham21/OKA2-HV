import Dialog from '@material-ui/core/Dialog';
import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import '../css/Popup.css';
// const useStyles=makeStyles(them => ({
//     dislogWrapper:{
//         padding: them.spacing(2),
//         position:'absolute',
//         top: them.spacing(5),
//     }
// }))   classes={{paper: classes.dislogWrapper}}
export default function Popup(props) {
    const {title,children,openPopup,setOpenPopup}=props;
    // const classes=useStyles();
    return (
        <Dialog open={openPopup} maxWidth="lg" >
           <DialogTitle>
               <div style={{display:'flex'}}>
                    <div style={{flexGrow:1}}>
                        {title}                      
                    </div>
                    <div className="btn--x">
                        <button type="button" style={{backgroundColor:'red' ,color:'#fff',border:'none',boxShadow:'0 0 10px rgba(0, 0, 0, 0.2)',padding:'0 19px'}} onClick={()=>setOpenPopup(false)}>X</button>
                    </div>
               </div>
           </DialogTitle>
           <DialogContent dividers>
               {children}
           </DialogContent>
        </Dialog>
    )
}
