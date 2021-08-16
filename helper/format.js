exports.phoneNumber = (phoneNumber, callback) => {
    callback(String(phoneNumber).replace(/\D+/g, '')
    .replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4'))
}

exports.name = (name, callback) => {
    callback(name.toUpperCase())
}