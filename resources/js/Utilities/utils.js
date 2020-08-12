export const convertToRightDate = (date) => {
    if(date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0) {
      let newDate = new Date();
      newDate.setDate(date.getDate());
      return newDate;
    }
    return date;
}     

export function debounce(fn, delay) {
  var timeoutID;
  return function(...args){
      if(!!timeoutID) {
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(()=>{
        fn(...args);
      }, delay);
  }
}