import { Tracker } from 'react-tracker';
import { pageViewListener } from "./eventListener";
const tracker = new Tracker();
tracker.on('*', pageViewListener);

export default tracker;