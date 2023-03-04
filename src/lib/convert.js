export const convert = time => {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()
    min = min < 10 ? "0" + min : min
    return `${day}/${month}/${year} ${hour}:${min}`
}