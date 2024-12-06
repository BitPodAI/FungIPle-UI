





// end of googleSearchComponent



// end of ComposeComponent


async function addLinkedinPostComponent() {


  const content = `
    <div>
    <div class="reply-container fade-in">
    <div class="p-4 flex gap-4 generate-reply">
      <button class="bg-blue-200 text-gray-600 p-2 px-3 rounded-lg cursor-pointer reply" data-prompt="Write a simple and crisp reply in less than 50 words saying yes or replying affirmatively to the other person">Rewrite</button>
      <button class="text-gray-600 bg-yellow-300  p-2 px-3 rounded-lg cursor-pointer reply" data-prompt="Write a professional reply to follow up on the points mentioned in the previous messages">Create <span class="tex-blue">✨</span></button>
    </div>
    <div class="p-2 gap-2 create-reply hidden ">
      <span class="p-1 cursor-pointer back">←</span>
      <input type="text" placeholder="Write with Ai" class="border border-blue-500 p-1 rounded-lg w-64 input-prompt">
      <span class="text-white border bg-black p-2 px-3 rounded-lg cursor-pointer generate">Generate</span>
    </div>
   
  </div>
  </div>
  `


  await delay(2000)
  const isPostClicked = document.querySelector('.artdeco-button.artdeco-button--muted.artdeco-button--4.artdeco-button--tertiary.ember-view.share-box-feed-entry__trigger');

  isPostClicked.addEventListener('click', async () => {
    //linkedIN artdeco-carousel__content tools , para ql-editor
    await delay(2000)
    const addComponent = document.querySelector('.share-creation-state__footer')
    if (addComponent) {

      addComponent.innerHTML += content
      suggestPostForLinkedin()

    }

  })



}

async function suggestPostForLinkedin() {
  await delay(1000);


  const generateReply = document.querySelector(".generate-reply");
  const createReply = document.querySelector(".create-compose");
  const replies = document.querySelectorAll(".reply");
  const input = document.querySelector(".input-prompt");
  // const generate = document.querySelector(".generate");



  await delay(1000);
  const context_div = document.querySelector('.editor-content.ql-container p')
  const context_post = context_div.textContent.toString()

  let prompt = '';


  replies.forEach(btn => {
    btn.addEventListener('click', () => {
      prompt = btn.dataset.prompt;
      if (btn.textContent.includes("Create")) {
        generateReply.classList.add('fade-out');

        setTimeout(() => {
          generateReply.classList.add('hidden');
          generateReply.classList.remove('fade-out');
          createReply.classList.remove('hidden');
          createReply.classList.add('fade-in', 'flex');


        }, 500);
      } else {

        const fullPrompt = `You are a helpful assistant. Your task is to rewrite the provided LinkedIn post to improve its clarity, professionalism, and engagement. Ensure the rewritten post is appropriate for a professional audience and encourages interaction.

        Please rewrite the following LinkedIn post:

        ${context_post}

        \`\`\`plaintext

        {your response should be within this}

        \`\`\`
        
        `
        sendDataToBackgroundLinkedInPost(fullPrompt)
      }
    });
  });
  await delay(1000)
  const generate = document.querySelector(".generate");
  const back = document.querySelector(".back");
  if (generate) {
    const message_div1 = document.querySelector('.editor-content.ql-container')
    const input = document.querySelector(".input-prompt");
    if (input) {
      input.addEventListener('click', (event) => {
        event.stopPropagation();
        input.focus();
      });

      // Prevent the caret from moving to the main div when the input is focused
      message_div1.addEventListener('click', (event) => {
        if (event.target === input) {
          event.stopPropagation();
        }
      });

      // Keep focus on the input when typing
      input.addEventListener('keydown', (event) => {
        input.focus();
      });

      // Prevent focus on the main div when interacting with the input
      input.addEventListener('focus', (event) => {
        event.stopPropagation();
      });
    }

    generate.addEventListener('click', () => {
      prompt = input.value
      const fullPrompt = `
     You are a helpful assistant. Your task is to generate a LinkedIn post based on the provided context . Ensure the post is professional, engaging, and appropriate for a professional audience.

Create a LinkedIn post based on the following context and instructions: 

Context: ${prompt}

\`\`\`plaintext

{your response should be within this}

\`\`\`
      
      `
      sendDataToBackgroundLinkedInPost(fullPrompt)
    });


    back.addEventListener('click', () => {
      createReply.classList.add('fade-out');
      setTimeout(() => {
        createReply.classList.add('hidden');
        createReply.classList.remove('fade-out');
        generateReply.classList.remove('hidden');
        generateReply.classList.add('fade-in');
      }, 500);
    });

  }

}

async function sendDataToBackgroundLinkedInPost(fullPrompt) {
  // Establish connection with background script
  const port = chrome.runtime.connect({ name: 'ollama_port' });

  const context_div = document.querySelector('.editor-content.ql-container')
  const context = document.querySelector('.editor-content.ql-container p')
  document.querySelector('.editor-content.ql-container p').textContent = " ";

  const context_post = context.textContent.toString()

  if (context) {

    document.querySelector('.editor-content.ql-container').innerHTML += `
    <div class="loading1">
    <div class="animated-gradient h-3 rounded-md my-3 slow-animation"></div>
        <div class="animated-gradient h-3 rounded-md my-3 fast-animation w-[90%]"></div>
    </div>
        `
    await delay(1000);
    const loading = document.querySelector(".loading1");

    //Listening for messages from background script
    port.onMessage.addListener(function (response) {
      if (response.type === 'WORD') {
        loading.classList.add('hidden')
        document.querySelector('.editor-content.ql-container p').textContent += response.resp

      } else if (response.type === 'FINISHED') {
        document.querySelector('.editor-content.ql-container p').innerHTML = " "
        const parsedcontent = marked.parse(response.resp)
        document.querySelector('.editor-content.ql-container p').textContent = response.resp
        //  Prism.highlightAll()

      }
    });
  }

  // Start the search with the given query
  port.postMessage({ type: 'SUGGESTREPLY', query: fullPrompt });

}
// end of linkedincmponent




