'use strict'

exports.showDocumentation = {
  name: 'showDocumentation',
  description: 'return API documentation',

  outputExample: {},

  run: function (api, data, next) {
    data.response.documentation = api.documentation.documentation
    next()
  }
}

exports.test = {
  name: 'test',
  description: 'return API documentation',

  outputExample: {},

  run: function (api, data, next) {
    var code = '401'

    console.log('>>', data)

    data.rawConnection = {
      responseHttpCode: 404
    }

    //data.rawConnection.responseHttpCode = code
    data.response.data = 'hola'
    next()
  }
}
