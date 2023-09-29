let imageDiv;
let uniqueRandomNumber;
let cat;
function displaySpices(spiceItem,category)
{
    imageDiv= document.createElement("div");
            imageDiv.className="imageDiv";
            imageDiv.id= "imageDiv";

            const name= document.createElement("h3");
            name.textContent= spiceItem.name;
            
            const spiceImage= document.createElement("img");
            spiceImage.src= spiceItem.image;
            spiceImage.className="spice-avatar";
            
            const spiceQuantity= document.createElement("h2");
            spiceQuantity.textContent= "Quantity: "+spiceItem.Quantity+" gm";

            const input = document.createElement("input"); 
            input.placeholder = "Enter New Quantity";
            input.className="input-text-edit";

            const editBtn= document.createElement("button");
            editBtn.id="editBtn";
            editBtn.textContent= "Update Quantity"

            const deleteBtn= document.createElement("button");
            deleteBtn.id="deleteBtn";
            deleteBtn.textContent= "Delete";

            imageDiv.append(name,spiceImage,spiceQuantity,input,editBtn,deleteBtn);
            
            const contDiv= document.createElement("div");
            contDiv.id="containerDiv";
            
            document.querySelector("#containerDiv").append(imageDiv);

            document.body.appendChild(contDiv);


            editBtn.addEventListener("click", () => {
                
                var oldQtyString= spiceQuantity.textContent;
                var parts = oldQtyString.split(" ");
                var oldQuantity = parseInt(parts[1], 10);
                var toUpdateQty;
                if (!isNaN(oldQuantity)) {
                   toUpdateQty=oldQuantity;
                  } else {
                    toUpdateQty=input.value;
                  }
               
                const newQuantity= parseInt(toUpdateQty) + parseInt(input.value);


                fetch(`http://localhost:3000/${category}/` + spiceItem.id, {
                    method: "PATCH",
                  
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                  body: JSON.stringify({ Quantity: newQuantity })
                })
                .then(response => response.json())
                .then(patchedQuantity => {
                    spiceQuantity.textContent= "Quantity: "+patchedQuantity.Quantity+" gm";
                    input.value = "";
                })
            })

          
            deleteBtn.addEventListener("click", () => {
       
            fetch(`http://localhost:3000/${category}/` + spiceItem.id, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    if(category==="HotSpices")
                    document.querySelector("#category1").click();
                    if(category==="MildFlavoredSpices")
                    document.querySelector("#category2").click();
                    if(category==="AromaticSpices")
                    document.querySelector("#category3").click();
                    if(category==="AromaticHerbsandVegetables")
                    document.querySelector("#category4").click();
                }
            })
            })

            document.querySelector(".spice-avatar").addEventListener("mouseover",event =>{
                spiceImage.style.height="13rem";
            })
            document.querySelector(".spice-avatar").addEventListener("mouseout",event =>{
                spiceImage.style.height="12rem";
            })


            
}


function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function isNumberInArray(arr, num) {
    return arr.includes(num);
  }
  
  function findUniqueRandomNumber(arr, min, max) {
    let randomNum;
    do {
      randomNum = generateRandomNumber(min, max);
    } while (isNumberInArray(arr, randomNum));
    return randomNum;
  }

document.querySelector("#category1").addEventListener("click",event=>{
    let existingIds=[];
    cat="HotSpices";
    deleteChild();
    fetch("http://localhost:3000/HotSpices")
    .then(response => response.json())
    .then(HotSpices => {
       HotSpices.forEach(spiceItem => { displaySpices(spiceItem,cat); 
        existingIds.push(spiceItem.id);
        uniqueRandomNumber = findUniqueRandomNumber(existingIds, 1, 100);
        })
    })
})

