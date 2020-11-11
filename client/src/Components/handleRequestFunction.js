const handleRequestFunction = async (id) =>{
  const URL = 'http://192.168.10.86:5000/get-data?id=' + id.toString();
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': null
    }, 
    id: id, 
  })
  const processedData = await response.json(); 
  return processedData
}


export default handleRequestFunction