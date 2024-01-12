import moment from 'moment'
import 'moment/locale/vi'

export const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
 };

 export const formatVi = (time) =>{
    moment.locale('vi')
    return moment(time).fromNow()
  }

