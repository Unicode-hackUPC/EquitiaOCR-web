const cognitiveServices = require("cognitive-services");
const client = cognitiveServices.computerVision({
  apiKey: "c11489d328804ca797a22451ae944c39",
  endpoint: "westcentralus.api.cognitive.microsoft.com"
});

export function analyseImageByUrl(fileUrl, setPending) {
  setPending(true, null);
  const headers = { "Content-type": "application/json" };
  const body = { url: fileUrl };
  let parameters = {
    handwriting: true
  };

  sendRequest(headers, body, parameters, setPending);
}

export function analyseImageByFile(file, setPending) {
  setPending(true, null);
  const headers = { "Content-type": "application/octet-stream" };
  //const file = new File([fileBuf], "name", { type: "file" });
  let parameters = {
    handwriting: true
  };

  const reader = new FileReader();
  const body = reader.readAsDataURL(file);

  reader.addEventListener(
    "load",
    function() {
      // let byteArray = new Uint8Array(reader.result.length / 2);
      // for (let x = 0; x < byteArray.length; x++) {
      //   byteArray[x] = parseInt(reader.result.substr(x * 2, 2), 16);
      // }
      // let blob = new Blob([file]);
      // const body = reader.result;
      sendRequest(headers, body, parameters, setPending);
    },
    false
  );
}

const sendRequest = (headers, body, parameters, setPending) => {
  let isRunning = true;

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
        if (isRunning) {
          return client
            .getHandwrittenTextOperationResult({
              parameters
            })
            .then(response => {
              if (response.status !== "Running") {
                isRunning = false;
                setPending(false, response);
              }
              console.log("response", response);
            })
            .catch(err => {
              console.log("err", err);
            });
        } else {
          // setPending(
          //   false,
          //   client.getHandwrittenTextOperationResult({
          //     parameters
          //   })
          // );
          clearInterval(interval);
        }
      }, 500);

      return client.getHandwrittenTextOperationResult({
        parameters
      });
    });
};
