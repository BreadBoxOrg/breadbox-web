async function sendMessage(message) {
    const response = await fetch("http://localhost:3000/chat/sendmessage", {
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