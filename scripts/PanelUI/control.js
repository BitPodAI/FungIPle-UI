// Sider Panel Control
import { getResponse, postAgentRequest, translate } from "./service.js";

// Init Message
const messageList = [
    'Hey, Blommy! How could I assist you?',
];

// Elements
const chatBox = document.getElementById('chatBox');
const inputBox = document.getElementById('inputBox');
const tokenButton = document.getElementById('tokenButton');
const translateButton = document.getElementById('translateButton');
const memoButton = document.getElementById('memoButton');
const submitBtn = document.getElementById('submitButton');

// Events
tokenButton.addEventListener('click', async () => {
    console.log('click the token button');
    const reqParam = {
        text: "get report",
        userId: "user",
        userName: "User",
        request: "latest_report",
    };

    try {
        let resp = await postAgentRequest(reqParam);
        processResponse(await getResponse(resp));
    } catch (error) {
        //displayError(error, chatlog);
    }
});

// translate Event
translateButton.addEventListener('click', async () => {
    console.log('click the translate button');
    try {
        const message = inputBox.value.trim();
        let resp = await translate(message);
        processResponse(resp);
    } catch (error) {
        //displayError(error, chatlog);
    }
});

// memo Event
memoButton.addEventListener('click', async () => {
    console.log('click the memo button');
});

// submit Event
submitBtn.addEventListener('click', async () => {
    console.log('click the submit button');
    sendMessage();
})

// Message
const sendMessage = () => {
    const message = inputBox.value.trim();
    if (message) {
        messageList.push(message);
        inputBox.value = '';
        const messageDiv = createMessageBox(message, true);
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        doRequest(message).then((res) => {
            console.log(res);
        }).catch((e) => {
            console.log(e);
        });
    }
};

// Message List
const renderMessage = () => {
    messageList.forEach((message) => {
        const messageDiv = createMessageBox(message);
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
};

// Add Dom
const createMessageBox = (message, me) => {
    const messageDiv = document.createElement('div');
    if (me) {
        messageDiv.className = 'grid place-items-end'
    } else {
        messageDiv.className = 'grid place-items-start';
    }
    messageDiv.innerHTML = `
    <div class="mb-2 flex flex-col w-full max-w-[320px] leading-1.5 p-2 border-gray-200 bg-gray-200 rounded-xl">
        <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">${message}</p>
    </div>
    `;
    return messageDiv;
};

const processResponse = (response) => {
    messageList.push(response);
    const messageDiv = createMessageBox(response);
    chatBox.appendChild(messageDiv);
}

// Remote Request
const waitForResponseMock = (question) => {
    const response = 'I have no idea!!!';
    messageList.push(response);
    const messageDiv = createMessageBox(response);
    chatBox.appendChild(messageDiv);
    const hds = ['token', 'index', '1H', '4H', '24H'];
    const rows = [
        ['pnut', 786, 78, 189, 487],
        ['act', 564, 78, 189, 487],
        ['neiro', 356, 78, 189, 487],
        ['pepe', 305, 78, 189, 487],
        ['goat', 286, 78, 189, 487],
    ];
    chatBox.appendChild(createMessageBox(renderTable(hds, rows)));
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Enter Key
inputBox.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

// Chat Render
document.addEventListener('DOMContentLoaded', () => {
    renderMessage();
});

const renderTable = (headers, rows) => {
    const tableDiv = document.createElement('table');
    tableDiv.className = 'text-center';
    const theadDiv = document.createElement('thead');
    const headRowDiv = document.createElement('tr')
    headers.forEach((hd) => {
        const columnDiv = document.createElement('th');
        columnDiv.innerText = hd;
        headRowDiv.appendChild(columnDiv);
    });
    theadDiv.appendChild(headRowDiv);
    tableDiv.appendChild(theadDiv);
    const tBodyDiv = document.createElement('tbody')
    rows.forEach((row) => {
        const rowDiv = document.createElement('tr');
        row.forEach((col) => {
            const colDiv = document.createElement('td');
            colDiv.innerText = col;
            rowDiv.appendChild(colDiv);
        });
        tBodyDiv.appendChild(rowDiv);
    });
    tableDiv.appendChild(tBodyDiv)
    return tableDiv.outerHTML;
};

async function doRequest(data) {
    console.log(data);
    const reqParam = {
        text: data,
        userId: "user",
        userName: "User",
        request: "token_chat",
    };

    try {
        let resp = await postAgentRequest(reqParam);
        processResponse(await getResponse(resp));
    } catch (error) {
        //displayError(error, chatlog);
    }
}

// Chrome Sider Message
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === 'TEXT_SELECTED') {
      // Translate
      let preTrText = message.text.toString();
      if (preTrText.length > 1) {
        let tr = await translate(preTrText);
        processResponse(tr);
      }
    }
});