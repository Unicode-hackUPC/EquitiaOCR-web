const cognitiveServices = require('cognitive-services');
const client = cognitiveServices.computerVision({
  apiKey: 'c11489d328804ca797a22451ae944c39',
  endpoint: 'westcentralus.api.cognitive.microsoft.com',
});

export function analyseImageByUrl(fileUrl) {
  const headers = { 'Content-type': 'application/json' };
  const body = { url: fileUrl };
  let parameters = {
    handwriting: true,
  };

  sendRequest(headers, body, parameters);
}

export function analyseImageByFile(fileBuf) {
  const headers = { 'Content-type': 'application/octet-stream' };
  const body = fileBuf;
  let parameters = {
    handwriting: true,
  };

  sendRequest(headers, body, parameters);
}

const sendRequest = (headers, body, parameters) => {
  let isRunning = true;

  client
    .recognizeHandwrittenText({
      parameters,
      headers,
      body,
    })
    .then(operationId => {
      parameters = {
        operationId: operationId,
      };
      const interval = setInterval(() => {
        if (isRunning) {
          return client
            .getHandwrittenTextOperationResult({
              parameters,
            })
            .then(response => {
              if (response.status !== 'Running') isRunning = false;
              console.log('response', response);
            })
            .catch(err => {
              console.log('err', err);
            });
        } else {
          clearInterval(interval);
        }
      }, 500);

      return client.getHandwrittenTextOperationResult({
        parameters,
      });
    });
};
