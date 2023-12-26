
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { db, auth, storage } from "../config/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export type Student={
    id:string;
    name:string;
    grade:number;
}

export type StudentFrom={
    name:string;
    grade:number;
}

export const Home=()=>{
    const [newName, setNewName]=useState("");
    const [newGrade, setNewGrade]=useState(0);
    const [btnAction, setBtnAction]=useState("Create");
    const [studentId, setStudentId]=useState("");

    // file upload state
    const [fileUpload, setFileUpload]=useState<File | null>(null);
    
    const [studentList, setStudentList]=useState<Student[]>([]);
    const studentCollectionRef=collection(db,"students")

    const getStudentList=async ()=>{
        // read the data
        try{
            const data= await getDocs(studentCollectionRef);
            // const filteredData=data.docs.map((doc)=>({...doc.data(),id: doc.id}))
            const filteredData=data.docs.map((doc)=>({id: doc.id, name: doc.data().name,grade: doc.data().grade}))
            console.log(filteredData)
            setStudentList(filteredData)
        }catch(error){
            console.log(error)
        }
        // set the student list
    }

    useEffect(()=>{  
        getStudentList();
    },[])

  
    const onCreateStudent=async()=>{
        try{
            await addDoc(studentCollectionRef,{
                name: newName,
                grade: newGrade,
                userId: auth?.currentUser?.uid || ""
            })
            getStudentList();
        }catch(error){
            console.log(error)
        }
    }

    const onDeleteStudent=async(id:string)=>{
        try{
            const studentDoc=doc(db, "students", id)
            await deleteDoc(studentDoc)
            getStudentList();
        }catch(error){
            console.log(error)
        }
    }

    const onUpdateSudent=async()=>{
        try{
            const studentDoc=doc(db, "students", studentId)
            await updateDoc(studentDoc,{
                name: newName,
                grade: newGrade
            })
            getStudentList();
        }catch(error){
            console.log(error)
        }

        setBtnAction("Create")
    }

    const uploadFile=async()=>{
        try{
            if(!fileUpload) return;
            const filesFolderRef=ref(storage, `projectFiles/${fileUpload.name}`);
            await uploadBytes(filesFolderRef, fileUpload);
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
        <Header/>
        <div className="flex flex-col items-center justify-center w-full h-auto mt-5">
            
            <form className="flex flex-col items-center gap-4 w-96">
                <h1 className="mb-2 text-3xl">Create Student</h1>
                <label className="w-full">
                    <span className="block text-sm font-medium text-slate-700">Name</span>
                    <input value={newName} onChange={(e)=>setNewName(e.target.value)} className="w-full h-10 pl-2 border rounded-md" type="text" placeholder="Enter name"/>
                </label>
                <label className="w-full">
                    <span className="block text-sm font-medium text-slate-700">Grade</span>
                    <input value={newGrade} onChange={(e)=>setNewGrade(Number(e.target.value))} className="w-full h-10 pl-2 border rounded-md" type="number" placeholder="Enter grade"/>
                </label>
                
                <button type="button" onClick={btnAction=="Create"?onCreateStudent:onUpdateSudent} className="w-full h-10 bg-blue-600 rounded-md">{btnAction}</button>
            </form>

           <div className="mt-10">
                <span className="block text-sm font-medium text-slate-700">Select Profile Picture</span>
                <input onChange={(e) => setFileUpload(e.target.files != null?e.target.files[0]:null)} type="file" />
                <button className="p-1 bg-blue-500 rounded-md" onClick={uploadFile}>Upload File</button>
           </div>

            <div className="w-full p-10">
                <table className="w-full text-left h-fulltext-sm rtl:text-right">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-500">
                        <tr>
                            <th className="text-lg">#</th>
                            <th className="text-lg">Name</th>
                            <th className="text-lg">Grade</th>
                            <th className="text-lg">Options</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs text-gray-700 uppercase bg-blue-100">
                        {studentList.map((student:Student)=>(
                            <tr key={student.id}>
                                <td className="text-base">1</td>
                                <td className="text-base">{student.name}</td>
                                <td className="text-base">{student.grade}</td>
                                <td className="flex gap-10">
                                    <button type="button" onClick={()=>onDeleteStudent(student.id)} className="text-base text-red-500">Delete</button>
                                    <button type="button" onClick={()=>{setBtnAction("Update"); setStudentId(student.id); setNewGrade(student.grade); setNewName(student.name)}} className="text-base text-green-500">Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}