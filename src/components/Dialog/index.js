import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const DraggableDialog = (props) => {
  const { dialogContent, showTime = 5000 } = props;
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (open === true) {
      setTimeout(() => setOpen(false), showTime);
    }
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{
            cursor: "move",
            color: "#5fcfaf",
            backgroundColor: "#F1F3F4",
            fontSize: "50px",
          }}
          id="draggable-dialog-title"
        >
          Thông báo
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#C1C1C1" }}>
          <DialogContentText>{dialogContent}</DialogContentText>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DraggableDialog;
