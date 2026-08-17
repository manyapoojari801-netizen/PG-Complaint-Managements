let complaints=JSON.parse(localStorage.getItem("complaints"))||[];

const form=document.getElementById("complaintForm");
const residentName=document.getElementById("residentName");
const roomNumber=document.getElementById("roomNumber");
const contact=document.getElementById("contact");
const category=document.getElementById("category");
const description=document.getElementById("description");
const complaintId=document.getElementById("complaintId");

form.addEventListener("submit",function(e){

e.preventDefault();

if(complaintId.value){

let complaint=complaints.find(c=>c.id==complaintId.value);

complaint.residentName=residentName.value;
complaint.roomNumber=roomNumber.value;
complaint.contact=contact.value;
complaint.category=category.value;
complaint.description=description.value;

alert("Complaint updated successfully!");

}else{

let newComplaint={
id:Date.now(),
residentName:residentName.value,
roomNumber:roomNumber.value,
contact:contact.value,
category:category.value,
description:description.value,
status:"Pending",
date:new Date().toLocaleDateString()
};

complaints.push(newComplaint);

alert("Complaint submitted successfully!");

}

localStorage.setItem("complaints",JSON.stringify(complaints));

resetForm();
displayComplaints();

document.getElementById("complaints").scrollIntoView({
behavior:"smooth"
});

});

function displayComplaints(){

const list=document.getElementById("complaintList");
const search=document.getElementById("search").value.toLowerCase();
const statusFilter=document.getElementById("statusFilter").value;

list.innerHTML="";

let filtered=complaints.filter(c=>{

let matchesSearch=
c.residentName.toLowerCase().includes(search)||
c.roomNumber.toLowerCase().includes(search)||
c.category.toLowerCase().includes(search)||
c.description.toLowerCase().includes(search);

let matchesStatus=
statusFilter==="All"||c.status===statusFilter;

return matchesSearch&&matchesStatus;

});

if(filtered.length===0){

list.innerHTML="<p style='text-align:center;'>No complaints found.</p>";
return;

}

filtered.forEach(c=>{

let statusClass="pending";

if(c.status==="In Progress"){
statusClass="progress";
}

if(c.status==="Resolved"){
statusClass="resolved";
}

list.innerHTML+=`

<div class="complaint-card">

<h3>${c.category}</h3>

<p><strong>Resident:</strong> ${c.residentName}</p>

<p><strong>Room:</strong> ${c.roomNumber}</p>

<p><strong>Contact:</strong> ${c.contact}</p>

<p><strong>Description:</strong> ${c.description}</p>

<p><strong>Date:</strong> ${c.date}</p>

<span class="status ${statusClass}">
${c.status}
</span>

<div class="card-buttons">

<button class="edit-btn" onclick="editComplaint(${c.id})">
Edit
</button>

<button class="delete-btn" onclick="deleteComplaint(${c.id})">
Delete
</button>

<button class="status-btn" onclick="changeStatus(${c.id})">
Update Status
</button>

</div>

</div>

`;

});

}

function editComplaint(id){

let c=complaints.find(c=>c.id===id);

if(!c){
return;
}

complaintId.value=c.id;
residentName.value=c.residentName;
roomNumber.value=c.roomNumber;
contact.value=c.contact;
category.value=c.category;
description.value=c.description;

document.getElementById("formTitle").innerText="Edit Complaint";
document.getElementById("submitBtn").innerText="Update Complaint";
document.getElementById("cancelBtn").style.display="block";

showSection("complaint");

window.scrollTo({
top:document.getElementById("complaint").offsetTop,
behavior:"smooth"
});

}

function deleteComplaint(id){

let confirmDelete=confirm("Are you sure you want to delete this complaint?");

if(!confirmDelete){
return;
}

complaints=complaints.filter(c=>c.id!==id);

localStorage.setItem("complaints",JSON.stringify(complaints));

displayComplaints();

alert("Complaint deleted successfully!");

}

function changeStatus(id){

let complaint=complaints.find(c=>c.id===id);

if(!complaint){
return;
}

if(complaint.status==="Pending"){
complaint.status="In Progress";
}
else if(complaint.status==="In Progress"){
complaint.status="Resolved";
}
else{
complaint.status="Pending";
}

localStorage.setItem("complaints",JSON.stringify(complaints));

displayComplaints();

}

function resetForm(){

form.reset();

complaintId.value="";

document.getElementById("formTitle").innerText="Submit Complaint";

document.getElementById("submitBtn").innerText="Submit Complaint";

document.getElementById("cancelBtn").style.display="none";

}

function showSection(sectionId){

document.getElementById(sectionId).scrollIntoView({
behavior:"smooth"
});

}

displayComplaints();