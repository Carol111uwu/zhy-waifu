export function crearElementoHtml(etiqueta, atributos = {}, hijos = []) {
  const nodo = document.createElement(etiqueta);
  const eventosEnEspanol = { alclic: 'click', alcambiar: 'change', alenviar: 'submit', alentra: 'input', alteclear: 'keydown' };
  for (const [clave, valor] of Object.entries(atributos)) {
    if (clave === 'clase') nodo.className = valor;
    else if (clave === 'texto') nodo.textContent = valor;
    else if (eventosEnEspanol[clave] && typeof valor === 'function') nodo.addEventListener(eventosEnEspanol[clave], valor);
    else if (clave.startsWith('on') && typeof valor === 'function') nodo.addEventListener(clave.slice(2).toLowerCase(), valor);
    else if (valor !== false && valor != null) nodo.setAttribute(clave, String(valor));
  }
  for (const hijo of (Array.isArray(hijos) ? hijos : [hijos])) {
    if (hijo == null) continue;
    nodo.append(hijo.nodeType ? hijo : document.createTextNode(String(hijo)));
  }
  return nodo;
}
