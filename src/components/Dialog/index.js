import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Alert, AlertTitle } from "@material-ui/lab";

import { DIALOG_CODE } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    width: "60%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const DraggableDialog = ({ visible = false, content, setDialogContent }) => {
  const classes = useStyles();
  const handleClose = () => {
    setDialogContent({ visible: false, content: "" });
  };
  useEffect(() => {
    setTimeout(
      () => setDialogContent({ visible: false, content: "" }),
      5000000
    );
  });

  return (
    <div className={classes.dialogContainer}>
      <Dialog
        open={visible}
        onClose={null}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        style={{ width: "90%" }}
      >
        <DialogContent
          style={{ backgroundColor: "#E8F4FD", paddingTop: "0px" }}
        >
          <Alert
            severity="info"
            style={{ padding: "0px 0px" }}
            onClose={handleClose}
          >
            <AlertTitle>Thông báo</AlertTitle>
            {DIALOG_CODE[content]} — <strong>Xin cảm ơn!</strong>
          </Alert>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DraggableDialog;
