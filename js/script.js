document.getElementById("gerarSenha").addEventListener("click", gerarSenha);
document.getElementById("copiarSenha").addEventListener("click", copiarSenha);

async function gerarSenha() {
  const tamanho = Number(document.getElementById("tamanhoSenha").value);
  const algoritmo = document.getElementById("algoritmoHash").value;

  const dados = "Gerador de senha"; 
  const encoder = new TextEncoder();
  const bytes = encoder.encode(dados);

  let hashBuffer;

  if (algoritmo === "SHA-1") {
    hashBuffer = await crypto.subtle.digest("SHA-1", bytes);
  } else if (algoritmo === "SHA-256") {
    hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  }

  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  
  const senhaFinal = hashHex.substring(0, tamanho);
  document.getElementById("senhaGerada").value = senhaFinal;
}

function copiarSenha() {
  const senhaField = document.getElementById("senhaGerada");
  senhaField.select();
  document.execCommand("copy");
  alert("Senha copiada para a área de transferência!");
}