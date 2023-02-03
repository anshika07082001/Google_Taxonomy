import React, { useEffect, useState } from 'react'

const Taxonomy = () => {

    var [dataArr,setDataArr]=useState<any>([])
    var [msg,setMsg]=useState('')
    var obj:any={}
    // Fetching data from text file in useEffect
    useEffect(()=>{
        fetch('./data.txt')
        .then(data=>data.text())
        .then((data:string)=>readableForm(data))
    },[])   
    // converting the data into nested object array
    const readableForm=(data:string)=>{
        var lowerData = data.split('\n')
        lowerData.map((item)=>{
            var items = item.split('>').map((el)=>el.trim())
            createNestedObject(obj,items)
        })
        setDataArr([{name:'google',listObj:obj}])
    }
    // Function for creating nested objects
    var createNestedObject = function( base:any, names:any ) {
        for( var i = 0; i < names.length; i++ ) {
            base = base[ names[i] ] = base[ names[i] ] || {};
        }
    };
    // Function selects the value and renders on the basis of selected value
    const select1Handler =(str:string,obj:any,index:number,e:any)=>{
        console.log(index)
        if(obj!==undefined){
            if(Object.keys(obj).length>0){
                if(index<dataArr.length){
                    dataArr.splice(index+1)
                }
                setMsg('')
                dataArr.push({name:str,listObj:obj})
            }
            else{
                setMsg('No Further categories found')
                if(index<dataArr.length)
                dataArr.splice(index+1)
            }
            setDataArr([...dataArr])
        }
        else{

        }
    }

    return (
    <div className='d-flex flex-column col-6 m-auto text-center'>
        <h3>Google Taxonomy</h3>
        {/* Renders the ParentCategory Data */}
        {dataArr.map((x:any,index:number)=>
        <select onChange={(e)=>select1Handler(e.target.value,x.listObj[e.target.value],index,e)} className='p-2 fs-4 mt-2 rounded-pill bg-primary-subtle'>
            <option hidden>Select</option>
            {Object.keys(x.listObj).map((ele,i)=>{
                return <option key={ele}>{ele}</option>
            })}
        </select>
        )}
        {/* Renders the message */}
        <label className='text-danger fs-3'>{msg}</label>
    </div>
    )
}

export default Taxonomy