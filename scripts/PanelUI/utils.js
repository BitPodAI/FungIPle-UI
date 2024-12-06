// Utils Functions


export function showAlert(message) {
    const alertDiv = document.querySelector('#alert-1');
    if (!alertDiv) {
        console.log(`ERROR: ${message}`);
        return;
    }
  
    alertDiv.querySelector('.alert-message').textContent = message;
    alertDiv.classList.remove('hidden', '-translate-y-full');
    alertDiv.classList.add('flex');
  
    // Close the alert after 3 seconds
    setTimeout(() => {
      alertDiv.classList.add('hidden', '-translate-y-full');
      alertDiv.classList.remove('flex');
    }, 5000);
  }