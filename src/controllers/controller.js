import moment from "moment";

export const compareValue = (key, order = "asc") => {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // nếu không tồn tại
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];

      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  };

export const stringLenghtHandle = (string, count) => {
    if (string.length >= count) {
      return string.substring(0, count) + "...";
    }
    return string;
  };

export const dateFormat = (string) => {
  if (moment(string).isValid()) {
    let dateString = moment(string, "YYYY MM DD hh:mm:ss");
    
    return dateString.format("DD-MM-YYYY")
  }
}

export const searchMovie = (movieArr, key, value) => {
  let idx = movieArr.findIndex(item => item[key] === value)
  if (idx !== -1) {
    return movieArr[idx];
  }  
}

export const isEmtyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}