function getCurrentUrl() {
  return window.location.href;
}
// Initial URL capture
var currentUrl = getCurrentUrl();
onDocumentReady(currentUrl)

// Function to handle URL changes
function handleUrlChange() {
  var newUrl = getCurrentUrl();
  if (newUrl !== currentUrl) {
    currentUrl = newUrl;
    onDocumentReady(newUrl)

  }

}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Listen for URL changes
window.addEventListener('hashchange', handleUrlChange);
window.addEventListener('popstate', handleUrlChange);

function onDocumentReady(currentTabUrl) {

  if (currentTabUrl.includes("www.google.com/search")) {// Home page
    //googleSearchComponent()
  }
  /*else if (currentTabUrl.includes("mail.google.com")) {
    console.log("You are on Google Mail.");
    // Configure the observer to watch for childList changes
    observer.observe(document.body, { childList: true, subtree: true });
    addDivs();

    if (currentTabUrl.includes("mail.google.com/mail/u/0/?tab")) {
      console.log("You are on the messaging/reply page.");
      // Your logic for the main Gmail page
      setTimeout(reply, 2000);

    }

  }
  else {
    observer.disconnect()
  }*/
  if (currentTabUrl.includes("www.linkedin.com")) {
    console.log("linkedin page")

    if (currentTabUrl.includes("/feed")) {
      addLinkedinPostComponent();
      console.log("linkedin page feed")
    }

  }

}


const chatbotIcon = document.createElement('div');
chatbotIcon.id = 'chatbot-icon';
chatbotIcon.style.position = 'fixed';
chatbotIcon.style.bottom = '60px';
chatbotIcon.style.right = '10px';
chatbotIcon.style.width = '40px';
chatbotIcon.style.height = '30px';
//chatbotIcon.style.backgroundColor = '#007bff';
chatbotIcon.style.borderRadius = '50%';
chatbotIcon.style.cursor = 'pointer';
chatbotIcon.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
chatbotIcon.style.zIndex = '9000';
//chatbotIcon.innerHTML = '<img src="chrome-extension://hgekgbbgapeodikiafinciipaeenfkeg/assets/frog.png" alt="Chatbot" style="width: 100%; height: 100%; border-radius: 50%;">';
const img = document.createElement('img');
img.src = chrome.runtime.getURL('assets/frog.png');
img.style.cssText = `
      width: 100%;
      height: 100%;
      border-radius: 50%;
    `;
chatbotIcon.appendChild(img);
document.body.appendChild(chatbotIcon);

chatbotIcon.addEventListener('click', async () => {
    // Open Orian popup or chat widget
    //alert('Chatbot icon clicked!');
    // 发送消息给 Chrome 插件的后台服务，通知打开主界面
  chrome.runtime.sendMessage({ action: "OPEN_MAIN_UI" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error('Error sending message:', chrome.runtime.lastError);
    } else {
      console.log('Response from background:', response);
    }
  });
  /*let orianContainer = document.getElementById('orianContainer');
  if (!orianContainer) {
    orianContainer = document.createElement('div');
    orianContainer.id = 'orianContainer';
    orianContainer.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 400px;
      height: 610px;
      background: white;
      border: 1px solid #ccc;
      z-index: 10000;
      overflow: auto;
    `;
    document.body.appendChild(orianContainer);
    // 加载 Orian 插件内容
    const iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL('/panel.html'); // 指向插件主页面
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
    `;
    //orianContainer.appendChild(iframe);
    orianContainer.innerHTML= `
      <div id="panel_frame">
        <button id="panel_btn" class="close-btn" style="front-size: 30px;">X</button>
        <iframe
          style="width: 100%; height: 600px; border: none;"
          src="chrome-extension://hgekgbbgapeodikiafinciipaeenfkeg/panel.html"/>
      <div>`;
    const btn = document.getElementById("panel_btn");
    //console.log(btn);
    if (btn != null) {
      btn.addEventListener("click", () => {
        //console.log("click");
        //const frame = document.getElementById("panel_frame");
        //if (frame != null) {
        //  frame.style.display = "none";
        //}
        orianContainer.style.display = "none";
      })
    }
    //chrome.sidePanel.open();
    chrome.sidePanel.open().then(() => {
      console.log('Side panel opened successfully');
    }).catch((error) => {
      console.error('Failed to open side panel:', error);
    });

    // 动态加载 HTML 内容
    /const response = await fetch(chrome.runtime.getURL('panel.html'));
    const html = await response.text();
    orianContainer.innerHTML = html;

    // 加载对应的 JavaScript
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('scripts/PanelUI/panel.js'); // 插件主界面的逻辑
    orianContainer.appendChild(script);*
  } else {
    orianContainer.style.display =
      orianContainer.style.display === 'none' ? 'block' : 'none';
  }*/
});



