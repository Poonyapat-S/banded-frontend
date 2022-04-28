function openMessageForm() {
    document.getElementById("infoForm").style.display = "block";
}

function closeMessageForm() {
    let msg = document.getElementById("newMessage").value;
    //Return msg to backend
    if(msg != "" && msg != null) {
      var event = new CustomEvent('sendMessage', {
        detail: {
          messageText: msg,
        }
      })
      window.dispatchEvent(event);
      alert('Message Sent Successfully!');
    }
    document.getElementById("infoForm").style.display = "none";


}
