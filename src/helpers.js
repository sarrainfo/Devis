async function getDevis(){
    
    let response = await fetch("https://api.travauxlib.com/api/devis-pro/JKusHl8Ba8MABIjdCtLZOe2lxxnUfX");
    let data = await response.json();
    console.log('data',data)
    return data;
      

}



export {getDevis}