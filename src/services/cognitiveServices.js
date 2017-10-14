const cognitiveServices = require("cognitive-services");
const client = cognitiveServices.computerVision({
  apiKey: "c11489d328804ca797a22451ae944c39",
  endpoint: "westcentralus.api.cognitive.microsoft.com"
});
const headers = { "Content-type": "application/json" };

export default function analyseImageByUrl(fileUrl) {
  let isRunning = true;

  const body = { url: fileUrl };
  let parameters = {
    handwriting: true
  };

  client
    .recognizeHandwrittenText({
      parameters,
      headers,
      body
    })
    .then(operationId => {
      parameters = {
        operationId: operationId
      };
      const interval = setInterval(() => {
        console.log("wesh");
        if (isRunning) {
          return client
            .getHandwrittenTextOperationResult({
              parameters
            })
            .then(response => {
              if (response.status !== "Running") isRunning = false;
              console.log("response", response);
            })
            .catch(err => {
              console.log("err", err);
            });
        } else {
          clearInterval(interval);
        }
      }, 500);

      return client.getHandwrittenTextOperationResult({
        parameters
      });
    });
}
