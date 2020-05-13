import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";

// const ReadNews = () => {

//   return (
//     <div>
//       <TextField id="standard-basic" label="URL" />
//       <Button variant="contained" color="primary">
//         ĐỌC
//       </Button>
//     </div>
//   );
// };

// export default ReadNews;
class ReadNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://cafebiz.vn/ceo-dong-a-solutions-tran-bang-viet-wefit-with-fee-chung-toi-on-neu-co-tien-20200513104543872.chn",
      crawlingStatus: null,
      data: null,
      taskID: null,
      uniqueID: null,
    };
    this.statusInterval = 1;
  }

  handleStartButton = (event) => {
    if (!this.state.url) return false;

    // send a post request to client when form button clicked
    // django response back with task_id and unique_id.
    // We have created them in views.py file, remember?
    axios
      .post("http://localhost:8000/api/crawl/", { url: this.state.url })
      .then((resp) => {
        this.setState(
          {
            taskID: resp.task_id,
            uniqueID: resp.unique_id,
            crawlingStatus: resp.status,
          },
          () => {
            // ####################### HERE ########################
            // After updating state,
            // i start to execute checkCrawlStatus method for every 2 seconds
            // Check method's body for more details
            // ####################### HERE ########################
            this.statusInterval = setInterval(this.checkCrawlStatus, 2000);
          }
        );
      })
      .catch((err) => {
        alert(err);
        return;
      });
  };

  componentWillUnmount() {
    // i create this.statusInterval inside constructor method
    // So clear it anyway on page reloads or
    clearInterval(this.statusInterval);
  }

  checkCrawlStatus = () => {
    // this method do only one thing.
    // Making a request to server to ask status of crawling job
    axios
      .get("http://localhost:8000/api/crawl/", {
        params: {
          task_id: this.state.taskID,
          unique_id: this.state.uniqueID,
        },
      })
      .then((resp) => {
        if (resp.data) {
          // If response contains a data array
          // That means crawling completed and we have results here
          // No need to make more requests.
          // Just clear interval
          clearInterval(this.statusInterval);
          this.setState({
            data: resp,
          });
        } else if (resp.error) {
          // If there is an error
          // also no need to keep requesting
          // just show it to user
          // and clear interval
          clearInterval(this.statusInterval);
          // alert(resp);
        } else if (resp.status) {
          // but response contains a `status` key and no data or error
          // that means crawling process is still active and running (or pending)
          // don't clear the interval.
          this.setState({
            crawlingStatus: resp.status,
          });
        }
      })
      .catch((err) => {
        // alert(err);
        return;
      });
  };

  render() {
    // render componenet
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.handleStartButton()}
        >
          ĐỌC
        </Button>
      </div>
    );
  }
}

export default ReadNews;
