
exports.default = {
  email: function (api) {
    return {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'contactoswimmx@gmail.com',
        pass: 'bxnpfqpighkwslrx'
      }
    }
  }
}
