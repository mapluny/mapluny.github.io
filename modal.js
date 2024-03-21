// modalLibrary.js

const modalLibrary = (function () {
    let modalContainer = null;
  
    function createModal(content, buttons) {
      const modal = document.createElement("div");
      modal.className = "custom-modal";
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-button">&times;</span>
          ${content}
          <div class="button-container">
            ${buttons.map(button => `<button class="modal-button">${button.text}</button>`).join('')}
          </div>
        </div>
      `;
      return modal;
    }
  
    function closeModal() {
      if (modalContainer) {
        document.body.removeChild(modalContainer);
        modalContainer = null;
      }
    }
  
    function showModal(content, buttons) {
      closeModal();
      
      modalContainer = document.createElement("div");
      modalContainer.className = "modal-container";
      modalContainer.innerHTML = `
        <div class="overlay"></div>
      `;
      
      const modal = createModal(content, buttons);
      modalContainer.appendChild(modal);
      document.body.appendChild(modalContainer);
      
      const closeButton = modal.querySelector(".close-button");
      if (closeButton) {
        closeButton.addEventListener("click", closeModal);
      }
  
      const modalButtons = modal.querySelectorAll(".modal-button");
      modalButtons.forEach((button, index) => {
        if (buttons[index] && buttons[index].clickHandler) {
          button.addEventListener("click", buttons[index].clickHandler);
        }
      });
    }
  
    return {
      showModal: showModal
    };
  })();
