const express=require("express");
const cors=require("cors");

const app=express();
const PORT=3000;

app.use(cors());
app.use(express.json());

let complaints=[
{
id:1,
residentName:"Manya",
roomNumber:"205",
contact:"9876543210",
category:"Water Supply",
description:"No water supply in the bathroom",
status:"Pending",
date:new Date().toLocaleDateString()
}
];

app.get("/",(req,res)=>{
res.send("PG Complaint Management API is running");
});

app.get("/complaints",(req,res)=>{
res.json(complaints);
});

app.get("/complaints/:id",(req,res)=>{
const id=parseInt(req.params.id);

const complaint=complaints.find(c=>c.id===id);

if(!complaint){
return res.status(404).json({
message:"Complaint not found"
});
}

res.json(complaint);
});

app.post("/complaints",(req,res)=>{
const newComplaint={
id:complaints.length>0
?Math.max(...complaints.map(c=>c.id))+1
:1,
residentName:req.body.residentName,
roomNumber:req.body.roomNumber,
contact:req.body.contact,
category:req.body.category,
description:req.body.description,
status:"Pending",
date:new Date().toLocaleDateString()
};

complaints.push(newComplaint);

res.status(201).json({
message:"Complaint submitted successfully",
complaint:newComplaint
});
});

app.put("/complaints/:id",(req,res)=>{
const id=parseInt(req.params.id);

const complaint=complaints.find(c=>c.id===id);

if(!complaint){
return res.status(404).json({
message:"Complaint not found"
});
}

complaint.residentName=req.body.residentName||complaint.residentName;
complaint.roomNumber=req.body.roomNumber||complaint.roomNumber;
complaint.contact=req.body.contact||complaint.contact;
complaint.category=req.body.category||complaint.category;
complaint.description=req.body.description||complaint.description;
complaint.status=req.body.status||complaint.status;

res.json({
message:"Complaint updated successfully",
complaint:complaint
});
});

app.patch("/complaints/:id/status",(req,res)=>{
const id=parseInt(req.params.id);

const complaint=complaints.find(c=>c.id===id);

if(!complaint){
return res.status(404).json({
message:"Complaint not found"
});
}

complaint.status=req.body.status;

res.json({
message:"Complaint status updated successfully",
complaint:complaint
});
});

app.delete("/complaints/:id",(req,res)=>{
const id=parseInt(req.params.id);

const index=complaints.findIndex(c=>c.id===id);

if(index===-1){
return res.status(404).json({
message:"Complaint not found"
});
}

const deletedComplaint=complaints.splice(index,1);

res.json({
message:"Complaint deleted successfully",
complaint:deletedComplaint[0]
});
});

app.listen(PORT,()=>{
console.log(`Server running at http://localhost:${PORT}`);
});