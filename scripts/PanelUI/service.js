export async function getModelFromStorage() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('model', function (result) {
      const selectedModel = result.model ? result.model.trim() : '';
      resolve(selectedModel);
    });
  });
}

export async function translate(input) {
    const URL = "https://web3ai.cloud/openai/v0";
  
    const payload = {
      model: "qwen-plus",
      messages: [
        { role: "system", content: "You are a helpful translator." },
        { role: "user", content: `这段文字: ${input}\n；如果是中文，请翻译成英文，如果是其他语言，翻译成中文；返回结果只包含翻译后的结果` }
      ],
      FormatType: "text",
      //SourceLanguage: "",
      //TargetLanguage: "",
      //SourceText: "",
      //Scene: "",
      //Context: "",
    };
    console.log(payload);
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        //signal: controller.signal
      });
      //console.log(response)
  
      //if (!response.ok) {
        //const errorData = await response.json(); // Or response.text
        //showAlert(`API returned an error: ${errorData.message}`)
      //}
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        // Decode the received value and split by lines
        const textChunk = new TextDecoder().decode(value);
        console.log(textChunk)
        let resp = JSON.parse(textChunk);
        let result = resp.choices[0].message.content;
        console.log(result)
        if (result.length > 10) {
          let index = result.indexOf("翻译后的内容");
          if (index > 0) {
            result = result.substr(index + 1);
          }
        }
        return result;
      }
  
      return "ERROR"; // Assuming the API returns JSON
    } catch (error) {
      console.log(error)
      status_failed = true
      if (error.name === 'AbortError') {
        //showAlert("The request has been aborted.")
      } else {
        //showAlert('Failed to post request ' + ollama_host + ' ')
  
      }
      //throw error; // Rethrow or handle as needed
    }
  }
  