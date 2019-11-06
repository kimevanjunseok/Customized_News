// module "my-module.js"
export default function() {
    let d = new Date()
    let y = d.getFullYear()
    let month = d.getMonth()
    let day = d.getDay()
    let h = d.getHours()
    let m = d.getMinutes()
    let s = d.getSeconds()
    
    
    return {
        date : d,
        year : y,
        month : month,
        day : day,
        hour: h,
        min : m,
        second : s
    }
  }