document.querySelector("#category2").addEventListener("click",event=>{
    let existingIds=[];
    cat="MildFlavoredSpices";
    deleteChild();
    fetch("http://localhost:3000/MildFlavoredSpices")
    .then(response => response.json())
    .then(MildFlavoredSpices => {
       MildFlavoredSpices.forEach(spiceItem => { displaySpices(spiceItem,cat); 
        existingIds.push(spiceItem.id);
        uniqueRandomNumber = findUniqueRandomNumber(existingIds, 1, 100);
        })
    })
    
})
document.querySelector("#category3").addEventListener("click",event=>{
    let existingIds=[];
    cat="AromaticSpices";
    deleteChild();
    fetch("http://localhost:3000/AromaticSpices")
    .then(response => response.json())
    .then(AromaticSpices => {
       AromaticSpices.forEach(spiceItem => { displaySpices(spiceItem,cat); 
        existingIds.push(spiceItem.id);
        uniqueRandomNumber = findUniqueRandomNumber(existingIds, 1, 100);
        })
    })
})
document.querySelector("#category4").addEventListener("click",event=>{
    let existingIds=[];
    cat="AromaticHerbsandVegetables";
    deleteChild();
    fetch("http://localhost:3000/AromaticHerbsandVegetables")
    .then(response => response.json())
    .then(AromaticHerbsandVegetables => {
       AromaticHerbsandVegetables.forEach(spiceItem => { displaySpices(spiceItem,cat); 
        existingIds.push(spiceItem.id);
        uniqueRandomNumber = findUniqueRandomNumber(existingIds, 1, 100);
        })
    })
})


function deleteChild() {
    var e = document.querySelector("#containerDiv");
    
    //e.firstElementChild can be used.
   
    var child = e.lastElementChild; 
    console.log(child);
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
        console.log(child);
    }
}

document.querySelector(".add-item-form").addEventListener("submit", event =>{
    event.preventDefault();

    const category= event.target.category.value;

    if(category==="Hot Spices")
    {
    fetch("http://localhost:3000/HotSpices",{
        method:"POST",
        headers:{
                "Content-Type": "application/json",
                "Accept":"application/json"
        },
        body: JSON.stringify({
            id: uniqueRandomNumber,
            name: event.target.name.value,
            image: event.target.image.value,
            Quantity: parseInt(event.target.Quantity.value)
        })
    })
    .then(response => response.json())
    .then(HotSpices=>{document.querySelector("#category1").click();})
    }   

    if(category==="Mild Flavored Spices")
    {
    fetch("http://localhost:3000/MildFlavoredSpices",{
        method:"POST",
        headers:{
                "Content-Type": "application/json",
                "Accept":"application/json"
        },
        body: JSON.stringify({
            id: uniqueRandomNumber,
            name: event.target.name.value,
            image: event.target.image.value,
            Quantity: parseInt(event.target.Quantity.value)
        })
    })
    .then(response => response.json())
    .then(MildFlavoredSpices=>{document.querySelector("#category2").click();})
    } 

    if(category==="Aromatic Spices")
    {
    fetch("http://localhost:3000/AromaticSpices",{
        method:"POST",
        headers:{
                "Content-Type": "application/json",
                "Accept":"application/json"
        },
        body: JSON.stringify({
            id: uniqueRandomNumber,
            name: event.target.name.value,
            image: event.target.image.value,
            Quantity: parseInt(event.target.Quantity.value)
        })
    })
    .then(response => response.json())
    .then(AromaticSpices=>{document.querySelector("#category3").click();})
    }   

    if(category==="Aromatic Herbs and Vegetables")
    {
    fetch("http://localhost:3000/AromaticHerbsandVegetables",{
        method:"POST",
        headers:{
                "Content-Type": "application/json",
                "Accept":"application/json"
        },
        body: JSON.stringify({
            id: uniqueRandomNumber,
            name: event.target.name.value,
            image: event.target.image.value,
            Quantity: parseInt(event.target.Quantity.value)
        })
    })
    .then(response => response.json())
    .then(AromaticHerbsandVegetables=>{document.querySelector("#category4").click();})
    }   
   event.target.reset();
})
