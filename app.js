document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("searchForm").addEventListener("submit", event => {
    event.preventDefault()
  })
  document.getElementById("searchBtn").addEventListener("click", event => {
    document.getElementById("searchBar").classList.toggle("inactive")
    document.getElementById("cancelBtn").classList.toggle("inactive")
    document.getElementById("searchBtn").classList.toggle("inactive")
  })
  document.getElementById("cancelBtn").addEventListener("click", event => {
    document.getElementById("searchBar").classList.toggle("inactive")
    document.getElementById("cancelBtn").classList.toggle("inactive")
    document.getElementById("searchBtn").classList.toggle("inactive")
    deleteSearchResult();
  })
})

function queryWiki(event){
  let searchText = document.querySelector('#searchBar').value
  var apiEndpoint = "https://en.wikipedia.org/w/api.php?";
  let params = 'action=query'
  params += '&format=json'
  params += '&prop=description'
  params += '&list=search'
  params += '&formatversion=2'
  params += '&origin=*'
  params += `&srsearch=${searchText}`
  params += '&srlimit=10'
  
  let queryString = apiEndpoint + params
  console.log(queryString)
  
  fetch(queryString)
    .then(res => res.json())
    .then(async data => {
    data = data.query.search
    data.sort((a,b) => a.pageid - b.pageid)
    console.log(data)
    
    // delete previous if exist
    deleteSearchResult();
    
    for(let x of data){
      console.log(x)
      const node = document.createElement("div");
      node.classList.add('wikiDiv')
      node.classList.add('inactive')
      const textTitle = document.createElement("h3");
      const textDesc= document.createElement("p");
      textTitle.innerHTML = x.title 
      textDesc.innerHTML = x.snippet
      node.appendChild(textTitle)
      node.appendChild(textDesc)
      node.addEventListener('click', () => {
        window.open(`http://en.wikipedia.org/wiki?curid=${x.pageid}`)
      })
      let hookAt = document.querySelector('#toHook')
      hookAt.appendChild(node)
    }
    // sleep 1s and appears!
    await sleep(750);
    let to_appear = document.querySelectorAll("#toHook div");
    for(let x of to_appear) x.classList.remove('inactive');
  })
} 

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const deleteSearchResult = () => {
  let to_delete = document.querySelectorAll("#toHook div");
  console.log(to_delete)
  if(to_delete.length > 0){
    for(let x of to_delete) x.remove();
  }
}