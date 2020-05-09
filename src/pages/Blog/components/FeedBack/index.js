import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Alert, AlertTitle } from "@material-ui/lab";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    width: "60%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const FeedBack = ({ visible = false, onSubmitFeedBack }) => {
  const classes = useStyles();
  const [feedback, setFeedBack] = useState("");
  const onOK = () => {
    onSubmitFeedBack(feedback);
  };

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
            //onClose={handleClose}
          >
            <AlertTitle>Thông báo</AlertTitle>
            <div style={{ display: "flex" }}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  Cảm ơn bạn đã dành thời gian trải nghiệm website. Vui lòng
                  <strong>Góp ý</strong> để <strong>Tài Bùi Admin</strong> nâng
                  cấp web tốt hơn. Góp ý của bạn sẽ gửi trực tiếp đến Tài thông
                  qua <strong>Facebook Messenger</strong>
                </FormLabel>
                <TextField
                  id="standard-basic"
                  label="Góp ý"
                  onChange={(node) => setFeedBack(node.target.value)}
                  value={feedback}
                />
              </FormControl>
            </div>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={onOK} color="primary" disabled={!feedback}>
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeedBack;
