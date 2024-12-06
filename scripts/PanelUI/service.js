// The Inferface for cloud
import { showAlert } from "./utils.js";

const AGENT_ID = "157e86f3-7fb2-0c10-bae5-b4137f0176a8";

//const AGENT_URL = `http://web3ai.cloud/openai/v0`;
const AGENT_URL = `http://web3ai.cloud/openai/v1`;


export async function getModelFromStorage() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('model', function (result) {
      const selectedModel = result.model ? result.model.trim() : '';
      resolve(selectedModel);
    });
  });
}


// API Function to send a POST request to the Ollama
export async function postAgentRequest(data) {
  console.log(data);

  try {
    const response = await fetch(AGENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    console.log("response")
    console.log(response)

    if (!response.ok) {
      const errorData = await response.json(); // Or response.text
      showAlert(`API returned an error: ${errorData.message}`)
    }

    return response; // Assuming the API returns JSON
  } catch (error) {
    status_failed = true
    if (error.name === 'AbortError') {
      showAlert("The request has been aborted.")
    } else {
      showAlert('Failed to post request')
    }
    throw error; // Rethrow or handle as needed
  }
}

// API Function to stream the response from the server
export async function getResponse(response) {
  console.log(response);
  const reader = response.body.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    // Decode the received value and split by lines
    const textChunk = new TextDecoder().decode(value);
    let resp = JSON.parse(textChunk);
    return resp;
  }
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
        //showAlert('Failed to post request')
  
      }
      //throw error; // Rethrow or handle as needed
    }
  }
  