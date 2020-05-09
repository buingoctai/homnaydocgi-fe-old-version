import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Alert, AlertTitle } from "@material-ui/lab";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
//import { DIALOG_CODE } from "../../utils/constants";
import { translatePostGroupTitle } from "../../../../utils/utils";

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    width: "60%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const TopicOption = ({
  visible = false,
  setIsOpenChoseTopic,
  allTopic,
  onGetFeaturedTopic,
}) => {
  const classes = useStyles();
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [name, setName] = useState("");
  const onOK = () => {
    setIsOpenChoseTopic(false);
    onGetFeaturedTopic([...selectedTopics], name);
  };
  const onDefault = () => {
    setIsOpenChoseTopic(false);
  };
  const onChosingTopic = ({ visible, name }) => {
    if (visible) {
      setSelectedTopics([...selectedTopics, name]);
    } else {
      const removedList = selectedTopics.filter((item) => item !== name);
      setSelectedTopics([...removedList]);
    }
  };
  const onSetName = (name) => {
    setName(name);
  };

  return (
    <div className={classes.dialogContainer}>
      <Dialog
        open={allTopic.length > 0 && visible}
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
                  Chọn Topic Bạn Muốn Trải Nghiệm
                </FormLabel>
                <TextField
                  required
                  // id="standard-basic"
                  //label="Tên Bạn"
                  onChange={(node) => onSetName(node.target.value)}
                  value={name}
                  autoFocus
                  error
                  id={name ? "standard-basic" : "standard-error"}
                  label={name ? "Tên Bạn" : "Nhập Tên Của Bạn"}
                />
                <FormGroup>
                  {allTopic.length > 0 &&
                    allTopic.map((name, index) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedTopics.includes(name)}
                            onChange={(node) =>
                              onChosingTopic({
                                visible: node.target.checked,
                                name: node.target.name,
                              })
                            }
                            name={name}
                          />
                        }
                        label={translatePostGroupTitle(name)}
                        key={index}
                      />
                    ))}
                </FormGroup>
              </FormControl>
            </div>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onOK}
            color="primary"
            disabled={!selectedTopics.length || !name}
          >
            Chọn
          </Button>
          <Button onClick={onDefault} color="primary" autoFocus>
            Mặc định
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TopicOption;
