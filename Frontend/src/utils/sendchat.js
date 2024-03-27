async function sendMessage(message) {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const response = await fetch(`${backendURL}/chat/sendmessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({message: message})
    });
    const data = await response.json();
    return data.completion.choices[0].message.content;
}

module.exports = {sendMessage};